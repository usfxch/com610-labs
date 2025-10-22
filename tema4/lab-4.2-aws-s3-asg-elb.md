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


### Ejercicio 3.2: Implementación de Escalado Horizontal

1. Crea una **Plantilla de Lanzamiento (Launch Template)** para la instancia EC2 que incluya un **Script de Usuario** que instale los *runtime* necesarios para tu API (PHP, Node.js o Python) y un servidor web base (Nginx o Apache).

2. Configura un **Elastic Load Balancer (ELB)** de tipo *Application Load Balancer* y un *Target Group* asociado.

3. Crea un **Auto Scaling Group (ASG)** utilizando la plantilla de lanzamiento.

4. Configura el ASG con una capacidad **mínima de 1** instancia y una **máxima de 3** instancias.

5. Adjunta el ASG al *Target Group* del ELB.

6. Verifica que una instancia se lanza correctamente y está registrada en el ELB.


### Ejercicio 3.3: Orquestación Simplificada con Amazon Lightsail

1. Aísla el *frontend* del tráfico externo configurando las reglas del **Grupo de Seguridad del ELB** para solo permitir el tráfico de los puertos **80** y **443**.

2. Configura el **Proxy Inverso (Nginx)** en la plantilla de lanzamiento para que escuche el tráfico HTTP/S y lo enrute a los contenedores de la API (si se usa Docker) o al servicio API local.

3. Configura el **certificado SSL/TLS** en el ELB para manejar el tráfico **HTTPS** (o en el Nginx/servidor web si el ELB es solo HTTP).

4. En el panel de **Cloudflare** o el gestor de DNS (externo), crea un registro **CNAME** o **A** que apunte el **subdominio** (`api-nombreyapellido.dominio.com`) a la **URL DNS del ELB** de AWS.

5. Accede a la URL completa con **HTTPS** y verifica que la conexión es segura y te redirige a tu servicio.

### 4. Práctica Individual 💻

El estudiante debe implementar la API CRUD en esta arquitectura de escalamiento elástico y probar su funcionamiento con alta disponibilidad.

1. **Integración de la API:** Despliega el código de la **API CRUD** en el *script de usuario* de la **Plantilla de Lanzamiento** del ASG, asegurando que se conecte a la instancia de **Amazon RDS** del Laboratorio 4.1.

2. **Prueba de Escalabilidad:**

    - Accede a la **URL HTTPS** del subdominio para realizar una prueba del endpoint READ.

    - Escala manualmente el ASG a **3 réplicas** y espera a que las nuevas instancias se registren en el ELB.

3. **Verificación de Alta Disponibilidad:** Utiliza **Postman** (o herramienta similar) para ejecutar **múltiples peticiones (ej., 100)** en bucle contra el endpoint `CREATE` o `UPDATE` de la API a través del subdominio, demostrando que todas las réplicas responden y los datos se persisten correctamente en RDS.

El resultado final es una aplicación **elástica y segura**, probada y accesible a través de un dominio con **HTTPS**. La evidencia debe incluir capturas de pantalla de la **colección de Postman** y el panel del **ASG** con 3 instancias funcionando.