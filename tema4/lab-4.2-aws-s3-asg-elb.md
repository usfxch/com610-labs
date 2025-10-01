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

### Ejercicio 3.1: Gestión de Almacenamiento con Amazon S3 y AWS CLI

1. Crea un nuevo **Bucket de S3** con un nombre único a nivel global.

2. Utiliza el **AWS CLI** para subir un archivo al bucket.

3. Utiliza la **AWS CLI** para cambiar la **Clase de Almacenamiento** del objeto subido de **Standard** a **Standard-IA (Infrequent Access)**, justificando este cambio desde la perspectiva de costos.

4. Crea un script de terminal simple utilizando el AWS CLI para listar el contenido del bucket.

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