# Cómo evitar wrappear webpack dev server hasta que sea ABSOLUTAMENTE necesario

Esto surgió a la hora de trabajar con una app donde tenemos un cliente servido 100% separado de la API del backend. 
En desarrollo usamos webpack dev server con todas sus bondades de hot reloading, pero en producción directamente 
corremos webpack y convertimos nuestro cliente en contenido completamente estático (HTML/CSS/JS) servido por un nginx.

Tuvimos dos necesidades que requirieron que en lugar de simplemente correr webpack-dev-server tuvieramos que hacer un pequeño
server express en desarrollo que wrappeara [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) y 
[webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) de manera que también pudieramos agregar más lógica.

Lo que compartimos acá son un par de trucos que encontramos para poder lograr el mismo efecto solo con webpack-dev-server y 
evitar el boilerplate de crear un `server.js` y las varias lineas de código para hacer el wrapping

## Problema 1: proxy para el backend

Como el cliente y la API son servidos de manera separada, en puertos separados, necesitabamos una manera de hacer requests
generados en el cliente que impactaran en la API. Podríamos ser más laxos en la seguridad y permitir "same-origin" requests en 
la API para evitar el problema de los puertos, pero lo cierto es que queríamos algo más agnóstico del deployment, ya que en el
futuro la API podría estar en un servidor (y un dominio) completamente distintos.

Lo ideal es un proxy que traduzca pedidos a `<url-cliente:puerto-cliente>/api` por pedidos a `<url-api:puerto-api>`.

### Solucion con wrapper

Como ya tenemos express directamente podemos usar `http-proxy`

```javascript
var httpProxy = require('http-proxy');

var proxy = new httpProxy.createProxyServer(
  {target: { host: "localhost", port: 3001}}
);

/// resto del boilerplate para wrappear webpack acá

function apiProxy(host, port) {
  return function(req, res, next) {
    if(req.url.match(new RegExp('^\/api\/'))) {
      req.url = req.url.replace("/api", "");
      proxy.web(req, res);
    } else {
      next();
    }
  }
}

app.use(apiProxy('localhost', 3001));
```

### solución directamente en webpack

Encontramos que webpack tiene un opción de configuración bastante potente para definir proxies. Directamente en el `webpack.config.js`:

```javascript
var rewriteUrl = function(replacePath) {
    return function(req, opt) {  // gets called with request and proxy object
        var queryIndex = req.url.indexOf('?');
        var query = queryIndex >= 0 ? req.url.substr(queryIndex) : "";
        req.url = req.path.replace(opt.path, replacePath) + query;
    };
};

var config = {
  /// otra config acá
  devServer: {
    proxy: [{
      path: new RegExp("/api/(.*)"),
      rewrite: rewriteUrl("/$1"),
      target: "http://localhost:3001/"
    }]
  }
}
```

### En producción

Setear un proxy en nginx es cosa de todos los días:

```nginx
  location /api {
    rewrite ^/api/(.*)$ /$1 break;
    proxy_pass        http://localhost:3001;
    proxy_set_header  X-Real-IP  $remote_addr;
  }
```

## Problema 2: history API para react router

Usamos [react-router](https://github.com/rackt/react-router) con una implementación "naive", donde sólo hay un index.html que 
maneja todas las rutas de nuestra SPA. 

Si queremos que esas rutas sean bookmarkeables, pero no queremos implementar un server-side rendering completo, necesitamos que 
de alguna manera que todas las posibles rutas vayan a parar al index.html.

### Solución con wrapper

Podemos definir algo más o menos así:

```javascript
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './index.html'));
});
```

### Solución directamente en webpack

Webpack dev server implementa exactamente este comportamiento si lo corremos con el flag `--history-api-fallback`. 

Es así de sencillo :-)

### En producción

Se puede conseguir un comportamiento similar en nginx usando la directiva `try_files`:

```nginx
  # Any route containing a file extension (e.g. /devicesfile.js)
  location ~ ^.+\..+$ {
    try_files $uri =404;
  }

  # Any route that doesn't have a file extension (e.g. /devices)
  location / {
    try_files $uri /index.html;
  }
```
