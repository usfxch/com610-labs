# Laboratorio 3: Creación de Entornos Multi-Servicio y Persistencia con Docker Compose

## 1. Objetivos del Laboratorio 🎯

Al finalizar este laboratorio, el estudiante será capaz de:

- Comprender la sintaxis de un archivo docker-compose.yml.

- Definir y levantar múltiples servicios con un solo comando.

- Utilizar redes para la comunicación segura entre contenedores.

- Implementar volúmenes para la persistencia de datos y la gestión del código.

- Desplegar un entorno completo de desarrollo con varios servicios interconectados.

## 2. Requisitos ⚙️

- Un sistema operativo con **Docker Desktop** o **Docker Engine** y **Docker Compose** instalado.

- Un editor de texto o un IDE (como Visual Studio Code).

- Acceso a la línea de comandos o terminal (instalar [Warp desde aquí](https://app.warp.dev/referral/3DY6RJ)). 

- Archivos del proyecto web del Laboratorio 2.1 (CRUD con Express.js o Flask).

## 3. Ejercicios 🧪

Estos ejercicios te familiarizarán con los componentes principales de docker-compose.yml de manera gradual.

### Ejercicio 3.1: Aplicación Web Simple con un Contenedor (Nginx)

Este es el caso más sencillo, donde solo tienes un servicio web.

**`docker-compose.yml`:**

```yaml
services:
  web:
    image: nginx:latest
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html:ro
```

**Explicación:**

  * `services`: Define los servicios que componen la aplicación.
  * `web`: Define un servicio llamado `web`.
      * `image: nginx:latest`: Utiliza la última imagen oficial de Nginx desde Docker Hub.
      * `ports: - "8080:80"`: Mapea el puerto 80 del contenedor al puerto 8080 de la máquina host.
      * `volumes: - ./html:/usr/share/nginx/html:ro`: Monta un directorio local `./html` en el directorio `/usr/share/nginx/html` dentro del contenedor (donde Nginx sirve los archivos web). `:ro` indica que el montaje es de solo lectura desde el contenedor.

**Uso:**

1.  Crea un directorio llamado `html` en el mismo lugar que tu `docker-compose.yml`.
2.  Dentro de `html`, crea un archivo `index.html` con algún contenido.
3.  Ejecuta:
    ```bash
    docker compose up -d
    ``` 
    > Esto en el directorio donde está `docker-compose.yml`.
4.  Abre tu navegador y ve a `http://localhost:8080`. Deberías ver el contenido de tu `index.html`.
5.  Para detener y eliminar los contenedores, ejecuta:
    ```bash
    docker compose down
    ```

### Ejercicio 3.2: Balanceador de Carga con Nginx y Proxy Inverso con Docker Compose

Este ejemplo configura un balanceador de carga Nginx frente a 3 contenedores que simulan aplicaciones web. Uno de los contenedores Nginx actuará como el balanceador de carga y proxy inverso.

**Estructura del Proyecto:**

```
load-balancer-nginx/
├── docker-compose.yml
├── nginx.conf         # Configuración del balanceador de carga
└── html/              # Contenido web para las aplicaciones backend
    ├── app1.html
    ├── app2.html
    └── app3.html
```

**1. Contenido de los archivos `html/app*.html` (Simulación de aplicaciones backend):**

**`html/app1.html`:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Aplicación 1</title>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
</head>
<body>
    <h1>¡Hola desde la Aplicación 1!</h1>
</body>
</html>
```

**`html/app2.html`:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Aplicación 2</title>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
</head>
<body>
    <h1>¡Saludos desde la Aplicación 2!</h1>
</body>
</html>
```

**`html/app3.html`:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Aplicación 3</title>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
</head>
<body>
    <h1>¡Bienvenidos a la Aplicación 3!</h1>
</body>
</html>
```

**2. Contenido del archivo `nginx.conf` (Configuración del Balanceador de Carga):**

```nginx
upstream backend {
    server app1:80;
    server app2:80;
    server app3:80;
}

server {
    listen 80;
    server_name loadbalancer;

    location / {
        proxy_pass http://backend;
    }
}
```

**Explicación de `nginx.conf`:**

  * `upstream backend { ... }`: Define un grupo de servidores upstream llamado `backend`. Aquí se listan los nombres de los servicios de las aplicaciones web (que Docker Compose resolverá a las direcciones IP de los contenedores).
  * `server { ... }`: Define un servidor virtual que escucha en el puerto 80.
  * `location / { ... }`: Configura cómo se manejan las peticiones a la ruta raíz (`/`).
  * `proxy_pass http://backend;`: Envía las peticiones al grupo de servidores upstream `backend`. Nginx actuará como un balanceador de carga, distribuyendo las peticiones entre los servidores definidos en `upstream backend` (por defecto, utiliza un algoritmo round-robin).

**3. Contenido del archivo `docker-compose.yml`:**

```yaml
services:
  loadbalancer:
    image: nginx:latest
    ports:
      - "8080:80"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - app1
      - app2
      - app3
    networks:
      - app-network
  app1:
    image: nginx:latest
    volumes:
      - ./html/app1.html:/usr/share/nginx/html/index.html:ro
    networks:
      - app-network
  app2:
    image: nginx:latest
    volumes:
      - ./html/app2.html:/usr/share/nginx/html/index.html:ro
    networks:
      - app-network
  app3:
    image: nginx:latest
    volumes:
      - ./html/app3.html:/usr/share/nginx/html/index.html:ro
    networks:
      - app-network
networks:
  app-network:
```

**Explicación del `docker-compose.yml`:**

  * `services:`: Define los servicios.
      * `loadbalancer`:
          * `image: nginx:latest`: Utiliza la imagen de Nginx.
          * `ports: - "8080:80"`: Expone el puerto 80 del balanceador de carga al puerto 8080 de la máquina host.
          * `volumes: - ./nginx.conf:/etc/nginx/conf.d/default.conf`: Monta tu archivo de configuración `nginx.conf` en la ubicación donde Nginx lee su configuración por defecto dentro del contenedor.
          * `depends_on`: Asegura que las aplicaciones backend (`app1`, `app2`, `app3`) estén iniciadas antes del balanceador de carga.
          * `networks: - app-network`: Conecta el balanceador de carga a la red `app-network`.
      * `app1`, `app2`, `app3`:
          * `image: nginx:latest`: Utilizan también la imagen de Nginx para simular aplicaciones web.
          * `volumes`: Montan los archivos HTML específicos de cada aplicación como el archivo `index.html` que Nginx sirve por defecto. `:ro` indica que el montaje es de solo lectura.
          * `networks: - app-network`: Conectan cada aplicación a la red `app-network`.
  * `networks:`: Define una red personalizada llamada `app-network` para que todos los contenedores puedan comunicarse entre sí por sus nombres de servicio.

**Uso:**

1.  Crea la estructura de carpetas y los archivos como se indicó.
2.  Asegúrate de que los contenidos de los archivos sean correctos.
3.  Abre tu terminal o línea de comandos, navega a la carpeta `load-balancer-nginx`.
4.  Ejecuta:

    ```bash
    docker compose up -d
    ```

**Verificación:**

1.  Abre tu navegador web y ve a `http://localhost:8080`.
2.  Recarga la página varias veces. Deberías ver que el contenido cambia entre "¡Hola desde la Aplicación 1!", "¡Saludos desde la Aplicación 2!" y "¡Bienvenidos a la Aplicación 3!". Esto demuestra que el balanceador de carga Nginx está distribuyendo las peticiones entre los tres contenedores de la aplicación backend.

**Explicación del Proxy Inverso:**

En esta configuración, el contenedor `loadbalancer` que ejecuta Nginx actúa como un **proxy inverso**. Recibe todas las peticiones de los clientes (tu navegador) y las reenvía a los servidores backend (`app1`, `app2`, `app3`) según la configuración del balanceo de carga. Los clientes no interactúan directamente con las aplicaciones backend; solo se comunican con el proxy inverso.

Este ejemplo básico muestra cómo configurar un balanceador de carga con Nginx utilizando Docker Compose. En un escenario real, tus aplicaciones backend serían contenedores con tu código de aplicación real (Express.js, Python/Flask, etc.). La configuración del `upstream` en `nginx.conf` dirigiría el tráfico a esos contenedores. **Ahora como práctica, modifica el `docker-compose.yml` y `nginx.conf` para añadir un contenedor más (`app4`) y balancear las peticiones también a éste.**


### Ejercicio 3.3: Aplicación Web con Base de Datos (WordPress y MySQL)

Este es un ejemplo clásico de una aplicación web que depende de una base de datos.

**`docker-compose.yml`:**

```yaml
services:
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: password123
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: password123
    volumes:
      - db_data:/var/lib/mysql
    ports:
      - "3306:3306" # ¡Cuidado en producción! Exponer el puerto directamente no es seguro.
  wordpress:
    depends_on:
      - db
    image: wordpress
    restart: always
    ports:
      - "8080:80"
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_NAME: wordpress
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: password123
volumes:
  db_data:
```

**Explicación:**

  * Se definen dos servicios: `wordpress` y `db` (MySQL).
  * `wordpress`: Utiliza la imagen de WordPress y depende del servicio `db` (asegurando que MySQL se inicie primero). Se configuran las variables de entorno para conectar WordPress a la base de datos MySQL (usando el nombre del servicio `db` como hostname).
  * `db`: Configura la imagen de MySQL y las variables de entorno para la base de datos. Se crea un volumen con nombre (`db_data`) para persistir los datos de la base de datos.
  * `volumes:`: Define los volúmenes con nombre utilizados por los servicios.

**Uso:**

1.  Guarda este contenido como `docker-compose.yml`.
2.  Ejecuta:

    ```bash
    docker compose up -d
    ```

3.  Abre tu navegador y ve a `http://localhost:8080`. Deberías ver la pantalla de instalación de WordPress.
4.  Para detener y eliminar los contenedores y volúmenes, ejecuta:

    ```bash
    docker compose down -v
    ```

### Ejercicio 3.4: Múltiples Instancias de un Servicio (Escalado)

Docker Compose permite escalar servicios fácilmente.

**`docker-compose.yml`:**

```yaml
services:
  web:
    image: nginx:latest
```

**Uso:**

1.  Guarda este contenido como `docker-compose.yml`.
2.  Ejecuta:
    ```bash
    docker compose up -d --scale web=3
    ```
    
    > Esto iniciará 3 contenedores del servicio `web`.

3.  Puedes verificar los contenedores en ejecución con:
    ```bash
    docker ps
    ```

4.  Para escalar hacia abajo, usa:
    ```bash
    docker compose scale web=1
    ```

### Ejercicio 3.5: Aplicación en NodeJS conectandose a MongoDB

```bash
docker compose up -d
```

```bash
docker compose down
```

### Ejercicio 3.6: Aplicación en NodeJS conectandose a MySQL

```bash
docker compose up -d
```

```bash
docker compose down
```

### 4. Prácticas Individuales 💻

#### Práctica 1: CRUD con Persistencia y Hot Reload

**Objetivo**

Refactorizar el proyecto CRUD del Laboratorio 2.1 para que, en lugar de almacenar datos en memoria, los persista en una base de datos. Además, configura el entorno para que soporte "hot reload", optimizando el flujo de trabajo de desarrollo.

**Instrucciones:**

1. **Configuración del Proyecto:**

    - En la carpeta de tu proyecto CRUD (con Express.js o Flask), asegúrate de que tu `Dockerfile` instale y use `nodemon` o una herramienta similar para el "hot reload" en el entorno de desarrollo.
    - Crea dos archivos `docker-compose`:

        - `docker-compose.yml` (para **Producción**): Contendrá la configuración para un entorno de despliegue, sin `hot reload` y con volúmenes de datos.

        - `docker-compose.dev.yml` (para **Desarrollo**): Extenderá el archivo de producción y agregará los montajes de enlace (`bind mounts`) para el `hot reload`.

2. **Archivos de Composición:**

    - `docker-compose.yml` (**Producción**):

        - Define los servicios `api` y `db`.

        - El servicio `api` debe usar la clave `build: .`.

        - El servicio `db` debe usar un volumen con nombre para persistir los datos.

        - Configura las variables de entorno de conexión para ambos servicios.

    - `docker-compose.dev.yml` (**Desarrollo**):

        - Utiliza la clave `extends` o `include` (depende de la versión de Docker Compose) para heredar la configuración del archivo de producción.

        - En el servicio `api`, añade la clave `volumes` para crear un montaje de enlace que vincule tu directorio local con el directorio de la aplicación dentro del contenedor (ej., `- ./app:/app`).

        - Asegúrate de que los puertos estén configurados para acceder a la API.

3. **Implementación del CRUD:**

    - Modifica tu código de aplicación para que cada operación (Crear, Leer, Actualizar, Borrar) interactúe con la base de datos en lugar de la lista en memoria.

4. **Ejecución y Verificación:**

    - Para **desarrollo**, levanta el entorno con: `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build`. Realiza un cambio en tu código y verifica que se refleje automáticamente.

    - Para **producción**, levanta el entorno simplemente con: `docker-compose up -d --build`.

    - Usa una herramienta como Postman para probar los endpoints del CRUD.

    - Detén el entorno con `docker-compose down`.


#### Práctica 2: Despliegue de un Blog con Doble Volumen

**Objetivo**

Desplegar un entorno de blog funcional, utilizando WordPress y MySQL como servicios interconectados, con dos volúmenes separados: uno para la base de datos y otro para la información de WordPress.

**Instrucciones**

1. **Configuración del `docker-compose.yml`**:

    - Crea un nuevo archivo `docker-compose.yml` en una carpeta vacía.

2. **Definición de Servicios y Volúmenes:**

    - Define un servicio `db` con la imagen de `mysql:latest`.

    - Define un servicio `wordpress` con la imagen de `wordpress:latest`.

    - En la sección `volumes` del archivo, define dos volúmenes con nombre: `db_data` y `wordpress_data`.

3. **Conexión y Persistencia:**

    - Monta el volumen `db_data` en el servicio `db` en su directorio de datos.

    - Monta el volumen `wordpress_data` en el servicio `wordpress` en la ruta `/var/www/html`. Este volumen guardará temas, plugins e imágenes subidas.

    - Asegúrate de que la configuración de red y las variables de entorno para ambos servicios estén correctas, permitiendo que se comuniquen entre sí.

4. **Ejecución y Verificación:**

    - Levanta el entorno con `docker-compose up -d`.

    - Accede a la URL de WordPress, completa la configuración y crea una entrada de blog y sube una imagen.

    - Detén y elimina los contenedores.

    - Levanta el entorno nuevamente con los mismos volúmenes y verifica que tanto la entrada del blog como la imagen subida persistan.