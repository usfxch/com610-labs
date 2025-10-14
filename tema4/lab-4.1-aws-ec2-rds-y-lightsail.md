# Laboratorio 4.1: Instancias Computacionales, Acceso Seguro y Bases de Datos Gestionadas (EC2, RDS y Lightsail) 💻

## 1. Objetivos del Laboratorio 🎯

Al finalizar este laboratorio, el estudiante será capaz de:

- Comprender y aplicar el concepto de **Cómputo en la Nube** a través de Amazon **EC2** y **Amazon Lightsail**, diferenciando sus casos de uso.

- Dominar la creación y el uso de **Pares de Claves (Key Pairs)** para establecer una conexión **SSH** segura.

- Implementar la seguridad de red básica configurando **Grupos de Seguridad** y **Reglas de Firewall** bajo el **Principio de Mínimo Privilegio**.

- Desplegar una **Base de Datos Gestionada (Amazon RDS)**, validando sus beneficios de automatización.

- Desplegar una **API CRUD** completa para simular un entorno de aplicación real, conectándola a los servicios de base de datos.

## 2. Requisitos ⚙️

- Tener una cuenta activa de **Amazon Web Services (AWS)** con acceso a los servicios de Nivel Gratuito (Free Tier).

- Tener instalado un cliente SSH en la máquina local (ej. [Warp](https://app.warp.dev/referral/3DY6RJ)).

- Disponer del código fuente de una **API CRUD** funcional (en PHP, Node.js o Python) de laboratorios anteriores.

- Tener instalado **Postman** o una herramienta similar para la prueba de la API.

## 3. Ejercicios 🧪

### Ejercicio 3.1: Lanzamiento y Acceso a una Instancia EC2

1. Lanza una instancia **EC2** de **Tipo** `t2.micro` (o equivalente de Free Tier) utilizando una **Amazon Machine Image (AMI)** con un sistema operativo Linux.

2. Durante el lanzamiento, crea un nuevo **Par de Claves** y guarda la llave privada (`.pem`) de forma segura.

3. Crea un **Grupo de Seguridad** que permita el tráfico de **SSH** (puerto 22) **únicamente desde tu dirección IP pública actual**, aplicando el principio de mínimo privilegio.

4. Utiliza el comando **SSH** para conectarte a la instancia de forma segura.

### Ejercicio 3.2: Despliegue de Amazon RDS y Conexión Segura

1. Despliega la base de una **Base de Datos Gestionada (Amazon RDS)** (PostgreSQL) en una configuración de Free Tier.

2. Modifica el **Grupo de Seguridad** de la instancia RDS para que solo acepte conexiones de la **instancia EC2** (usando el ID del Grupo de Seguridad de EC2 como origen), estableciendo un canal de comunicación interno seguro.

3. Desde la instancia EC2 (ya conectada por SSH), instala el cliente de la base de datos correspondiente (ej. `psql`).

4. Establece la conexión a la base de datos RDS utilizando su **Endpoint** y las credenciales definidas. Confirma la conexión exitosa.


### Ejercicio 3.3: Orquestación Simplificada con Amazon Lightsail (OJO: solo estudiantes que tengan habilitado LightSail)

1. Despliega una instancia de cómputo en **Amazon Lightsail** con una distribución Linux base, asegurándote de que tenga una IP pública estática asignada.

2. Crea una instancia de **Base de Datos Gestionada de MySQL** en **Lightsail** y obtén sus credenciales de conexión.

3. Establece las **Reglas de Firewall** en la base de datos de Lightsail para que solo acepte el tráfico desde la IP pública de la instancia de cómputo de Lightsail (Mínimo Privilegio).

4. Desde la terminal de la instancia de cómputo de Lightsail, instala el cliente de base de datos necesario y realiza una **prueba de conexión** exitosa a la base de datos de Lightsail, confirmando la validez de las reglas de firewall.

### 4. Práctica Individual 💻

El estudiante debe integrar la API CRUD de los laboratorios anteriores en la infraestructura de AWS para crear un entorno de aplicación funcional y demostrar la conectividad segura.

1. **Despliegue de la API:** En la **instancia EC2** del Ejercicio 3.1, instala los runtime necesarios (PHP, Node.js o Python) y despliega el código de la **API CRUD**.

2. **Conexión y Pruebas:** Modifica la configuración de la API para que se conecte a la instancia de **Amazon RDS** desplegada en el Ejercicio 3.2.

3. **Acceso Web:** Modifica el **Grupo de Seguridad de la instancia EC2** para permitir el tráfico **HTTP** o **HTTPS** (puerto 80 o 443) desde cualquier dirección IP. Proporciona el IP al Docente para que te asigne un subdominio.

4. **Verificación de CRUD:** Utilizando **Postman** o la interfaz de Swagger, el estudiante debe crear una colección de peticiones que pruebe las cuatro operaciones del CRUD (Create, Read, Update, Delete) de la API, demostrando que:

    - La API responde correctamente.

    - Los datos se persisten correctamente en la base de datos RDS.

La práctica se considerará exitosa al presentar la **URL pública** de la API y las capturas de pantalla de la **colección de Postman** con respuestas exitosas (código 200/201) para cada operación.