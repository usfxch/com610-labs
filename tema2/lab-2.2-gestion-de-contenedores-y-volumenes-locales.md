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
        docker run -d -v datos-mysql:/var/lib/mysql --name mi-db mariadb
        ```
        > Inicia un contenedor de MariaDB y monta el volumen `datos-mysql` en la ruta interna donde la base de datos almacena sus datos (`/var/lib/mysql`).

3. **Verificación de la Persistencia:**

    - **Ingresa al contenedor:**
        ```bash
        docker exec -it mi-db bash
        ```

    - Una vez dentro, crea una base de datos o tabla de prueba. Sal de la terminal con `exit`.

    - **Detén y elimina el contenedor:**
        ```bash
        docker stop mi-db && docker rm mi-db
        ```

    - **Inicia un nuevo contenedor con el mismo volumen:**
        ```bash
        docker run -d -v datos-mysql:/var/lib/mysql --name nueva-db mariadb
        ```

    - **Verifica:** Accede a la nueva terminal y comprueba que la base de datos o tabla de prueba aún exista.