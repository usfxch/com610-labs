# Enunciado del Segundo Parcial — Evaluación por Avance del Proyecto Final

**Universidad San Francisco Xavier de Chuquisaca**

**Asignatura:** Trabajando en la Nube (COM610)

**Docente:** Ing. Marcelo Quispe Ortega

**Semestre:** 1/2026

---

**Fecha de evaluación:** miércoles 27 de mayo de 2026

**Entrega de documentos de avance en eCampus:** 27 de mayo de 2026 hasta las 16:00 (requisito obligatorio)

**Sorteo de horarios de defensa:** 27 de mayo de 2026 a las 17:00

**Horario de evaluaciones:** 27 de mayo de 2026 de 18:00 a 20:00

**Tiempo de presentación por grupo:** 15 minutos (estricto)

**Puntaje total:** 100 puntos

---

## 📋 Instrucciones Generales

1. Cada grupo debe llegar el día del parcial con su avance **completamente preparado y ensayado**.
2. La evaluación se realiza en formato **presentación-demostración** de 15 minutos por grupo.
3. Los grupos deben traer sus laptops con el proyecto levantado y listo antes de ingresar a la sala de evaluación.
4. Se permite el uso de apuntes personales y laboratorios previos como referencia.
5. Queda **estrictamente prohibido** el uso de inteligencia artificial generativa (ChatGPT, Copilot, etc.) durante la presentación.
6. **Entrega previa obligatoria en eCampus (hasta 27/05 a las 16:00):**
   - Un archivo **ZIP** que contenga el **informe de avance del proyecto** en formato **Markdown** (`.md`) con la siguiente estructura mínima:
     - **Tabla de infraestructura / servicios** actualizada.
     - **Bitácora de avance** con mínimo 3 entradas (fecha, actividad, responsable, dificultad superada).
     - **Diagrama de arquitectura** con leyenda de estado (operativo / en configuración / pendiente).
     - **Comandos principales** utilizados en el avance (organizados por sección).
     - **Capturas de pantalla** de los servicios funcionando, consola AWS, contenedores activos, pipelines exitosos, etc.
   - **Enlace al repositorio GitHub** del proyecto (público o privado con acceso al docente), indicado al inicio del Markdown.
   > ⚠️ **Los grupos que no hayan subido el ZIP con el informe Markdown a eCampus antes de las 16:00 no podrán acceder a la defensa y serán calificados con 0 (cero) puntos en el parcial.**
7. El **sorteo de horarios** se realizará a las 17:00 del día de la evaluación. Los grupos deben estar atentos y presentarse 5 minutos antes de su horario asignado.
8. Al ingresar a presentar, cada grupo debe traer sus laptops con los servicios **ya levantados** y listos para demostrar.
9. La calificación se compone de: funcionalidad del avance (60%), documentación entregada (20%) y defensa grupal (20%).

---

## 🎯 Enfoque de la Evaluación

El segundo parcial mide el **avance técnico real** del proyecto final mediante una demostración en vivo. No hay tiempo de configurar nada durante los 15 minutos; el grupo solo **muestra lo que ya funciona** y responde preguntas puntuales del docente.

---

## ⏱️ Distribución Recomendada de los 15 Minutos

Para que el grupo aproveche el tiempo y el docente pueda calificar ordenadamente, se sugiere la siguiente estructura:

| Fase | Duración | Actividad |
|------|----------|-----------|
| **Apertura** | 30 seg | Identificación del grupo, número de proyecto y escenario. |
| **Hito 1** | 1 min 30 seg | Muestra rápida de la infraestructura base: VMs encendidas, contenedores corriendo o servicios AWS desplegados. |
| **Hito 2** | 6 min | Demostración de los 2 servicios core (pruebas funcionales rápidas). |
| **Hito 3** | 2 min | Verificación de seguridad: variables de entorno, credenciales no expuestas, firewall/grupos de seguridad. |
| **Hito 4** | 3 min | Explicación breve del diagrama y bitácora; defensa individual de 30 segundos por persona. |
| **Cierre** | 2 min | Preguntas puntuales del docente y resumen final. |

> **⚠️ Advertencia:** El docente detendrá la presentación a los 15 minutos exactos. Ensayen en casa con un cronómetro.

---

## 🏗️ Hitos de Avance Obligatorios

El puntaje de cada hito se asigna **solo si se demuestra en vivo** durante los 15 minutos.

---

### Hito 1: Infraestructura Base y Conectividad (20 puntos)

**Tiempo sugerido:** 1 minuto 30 segundos

**Objetivo:** La plataforma base está montada y operativa.

#### Requisitos mínimos

1. **Infraestructura desplegada:** Al menos el 50 % de los componentes definidos en la arquitectura del proyecto deben estar creados y accesibles (VMs en VirtualBox, contenedores en Docker Desktop, o recursos en AWS).
2. **Configuración de red funcional:**
   - Servicios accesibles por IP o nombre según el diseño del grupo.
   - Conectividad verificada entre componentes (por ejemplo: `docker network ls`, `ping`, `curl` interno, o consola AWS mostrando recursos en ejecución).
3. **Tabla de infraestructura entregada** al docente al inicio, con:
   - Nombre de cada componente, rol, tecnología, IP/puerto/endpoint y estado actual.

#### Evidencias rápidas (mostrar en pantalla)

- `docker ps` o `docker compose ps` (si usa contenedores).
- `ip addr` o estado de instancias EC2 en consola AWS (si usa nube).
- `ping` o `curl` cruzado entre 2 componentes.
- `systemctl status` del servicio crítico principal (si usa VMs).

---

### Hito 2: Servicios Core en Ejecución (35 puntos)

**Tiempo sugerido:** 6 minutos

**Objetivo:** Al menos **dos temas avanzados** del proyecto deben estar implementados, integrados y funcionando.

#### Requisitos mínimos

El grupo demuestra **dos o más** de estos temas ya operativos, según su proyecto:

| Opción | Tema | Evidencia mínima (rápida) |
|--------|------|---------------------------|
| A | **Contenerización con Docker (T2)** | `docker images` mostrando imágenes propias; `docker ps` con contenedores corriendo; `curl` a la aplicación funcionando. |
| B | **Orquestación con Docker Compose (T3)** | `docker compose ps` mostrando múltiples servicios *Up*; prueba de balanceo de carga o comunicación entre servicios. |
| C | **Servicios AWS — Cómputo / Almacenamiento / BD (T4)** | Consola AWS mostrando instancia EC2 en ejecución, bucket S3 creado o RDS disponible; `curl` o conexión desde local. |
| D | **CI/CD con GitHub Actions (T5)** | Repositorio GitHub mostrando workflow ejecutado exitosamente (pantalla verde ✓); demostración del artefacto generado o despliegue automático. |
| E | **Aplicación Desplegada (Web/API/Serverless) (T6)** | Navegador o `curl` mostrando la aplicación respondiendo por IP, dominio, endpoint de Lambda o URL de CloudFront/S3 estático. |
| F | **Persistencia y Volúmenes (T2/T3)** | `docker volume ls` mostrando volúmenes; demostración de que los datos persisten tras eliminar y recrear un contenedor. |
| G | **Proxy / Balanceo de Carga (T3/T4)** | `curl` al balanceador mostrando respuesta de diferentes backends; o `nginx -t` + navegación por el proxy. |

> **Nota:** Si el proyecto no incluye alguna opción, el docente validará temáticas equivalentes previa coordinación.

#### Regla de oro para este hito

- **No basta con "instalado".** El servicio debe responder a una prueba real en ese momento.
- Si un servicio está caído o mal configurado, el grupo puede optar por **no mostrarlo** y perder esos puntos, pero no se permite reconfigurar en vivo.

---

### Hito 3: Seguridad y Buenas Prácticas (25 puntos)

**Tiempo sugerido:** 2 minutos

**Objetivo:** El proyecto no está desprotegido. Hay una capa mínima de seguridad aplicada.

#### Requisitos mínimos

1. **Credenciales y secretos gestionados (10 pts):**
   - No existen contraseñas en texto plano dentro del código fuente subido a GitHub.
   - Uso de variables de entorno (`.env`, `secrets` de GitHub Actions, o AWS Secrets Manager / Parameter Store).
   - El archivo `.env` está incluido en `.gitignore` (si aplica).

2. **Firewall / Grupos de seguridad activos (10 pts):**
   - Si usa VMs locales: UFW o iptables habilitado con política restrictiva; solo puertos necesarios abiertos.
   - Si usa AWS: Security Groups configurados con reglas mínimas necesarias (no 0.0.0.0/0 en todos los puertos).
   - Mostrar `ufw status verbose`, `iptables -L -v -n`, o reglas de Security Group en consola AWS.

3. **Usuarios y permisos diferenciados (5 pts):**
   - Existencia de usuarios o roles diferenciados (no todo como root/admin).
   - Permisos restrictivos en al menos 2 directorios o recursos críticos.
   - Si usa Docker: contenedores corriendo con usuario no root (si aplica).

#### Evidencias rápidas

- `cat .gitignore` mostrando `.env` ignorado.
- `grep -r "password" .` en el repo mostrando que no hay secretos expuestos (o explicación de dónde se inyectan).
- `ufw status verbose` o captura de Security Groups AWS.
- `ls -la` en directorios críticos del proyecto.

---

### Hito 4: Planificación y Defensa Grupal (20 puntos)

**Tiempo sugerido:** 3 minutos totales (incluye preguntas del docente)

**Objetivo:** El grupo demuestra organización, comprensión del proyecto y reparto de tareas.

#### Requisitos mínimos

1. **Diagrama de arquitectura con leyenda de estado (5 pts):**
   - Refleja el estado *actual*.
   - Usa colores o etiquetas: verde (operativo), amarillo (en configuración), gris (pendiente).

2. **Bitácora de avance (5 pts):**
   - Mínimo 3 entradas con fecha, actividad, responsable y dificultad superada.
   - Entregada al inicio; no se lee en voz alta completa.

3. **Defensa grupal e individual breve (10 pts):**
   - Cada integrante dispone de **30 segundos** para decir:
     - *"Yo construí/configuré X"*
     - *"Me falta por hacer Y para la siguiente entrega"*
   - El docente puede hacer **1 pregunta puntual** sobre comandos, decisiones de diseño o conceptos de cloud.

---

## 📊 Rúbrica de Evaluación

| Hito | Criterio | Puntos | Puntos obtenidos |
|------|----------|--------|------------------|
| **Hito 1** | Infraestructura base y conectividad | 20 | |
| | Componentes levantados (≥60 %) y accesibles | 8 | |
| | Red configurada y conectividad funcional | 7 | |
| | Tabla de infraestructura entregada | 5 | |
| **Hito 2** | Servicios core en ejecución | 35 | |
| | Tema avanzado 1 operativo y verificado | 17 | |
| | Tema avanzado 2 operativo y verificado | 17 | |
| | Integración coherente entre ambos servicios | 1 | |
| **Hito 3** | Seguridad y buenas prácticas | 25 | |
| | Credenciales y secretos gestionados correctamente | 10 | |
| | Firewall / Grupos de seguridad activos y restrictivos | 10 | |
| | Usuarios y permisos diferenciados | 5 | |
| **Hito 4** | Planificación y defensa | 20 | |
| | Diagrama actualizado con leyenda de estado | 5 | |
| | Bitácora de avance entregada (3+ entradas) | 5 | |
| | Defensa grupal clara y reparto de tareas evidente | 10 | |
| | **Total** | **100** | |

---

## ✅ Checklist de Llegada (para el grupo)

Antes de su horario de presentación, verifique:

- [ ] Todos los servicios/contenedores/instancias están **levantados** y los endpoints ya responden.
- [ ] Se ha ensayado en casa con un **cronómetro de 15 minutos**.
- [ ] Se tiene lista una **terminal abierta** por componente para no perder tiempo en conectarse.
- [ ] Se ha preparado una **carpeta o escritorio** con las capturas de pantalla por si el docente las solicita.
- [ ] Se ha impreso (o se tiene en PDF listo para enviar) la **tabla de infraestructura**, **bitácora** y **diagrama**.
- [ ] Cada integrante sabe exactamente qué decir en sus 30 segundos de defensa.
- [ ] El repositorio GitHub está actualizado y accesible.

---

**¡Éxitos en la preparación y en la presentación!**
