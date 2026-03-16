# Laboratorio 1.2: Creación de Cuenta en AWS y Exploración de la Consola

**Universidad San Francisco Xavier de Chuquisaca**

**Asignatura:** Trabajando en la Nube (COM610)

**Docente:** Ing. Marcelo Quispe Ortega

**Semestre:** 1/2026

## Introducción para el Estudiante

Amazon Web Services (AWS) es la plataforma de nube más adoptada en el mundo. Para un Ingeniero de Sistemas, dominar AWS no es solo conocer sus servicios, sino entender cómo se gestionan los recursos de forma global. En este laboratorio, daremos el primer paso: entrar al ecosistema y entender su centro de mando, la Consola de Gestión.

## 🎯 Objetivos del Laboratorio

- **Gestionar el aprovisionamiento** de una cuenta profesional en AWS bajo el modelo de Capa Gratuita (Free Tier).

- **Interpretar la infraestructura global** de AWS mediante la selección estratégica de regiones y zonas de disponibilidad.

- **Identificar y localizar** servicios críticos de cómputo (EC2), almacenamiento (S3) y bases de datos (RDS).

- **Implementar bases de seguridad** iniciales mediante el reconocimiento del servicio IAM.

## 🛠️ Sección 1: Registro y Activación (Aprovisionamiento del Tenant)

La creación de una cuenta en AWS es, en esencia, la creación de un "Tenant" o inquilino en la nube. Sigue estos pasos cuidadosamente:

1. **Registro Inicial:** Ve a [aws.amazon.com](https://aws.amazon.com) y selecciona "Crear una cuenta de AWS".

2. **Configuración de Credenciales:** Utiliza un correo electrónico personal que revises con frecuencia. Este será tu **Usuario Raíz (Root User)**.

3. **Verificación de Identidad:** AWS requiere una tarjeta de crédito o débito para verificar tu identidad y prevenir el uso indebido de recursos. No se realizarán cargos si te mantienes dentro de los límites del nivel gratuito.

4. **Selección del Plan de Soporte:** Asegúrate de elegir el **Plan de Soporte Basic (Gratis)**.

## 🖥️ Sección 2: Navegación Crítica en la Consola de Gestión

Una vez dentro, no busques botones al azar. Un arquitecto de nube debe conocer los componentes clave de la interfaz:

**2.1. El Selector de Regiones (El Concepto Geográfico)**

En la esquina superior derecha verás un nombre de ciudad (ej. Norte de Virginia o Ohio).

- **Desafío:** Cambia entre diferentes regiones. Observa cómo algunos recursos que crees en una región no aparecen en otra. Esto es vital para el cumplimiento de normativas y la reducción de latencia.

**2.2. La Barra de Búsqueda de Servicios**

AWS tiene más de 200 servicios. La barra de búsqueda (Alt+S) es tu mejor herramienta. Localiza los siguientes paneles de control:

- **EC2 (Cómputo):** Donde levantarás tus servidores virtuales.

- **S3 (Almacenamiento):** Para guardar archivos de forma masiva.

- **RDS (Bases de Datos):** Motores relacionales gestionados.

**2.3. Panel de Facturación (Billing Dashboard)**

Busca "Billing" en la barra de búsqueda. Aquí es donde monitoreas el consumo. Familiarízate con la sección de **"Nivel gratuito"** para ver qué servicios estás utilizando y cuánto te queda de margen.

## 🏗️ Sección 3: Práctica Individual (Exploración y Diagnóstico)

Para completar este laboratorio, debes investigar directamente en la consola y responder a este desafío de exploración:

1. **Análisis de Regiones:** Identifica dónde se encuentra el selector de región. ¿Por qué crees que es crucial elegir la región correcta antes de lanzar un servidor para una empresa en Bolivia?

2. **Auditoría del Nivel Gratuito:** Busca el panel de "Nivel gratuito". Menciona tres servicios que ofrezcan "12 meses gratis" y sus límites específicos (ej. cuántas horas de cómputo o cuántos GB de espacio).

3. **Exploración de Documentación Local:** Accede a los paneles de Lightsail y S3. Describe brevemente, con tus propias palabras, qué diferencia técnica encuentras entre estos dos servicios de almacenamiento/cómputo simple.

4. **Seguridad Inicial (IAM):** Busca el servicio **IAM (Identity and Access Management)**. Según lo que indica el panel principal, ¿cuál es su propósito principal en términos de seguridad de la cuenta?

## 📄 Instrucciones para los Entregables

Para este laboratorio, debes presentar un **Informe Técnico en formato PDF**:

1. **Captura de Pantalla 1:** Tu consola de AWS donde se vea claramente tu nombre de usuario o ID de cuenta en la esquina superior derecha.

2. **Captura de Pantalla 2:** El panel de "Billing" o "Facturación" mostrando que el nivel gratuito está activo.

3. **Respuestas al Desafío:** Las respuestas a las 4 preguntas de la Sección 3, debidamente redactadas.

4. C**onclusión (Mínimo 5 líneas):** Tu percepción sobre la complejidad de la consola frente a los entornos de virtualización local (como VirtualBox) que usamos en el laboratorio anterior.