
# LabInsight - Sistema de Gestión y Mantenimiento de Laboratorios

## **Instalación**

LabInsight  es una aplicación creada para llevar un mejor control de los informes de problemas que puedan presentarse en la ESFOT de la Escuela Politécnica Nacional. Aquí se mostrará como poder descargar el backend  del proyecto para utilizarlo fácilmente.

----------

## **Requisitos Previos**

Para usarla por primera vez, se debería tener instalados los siguientes componentes:

-   [Node.js](https://nodejs.org/) (versión 16 o superior)
    
-   [MongoDB](https://www.mongodb.com/) (se puede ejecutar localmente o en un servidor remoto)
-  [Express.js](https://expressjs.com/) (framework utilizado para el servidor web, incluido como dependencia del proyecto)
    
-   Un editor de texto, como [Visual Studio Code](https://code.visualstudio.com/)
    
-   [Git](https://git-scm.com/) (para clonar el repositorio)
    

----------

## **Estructura del Proyecto**

Al descargar el proyecto se presentará una estructura como esta:

```
LabInsight-back-main
│
├── .env                # Archivo de configuración de variables de entorno
├── .env.example        # Ejemplo de las variables de entorno
├── .gitignore          # Archivo para excluir archivos/carpetas de Git
├── package.json        # Dependencias del proyecto
├── package-lock.json   # Detalles del árbol de dependencias
├── node_modules/       # Módulos  node (instalados por npm)
├── src/                # Carpeta principal del código fuente
│   ├── config/         # Configuración inicial (Para el uso de correo electrónico)
│   ├── controllers/    # Controladores en los que se encuentra la lógica del negocio
│   ├── database.js     # Conexión a  base MongoDB
│   ├── index.js        # Entrada del servidor
│   ├── middlewares/    # Middlewares que nos ayuden a controlar la lógica, en este caso nos permiten seguir con los roles establecidos
│   ├── models/         # Modelos de datos (schemas de MongoDB)
│   ├── openapi.yaml    # Documentación en formato OpenAPI
│   ├── routers/        # Diferentes rutas de cada módulo
│   └── server.js       # Configuración del servidor Express
```

----------

## **Instalación**

### 1. Clonar el Repositorio

Abre una terminal y ejecuta el siguiente comando para clonar el repositorio:

```
$ git clone https://github.com/franciscocaero/Backend_GestLab.git
$ cd Backend_GestLab
```

### 2. Instalar Dependencias

Ejecuta el siguiente comando para instalar las dependencias del proyecto:

```
$ npm install
```

### 3. Configurar Variables de Entorno

Copia el archivo `.env.example` y renómbralo como `.env`:

```
$ cp .env.example .env
```

Edita el archivo `.env` y agrega tus credenciales de base de datos y configuración personalizada. Ejemplo:

```
MONGODB_URI=mongodb://localhost:27017/labinsight
PORT=3000
JWT_SECRET=tu_clave_secreta
```

### 4. Iniciar el Servidor

Ejecuta el siguiente comando para iniciar el servidor:

```
$ npm start
```

El servidor estará disponible en `http://localhost:3000`.

----------

## **Documentación de la API**

El proyecto incluye documentación en formato OpenAPI. Para acceder a ella, utiliza un visor compatible con archivos YAML o abrir directamente desde [Swagger UI Backend](https://backend-gestlab.onrender.com/api-docs/).

El archivo `openapi.yaml` se encuentra en la carpeta `src`.

----------
