# Laboratorio 2.2: Gestión de Contenedores y Volúmenes Locales

**Universidad San Francisco Xavier de Chuquisaca**

**Asignatura:** Trabajando en la Nube (COM610)

**Docente:** Ing. Marcelo Quispe Ortega

**Semestre:** 2/2026

## 1. Objetivos del Laboratorio 🎯

Al finalizar este laboratorio, el estudiante será capaz de:

- Entender y aplicar los **volúmenes de Docker** para la persistencia de datos y el desarrollo con "hot reload".

- Crear y gestionar **redes personalizadas** de Docker para la comunicación entre servicios.

- Desplegar una arquitectura de balanceo de carga con Nginx.

- Demostrar un flujo de trabajo de desarrollo eficiente utilizando volúmenes.

## 2. Requisitos ⚙️

- Un sistema operativo con **Docker Desktop** o **Docker Engine** instalado y funcionando.

- Un editor de texto o un IDE (como Visual Studio Code).

- Acceso a la línea de comandos o terminal (instalar [Warp desde aquí](https://app.warp.dev/referral/3DY6RJ)). 

- Conocimientos básicos del Laboratorio 2.1 sobre la ejecución de contenedores y la gestión de imágenes.

## 3. Ejercicios 🧪

Estos ejercicios te guiarán a través de los conceptos de volúmenes y redes.

### Ejercicio 3.1: Volúmenes para la Persistencia de Datos

1. **Creación y Verificación de un Volumen:**

    - **Comando**: 
        ```bash
        docker volume create datos-mysql
        ```
        > Crea un volumen gestionado por Docker en el sistema de archivos del host.

    - **Verifica:**
        ```bash
        docker volume ls
        ```
        > Muestra una lista de todos los volúmenes existentes.

2. **Uso de un Volumen en un Contenedor:**

    - **Comando:**
        ```bash
        docker run -d -v datos-mysql:/var/lib/mysql --name mi-db --env MARIADB_ROOT_PASSWORD=1234abcd mariadb
        ```
        > Inicia un contenedor de MariaDB y monta el volumen `datos-mysql` en la ruta interna donde la base de datos almacena sus datos (`/var/lib/mysql`).

3. **Verificación de la Persistencia:**

    - **Ingresa al contenedor:**
        ```bash
        docker exec -it mi-db bash
        ```

    - Una vez dentro, **crea una base de datos o tabla de prueba**. Sal de la terminal con `quit`.

        ```bash
        mariadb -u root -p
        ```
        > Accede al CLI de MariaDB

        ```sql
        CREATE DATABASE test;
        ```
        > Crea la base de datos

        ```sql
        USE test;
        ```
        > Selecciona la base de datos

        ```sql
        CREATE TABLE usuarios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(100),
            email VARCHAR(255) UNIQUE
        );
        ```
        > Crea una tabla dentro de la base de datos

    - **Detén y elimina el contenedor:**
        ```bash
        docker stop mi-db && docker rm mi-db
        ```

    - **Inicia un nuevo contenedor con el mismo volumen:**
        ```bash
        docker run -d -v datos-mysql:/var/lib/mysql --name nueva-db --env MARIADB_ROOT_PASSWORD=1234abcd mariadb
        ```

    - **Verifica:** Accede a la nueva terminal y comprueba que la base de datos o tabla de prueba aún exista.

        ```bash
        docker exec -it nueva-db bash
        ```

    - **También puedes montar el volumen en otro contenedor y navegar por su contenido:**
        ```bash
        docker volume inspect datos-mysql 
        ```
        > Identifica el punto de montaje para ver los detalles del volumen, incluyendo su ruta en el sistema de archivos del host.

        ```bash
        docker run -it --rm -v datos-mysql:/data alpine sh 
        ```
        > Inicia un contenedor temporal con el volumen montado en un directorio (por ejemplo, `/data`) y abre un shell en él.

### Ejercicio 3.2: Volúmenes para Persistencia y Hot Reload

1. **Montaje de Volúmenes para "Hot Reload" en Desarrollo:**

    - **Contexto:** Para este ejercicio, crea un proyecto y configura las dependencias para trabajar con los paquetes de `express` (Framework minimalista) y `nodemon` (dependencia para "Hot Reload").
        ```bash
        npm init
        ```
        > Creación de proyecto con NodeJS

        ```bash
        npm install express
        ```
        > Instala los paquetes del **Framework ExpressJS**

        ```bash
        npm install nodemon --save-dev
        ```
        > Instala los paquetes de `nodemon` como dependencias de desarrollo.

    - **Modifica el contenido del archivo principal del proyecto `index.js`:**
        ```Javascript
        const express = require('express');
        const app = express();
        const port = 3000;

        app.get('/', (req, res) => {
          res.send('Hello World!');
        });

        app.listen(port, () => {
          console.log(`Example app listening on port ${port}`);
        });
        ```
    
    - **Modifica parte del contenido del archivo `package.json`**:
        ```JSON
        "scripts": {
          "start": "node index.js",
          "dev": "nodemon index.js"
        },
        ```

    - **Crea el archivo `Dockerfile` con el siguiente contenido:**
        ```Dockerfile
        FROM node:20-alpine
        WORKDIR /app
        COPY . .
        CMD ["npm", "run", "dev"]
        ```

    - **Construye la imagen:**
        ```bash
        docker build -t mi-app-web:2.0 .
        ```

    - **Ejecuta el contenedor:**
        ```bash
        docker run -d -p 3000:3000 -v "$(pwd):/app" --name mi-app-web-dev mi-app-web:2.0
        ```
        > El comando usa un **montaje de enlace** (`-v "$(pwd):/app"`), que vincula el directorio de trabajo actual (`$(pwd)`) en tu máquina al directorio `/app` del contenedor.

2. **Pruebas de Hot Reload:**

    - **Verificación inicial:** Abre tu navegador y visita `http://localhost:3000`. Deberías ver la respuesta inicial de la aplicación.

    - **Realiza un cambio:** Modifica el mensaje de respuesta en el archivo `app.js` en tu editor de código.

    - **Observa el resultado:** Sin detener o reiniciar el contenedor, recarga la página en tu navegador. Deberías ver el nuevo mensaje. Esto demuestra que `nodemon` detectó el cambio en el archivo montado y reinició la aplicación. Puedes utilizar `docker logs -f mi-web-app-dev` para ver cómo se reinicia la aplicación

### Ejercicio 3.3: Redes para la Comunicación entre Contenedores

1. **Creación de una Red Personalizada:**
    ```bash
    docker network create mi-red-app
    ```
    > Crea una red `bridge` aislada para que los contenedores se comuniquen entre sí por su nombre.

2. **Conexión de Contenedores a la Red:**
    ```bash
    docker run -d --network mi-red-app --name db-con-red --env MARIADB_ROOT_PASSWORD=1234abcd mariadb
    ```

    ```bash
    docker run --network mi-red-app --name app-con-red -it ubuntu:22.04 bash
    ```

    Los contenedores `db-con-red` y `app-con-red` se inician en la misma red y son accesibles por sus nombres.

3. **Verificación de la Comunicación:**
    ```bash
    apt-get update && apt-get install -y iputils-ping
    ```
    > Instala el paquete `ping` en el contenedor.

    **Verificación:**
    ```bash
    ping -c 3 db-con-red
    ```
    > Dentro de la terminal del contenedor, ejecuta este comando para enviar paquetes a la base de datos.

    > **Resultado esperado:** Verás una respuesta exitosa, lo que confirma que los contenedores pueden comunicarse entre sí usando sus nombres de servicio.

### Ejercicio 3.4: Redes y Balanceo de Carga con Nginx

1. **Creación de una Red Personalizada:**

    ```bash
    docker network create web-red
    ```
    > Crea una red dedicada para este ejercicio.

2. **Preparación de los Servidores de Aplicación:**

    - **Crear archivos `index.html`:**
        - `servidor1/index.html`:
        ```html
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Servidor 1</title>
        </head>
        <body>
            ¡Hola desde el Servidor 1!
        </body>
        </html>
        ```

        - `servidor2/index.html`:
        ```html
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Servidor 2</title>
        </head>
        <body>
            ¡Hola desde el Servidor 2!
        </body>
        </html>
        ```

    - **Ejemplo:** Inicia dos contenedores de Nginx, cada uno con su propio archivo `index.html`, en la red que creaste.
        ```bash
        docker run -d --network web-red --name servidor1 -v $(pwd)/servidor1:/usr/share/nginx/html nginx
        ```

        ```bash
        docker run -d --network web-red --name servidor2 -v $(pwd)/servidor2:/usr/share/nginx/html nginx
        ```
3. **Configuración del Balanceador de Carga Nginx:**

    - Archivo `nginx.conf`:
        ```nginx
        events { }
        http {
            upstream balanceador {
                server servidor1;
                server servidor2;
            }
            server {
                listen 80;
                location / {
                    proxy_pass http://balanceador;
                }
            }
        }
        ```
    
    - **Ejemplo:** Inicia un tercer contenedor de Nginx que actúe como balanceador de carga, montando el archivo de configuración y conectándolo a la misma red:

        ```bash
        docker run -d --network web-red -p 8080:80 --name balanceador -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf nginx
        ```
    
    - **Verificación:** Accede a `http://localhost:8080` en tu navegador. Al recargar la página, Nginx alternará entre "¡Hola desde el Servidor 1!" y "¡Hola desde el Servidor 2!", demostrando el balanceo de carga.

### 4. Práctica Individual 💻

**Despliegue de Arquitectura Multinivel – "Blog Institucional USFX"**

**Objetivo:**

Desplegar una arquitectura resiliente de microservicios que separe la lógica de cómputo, el almacenamiento de datos estructurados (SQL) y la persistencia de archivos multimedia, garantizando la comunicación aislada mediante redes virtuales.

**Instrucciones:**

1. **Gestión de Infraestructura de Red y Almacenamiento:**

    - Crea una red personalizada de tipo bridge llamada `red-nube-usfx`.

    - **Complejidad de Almacenamiento:** No basta con persistir la base de datos. Debes crear **dos** volúmenes independientes:

        - `vol-db-datos`: Para la persistencia de MariaDB.

        - `vol-wp-contenido`: Para persistir la carpeta `wp-content` (temas, plugins y fotos subidas).

2. **Seguridad y Variables de Entorno (.env):**

    - **Complejidad de Configuración:** Está estrictamente prohibido pasar contraseñas por la línea de comandos (parámetro `-e`).

    - Crea un archivo llamado `blog.env` en tu directorio de trabajo. Define allí todas las variables necesarias: `MYSQL_ROOT_PASSWORD`, `MYSQL_DATABASE`, `WORDPRESS_DB_USER`, etc. Deberás invocar este archivo al lanzar tus contenedores.

3. **Despliegue del Nodo de Datos (MariaDB):**

    - Ejecuta el contenedor de MariaDB conectado a `red-nube-usfx`.

    - Monta el volumen `vol-db-datos` en la ruta correspondiente del motor de base de datos.

    - Utiliza el archivo `blog.env` para la configuración.

    - **Punto Extra:** Asegúrate de que el contenedor use el character set `utf8mb4` para soportar emojis y caracteres especiales.

4. **Despliegue del Nodo de Aplicación (WordPress):**

    - Conecta WordPress a la misma red `red-nube-usfx`.

    - **Complejidad de Persistencia:** Monta el volumen `vol-wp-contenido` en `/var/www/html/wp-content`.

    - **Ajuste de Rendimiento:** Realiza un bind mount de un archivo local llamado `uploads.ini` hacia el contenedor para aumentar el límite de subida de archivos de PHP a 64MB (investiga la ruta de configuración de PHP en la imagen oficial).

    - Mapea el servicio al puerto local `8081`.

5. **Prueba de Resiliencia y Auditoría:**

    - Accede al blog, instala un tema nuevo y sube una imagen a la biblioteca de medios.

    - **El Desafío de Persistencia:** 1. Detén y elimina ambos contenedores (`docker rm -f`).
        2. Verifica mediante `docker volume inspect` que los datos siguen existiendo.
        3. Levanta nuevamente la infraestructura completa apuntando a los mismos volúmenes.

    - **Verificación Final:** Comprueba que el tema instalado y la imagen subida siguen presentes. Si la imagen desapareció, fallaste en la persistencia del sistema de archivos.