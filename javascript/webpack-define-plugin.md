Webpack tiene un plugin para tener "defines", cuyo objetivo es que sirvan más o menos igual que los `DEFINE` que 
usaríamos en C o lenguages similares.

El uso más común de esta feature, como es imaginable, es habilitar o deshabilitar secciones de código de acuerdo a alguna condición
(por ejemplo funcionalidades de debug que queremos en desarrollo pero no en producción, etc)

Lo que aprendí y quería volcar en este artículo es porque los "defines" de webpack *realmente* funcionan bastante similar a los
defines de C, y por qué es mejor usarlos versus otras técnicas para obtener el mismo resultado

El detalle de esto esta perfectamente explicado en [la documentación oficial](https://webpack.github.io/docs/list-of-plugins.html#defineplugin)

Lo importante es que el reemplazo que hace el DefinePlugin es un reemplazo *literal*, en vez de simplemente declarar una variable.
Es importante tener eso en cuenta tb porque significa que todo lo que definamos con el DefinePlugin será convertido a string y 
tomado como si fuera un pedazo de codigo (exactamente igual que como funcionan los defines en otros lenguages)

Por qué es interesante esto? Porque le permite a los minificadores (como UglifyJS) ser "inteligentes".

Por ejemplo si definimos:

```javascript
new webpack.DefinePlugin({
    DEVELOPMENT: false
})
```

Y luego en algun lado:

```javascript
if (DEVELOPMENT) {
  const unaLibDeDevelopment = require('unaLibDeDevelopment');
  //usar esa lib
}
console.log("esta línea no es condicional");
```

Una vez que pasa webpack queda:

```javascript
if (false) {
  const unaLibDeDevelopment = require('unaLibDeDevelopment');
  //usar esa lib
}
console.log("esta línea no es condicional");
```

Finalmente cuando pase el minificador descarta completamente ese bloque de código (_incluyendo el require_):

```javascript
console.log("esta línea no es condicional");
```

Esto tiene dos ventajas importantes en casos como este donde ponemos el require dentro del bloque condicional:

- Nuestras dependencias de dev se mantienen como dependencias de dev, no son necesarias en producción y nuestro código no va a
disparar ningun error si no están
- El tamaño final de nuestro bundle minificado se puede reducir notablemente ya que no metemos esas librerías

