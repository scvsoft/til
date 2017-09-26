# JSX Es Javascript, RECUERDALO

... y además sus reglas de transpilación si bien son prácticas, son bastante arbitrarias

Puntualmente:

- Si pones algo que empieza con `minúscula` interpreta que es un tag HTML estándar y lo pasa como `String` a `React.createElement`
- Si pones algo que empieza con `mayúscula` interpreta que es otro componente react y lo pasa como referencia a una variable
- Si pones algo con `minúsculas.pero.con.puntos` *también lo interpreta como variable*.

En ese último caso es donde estuvo el pitfall para mí, porque venía de recibir algo tipo `this.props.contenido` y se me ocurrio usar deconstructing (i.e. `const {contenido} = this.props). Mágicamente dejo de andar todo.

Ejemplo más explícito/visual en este tweet: https://twitter.com/jpsaraceno/status/912745075364499458
