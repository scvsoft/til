###Como evitar los ../../../ para tus modulos js locales en node

(Extraído de [este gran artículo](https://github.com/substack/browserify-handbook) que me paso [gianu](https://github.com/gianu))


No todos los modulos/archivos que queremos incluir en un proyecto node a través de un "require" son realmente material que 
justifique armar un package de node, ni queremos realmente tener que pagar la burocracia de preparar todo el package en esos 
casos.

El problema es que si no lo hacemos es muy fácil entrar en situaciones donde nos vemos obligados a jugar con paths relativos 
del estilo de "../../lib/un_modulo.js" dentro de nuestro código. Peor aún, esto hace complicado mover código de lugar, 
reorganizandolo en distintas carpetas, etc. porque entonces tenemos que ir a revisar todos estos paths relativos.

Hay varias maneras de solucionar este tema (en el artículo linkeado más arriba pueden ver otras) pero la que más me gusta por
su simpleza es crear un link simbólico en el node_modules que apunte a la carpeta donde guardamos nuestros módulos.

Por ejemplo si tenemos una carpeta en js/lib con los módulos reutilizables, desde el directorio raíz de nuestro proyecto 
podemos hacer

     cd node_modules;
     ln -sf ../js/lib app;
     
Pequeño detalle: es importante pararnos en el directorio node_modules, o tomar algún recaudo similar ya que estamos haciendo un 
symlink relativo y si lo hacemos de una manera muy naif podemos dejar un path roto.

Una vez hecho el symlink directamente podemos importar módulos desde cualquier lado en nuestro proyecto así:

    require ('app/un_modulo_interno');
    require ('una_dependencia_nomal_de_npm');

Como las dependencias se buscan de manera recursiva, siempre nos alcanza con poner "app/el_modulo", aún cuando el módulo esté en 
algún subdirectorio

Una ventaja de esta solución es que claramente nos queda diferenciado los módulos incluidos como dependencias de packages 
bajados a traves de npm de las que son módulos internos no expuestos como packages: básicamente los primeros no tienen el 
prefijo "app/" y los segundos si.

#### Bonus track: automatizando el proceso

Este tipo de soluciones siempre conviene dejarlas automazidas. Después de todo, a nadie le gusta bajarse un proyecto y tener que
hacer algo más que ejecutar los comandos estándar para bajar las dependencias y correrlo.

El mejor lugar para hacer esto es claramente el package.json, sin dudas. Basta con agregar:

    "scripts": {
        "postinstall": "cd node_modules && ln -sf ../js/lib app"
    },

Y el symlink queda preparado para cualquiera que se baje el proyecto y corra npm install
