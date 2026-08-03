# Laboratorio 2.1: Creación de una Imagen Docker para una Aplicación

**Universidad San Francisco Xavier de Chuquisaca**

**Asignatura:** Trabajando en la Nube (COM610)

**Docente:** Ing. Marcelo Quispe Ortega

**Semestre:** 2/2026

## 1. Objetivos del Laboratorio 🎯

Al finalizar este laboratorio, el estudiante será capaz de:

- Comprender y aplicar los comandos del **Docker CLI** para la gestión básica de imágenes y contenedores.

- Crear un `Dockerfile` para empaquetar una aplicación web.

- Construir una imagen a partir de un `Dockerfile`, entendiendo cómo se construyen sus capas.

- Ejecutar un contenedor a partir de una imagen y depurar problemas de ejecución.

## 2. Requisitos ⚙️

- Un sistema operativo con **Docker Desktop** o **Docker Engine** instalado y funcionando.

- Un editor de texto o un IDE (como Visual Studio Code).

- Acceso a la línea de comandos o terminal (instalar [Warp desde aquí](https://app.warp.dev/referral/NQ384D)). 

- Un proyecto de aplicación web simple (se proporciona un ejemplo).

## 3. Ejercicios 🧪

Estos ejercicios están diseñados para que te familiarices con los comandos de Docker de forma gradual y práctica.

### Ejercicio 3.1: Gestión de Imágenes y Contenedores

1.  **Verificación de la Instalación y Listado de Imágenes:**

    ```bash
    docker --version
    ```

    > Verifica que Docker esté instalado.

2.  **Descarga de Imágenes (docker pull):**

    - El comando `docker pull` descarga una imagen desde un registro (por defecto, Docker Hub).

    - **Sintaxis:** `docker pull <nombre-imagen>:<tag>`

    - **Ejemplo (descarga la última versión de Nginx):**
        ```bash
        docker pull nginx
        ```

    - **Ejemplo (descarga una versión específica):**
        ```bash
        docker pull ubuntu:22.04
        ```

    - **Ejemplo (descarga una versión lightweight de Node.js)**
        ```bash
        docker pull node:20-alpine
        ```

    - **Verifica las imágenes descargadas:**
        ```bash
        docker images
        ```
    
3.  **Búsqueda de Imágenes (docker search):**
    - Te permite buscar imágenes en Docker Hub directamente desde la terminal.

    - **Sintaxis:** `docker search <término-de-búsqueda>`

    - **Ejemplo (busca imágenes de WordPress):**
        ```bash
        docker search wordpress
        ```
    
4. **Ejecución de Contenedores (docker run):**

    - Este comando es el más utilizado. Combina la creación y ejecución de un contenedor en un solo paso.

    - **Sintaxis básica:** `docker run <imagen>`

    - **Ejemplo (ejecuta un contenedor Nginx simple)**
        ```bash
        docker run nginx
        ```
        > Verás la salida de Nginx directamente en tu terminal. El contenedor se detendrá cuando presiones `Ctrl+C`.

    - **Ejemplo (ejecuta un contenedor Ubuntu y entra en su terminal):**
        ```bash
        docker run -it ubuntu:22.04 bash
        ```
        - `-i`: Mantiene la entrada estándar abierta.
        - `-t`: Asigna un pseudo-TTY (terminal).
        - `bash`: El comando a ejecutar dentro del contenedor.

    - **Ejemplo (ejecuta un servidor Nginx en segundo plano):**
        ```bash
        docker run -d -p 8080:80 --name mi-servidor nginx
        ```
        - `-d`: Ejecuta el contenedor en modo detached (segundo plano).
        - `-p 8080:80`: Mapea el puerto 8080 del host al puerto 80 del contenedor.
        - `--name mi-servidor`: Asigna un nombre al contenedor para facilitar su gestión.

5.  **Gestión de Contenedores en ejecución (docker ps, docker stop, docker rm):**
    - `docker ps`: Muestra los contenedores que se están ejecutando actualmente.

    - `docker ps -a`: Muestra todos los contenedores, incluidos los detenidos.

    - `docker stop <ID o Nombre>`: Detiene un contenedor en ejecución de forma controlada.

    - `docker rm <ID o Nombre>`: Elimina un contenedor.

    - `docker rm $(docker ps -a -q)`: Elimina todos los contenedores detenidos.

    - `docker container prune`: Elimina los contenedores detenidos.

6.  **Visualización de Logs (docker logs):**
    - Te permite ver la salida de un contenedor. Es esencial para la depuración.

    - `docker logs <ID o Nombre>`: Muestra los logs desde el inicio del contenedor.

    - `docker logs -f <ID o Nombre>`: Muestra los logs en tiempo real (--follow).

### Ejercicio 3.2: Creación de Imágenes con Dockerfile

Un `Dockerfile` es un archivo de texto con instrucciones para construir una imagen. El comando docker build lee el `Dockerfile` y construye la imagen.

1.  **Ejemplo Básico: Una imagen de bienvenida**

    - **Crea un `Dockerfile` con el siguiente contenido:**

        ```Dockerfile
        FROM alpine
        CMD ["echo", "¡Hola desde mi primera imagen Docker!"]
        ```
        > **Explicación:** Usa una imagen base muy ligera (alpine) y ejecuta un comando simple al iniciar el contenedor.

    - **Cómo ejecutarlo 🚀:**
        - **Construye la imagen:**
        
            ```bash
            docker build -t hola-mundo:1.0 .
            ```

            > El `.` al final es crucial, ya que indica el directorio de contexto de la construcción.

        - Ejecuta el contenedor:
            ```bash
            docker run --rm hola-mundo:1.0
            ```
            > El contenedor imprimirá el mensaje y luego se detendrá y eliminará (`--rm`).

2. **Ejemplo para una Aplicación Web Simple**

    - **Crea los siguientes archivos en una carpeta:**

        - `app.js`: Un servidor web básico que responde en el puerto 3000.
            ```Javascript
            const http = require('http');

            const hostname = '0.0.0.0';
            const port = 3000;

            const server = http.createServer((req, res) => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'text/plain');
              res.end('¡Hola desde mi primera aplicacion Dockerizada!\n');
            });

            server.listen(port, hostname, () => {
              console.log(`Servidor en ejecucion en http://${hostname}:${port}/`);
            });
            ```

        - `package.json`: Este archivo define la información del proyecto y sus dependencias. La parte más importante es el scripts para iniciar la aplicación.

            ```JSON
            {
              "name": "mi-app-docker",
              "version": "1.0.0",
              "description": "Una aplicación web simple para demostrar Docker.",
              "main": "app.js",
              "scripts": {
                "start": "node app.js"
              },
              "author": "COM610",
              "license": "ISC",
              "dependencies": {}
            }
            ```

        - `Dockerfile`:
            ```Dockerfile
            FROM node:20-alpine
            WORKDIR /app
            COPY . .
            CMD ["node", "app.js"]
            ```
            > **Explicación:** Copia los archivos de la aplicación a una imagen base de Node.js y ejecuta el script principal.

    - **Cómo ejecutarlo 🚀:**

        - **Construye la imagen:**
            ```bash
            docker build -t mi-app-web:1.0 .
            ```

        - **Ejecuta el contenedor:**
            ```bash
            docker run -d -p 8080:3000 --name mi-web-app mi-app-web:1.0
            ```

            > `-p 8080:3000`: Mapea el puerto de la aplicación (3000) a un puerto local (8080).

        - **Verifica:** Abre tu navegador y visita [http://localhost:8080](http://localhost:8080).

3.  **Ejemplo con Gestión de Dependencias**

    - `Dockerfile`:
        ```Dockerfile
        FROM node:20-alpine
        WORKDIR /app
        COPY package.json .
        RUN npm install
        COPY . .
        EXPOSE 3000
        CMD ["npm", "start"]
        ```
        > **Explicación:** Este método optimiza el proceso de construcción. Al copiar e instalar las dependencias en un paso separado, Docker puede reutilizar esa capa si el archivo `package.json` no cambia.

    - **Cómo ejecutarlo 🚀:**

        - **Construye la imagen:**
            ```bash
            docker build -t mi-app-con-dependencias:1.0 .
            ```

        - **Ejecuta el contenedor:**
            ```bash
            docker run -d -p 8080:3000 mi-app-con-dependencias:1.0
            ```

4. **Ejemplo con Múltiples Fases (`Multi-stage Build`)**

    Un método avanzado que crea una imagen final mucho más ligera.

    - `Dockerfile`:
        ```Dockerfile
        # Fase de construcción
        FROM node:20-alpine as builder
        WORKDIR /app
        COPY package.json .
        RUN npm install
        COPY . .

        # Fase final (imagen final más ligera)
        FROM node:20-alpine
        WORKDIR /app
        COPY --from=builder /app .
        CMD ["node", "app.js"]
        ```
        > **Explicación:** Este método avanzado crea una imagen final mucho más ligera al copiar solo los archivos esenciales desde una imagen temporal de "construcción".

    - **Cómo ejecutarlo 🚀:**

        - **Construye la imagen final optimizada:**
            ```bash
            docker build -t mi-app-optimizada:1.0 .
            ```

        - **Ejecuta el contenedor:**
            ```bash
            docker run -d -p 8080:3000 mi-app-optimizada:1.0
            ```

5. **Ejemplo para una Aplicación de Python**

    - `app.py`: Este archivo utiliza el framework web Flask para crear una API simple que responde a una solicitud GET.
        ```Python
        from flask import Flask

        app = Flask(__name__)

        @app.route('/')
        def home():
          return '¡Hola desde mi aplicación Dockerizada en Python!'

        if __name__ == '__main__':
          app.run(host='0.0.0.0', port=5000)
        ```

    - `requirements.txt`: Este archivo lista las dependencias del proyecto de Python. Flask es la única dependencia necesaria para este ejemplo.

        ```Plaintext
        Flask
        ```

    - `Dockerfile`:
        ```Dockerfile
        FROM python:3.9-alpine
        WORKDIR /app
        COPY requirements.txt .
        RUN pip install -r requirements.txt
        COPY . .
        CMD ["python", "app.py"]
        ```
        > **Explicación:** Usa una imagen base de Python, instala las dependencias de `requirements.txt` y ejecuta el script principal `app.py`.

    - **Cómo ejecutarlo 🚀:**

        - **Construye la imagen:**
            ```bash
            docker build -t mi-app-python:1.0 .
            ```

        - **Ejecuta el contenedor:**
            ```bash
            docker run -d -p 8080:5000 mi-app-python:1.0
            ```
        
### 4. Práctica Individual 💻

**Objetivo:**

Crear una API REST simple con operaciones CRUD sobre una lista de elementos que residen en memoria. Esta práctica consolida el uso del `Dockerfile` con más dependencias y la ejecución de una aplicación más robusta.

**Instrucciones:**

1.  **Selección de Tecnología:** Elige entre Node.js con [Express.js](https://expressjs.com/) o Python con [Flask](https://flask.palletsprojects.com/en/stable/.

2. **Configuración del Proyecto:**

    - Crea una nueva carpeta para tu proyecto (por ejemplo, `api-crud`).

    - Crea un archivo principal para tu código (`app.js` o `app.py`).

    - Crea un archivo para las dependencias (`package.json` para Node.js o `requirements.txt` para Python).

3. **Implementación del CRUD en Memoria:**

    - **Para Node.js:**

        - Instala Express.js: `npm install express`

        - Escribe el código en `app.js` para crear una API que gestione una lista de, por ejemplo, "categorías" (categories).

        - Implementa los siguientes endpoints:

            - `GET /categories`: Para listar todas las categorías.

            - `POST /categories`: Para crear una nueva categoría.

            - `PUT /categories/:id`: Para actualizar una categoría existente.

            - `DELETE /categories/:id`: Para borrar una categoría.

        - La API debe escuchar en el puerto 3000.

    - **Para Python:**

        - Instala Flask: `pip install Flask`

        - Escribe el código en `app.py` para crear una API que gestione una lista de, por ejemplo, "películas" (`movies`).

        - Implementa los siguientes endpoints:

            - `GET /movies`: Para listar todas las películas.

            - `POST /movies`: Para crear una nuevo película.

            - `PUT /movies/<id>`: Para actualizar una película existente.

            - `DELETE /movies/<id>`: Para borrar una película.

        - La API debe escuchar en el puerto 5000.


4. **Creación de la Imagen Docker:**

    - Escribe un `Dockerfile` para tu proyecto, siguiendo el enfoque de optimización.

    - Asegúrate de que el Dockerfile exponga el puerto correcto (`3000` para Node.js o `5000` para Python).

    - Construye la imagen con un nombre y versión específicos.

5. **Ejecución y Verificación:**

    - Inicia el contenedor de tu API. Mapea el puerto de la aplicación (3000 o 5000) a un puerto local (como `8080`).

    - Utiliza herramientas como **Postman** y **cURL** para enviar solicitudes y probar todos los endpoints del CRUD (`GET`, `POST`, `PUT`, `DELETE`).

    - Verifica que la API funcione correctamente.

6. **Cierre:**

    - Detén y elimina el contenedor.

    - Elimina la imagen de la aplicación para dejar el sistema limpio.