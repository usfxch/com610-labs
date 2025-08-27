# Laboratorio 2.2: Gestión de Contenedores y Volúmenes Locales

## 1. Objetivos del Laboratorio 🎯

Al finalizar este laboratorio, el estudiante será capaz de:

- Entender y aplicar los **volúmenes de Docker** para la persistencia de datos y el desarrollo con "hot reload".

- Crear y gestionar **redes personalizadas** de Docker para la comunicación entre servicios.

- Desplegar una arquitectura de balanceo de carga con Nginx.

- Demostrar un flujo de trabajo de desarrollo eficiente utilizando volúmenes.

## 2. Requisitos ⚙️

- Un sistema operativo con **Docker Desktop** o **Docker Engine** instalado y funcionando.

- Un editor de texto o un IDE (como Visual Studio Code).

- Acceso a la línea de comandos o terminal.

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

    - **Contexto:** Para este ejercicio, utiliza el código del servidor web de Express.js del laboratorio anterior, pero en tu `package.json` instala `nodemon` como una dependencia de desarrollo (`npm install nodemon --save-dev`).

    - **Modifica el `Dockerfile`:** Cambia el comando `CMD` para que ejecute `nodemon` en lugar de `node`.

    - **Comando de ejecución:**
    
        ```bash
        docker run -d -p 3000:3000 -v "$(pwd):/app" --name dev-app mi-app-web:1.0`
        ```

        > El comando usa un **montaje de enlace** (`-v "$(pwd):/app"`), que vincula el directorio de trabajo actual (`$(pwd)`) en tu máquina al directorio `/app` del contenedor.

2. **Pruebas de Hot Reload:**

    - **Verificación inicial:** Abre tu navegador y visita `http://localhost:3000`. Deberías ver la respuesta inicial de la aplicación.

    - **Realiza un cambio:** Modifica el mensaje de respuesta en el archivo `app.js` en tu editor de código.

    - **Observa el resultado:** Sin detener o reiniciar el contenedor, recarga la página en tu navegador. Deberías ver el nuevo mensaje. Esto demuestra que `nodemon` detectó el cambio en el archivo montado y reinició la aplicación.