# Plantilla de Diapositivas: Proyecto Final COM610

## Diapositiva 1: Título y Contexto

TÍTULO DEL PROYECTO: [Nombre Atractivo y Descriptivo]

SUBTÍTULO: Despliegue de una Aplicación [Tipo de Aplicación] Escalable en AWS

- **Asignatura:** Trabajando en la Nube (COM610)

- **Docente:** Ing. Lucio Marcelo Quispe Ortega

- **Grupo:** [Nombres de los Integrantes]

## Diapositiva 2: Objetivo del Proyecto y Propuesta de Valor

**OBJETIVO CENTRAL:**

- ¿Qué problema o necesidad resuelve esta aplicación?

- Objetivo técnico: Demostrar la **Elasticidad** y la **Seguridad** mediante la orquestación de servicios.

**TECNOLOGÍAS BASE:**

- **Backend:** [Lenguaje/Framework]

- **Base de Datos:** [MySQL/PostgreSQL en RDS]

### Diapositiva 3: Diseño Esquemático de la Arquitectura (El "Cómo")

**EL CORAZÓN DE LA NUBE**

- **Punto Clave:** Mostrar la separación de responsabilidades: Balanceo (ALB), Cómputo Elástico (ASG/EC2), Persistencia (RDS), Almacenamiento (S3).

- *Inserte aquí el diagrama de arquitectura AWS creado en la documentación.*

**FLUJO DE TRÁFICO:**

- Breve explicación del recorrido de una petición: `Usuario -> ALB -> ASG -> RDS`.

### Diapositiva 4: Temas y Conceptos Puestos en Práctica

CONTENIDO DE LA ASIGNATURA:

- **Contenerización:** Uso de `Dockerfile` Multi-Stage para optimizar la imagen final.

- **Docker Compose:** Configuración del entorno de desarrollo local.

- **Seguridad:** Aplicación del **Principio de Mínimo Privilegio** en Grupos de Seguridad.

- **Elasticidad:** Configuración de **ASG** y **Launch Template** para el Escalado Horizontal.

- **Persistencia:** Conexión a **Amazon RDS** (Base de Datos Gestionada).

- **Desacoplamiento:** Uso de **Amazon S3** para contenido estático.

### Diapositiva 5: Estrategia y Justificación Técnica (Opcional, pero Sugerido)

**DECISIONES CLAVE DE INFRAESTRUCTURA:**

- **Estrategia de HA (Alta Disponibilidad):** ¿Por qué se utilizaron Múltiples Zonas de Disponibilidad (AZ)?

- **Selección del Balanceador:** ¿Por qué se eligió un **ELB** sobre un ALB para esta API?.

- **Estrategia de Despliegue (User Data):** ¿Qué comandos clave se ejecutaron en el script de la Plantilla de Lanzamiento para asegurar que la API se levante automáticamente y se conecte a RDS?

### Diapositiva 6: Demostración y Pruebas (La Prueba de Fuego)

**DEMOSTRACIÓN FUNCIONAL Y ELÁSTICA**

1. **Funcionalidad:** Muestra rápida del CRUD (CREATE/READ) usando Postman o la interfaz.

2. **Prueba de Balanceo:** Muestra las respuestas del servidor que prueban la distribución de carga entre 2 o más instancias (Ej. un log o un encabezado de respuesta que muestre el ID del servidor).

3. **Prueba de Resiliencia (Opcional):** Simulación de la caída de un nodo y confirmación de que el ASG lo reemplaza sin que el servicio se detenga.

### Diapositiva 7: Conclusiones y Aprendizajes

**REFLEXIÓN FINAL**

- **Lección Principal:** ¿Cuál fue el mayor desafío técnico del grupo y cómo se resolvió?

- **Impacto de la Nube:** ¿Cómo esta arquitectura de AWS es superior a un despliegue tradicional on-premise? (Mencionar: Costo, Resiliencia, Tiempo de Despliegue).
