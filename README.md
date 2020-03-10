<p  align="center">
<a  href="https://www.gatsbyjs.org">
<img  alt="Gatsby"  src="https://www.gatsbyjs.org/monogram.svg"  width="60"  />
</a>
</p>
<h1  align="center">
Weather App
</h1>

  

Simple Aplicación en Gatby para mostrar el clima actual y pronostico de los próximos días en ciudades utilizando el API de [openweather](https://openweathermap.org/).

## 💻 Requerimientos

Tener instalado [Node.js](https://nodejs.org/es/) en la computadora al descargar el repositorio.
  

## 🚀 Inicio rápido

### Clonar repositorio

```shell
git clone https://github.com/wilcho-vnz/weather-app
```

### Instalar despendencias
```shell
cd weather-app
npm install
```

### Configuración
En el archivo src/components/weather/data.js
- Agregar el API KEY generado en [openweather](https://openweathermap.org/) en la variable data con el key API_KEY, este valor es un String por lo cual va en comillas
- Sumar ciudades en la variable data con el key "cities" (opcional, hay ciudades precargadas)

### Correr la app en modo development
```shell
npm run develop
```
En el navegador abrir el URL
http://localhost:8000/

### Generar build
```shell
npm run build
```



## 🧐 ¿Qué hay adentro?

Un vistazo rápido a los archivos y directorios de nivel superior que verá en el proyecto.

.

├── node_modules

├── src

├── .gitignore

├── .prettierrc

├── gatsby-browser.js

├── gatsby-config.js

├── gatsby-node.js

├── gatsby-ssr.js

├── LICENSE

├── package-lock.json

├── package.json

└── README.md

  

**`/src/components/weather`**: Este directorio contendrá todo el código relacionado con la app que verá en el frontend.

  
