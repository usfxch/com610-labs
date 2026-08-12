# Laboratorio 4.1: Instancias Computacionales, Acceso Seguro y Bases de Datos Gestionadas (EC2 y RDS) 💻

## 1. Objetivos del Laboratorio 🎯

Al finalizar este laboratorio, el estudiante será capaz de:

- Crear y administrar una instancia **Amazon EC2** con Linux.
- Utilizar un **Par de Claves (Key Pair)** para establecer una conexión SSH segura.
- Configurar **Grupos de Seguridad** para publicar una aplicación web por los puertos 80 y 443 sin exponer puertos innecesarios.
- Configurar la comunicación privada entre una instancia EC2 y una base de datos **Amazon RDS** mediante grupos de seguridad.
- Desplegar una API REST con Node.js en EC2 y conectarla a una base de datos MySQL/MariaDB en RDS.
- Publicar la API mediante un subdominio asignado por el docente y habilitar el acceso HTTPS.

## 2. Requisitos ⚙️

- Tener una cuenta activa de **Amazon Web Services (AWS)** con acceso a Amazon EC2, Amazon RDS y Amazon VPC.
- Tener instalado un cliente SSH en la máquina local (por ejemplo, [Warp](https://app.warp.dev/referral/3DY6RJ), OpenSSH o Windows Terminal).
- Tener instalado **Git**, **Node.js 18 o superior** y un cliente para probar APIs, como Postman o `curl`.
- Tener acceso al subdominio de Cloudflare que será asignado por el docente.
- Conocer la dirección IP pública desde la que se realizará la conexión SSH.

> **Advertencia:** No guardes contraseñas reales en el repositorio ni las incluyas en capturas de pantalla. Utiliza valores ficticios en la documentación que entregarás.

## 3. Ejercicios 🧪

### Ejercicio 3.1: Lanzamiento y acceso a una instancia EC2

1. En la consola de AWS, ingresa a **EC2 > Instancias** y lanza una instancia utilizando una AMI Linux, por ejemplo Ubuntu Server LTS. Selecciona una clase elegible para la capa gratuita, como `t2.micro` o `t3.micro`, según la disponibilidad de tu cuenta y región.

2. Durante el lanzamiento, crea un **Par de Claves** y descarga el archivo privado `.pem`. Guárdalo fuera del repositorio y establece sus permisos:

   ```bash
   chmod 400 nombre-de-la-clave.pem
   ```

3. Crea un grupo de seguridad para la instancia, por ejemplo `ec2-api-sg`. En este ejercicio configura inicialmente la regla de entrada SSH:

   | Tipo | Puerto | Origen |
   |---|---:|---|
   | SSH | 22 | Mi IP (`IP_PUBLICA/32`) |

4. Copia la **IP pública** o el **DNS público** de la instancia y conéctate. En Ubuntu, el usuario suele ser `ubuntu`:

   ```bash
   ssh -i nombre-de-la-clave.pem ubuntu@IP_PUBLICA
   ```

5. Comprueba que la instancia está operativa:

   ```bash
   hostname
   cat /etc/os-release
   ```

> **Nota:** La IP pública asignada automáticamente puede cambiar al detener e iniciar la instancia. Para mantener estable el destino del subdominio, solicita o asigna una **Elastic IP** y utilízala como IP pública de la instancia.

### Ejercicio 3.2: Configuración del grupo de seguridad para HTTP y HTTPS

Completa el grupo `ec2-api-sg` para permitir únicamente el tráfico web necesario:

1. En **EC2 > Grupos de seguridad > ec2-api-sg > Reglas de entrada**, agrega las siguientes reglas:

   | Tipo | Protocolo | Puerto | Origen IPv4 | Origen IPv6 |
   |---|---|---:|---|---|
   | HTTP | TCP | 80 | `0.0.0.0/0` | `::/0` |
   | HTTPS | TCP | 443 | `0.0.0.0/0` | `::/0` |

2. Conserva la regla SSH limitada a `IP_PUBLICA/32`. No agregues reglas de entrada para los puertos 3000 de Node.js ni 3306 de MySQL/MariaDB: la API se publicará mediante un proxy inverso y la base de datos solo aceptará conexiones desde EC2.

3. Verifica que las reglas de salida permitan a la instancia descargar actualizaciones y conectarse al endpoint de RDS. La configuración de salida predeterminada suele permitir todo el tráfico; si fue modificada, habilita al menos HTTPS (443), DNS (53) y el puerto 3306 hacia la red de la base de datos.

4. Para comprobar la apertura web, instala Nginx y consulta la IP pública:

   ```bash
   sudo apt update
   sudo apt install -y nginx
   sudo systemctl enable --now nginx
   curl -I http://localhost
   ```

   Desde tu equipo local, visita `http://IP_PUBLICA`. La respuesta esperada es la página predeterminada de Nginx o un código HTTP `200`.

### Ejercicio 3.3: Creación de RDS y comunicación segura con EC2

1. Crea una base de datos **Amazon RDS for MariaDB** o **Amazon RDS for MySQL**, utilizando una clase elegible para la capa gratuita. Configura una base de datos inicial llamada `db_apimovies`.

2. Coloca RDS y EC2 en la misma **VPC**. En RDS selecciona **No** en *Acceso público* siempre que la práctica pueda realizarse a través de EC2.

3. Crea un grupo de seguridad separado para RDS, por ejemplo `rds-movies-sg`. Configura esta única regla de entrada:

   | Tipo | Puerto | Origen |
   |---|---:|---|
   | MySQL/Aurora | 3306 | Grupo `ec2-api-sg` (ID `sg-...`) |

   No utilices `0.0.0.0/0` como origen del puerto 3306. El origen debe ser el ID del grupo de seguridad de EC2, no la IP pública de la instancia.

4. Asocia `rds-movies-sg` a la instancia RDS. En el grupo `ec2-api-sg` no es necesario abrir el puerto 3306 como regla de entrada.

5. Desde la instancia EC2 instala el cliente y prueba la conexión usando el endpoint de RDS:

   ```bash
   sudo apt update
   sudo apt install -y mariadb-client
   mariadb -h ENDPOINT_RDS -P 3306 -u admin -p
   ```

6. Dentro del cliente SQL, crea la base de datos y un usuario exclusivo para la API. Sustituye los valores de ejemplo por una contraseña segura:

   ```sql
   CREATE DATABASE IF NOT EXISTS db_apimovies
     CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

   CREATE USER 'usr_movies'@'%' IDENTIFIED BY 'CAMBIAR_ESTA_CONTRASENA';
   GRANT ALL PRIVILEGES ON db_apimovies.* TO 'usr_movies'@'%';
   FLUSH PRIVILEGES;
   ```

7. Comprueba la conectividad desde EC2:

   ```sql
   USE db_apimovies;
   SELECT VERSION();
   ```

> **Resultado esperado:** EC2 se conecta a RDS por el puerto 3306 usando el endpoint privado de la base de datos, pero la base de datos no queda expuesta directamente a Internet.

### Ejercicio 3.4: Clonación y despliegue de la API CRUD Movies

En este ejercicio se utilizará el proyecto [api-restful-crud-movies](https://github.com/marceloquispeortega/api-restful-crud-movies), una API REST desarrollada con Express.js que utiliza `mysql2` para conectarse a MySQL/MariaDB.

1. En la instancia EC2 instala Git y Node.js:

   ```bash
   sudo apt update
   sudo apt install -y git
   # Comprueba que Node.js sea 18 o superior.
   node --version
   npm --version
   ```

   Si la AMI no incluye Node.js o presenta una versión inferior, instala Node.js 18 o superior siguiendo el método recomendado para la distribución Linux utilizada.

2. Clona el proyecto e instala sus dependencias:

   ```bash
   git clone https://github.com/marceloquispeortega/api-restful-crud-movies
   cd api-restful-crud-movies
   npm install
   cp .env.example .env
   nano .env
   ```

3. Configura `.env` con el endpoint y las credenciales de RDS. El archivo debe tener una estructura similar a la siguiente:

   ```dotenv
   PORT=3000
   DB_HOST=ENDPOINT_RDS
   DB_USER=usr_movies
   DB_PASSWORD=CAMBIAR_ESTA_CONTRASENA
   DB_NAME=db_apimovies
   DB_PORT=3306
   ```

   El archivo `.env` no debe publicarse en GitHub. Verifica que esté incluido en `.gitignore`.

4. Desde el cliente de RDS crea la tabla utilizada por la API y algunos registros iniciales:

   ```sql
   USE db_apimovies;

   CREATE TABLE IF NOT EXISTS movies (
     id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(150) NOT NULL UNIQUE,
     year INT
   );

   INSERT IGNORE INTO movies (title, year) VALUES
     ('Inception', 2010),
     ('The Matrix', 1999),
     ('Interstellar', 2014);
   ```

5. Inicia la API y comprueba su funcionamiento desde la propia instancia:

   ```bash
   node app.js
   ```

   En otra sesión SSH ejecuta:

   ```bash
   curl http://localhost:3000/movies
   ```

   Para mantener el proceso activo después de cerrar SSH, puedes utilizar PM2:

   ```bash
   sudo npm install --global pm2
   pm2 start app.js --name movies-api
   pm2 save
   ```

6. Prueba desde tu equipo local una operación de lectura y una operación de escritura usando temporalmente la IP pública y el puerto 80 una vez configurado Nginx. Por ejemplo, la ruta de lectura será `/movies` y las rutas CRUD están documentadas en el README del proyecto.

### Ejercicio 3.5: Subdominio de Cloudflare y acceso HTTPS

El docente asignará un **subdominio en Cloudflare** para cada estudiante. El registro DNS del subdominio debe apuntar a la IP pública estable —preferentemente una Elastic IP— de la instancia EC2. La entrega debe funcionar mediante HTTPS; acceder solo por HTTP no es suficiente.

1. Confirma con el docente el nombre completo del subdominio, por ejemplo `api-nombreapellido.dominio.com`, y verifica que resuelva a la IP pública de EC2:

   ```bash
   nslookup SUBDOMINIO
   ```

2. Copia a la instancia EC2 el **certificado de origen y la clave privada de Cloudflare** proporcionados por el docente. No subas estos archivos al repositorio ni los compartas en capturas de pantalla:

   ```bash
   scp cloudflare-origin.pem ubuntu@IP_PUBLICA:/tmp/
   scp cloudflare-origin.key ubuntu@IP_PUBLICA:/tmp/
   ```

   Desde la instancia, guárdalos en una ubicación protegida:

   ```bash
   sudo mkdir -p /etc/nginx/ssl/cloudflare
   sudo install -m 644 /tmp/cloudflare-origin.pem /etc/nginx/ssl/cloudflare/SUBDOMINIO.pem
   sudo install -m 600 /tmp/cloudflare-origin.key /etc/nginx/ssl/cloudflare/SUBDOMINIO.key
   sudo chown root:root /etc/nginx/ssl/cloudflare/SUBDOMINIO.*
   ```

3. Configura Nginx como proxy inverso para enviar el tráfico del subdominio hacia la API que escucha en `localhost:3000`:

   ```bash
   sudo nano /etc/nginx/sites-available/movies-api
   ```

   Utiliza esta configuración y reemplaza `SUBDOMINIO`:

   ```nginx
   server {
       listen 80;
       listen [::]:80;
       server_name SUBDOMINIO;

       return 301 https://$host$request_uri;
   }

   server {
       listen 443 ssl;
       listen [::]:443 ssl;
       server_name SUBDOMINIO;

       ssl_certificate /etc/nginx/ssl/cloudflare/SUBDOMINIO.pem;
       ssl_certificate_key /etc/nginx/ssl/cloudflare/SUBDOMINIO.key;
       ssl_protocols TLSv1.2 TLSv1.3;

       location / {
           proxy_pass http://127.0.0.1:3000;
           proxy_http_version 1.1;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

   Activa el sitio y verifica la configuración:

   ```bash
   sudo ln -s /etc/nginx/sites-available/movies-api /etc/nginx/sites-enabled/movies-api
   sudo nginx -t
   sudo systemctl reload nginx
   curl -i https://SUBDOMINIO/movies
   ```

4. En Cloudflare, verifica que el registro DNS del subdominio esté **proxificado** (nube naranja) y configura **SSL/TLS > Modo de cifrado** como **Full (strict)**. El certificado y la clave proporcionados por el docente permiten cifrar la conexión entre Cloudflare y Nginx en EC2.

5. Verifica el resultado desde tu equipo local:

   ```bash
   curl -I https://SUBDOMINIO/movies
   ```

   Abre también `https://SUBDOMINIO/movies` en el navegador y captura una respuesta exitosa de la API. Comprueba que el certificado corresponda al subdominio y que el navegador no muestre advertencias de seguridad.

## 4. Práctica Individual 💻

Amplía el despliegue guiado realizando las siguientes actividades:

1. Implementa una nueva entidad CRUD en una API propia o amplía la entidad `movies` con validaciones adicionales.
2. Despliega la aplicación en la misma instancia EC2, manteniendo la base de datos en Amazon RDS y evitando exponer directamente los puertos 3000 y 3306.
3. Configura el subdominio asignado por el docente para acceder a todas las rutas mediante HTTPS.
4. Documenta las rutas con Swagger/OpenAPI o presenta una colección de Postman con las operaciones CRUD.
5. Presenta evidencias de:
   - Las reglas de entrada del grupo de seguridad EC2 para SSH, HTTP y HTTPS.
   - La regla del grupo de seguridad RDS que permite MySQL/MariaDB (3306) únicamente desde el grupo de EC2.
   - La conexión exitosa entre EC2 y RDS.
   - La URL HTTPS del subdominio y el certificado válido.
   - Operaciones CRUD exitosas, con persistencia comprobada en RDS.

La práctica se considerará exitosa cuando la API esté disponible mediante la URL pública HTTPS asignada y los datos creados, consultados, actualizados y eliminados se almacenen correctamente en Amazon RDS.
