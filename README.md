# VoleyOn

[![Frontend CI](https://github.com/sergiowalls/VoleyOn/actions/workflows/frontend.yml/badge.svg)](https://github.com/sergiowalls/VoleyOn/actions/workflows/frontend.yml)
[![Backend CI](https://github.com/sergiowalls/VoleyOn/actions/workflows/backend.yml/badge.svg)](https://github.com/sergiowalls/VoleyOn/actions/workflows/backend.yml)

## Frontend

La parte frontend de la aplicación está desarrollada en React con TypeScript. Utiliza la librería de componentes
Material UI para el diseño de la interfaz. Vite se utiliza como herramienta de construcción y desarrollo.

Para configurar el proyecto, instala [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm) y instala las
dependencias con los siguientes comandos en el directorio `frontend`:

```bash
nvm use
npm install
```

A continuación puedes iniciar el servidor de desarrollo con:

```bash
npm run dev
```

O puedes construir el proyecto para producción con:

```bash
npm run build
```

Para visualizar la aplicación, abre tu navegador y accede a `http://localhost:5173/`. Si el servidor del backend está
en ejecución, la aplicación debería funcionar correctamente y mostrar los datos almacenados en la base de datos.

## Backend

La parte backend de la aplicación está desarrollada en Python con Django y Django REST Framework. Utiliza PostgreSQL
como base de datos.

Para configurar el proyecto, instala [Pipenv](https://pipenv-es.readthedocs.io/es/latest/) y las dependencias con los
siguientes comandos en el directorio `backend`:

```bash
pipenv install
```

Antes de continuar, asegúrate de tener [PostgreSQL](https://www.postgresql.org/) instalado y en ejecución. Necesitarás
crear una base de datos con los atributos nombre de usuario, contraseña y nombre de la base de datos con valor
`postgres`. El servidor de PostgreSQL debe escuchar en el puerto 5432. Puedes cambiar estos valors utilizando
variables de entorno (consultar el archivo `settings.py`).

A continuación, debes aplicar las migraciones de la base de datos con:

```bash
pipenv run migrate
```

Finalmente, puedes iniciar el servidor de desarrollo con:

```bash
pipenv run runserver
```

Puedes acceder a la API en `http://localhost:8000/` y a la interfaz de administración de Django en
`http://localhost:8000/admin/`.