# Laboratorio 2.1: Creación de una Imagen Docker para una Aplicación

## Objetivos del Laboratorio 🎯

Al finalizar este laboratorio, el estudiante será capaz de:

- Comprender y aplicar los comandos del **Docker CLI** para la gestión básica de imágenes y contenedores.

- Crear un `Dockerfile` para empaquetar una aplicación web.

- Construir una imagen a partir de un `Dockerfile`, entendiendo cómo se construyen sus capas.

- Ejecutar un contenedor a partir de una imagen y depurar problemas de ejecución.

## Requisitos ⚙️

- Un sistema operativo con **Docker Desktop** o **Docker Engine** instalado y funcionando.

- Un editor de texto o un IDE (como Visual Studio Code).

- Acceso a la línea de comandos o terminal (instalar [Warp desde aquí](https://app.warp.dev/referral/3DY6RJ)). 

- Un proyecto de aplicación web simple (se proporciona un ejemplo).

## Ejercicios 🧪

Estos ejercicios están diseñados para que te familiarices con los comandos de Docker de forma gradual y práctica.

### **Ejercicio 1: Gestión de Imágenes y Contenedores**

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

