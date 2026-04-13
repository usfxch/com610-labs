# Laboratorio 4.1: Instancias Computacionales, Acceso Seguro y Bases de Datos Gestionadas (EC2, RDS y Lightsail) 💻

## 1. Objetivos del Laboratorio 🎯

Al finalizar este laboratorio, el estudiante será capaz de:

- Comprender y aplicar el concepto de **Cómputo en la Nube** a través de Amazon **EC2** y **Amazon Lightsail**, diferenciando sus casos de uso.

- Dominar la creación y el uso de **Pares de Claves (Key Pairs)** para establecer una conexión **SSH** segura.

- Implementar la seguridad de red básica configurando **Grupos de Seguridad** y **Reglas de Firewall** bajo el **Principio de Mínimo Privilegio**.

- Desplegar una **Base de Datos Gestionada (Amazon RDS)**, validando sus beneficios de automatización.

- Desplegar una **API CRUD** completa para simular un entorno de aplicación real, conectándola a los servicios de base de datos.
- Utilizar un framework moderno para el API, documentarlo con **Swagger** y asegurar el acceso con **HTTPS**.

## 2. Requisitos ⚙️

- Tener una cuenta activa de **Amazon Web Services (AWS)** con acceso a los servicios de Nivel Gratuito (Free Tier).

- Tener instalado un cliente SSH en la máquina local (ej. [Warp](https://app.warp.dev/referral/3DY6RJ)).

- Tener instalado **Node.js** y un editor de código para poder trabajar con frameworks modernos como **NestJS**.

- Disponer del código fuente de una **API CRUD** funcional (en PHP, Node.js o Python) de laboratorios anteriores, o la capacidad de generar uno nuevo con ayuda de IA.

- Tener instalado **Postman** o una herramienta similar para la prueba de la API.

## 3. Ejercicios 🧪

### Ejercicio 3.1: Lanzamiento y Acceso a una Instancia EC2

1. Lanza una instancia **EC2** de **Tipo** `t2.micro` o `t3.micro` (o equivalente de Free Tier) utilizando una **Amazon Machine Image (AMI)** con un sistema operativo Linux.

2. Durante el lanzamiento, crea un nuevo **Par de Claves** y guarda la llave privada (`.pem`) de forma segura.

3. Crea un **Grupo de Seguridad** que permita el tráfico de **SSH** (puerto 22) **únicamente desde tu dirección IP pública actual**, aplicando el principio de mínimo privilegio.

4. Utiliza el comando **SSH** para conectarte a la instancia de forma segura.

### Ejercicio 3.2: Despliegue de Amazon RDS y Conexión Segura

1. Despliega la base de una **Base de Datos Gestionada (Amazon RDS)** (PostgreSQL) en una configuración de Free Tier.

2. Modifica el **Grupo de Seguridad** de la instancia RDS para que solo acepte conexiones de la **instancia EC2** (usando el ID del Grupo de Seguridad de EC2 como origen), estableciendo un canal de comunicación interno seguro.

3. Desde la instancia EC2 (ya conectada por SSH), instala el cliente de la base de datos correspondiente (ej. `psql`).

4. Establece la conexión a la base de datos RDS utilizando su **Endpoint** y las credenciales definidas. Confirma la conexión exitosa.


### Ejercicio 3.3: Apertura de HTTP/HTTPS y prueba de acceso público en EC2

1. En el **Grupo de Seguridad** de la instancia EC2, agrega reglas para permitir tráfico entrante en **HTTP** (puerto 80) y/o **HTTPS** (puerto 443) desde cualquier dirección IP (`0.0.0.0/0`), aplicando buenas prácticas de seguridad cuando sea necesario.

2. Desde el navegador o Postman, accede a la IP pública de la EC2 para comprobar que la conexión web es aceptada. Si no responde, revisa el estado del servicio web en la instancia y verifica las reglas de seguridad.

3. Captura la IP pública de la instancia y documenta las pruebas básicas de acceso: página de bienvenida, estado 200 o 404, y cualquier mensaje del servidor.

4. Si el docente te asigna un subdominio, pregunta cómo vincularlo a la IP pública y documenta el paso para la entrega.

### Ejercicio 3.4: Despliegue de la API CRUD en EC2 y conexión a Amazon RDS

1. En la instancia **EC2** ya provisionada, instala el runtime necesario para la API CRUD que usarás: **Node.js**, **Python** o **PHP**.

2. Copia el código fuente de la API CRUD al servidor EC2. Usa `scp`, `git clone` o descarga desde tu repositorio/clase.

3. Configura la conexión a la base de datos **Amazon RDS** con el **Endpoint**, el puerto, el nombre de la base de datos y las credenciales. Usa variables de entorno o un archivo de configuración seguro.

4. Inicia la API en la instancia EC2 y realiza una prueba local desde la misma instancia con `curl`, `httpie` o el navegador para verificar que la API responde.

5. Desde tu equipo local, prueba al menos una operación CRUD contra la API desplegada en EC2 y confirma que los datos se persisten correctamente en la base de datos RDS.

### Ejercicio 3.5: Orquestación Simplificada con Amazon Lightsail (OJO: solo estudiantes que tengan habilitado LightSail)

1. Despliega una instancia de cómputo en **Amazon Lightsail** con una distribución Linux base, asegurándote de que tenga una IP pública estática asignada.

2. Crea una instancia de **Base de Datos Gestionada de MySQL** en **Lightsail** y obtén sus credenciales de conexión.

3. Establece las **Reglas de Firewall** en la base de datos de Lightsail para que solo acepte el tráfico desde la IP pública de la instancia de cómputo de Lightsail (Mínimo Privilegio).

4. Desde la terminal de la instancia de cómputo de Lightsail, instala el cliente de base de datos necesario y realiza una **prueba de conexión** exitosa a la base de datos de Lightsail, confirmando la validez de las reglas de firewall.

### 4. Práctica Individual 💻

El estudiante debe desarrollar un API CRUD de una sola entidad utilizando un framework moderno como **NestJS**, **Django REST Framework**, **Spring Boot** u otro equivalente. Puede apoyarse en IA para acelerar el desarrollo, porque el objetivo central es la integración segura en AWS, la documentación con Swagger y la configuración de HTTPS.

1. Selecciona una entidad de dominio con al menos 6 propiedades. Ejemplos:
   - Libros: `título`, `descripción`, `editorial`, `año de publicación`, `autor`, `categoría`.
   - Películas: `título`, `sinopsis`, `director`, `año`, `género`, `clasificación`.
   - Posts: `título`, `contenido`, `autor`, `fecha`, `etiquetas`, `estado`.

2. Configura y habilita **Swagger** (OpenAPI) para documentar y probar todas las rutas del API.

3. Despliega el API en la instancia **EC2** y asegúralo con **HTTPS**. Para esto puedes:
   - solicitar al docente un subdominio y usar **Cloudflare**, o
   - usar un dominio gratuito y configurar certificados con **Let's Encrypt** u otro servicio gratuito.

4. Verifica el API usando **Swagger** desde la ruta HTTPS y prueba al menos una operación CRUD a través de la interfaz Swagger o con **Postman**.

5. Asegúrate de que los datos se persisten correctamente en la base de datos **Amazon RDS**.

6. Documenta el flujo completo: elección de entidad, framework utilizado, cómo se configuró Swagger y qué método se usó para HTTPS.

La práctica se considerará exitosa al presentar la **URL pública HTTPS** de la API y las capturas de pantalla de Swagger o Postman con respuestas exitosas (código 200/201) para las operaciones CRUD.
