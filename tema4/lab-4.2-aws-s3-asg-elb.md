# Laboratorio 4.2: Almacenamiento, Elasticidad y Escalado Automático (S3, ASG y ELB) 📈

## 1. Objetivos del Laboratorio 🎯

Al finalizar este laboratorio, el estudiante será capaz de:

- Comprender y aplicar la **Durabilidad Extrema** y las **Clases de Almacenamiento** con Amazon **S3**.

- Aplicar el concepto de **Escalamiento Horizontal** y la **Elasticidad** mediante la configuración de un **Auto Scaling Group (ASG)** y un **Elastic Load Balancer (ELB)**.

- Configurar un **Proxy Inverso (Nginx)** para gestionar el tráfico HTTPS y el enrutamiento.

- Integrar un **subdominio** (gestionado externamente) con el **ELB** de AWS para el acceso público.

- Demostrar la **alta disponibilidad y el escalamiento** de una **API CRUD** en un entorno de producción simulado.

## 2. Requisitos ⚙️

- Tener acceso al **AWS CLI** configurado.

- Disponer de permisos **IAM** para interactuar con EC2, S3, ASG, ELB y Route 53 (si se usa).

- Un **subdominio** funcional proporcionado por el docente (ej., **api-nombreyapellido.dominio.com**) y acceso a su configuración de **Cloudflare** o DNS.

- Un certificado **SSL/TLS** válido (puede ser autofirmado o generado con ACM para la práctica, si aplica).

- El código fuente de la **API CRUD** funcional.

## 3. Ejercicios 🧪

### Ejercicio 3.1: Gestión de Almacenamiento con Amazon S3 y AWS IAM y creación de un CDN con CloudFront

1. Crea un nuevo **Bucket de S3** con un nombre único a nivel global.

    Ingresa a **Amazon S3**,  luego haz clic en **Crear bucket**.

    - En **Configuración general** selecciona:

        ![Configuración general](./img/lab42_configuracion_general.png)

        - Tipo de bucket: **Uso general**
        - Nombre del bucket: `usfx-com610-s3-demo-1234567`. Donde `1234567` sea tu documento de identidad.


    - En **Propiedad de objetos** selecciona:

        ![Propiedad de objetos](./img/lab42_propiedades_del_objeto.png)

        - Propiedad del objeto: **ACL deshabilitadas (Recomendado)**

    - En **Configuración de bloqueo de acceso público para este bucket** dejar marcado **Bloquear todo el acceso público**.

    - En **Control de versiones de buckets** mantener en **Desactivar** la opción **Control de versiones de buckets**

    - En **Etiquetas** si deseas agregas las que quieras haciendo referencia al uso que le darás al Bucket.

    - En **Cifrado predeterminado** se mantiene el **Tipo de cifrado** por defecto y en **Clave de bucket** también el por defecto.

    - Por último, haz clic en el botón **Crear bucket**.


2. Utiliza **AWS IAM** para configurar el acceso al bucket.
    
    Ingresa a **Personas** y haz clic en **Crear persona**.

    - **Paso 1: Especificar los detalles de la persona**
        
        - En **Nombre de usuario** introduce `user-s3-demo` y haz clic en **Siguiente**.

    - **Paso 2: Establecer permisos**

        - En **Opciones de permisos** selecciona **Adjuntar políticas directamente**.

            ![Opciones de permisos](./img/lab42_opciones_de_permisos.png)

        - En **Políticas de permisos** busca `amazons3` y selecciona la política **AmazonS3FullAccess** y haz clic en **Siguiente**. OJO: esto lo haremos solo para efectos de práctica, luego se recomienda crear un grupo y otorgar políticas específicas, por ejemplo: de lectura y escritura para un específico Bucket.

            ![Políticas de permisos](./img/lab42_politicas_de_permisos.png)

    - **Paso 3: Revisar y crear**

        - Revisa las opciones seleccionadas y todo está bien haz clic en **Crear Persona** para terminar.

3. Ingresa a **AWS CloudFront** para crear una red de distribución de contenido tomando como base el Bucket creado.

    - Una vez en CloudFront haz clic en **Create distribution**.

    - **Paso 1: Get started**

        - En **Distribution options**, introduce como nombre `cdn-s3-demo` y selecciona **Single website or app** en **Distribution type**.

            ![Opciones de distribución](./img/lab42_distribution_options.png)

        - Deja las demás opciones por defecto y haz clic en **Next**.
    
    - **Paso 2: Specify origin**

        - En **Origin type** selecciona **Amazon S3**

            ![alt text](./img/lab42_origin_type.png)  

        - En **Origin** selecciona el Bucket creado y que se utilizará como origen.

            ![alt text](./img/lab42_origin.png)

        - En **Settings** deja las opciones por defecto y haz clic en **Next**.

    - **Paso 3: Enable security**

        - En **Web Application Firewall (WAF)** selecciona **Do not enable security protections** para no habilitar protección con **WAF**.
    
    - **Paso 4: Review and create**

        - Revisa las opciones seleccionadas y todo está bien haz clic en **Create distribution** para terminar. 

4. Sube imágenes al Bucket creado desde **Amazon S3**

    - Ingresa a **AmazonS3**, selecciona el Bucket creado y sube archivos desde la pestaña **Objetos**.

    - Comprueba que los archivos estén disponibles en CDN de CloudFront. Para ello ingresa desde el navegador a la dirección del CDN (copia el Distribution domain name) y añade el nombre del archivo al final.

        ![URL del CDN de CloudFront](./img/lab42_url_cdn.png)
    
        Por ejemplo: ingresar desde el navegador a https://d1yu0fnc4jb9vu.cloudfront.net/sucre1.jpg

5. Subir y acceder a objetos del Bucket desde una aplicación NodeJS en nuestra PC.

    Para subir objetos desde una aplicación a un Bucket de AWS S3 debes crear una clave de acceso para un usuario ingresando a **Personas** de **AWS IAM**, luego seleccionando el usuario y haciendo clic en **Crear clave de acceso**.

    ![Creación de clave de acceso](./img/lab42_clave_de_acceso_usuario.png)

    - **Paso 1: Prácticas recomendadas y alternativas para la clave de acceso**

        - Seleccionar **Servicio de terceros** en **Casos de uso** y hacer clic en **Siguiente**.

            ![Caso de uso de clave de acceso](./img/lab42_caso_de_uso_clave_acceso.png)

    - **Paso 2: Establecer el valor de etiqueta de descripción**

        - Mantiene los valores por defecto y haz clic en **Crear clave de acceso**

    - Paso 3: Recuperar claves de acceso

        -  Copia la **Clave de acceso** y **Clave de acceso secreta** en un lugar seguro

            ![Clave de acceso](./img/lab42_clave_de_acceso.png)

    
    Reemplaza la **Clave de acceso** y **Clave de acceso secreta** en proyecto de NestJS.

    - Clona el proyecto:

        ```bash
        git clone https://github.com/marceloquispeortega/aws-s3-upload-example
        ```
    
    - Instala dependencias del proyecto:

        ```bash
        npm install
        ```

    - Copia el archivo .env.example en .env y añade los valores de las variables de entorno.

        - `AWS_REGION`: región donde está ubicado el Bucket. Por ejemplo: us-east-1
        - `AWS_ACCESS_KEY_ID`: **Clave de acceso** del usuario de AWS IAM
        - `AWS_SECRET_ACCESS_KEY`: **Clave de acceso secreta** del usuario de AWS IAM
        - `AWS_S3_BUCKET_NAME`: nombre único del Bucket
        - `AWS_S3_CDN`: URL del CDN del CloudFront

    - Ejecuta la aplicación:

        ```bash
        npm run start:dev
        ```

    - Con **Postman** crea dos **Requests** para subir archivos y otro para descargar, los endpoints son:

        - `POST` `http://localhost:3000/files/upload`. Enviar el archivo tipo form-data con el key `file`.

            ![Endpoint POST para subir archivos](./img/lab42_endpoint_post_upload.png)

        - `GET` `http://localhost:3000/files/download/<filename>`. Enviar el como `filename` el nombre del archivo.

            ![Endpoint GET para descargar archivos](./img/lab42_endpoint_get_downlad.png)


### Ejercicio 3.2: Implementación de un Balanceador de Carga (ALB)

1. **Crear grupos de seguridad para acceso Web (HTTP, HTTPS) y para acceso remoto (SSH)**

    - Haz clic sobre Crear grupo de seguridad y crea los grupos `web-securitygroup` y `ssh-seguritygroup`. 

        ![alt text](./img/image-9.png)
    
    - Para `web-securitygroup` crea Reglas de salida para HTTP y HTTPS

        ![alt text](./img/image-10.png)

    - Y para `ssh-seguritygroup` crea Reglas de salida para SSH

        ![alt text](./img/image-11.png)

1. **Crea dos nuevas instancias con las siguientes características:**

    - **Nombre y etiquetas**

        - **Nombre:** `alb-server-1` para la primera instancia y `alb-server-2` para la segunda instancia.

    - **Imágenes de aplicaciones y sistemas operativos**
        
        - Selecciona *Inicio rápido* y selecciona **Ubuntu 24.04**.
            ![alt text](image.png)

    - **Tipo de instancia:** `t3.micro` o `t2.micro`. Uno apto para la capa gratuita.

        ![alt text](./img/image-1.png)

    - **Par de claves (inicio de sesión):** Continuar sin un par de claves

        ![alt text](./img/image-2.png)

    - **Configuraciones de red:** 

        - Seleccionar **Seleccionar un grupo de seguridad existente** y selecciona las los grupos de seguridad `web-securitygroup`, `ssh-seguritygroup` y `default`.

            ![alt text](./img/image-12.png)

            > Debes hacer lo mismo para la segunda instancia.

    - **Configurar almacenamiento:** Mantener los valores por defecto

    - **Detalles avanzados**

        Dentro de **Datos de usuario** copiar el siguiente código:

        ```
        #!/bin/bash
        apt update -y
        apt install -y nginx
        systemctl start nginx
        systemctl enable nginx
        echo "<h1>Hola Mundo Server - $(hostname -f) con Nginx</h1>" > /var/www/html/index.nginx-debian.html
        ```

2. Configura un Balanceador de carga de tipo **ALB** (**Application Load Balancer**).

    Haz clic en **Crear balanceador de carga** y luego selecciona **Balanceador de carga de aplicaciones**.

    - **Configuración básica**

        ![alt text](./img/image-4.png)

        - **Nombre del balanceador de carga:** `alb-servers-demo`

        - **Esquema:** Selecciona **Expuesto a Internet**

        - **Tipo de dirección IP del equilibrador de carga:** Selecciona **IPv4**

    - **Mapeo de red**

        - **VPC:** Mantiene el por defecto.

        - **Zonas de disponibilidad y subredes:** Marca todas las zonas de disponibilidad.

    - **Grupos de seguridad:** Selecciona los grupos de seguridad `web-securitygroup` y `default`.

    - **Agentes de escucha y direccionamiento**

        - Haz clic sobre **Cree un grupo de destino** 

            - **Paso 1: Create target group:** Selecciona **Instancias** como tipo de destino, escribe el nombre del grupo, mantiene los valores por defecto y haz clic en **Siguiente**.

                ![alt text](./img/image-5.png)

            - **Paso 2: Registrar destinos:** Selecciona las instancias `alb-server-1` y `alb-server-2` e incluyelas como destino. Y para finalizar haz clic en **Crear un grupo de destino**.

                ![alt text](./img/image-6.png)

        - Selecciona el grupo de destino creado.

            ![alt text](./img/image-7.png)

    - Deja las opciones por defecto y haz clic en **Crear balanceador de carga**.

### Ejercicio 3.3: Implementación de un Escalado Horizontal (ASG y ELB)


### 4. Práctica Individual 💻

El estudiante debe implementar la API CRUD en esta arquitectura de escalamiento elástico y probar su funcionamiento con alta disponibilidad.

1. **Crear la instancia RDS MySQL:**

    Crea una instancia de base de datos MySQL en **Amazon RDS**, configurando los detalles como el motor, la clase de instancia, las credenciales y los grupos de seguridad. Sigue los siguientes pasos:

    - Ingresa a **Aurora and RDS** y haz clic en **Crear una base de datos**

    - En **Elegir un método de creación de base de datos** selecciona **Creación estándar**.

    - En **Opciones del motor** selecciona **MySQL**.

    - En **Plantillas** seleccione **Capa gratuita**.

        ![alt text](image.png)

    - En **Configuración** identifica el nombre de la instancia como `db-api-crud-demo`, el **Nombre de usuario maestro** como `admin`, la **Administración de credenciales** como `Autoadministrado` e introduce la contraseña.

    - En **Configuración de la instancia** selecciona una clase de instancia que esté bajo la **capa gratuita**.

        ![alt text](image-1.png)

    - En **Almacenamiento** deja los valores por defecto.

    - En **Conectividad** deja los valores por defecto a excepción de **Grupo de seguridad de VPC (firewall)**, donde debes crear dos nuevos grupos  grupo con el nombre `db-api-crud-rds-securitygroup` y selecciona una zona de disponibilidad (us-east-1a). 

        ![alt text](image-3.png)

2. **Integración de la API:** Despliega el código de la **API CRUD** como **Plantilla de Lanzamiento**, asegurando que se conecte a la instancia de **Amazon RDS** del Laboratorio 4.1 o del punto anterior.

    - Lanza una nueva instancia **Amazon EC2** dentro de la **capa gratuita** y asegurate que en **Configuraciones de red** se seleccionen los grupos de seguridad para Web (HTTP y HTTPS), acceso remoto (SSH) y crea un grupo de seguridad para conectarse a la instancia RDS de MySQL.

    - Accede a la instancia e realiza los siguientes pasos:

        - Actualizar los repositorios y paquetes:

            ```bash
            sudo apt update && sudo apt upgrade
            ```

        - Instalar **MySQL Client** para probar la conexión con el RDS.

            ```bash
            sudo apt install mysql
            ```

        - Instalar Node.js (instrucciones de [Web oficial de Node.js] (https://nodejs.org/es/download)):

            - Descarga e instala `nvm`:

                ```bash
                curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
                ```

            - En lugar de reiniciar la shell, ejecuta:

                ```bash
                \. "$HOME/.nvm/nvm.sh"
                ```

            - Descarga e instala `Node.js`:

                ```bash
                nvm install 22
                ```
            
            - Verifica la versión de `Node.js`:

                ```bash
                node -v 
                ```
                > Debería mostrar por ejemplo: "v22.21.0".

            - Verifica versión de `npm`:

                ```bash
                npm -v
                ```
                > Debería mostrar por ejemplo: "10.9.4"

        - Instala PM2 (instrucciones de [Web oficial de PM2](https://pm2.keymetrics.io/docs/usage/quick-start/)):

            - Instala el administrador de procesos `PM2` de forma global en tu sistema.

                ```bash
                npm install pm2@latest -g
                ```
            - Verifica la versión de PM2 instalada:

                ```bash
                pm2 --version
                ```
                > Debería mostrar por ejemplo: "6.0.13"

        - Prueba la conexión desde la instancia EC2 hacia el RDS utilizando **MySQL Client**.

            ```bash
            mysql -U admin -h endpoint-del-rds -p
            ```
            > Deberías conectarte sin ningún problema.

        - Clona el proyecto API CRUD Movies

            ```bash
            git clone https://github.com/marceloquispeortega/api-restful-crud-movies
            ```

        - Configura el archivo .env con los datos de acceso y configura el PM2 para configurarlo desde el arranque.

        - Crea la Plantilla de lanzamiento a partir de esta instancia.


2. **Configuración del ASG para que sea escalable:**

    - Configura el ASG con 1 instancia como mínimo, 2 instancias deseadas y 4 como máximo.

    <!-- - Realiza pruebas de estrés en el procesador y con peticiones tipo GET.  -->

    <!-- - Verifica en base a las pruebas de estrés el escalamiento hacia arriba cuando el procesador esté estresado o cuando las peticiones alcancen un techo definido.  -->

    <!-- - Después de las pruebas de estrés verifica que las instancias ya no utilizadas se vuelvan a apagar y retornen a su estado inicial. -->


2. **Prueba de Escalabilidad:**

    - Accede a la **URL HTTPS** del subdominio para realizar una prueba del endpoint READ.

    - Escala manualmente el ASG a **3 réplicas** y espera a que las nuevas instancias se registren en el ELB.

3. **Verificación de Alta Disponibilidad:** 

    - Utiliza **Postman** (o herramienta similar) para ejecutar **múltiples peticiones (ej., 100)** en bucle contra el endpoint `CREATE` o `UPDATE` de la API a través del subdominio, demostrando que todas las réplicas responden y los datos se persisten correctamente en RDS.
    
    - Realiza pruebas de estrés en el procesador y/o a través de peticiones para verificar el escalamiento hacia arriba cuando el procesador esté estresado o cuando las peticiones alcancen un techo definido.

El resultado final es una aplicación **elástica y segura**, probada y accesible a través de un dominio con **HTTPS**. La evidencia debe incluir capturas de pantalla de la **colección de Postman** y el panel del **ASG** con 3 instancias funcionando.