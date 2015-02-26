###Hay mucho más C en Node de lo que uno piensa

La mayoría de las veces simplemente podemos usar las interfaces javascript sin mayor problema.
Pero cuando utilizamos muchas de las cosas que hacen a node tan interesante (en particular casi cualquier cosa de I/O) 
en realidad estamos accediendo a librerías compiladas para la plataforma puntual que estamos corriendo.
Muchas veces eso es parte de la API core de node, entonces ni nos enteramos. 

Ahora, cuando querés usar una librería como [serialport](https://github.com/voodootikigod/node-serialport) la cosa se pone menos transparente.

Hay una tool que se llama [node-gyp](https://github.com/TooTallNate/node-gyp) que es el compilador de add-ons nativos para node.

Algunos paquetes de npm usan por atras node-gyp o alguna de las tools creadas por encima de él:
- node-pre-gyp puede buscar, publicar e instalar binarios ya compilados antes de buildearlos explícitamente
- nw-gyp configura gyp y/o pre-gyp para un entorno puntual de [nwjs](nwjs.io) para no tener que específicarlo cada vez

Si queremos compilar nuestras dependencias para una plataforma o arquitectura específica, npm puede recibir esos parámetros
y delegarlos a node-gyp o sus derivados, por ejemplo:

    npm install --runtime=node-webkit --target=0.8.6 --target_arch=ia32
   
Compila las dependencias (cuando tenga sentido) para el runtime de node-webkit version 0.8.6 de 32 bits.

Otra opción es una vez bajado el módulo ir a la carpeta correspondiente en node_modules y ejecutar node-gyp (o node-pre-gyp, etc) 
con los mismos parametros desde esa carpeta puntual
