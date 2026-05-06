# 🧪 EXAMEN PRÁCTICO - PRIMER PARCIAL COM610
## Trabajando en la Nube (1/2026)

**Duración Total:** 90 minutos (30 minutos por ejercicio)  
**Herramientas Necesarias:** Máquina Virtual Ubuntu Server, Docker Desktop, Terminal  
**Formato:** 3 ejercicios prácticos con enunciados a desarrollar

---

## 📋 INSTRUCCIONES GENERALES

1. **Lee cuidadosamente** cada enunciado antes de empezar
2. **Desarrolla la solución** usando lo que aprendiste (NO es copiar-pegar)
3. **Toma capturas de pantalla** de los resultados importantes
4. **Documenta los comandos** que utilizaste
5. **Verifica el resultado** antes de pasar al siguiente paso
6. **Algunos pasos incluyen comandos como referencia**, úsalos solo si es necesario
7. **Tiempo:** Tienes 30 minutos por ejercicio

---

## ✅ RÚBRICA DE EVALUACIÓN

| Criterio | Puntos | Descripción |
|----------|--------|-------------|
| **Cumplimiento del enunciado** | 40% | ¿Se completó todo lo solicitado? |
| **Comandos correctos** | 30% | ¿Los comandos funcionan correctamente? |
| **Documentación** | 20% | ¿Hay capturas y explicaciones? |
| **Limpieza y organización** | 10% | ¿El trabajo está ordenado y limpio? |

---

---

# 🔧 EJERCICIO 1: ADMINISTRACIÓN DE SISTEMAS GNU/LINUX
## Basado en Laboratorio 1.1 (30 minutos)

### 📌 ENUNCIADO

Eres administrador de sistemas en una institución educativa. Se te ha encomendado preparar un servidor Ubuntu para alojar una plataforma LMS (Learning Management System). Debes:

1. **Crear una estructura de usuarios y grupos** que refleje departamentos y roles
2. **Configurar permisos de archivos** según principios de seguridad
3. **Establecer servicios críticos** que deben ejecutarse automáticamente
4. **Programar tareas automatizadas** para mantenimiento del sistema

### 🎯 TAREAS ESPECÍFICAS

#### **Parte 1: Gestión de Usuarios y Grupos (10 minutos)**

**Objetivo:** Crear una jerarquía de usuarios y grupos que refleje estructura organizacional.

**A realizar:**

1. Crea un grupo llamado `docentes` (identificador 2000)
2. Crea un grupo llamado `estudiantes` (identificador 3000)
3. Crea un grupo llamado `administradores` (identificador 4000)
4. Crea 3 usuarios con características diferentes:
   - Usuario: `prof_matematica`
     - Nombre real: "Profesor de Matemática"
     - Grupo principal: `docentes`
     - Shell: `/bin/bash`
   - Usuario: `prof_lenguaje`
     - Nombre real: "Profesor de Lenguaje"
     - Grupo principal: `docentes`
     - Shell: `/bin/bash`
   - Usuario: `admin_lms`
     - Nombre real: "Administrador LMS"
     - Grupo principal: `administradores`
     - Shell: `/bin/bash`
     - Acceso a `sudo`
5. Asigna al usuario `prof_matematica` también al grupo `administradores` (acceso elevado)
6. Verifica la estructura creada listando:
   - Grupos creados: `cat /etc/group | grep -E "docentes|estudiantes|administradores"`
   - Usuarios creados: `cat /etc/passwd | grep -E "prof_|admin_"`
   - Grupos de `prof_matematica`: `groups prof_matematica`

**Capturas requeridas:**
- [ ] Salida de creación de grupos
- [ ] Salida de creación de usuarios
- [ ] Resultado de `groups prof_matematica`

**Comandos esperados:**
```bash
sudo groupadd -g 2000 docentes
sudo groupadd -g 3000 estudiantes
sudo groupadd -g 4000 administradores
sudo useradd -m -s /bin/bash -c "Profesor de Matemática" -g docentes prof_matematica
sudo useradd -m -s /bin/bash -c "Profesor de Lenguaje" -g docentes prof_lenguaje
sudo useradd -m -s /bin/bash -c "Administrador LMS" -g administradores -G sudo admin_lms
# Agregar a prof_matematica al grupo administradores
sudo usermod -aG administradores prof_matematica
# Ver estructura
cat /etc/group | grep -E "docentes|estudiantes|administradores"
cat /etc/passwd | grep -E "prof_|admin_"
groups prof_matematica
```

---

#### **Parte 2: Estructura de Directorios y Permisos (8 minutos)**

**Objetivo:** Crear una estructura de directorios con permisos restrictivos según estándares de seguridad.

**Enunciado:**

Tu empresa necesita una estructura para almacenar contenido educativo siguiendo el estándar FHS (Filesystem Hierarchy Standard). Debes crear un árbol de directorios bajo `/srv/lms/` con subdirectorios: `contenidos/` (con `matematica/`, `lenguaje/` y `recursos/`), `usuarios/` (con `docentes/` y `estudiantes/`) y `backup/`.

**Configurar permisos de seguridad:**
- El directorio raíz `/srv/lms/` debe ser legible por todos (`755`) pero propiedad de `root` con grupo `administradores`
- `contenidos/` debe ser accesible (`755`) con grupo `docentes`
- Los subdirectorios `matematica/` y `lenguaje/` deben permitir lectura/escritura solo a docentes (`770`)
- `recursos/` debe ser de lectura general (`755`)
- Los directorios `usuarios/` y `backup/` deben ser restrictivos (`700`) solo accesibles por `administradores`

**Crear archivos de prueba:**
- Coloca un archivo en `contenidos/matematica/` con un syllabus
- Coloca un archivo en `contenidos/lenguaje/` con un syllabus
- Coloca un archivo público en `contenidos/recursos/`

**Verificar la configuración:**
- Intenta acceder como `prof_matematica` (debe leer/escribir en matematica/)
- Intenta acceder como `prof_lenguaje` (debe leer/escribir en lenguaje/)
- Intenta acceder a `/srv/lms/usuarios/` sin privilegios (debe fallar)

**Capturas requeridas:**
- [ ] Estructura completa visible con `ls -laR`
- [ ] Permisos correctos en todos los directorios
- [ ] Intento fallido de acceso no autorizado

**Comandos esperados:**
```bash
sudo mkdir -p /srv/lms/contenidos/{matematica,lenguaje,recursos}
sudo mkdir -p /srv/lms/usuarios/{docentes,estudiantes}
sudo mkdir /srv/lms/backup

# Permisos y propietarios base
sudo chown root:administradores /srv/lms
sudo chmod 755 /srv/lms

sudo chgrp docentes /srv/lms/contenidos
sudo chmod 755 /srv/lms/contenidos

sudo chmod 770 /srv/lms/contenidos/matematica
sudo chmod 770 /srv/lms/contenidos/lenguaje
sudo chmod 755 /srv/lms/contenidos/recursos

sudo chown root:administradores /srv/lms/usuarios /srv/lms/backup
sudo chmod 700 /srv/lms/usuarios
sudo chmod 700 /srv/lms/backup

# Archivos de prueba
sudo touch /srv/lms/contenidos/matematica/syllabus.txt
sudo touch /srv/lms/contenidos/lenguaje/syllabus.txt
sudo touch /srv/lms/contenidos/recursos/publico.txt

# Verificación
ls -laR /srv/lms
su - prof_matematica -c "cd /srv/lms/contenidos/matematica; touch prueba.txt"
su - prof_lenguaje -c "cd /srv/lms/contenidos/lenguaje; touch prueba.txt"
su - prof_matematica -c "ls /srv/lms/usuarios" # Debe dar Permiso denegado
```

---

#### **Parte 3: Servicios Críticos (8 minutos)**

**Objetivo:** Instalar y configurar servicios de sistema que se ejecuten automáticamente.

**Enunciado:**

Un servidor educativo necesita dos servicios críticos para funcionar: SSH para acceso remoto seguro y Nginx como servidor web. Ambos deben estar operativos y configurados para iniciar automáticamente con el sistema.

**Tareas:**

1. **Instala los servicios necesarios:** openssh-server (para acceso remoto) y nginx (servidor web)

2. **Verifica la instalación:** Asegúrate de que ambas binarios están disponibles en el sistema

3. **Configura inicio automático:** Habilita ambos servicios para iniciar con el sistema (usa `systemctl`)

4. **Inicia los servicios:** Ejecuta ambos servicios inmediatamente

5. **Verifica operatividad:** Confirma que ambos están con estado "active/running"

6. **Verifica puertos abiertos:** Confirma que SSH está en puerto 22 y Nginx en puerto 80 (usa `ss` para verificar)

**Capturas requeridas:**
- [ ] Estado de SSH (activo)
- [ ] Estado de Nginx (activo)
- [ ] Puertos 22 y 80 abiertos

**Comandos esperados:**
```bash
sudo apt update && sudo apt install -y openssh-server nginx
sudo systemctl enable ssh nginx
sudo systemctl start ssh nginx
sudo systemctl status ssh
sudo systemctl status nginx
sudo ss -tulpn | grep -E ":22|:80"
```

---

#### **Parte 4: Tareas Automatizadas (6 minutos)**

**Objetivo:** Programar tareas de mantenimiento automático del sistema.

**Enunciado:**

Tu empresa necesita automatizar el mantenimiento del servidor. Debes crear un script de limpieza y programarlo para ejecutarse automáticamente en horarios específicos.

**4.1 - Crear el script (con referencia):**

Crea un archivo `/usr/local/bin/limpiar_logs.sh` que limpie archivos antiguos. Usa este comando como referencia:

```bash
sudo bash -c 'cat > /usr/local/bin/limpiar_logs.sh << EOF
#!/bin/bash
echo "Iniciando limpieza de logs..."
find /var/log -name "*.log" -mtime +30 -delete
find /tmp -type f -mtime +7 -delete
echo "Limpieza completada: $(date)" >> /var/log/limpiar_logs.log
EOF'

sudo chmod +x /usr/local/bin/limpiar_logs.sh
```

**4.2 - Prueba el script:**

Ejecuta el script manualmente para verificar que funciona sin errores.

**4.3 - Programa tareas cron:**

El administrator necesita programar 2 tareas en el crontab de root:
- **Tarea 1:** Limpieza de logs cada domingo a las 03:00 AM
- **Tarea 2:** Backup de `/srv/lms/` cada viernes a las 13:00 usando `tar` para crear un archivo comprimido

(Usa `sudo crontab -e` para editar)

**4.4 - Verifica las tareas:**

Confirma que ambas tareas están programadas correctamente usando `sudo crontab -l`

**Capturas requeridas:**
- [ ] Script creado y ejecutado correctamente
- [ ] Salida de `sudo crontab -l` mostrando ambas tareas programadas

**Comandos esperados:**
```bash
sudo /usr/local/bin/limpiar_logs.sh
sudo crontab -e
# Agregar las lineas:
# 0 3 * * 0 /usr/local/bin/limpiar_logs.sh
# 0 13 * * 5 tar -czf /srv/lms/backup/lms_backup_$(date +\%F).tar.gz /srv/lms/

sudo crontab -l
```

**Referencia de sintaxis cron:**
```
MIN HORA DIA_MES MES DIA_SEMANA comando
0   3    *       *    0 (domingo)  ejecutar comando a las 3:00 AM
0   13   *       *    5 (viernes)  ejecutar comando a las 13:00
```

---

## 📝 ENTREGA DEL EJERCICIO 1

Debe incluir:

1. ✅ Screenshot de estructura de grupos creados
2. ✅ Screenshot de estructura de usuarios
3. ✅ Screenshot de directorios creados con permisos correctos
4. ✅ Screenshot de estado de servicios (ssh y nginx activos)
5. ✅ Screenshot de puertos abiertos (22 y 80)
6. ✅ Screenshot de tareas crontab programadas
7. ✅ Listado de todos los comandos usados en cada paso

---

---

# 🐳 EJERCICIO 2: CONTAINERIZACIÓN CON DOCKER
## Basado en Laboratorios 2.1 y 2.2 (30 minutos)

### 📌 ENUNCIADO

Una consultora de tecnología te ha contratado para containerizar su aplicación web multi-componente. Debes crear una solución completa que:

1. **Cree una imagen Docker personalizada** para una aplicación Node.js
2. **Implemente volúmenes** para persistencia de datos
3. **Configure redes personaliza­das** para comunicación entre contenedores
4. **Despliegue un balanceador de carga** Nginx
5. **Demuestre hot reload** durante el desarrollo

### 🎯 TAREAS ESPECÍFICAS

#### **Parte 1: Crear Imagen Docker Personalizada (15 minutos)**

**Objetivo:** Construir una imagen Docker optimizada para una aplicación Node.js con características de producción.

**A realizar:**

1. Crea una carpeta de proyecto:
   ```bash
   mkdir -p ~/proyecto-docker/app
   cd ~/proyecto-docker/app
   ```

2. Crea el archivo `package.json` con las dependencias necesarias:
   ```json
   {
     "name": "api-lms",
     "version": "1.0.0",
     "description": "API para Learning Management System",
     "main": "server.js",
     "scripts": {
       "start": "???",
       "dev": "???"
     },
     "dependencies": {
       "express": "^4.18.2",
       "cors": "^2.8.5"
     },
     "devDependencies": {
       "nodemon": "^3.0.1"
     }
   }
   ```
   
   **Tarea:** Completa el bloque `"scripts"` con los comandos necesarios para:
   - `start`: ejecutar el servidor en producción
   - `dev`: ejecutar el servidor con nodemon (recarga automática en desarrollo)

3. Crea la aplicación `server.js`:
   ```javascript
   const express = require('express');
   const cors = require('cors');
   const fs = require('fs');
   const path = require('path');

   const app = express();
   const PORT = 3000;
   const DATA_FILE = '/app/data/cursos.json';

   app.use(cors());
   app.use(express.json());

   // Crear directorio de datos si no existe
   const dataDir = path.dirname(DATA_FILE);
   if (!fs.existsSync(dataDir)) {
     fs.mkdirSync(dataDir, { recursive: true });
   }

   // Inicializar archivo de datos
   if (!fs.existsSync(DATA_FILE)) {
     const datosIniciales = [
       { id: 1, nombre: 'Matemática', profesor: 'Prof. García', estudiantes: 25 },
       { id: 2, nombre: 'Lenguaje', profesor: 'Prof. López', estudiantes: 28 }
     ];
     fs.writeFileSync(DATA_FILE, JSON.stringify(datosIniciales, null, 2));
   }

   // GET - Listar todos los cursos
   app.get('/api/cursos', (req, res) => {
     try {
       const datos = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
       res.json({ success: true, data: datos });
     } catch (error) {
       res.status(500).json({ success: false, error: error.message });
     }
   });

   // GET - Obtener un curso específico
   app.get('/api/cursos/:id', (req, res) => {
     try {
       const datos = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
       const curso = datos.find(c => c.id == req.params.id);
       if (curso) {
         res.json({ success: true, data: curso });
       } else {
         res.status(404).json({ success: false, error: 'Curso no encontrado' });
       }
     } catch (error) {
       res.status(500).json({ success: false, error: error.message });
     }
   });

   // POST - Crear nuevo curso
   app.post('/api/cursos', (req, res) => {
     try {
       const datos = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
       const nuevoId = Math.max(...datos.map(c => c.id), 0) + 1;
       const nuevoCurso = { id: nuevoId, ...req.body };
       datos.push(nuevoCurso);
       fs.writeFileSync(DATA_FILE, JSON.stringify(datos, null, 2));
       res.status(201).json({ success: true, data: nuevoCurso });
     } catch (error) {
       res.status(500).json({ success: false, error: error.message });
     }
   });

   // PUT - Actualizar curso
   app.put('/api/cursos/:id', (req, res) => {
     try {
       const datos = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
       const index = datos.findIndex(c => c.id == req.params.id);
       if (index !== -1) {
         datos[index] = { ...datos[index], ...req.body };
         fs.writeFileSync(DATA_FILE, JSON.stringify(datos, null, 2));
         res.json({ success: true, data: datos[index] });
       } else {
         res.status(404).json({ success: false, error: 'Curso no encontrado' });
       }
     } catch (error) {
       res.status(500).json({ success: false, error: error.message });
     }
   });

   // DELETE - Eliminar curso
   app.delete('/api/cursos/:id', (req, res) => {
     try {
       const datos = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
       const index = datos.findIndex(c => c.id == req.params.id);
       if (index !== -1) {
         datos.splice(index, 1);
         fs.writeFileSync(DATA_FILE, JSON.stringify(datos, null, 2));
         res.json({ success: true, message: 'Curso eliminado' });
       } else {
         res.status(404).json({ success: false, error: 'Curso no encontrado' });
       }
     } catch (error) {
       res.status(500).json({ success: false, error: error.message });
     }
   });

   app.listen(PORT, '0.0.0.0', () => {
     console.log(`🚀 Servidor LMS ejecutándose en puerto ${PORT}`);
     console.log(`📝 Archivo de datos: ${DATA_FILE}`);
   });
   ```

4. Crea un `Dockerfile` optimizado:

   **Enunciado:** Tu imagen debe:
   - Usar Node.js en versión Alpine (imagen base ligera)
   - Usar multi-stage build con 2 fases: una para construcción y otra para producción
   - Copiar `package*.json` e instalar dependencias
   - Copiar el código del servidor
   - Crear directorio `/app/data` para persistencia
   - Exponer puerto 3000
   - Usar `CMD` para ejecutar el servidor con `node server.js`

   **Referencia de instrucciones Dockerfile útiles:**
   ```dockerfile
   FROM imagen:tag as stage_name     # Base image y multi-stage
   COPY archivo /destino             # Copiar archivos
   RUN comando                       # Ejecutar comando
   EXPOSE 3000                       # Documentar puerto
   CMD ["node", "server.js"]         # Comando por defecto
   ```

---

5. Construye la imagen con tag `api-lms:1.0` usando el Dockerfile que creaste

6. Verifica que la imagen se creó correctamente:
   ```bash
   docker images | grep api-lms
   ```

**Capturas requeridas:**
- [ ] Estructura de archivos creada
- [ ] Contenido de `package.json` (con scripts completados)
- [ ] Contenido de `Dockerfile` creado
- [ ] Salida de `docker images` mostrando api-lms:1.0

**Comandos esperados:**
```bash
# Modificar package.json para agregar:
# "scripts": { "start": "node server.js", "dev": "nodemon server.js" }

# Crear y editar Dockerfile:
# FROM node:18-alpine AS base
# WORKDIR /app
# COPY package*.json ./
# FROM base AS builder
# RUN npm install
# FROM base AS production
# COPY --from=builder /app/node_modules ./node_modules
# COPY . .
# RUN mkdir -p /app/data
# EXPOSE 3000
# CMD ["node", "server.js"]

docker build -t api-lms:1.0 .
docker images | grep api-lms
```

---

#### **Parte 2: Volúmenes y Persistencia (10 minutos)**

**Objetivo:** Implementar volúmenes para persistencia de datos.

**A realizar:**

1. Crea un volumen nombrado:
   ```bash
   docker volume create datos-lms
   ```

2. Ejecuta el contenedor con el volumen.

3. Verifica que el contenedor está ejecutándose:
   ```bash
   docker ps
   docker logs api-lms-prod
   ```

4. Prueba la API:
   ```bash
   curl http://localhost:3000/api/cursos
   ```

5. Crea datos agregando un nuevo curso (referencia):
   ```bash
   curl -X POST http://localhost:3000/api/cursos \
     -H "Content-Type: application/json" \
     -d '{"nombre":"Física","profesor":"Prof. Martínez","estudiantes":30}'
   ```

6. **Detén y elimina el contenedor original:**
   
   Objetivo: Entender que los volúmenes persisten cuando se elimina el contenedor
   
   Sin mostrar los comandos, debes:
   - Detener el contenedor `api-lms-prod`
   - Eliminarlo completamente (pero mantén el volumen `datos-lms`)

7. **Inicia un nuevo contenedor con el mismo volumen:**
   
   Debes iniciar un nuevo contenedor que:
   - Se llame `api-lms-recuperado`
   - Mapee puerto 3001 a puerto 3000 del contenedor
   - Use el volumen `datos-lms` montado en `/app/data`
   - Use la imagen `api-lms:1.0`
   - Espera 5 segundos para que inicie

8. **Verifica que los datos persisten:**
   
   Realiza una petición GET a `http://localhost:3001/api/cursos` y confirma que los datos creados en el paso 5 siguen allí

**Capturas requeridas:**
- [ ] Primer contenedor corriendo y respondiendo API
- [ ] Respuesta GET /api/cursos con datos persistidos
- [ ] Nuevo contenedor accediendo a los datos del volumen

**Comandos esperados:**
```bash
docker volume create datos-lms
docker run -d --name api-lms-prod -p 3000:3000 -v datos-lms:/app/data api-lms:1.0
docker ps && docker logs api-lms-prod
curl http://localhost:3000/api/cursos
curl -X POST http://localhost:3000/api/cursos -H "Content-Type: application/json" -d '{"nombre":"Física","profesor":"Prof. Martínez","estudiantes":30}'
docker stop api-lms-prod && docker rm api-lms-prod
docker run -d --name api-lms-recuperado -p 3001:3000 -v datos-lms:/app/data api-lms:1.0
sleep 5
curl http://localhost:3001/api/cursos
```

---

#### **Parte 3: Redes Docker y Balanceo de Carga (12 minutos)**

**Objetivo:** Implementar comunicación entre contenedores con balanceo de carga.

**A realizar:**

1. Crea una red personalizada:
   ```bash
   docker network create red-lms
   ```

2. **Detén y elimina el contenedor anterior:**
   
   Necesitas limpiar el contenedor `api-lms-recuperado` antes de crear la red y las nuevas instancias

3. **Inicia 3 instancias de la API en la red personalizada:**
   
   Debes iniciar 3 contenedores con nombres `api-lms-1`, `api-lms-2` y `api-lms-3`:
   - Todos conectados a la red `red-lms`
   - Todos montando el volumen `datos-lms` en `/app/data`
   - Usando la imagen `api-lms:1.0`

4. **Verifica comunicación entre contenedores:**

   Desde dentro del contenedor `api-lms-1`, intenta comunicarte con `api-lms-2` y `api-lms-3` usando sus nombres (DNS interno para verificar acceso):
   ```bash
   docker exec api-lms-1 curl http://api-lms-2:3000/api/cursos
   docker exec api-lms-1 curl http://api-lms-3:3000/api/cursos
   ```

5. **Crea un archivo `nginx.conf` para balanceo de carga:**

   El archivo debe:
   - Usar algoritmo `least_conn` para distribución
   - Definir 3 servidores upstream: `api-lms-1:3000`, `api-lms-2:3000`, `api-lms-3:3000`
   - Escuchar en puerto 80
   - Usar `proxy_pass` para redirigir requests a los servidores upstream
   - Pasar headers HTTP correctamente (Host, X-Real-IP, etc.)

6. **Inicia el balanceador Nginx:**

   ```bash
   docker run -d \
     --name balanceador-lms \
     --network red-lms \
     -p 8080:80 \
     -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf:ro \
     nginx
   ```

7. **Prueba el balanceo de carga:**

   Realiza 10 peticiones HTTP al balanceador en `http://localhost:8080/api/cursos` y verifica que todas responden correctamente

8. **Verifica distribución entre contenedores:**

   Revisa los logs de cada contenedor API para confirmar que todas están ejecutándose y recibiendo requests

**Capturas requeridas:**
- [ ] 3 contenedores ejecutándose en red-lms
- [ ] Prueba de comunicación entre contenedores (wget exitoso)
- [ ] Respuestas de balanceador (múltiples requests)
- [ ] Nginx corriendo como balanceador

**Comandos esperados:**
```bash
docker network create red-lms
docker stop api-lms-recuperado && docker rm api-lms-recuperado
docker run -d --name api-lms-1 --network red-lms -v datos-lms:/app/data api-lms:1.0
docker run -d --name api-lms-2 --network red-lms -v datos-lms:/app/data api-lms:1.0
docker run -d --name api-lms-3 --network red-lms -v datos-lms:/app/data api-lms:1.0
docker exec api-lms-1 curl -s http://api-lms-2:3000/api/cursos
docker exec api-lms-1 curl -s http://api-lms-3:3000/api/cursos

# Crear nginx.conf (ver especificaciones)
docker run -d --name balanceador-lms --network red-lms -p 8080:80 -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf:ro nginx
for i in {1..10}; do curl http://localhost:8080/api/cursos; done
```

---

#### **Parte 4: Hot Reload para Desarrollo (4 minutos)**

**Objetivo:** Demostrar desarrollo rápido con recargas automáticas.

**A realizar:**

1. Crea una carpeta de desarrollo:
   ```bash
   mkdir -p ~/proyecto-docker/desarrollo
   cp -r ~/proyecto-docker/app/* ~/proyecto-docker/desarrollo/
   cd ~/proyecto-docker/desarrollo
   ```

2. Crea un `Dockerfile.dev` que:
   - Use Node.js Alpine como imagen base
   - Copie `package*.json` e instale todas las dependencias (incluyendo dev)
   - Copie el código fuente
   - Ejecute `npm run dev` (que corre nodemon)

3. **Construye la imagen `api-lms:dev`** usando `Dockerfile.dev`

4. **Ejecuta el contenedor de desarrollo:**
   
   Con un bind mount que permita:
   - Mapear puerto 8888 a puerto 3000
   - Montar el directorio actual en `/app` para que los cambios se reflejen

5. Prueba que funciona:
   ```bash
   curl http://localhost:8888/api/cursos
   docker logs api-lms-dev
   ```

6. **Modifica `server.js` agregando una nueva ruta** `/status` que retorne `{ version: '1.1.0', status: 'actualizado' }`

7. **Verifica que se recargó automáticamente:**
   
   Sin reiniciar el contenedor, intenta acceder a `http://localhost:8888/status` y confirma que la nueva ruta funciona

**Capturas requeridas:**
- [ ] Contenedor de desarrollo en ejecución
- [ ] Prueba de hot reload (cambio en código + nueva ruta funciona)

**Comandos esperados:**
```bash
# Crear Dockerfile.dev (ver especificaciones)
docker build -t api-lms:dev -f Dockerfile.dev .
docker run -d --name api-lms-dev -p 8888:3000 -v $(pwd):/app -v /app/node_modules api-lms:dev
curl http://localhost:8888/api/cursos

# Modificar server.js
curl http://localhost:8888/status
```

---

## 📝 ENTREGA DEL EJERCICIO 2

Debe incluir:

1. ✅ Screenshot de `docker images` mostrando `api-lms:1.0`
2. ✅ Screenshot de respuesta API (GET /api/cursos)
3. ✅ Screenshot de datos persistidos después de reiniciar contenedor
4. ✅ Screenshot de 3 contenedores en red (`docker ps`)
5. ✅ Screenshot de balanceador Nginx funcionando (respuestas a múltiples requests)
6. ✅ Screenshot de hot reload con cambios en código
7. ✅ Listado de todos los comandos usados en cada paso

---

---

# 🚀 EJERCICIO 3: ENTORNO MULTI-CONTENEDOR CON DOCKER COMPOSE
## Basado en Laboratorio 3 (30 minutos)

### 📌 ENUNCIADO

Tu empresa necesita desplegar una **plataforma LMS completa** con arquitectura de microservicios. Debes orquestar múltiples contenedores usando Docker Compose que incluya:

1. **Base de datos MySQL** con persistencia
2. **API Node.js** con hot reload
3. **Balanceador Nginx** distribuyendo carga
4. **Redes aisladas** para seguridad
5. **Verifica funcionamiento** con pruebas de estrés

### 🎯 TAREAS ESPECÍFICAS

#### **Parte 1: Estructura de Proyecto (4 minutos)**

**Objetivo:** Preparar la estructura necesaria para Docker Compose.

**Enunciado:**

Crea una estructura de directorios organizados:
- Directorio principal `~/lms-platform`
- Subdirectorio `app/` con el código Node.js
- Subdirectorio `nginx/` con la configuración del balanceador
- Subdirectorio `db/` con scripts de inicialización

**A realizar:**

1. Comando para crear estructura:
   ```bash
   mkdir -p ~/lms-platform/{app,nginx,db}
   cd ~/lms-platform
   ```

2. Copia la aplicación Node.js (package.json, server.js) de los ejercicios anteriores al directorio `app/`

3. **Crea el archivo `.env`** con las variables:
   - `MYSQL_ROOT_PASSWORD=lms_root_2024`
   - `MYSQL_DATABASE=lmsdb`
   - `MYSQL_USER=lms_user`
   - `MYSQL_PASSWORD=lms_pass_secure`
   - `NODE_ENV=production`

4. **Crea `nginx/nginx.conf`** que:
   - Defina upstream con 3 servidores (api1, api2, api3) en puerto 3000
   - Use algoritmo `least_conn` para balanceo
   - Configure `proxy_pass` hacia los servidores upstream
   - Pase headers HTTP correctamente

---

#### **Parte 2: Orquestar Servicios con Docker Compose (12 minutos)**

**Objetivo:** Definir y ejecutar toda la infraestructura multi-contenedor.

**Enunciado:**

Tu empresa necesita un archivo `docker-compose.yml` que orqueste 5 servicios:

1. **Servicio `db` (MySQL 8.0):**
   - Use variables de entorno del `.env`
   - Monte el volumen `mysql-data` en `/var/lib/mysql`
   - Monte el script `db/init.sql` en `/docker-entrypoint-initdb.d/`
   - Esté en la red `lms-network`

2. **Servicios `api1`, `api2`, `api3` (idénticos, 3 instancias):**
   - Construyan desde `context: ./app` usando el `Dockerfile` creado
   - Configuren variables de entorno (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
   - Monten volumen `app-data` en `/app/data`
   - Estén en la red `lms-network`

3. **Servicio `nginx` (nginx:alpine):**
   - Mapee puertos 80 y 8081 al puerto 80 del contenedor
   - Monte el archivo `nginx/nginx.conf` como configuración
   - Dependa de los 3 servicios API
   - Esté en la red `lms-network`

4. **Volúmenes requeridos:**
   - `mysql-data` (para persistencia de base de datos)
   - `app-data` (para datos de la aplicación)

5. **Red personalizada:**
   - `lms-network` de tipo bridge

**Referencias útiles:**
```yaml
services:
  nombre:
    image: imagen:tag
    build:
      context: ./ruta
      dockerfile: Dockerfile
    environment:
      VAR: valor
    volumes:
      - volumen:/ruta:permisos
    ports:
      - "3000:3000"
    depends_on:
      - servicio
    networks:
      - nombre-red

volumes:
  nombre:
    driver: local

networks:
  nombre:
    driver: bridge
```

**A realizar:**

1. **Crea el archivo `db/init.sql`** con:
   - Tabla `cursos` (id, nombre, profesor, estudiantes, descripcion, timestamps)
   - Tabla `estudiantes` (id, nombre, email, curso_id, estado, timestamp)
   - Datos iniciales (3 cursos y 3 estudiantes)

2. **Crea el archivo `docker-compose.yml`** completo siguiendo el enunciado anterior

3. **Levanta todos los servicios:**
   ```bash
   docker-compose up -d
   ```

4. **Espera a que MySQL esté listo (30 segundos aproximadamente)**

5. **Verifica que todos están en ejecución:**
   ```bash
   docker-compose ps
   ```

6. **Revisa los logs de los servicios** para confirmar que iniciaron sin errores

**Capturas requeridas:**
- [ ] Contenido del `docker-compose.yml` creado
- [ ] Contenido del `db/init.sql`
- [ ] Salida de `docker-compose ps` (todos servicios up)
- [ ] Logs mostrándose sin errores críticos

**Comandos esperados (Partes 1 y 2):**
```bash
mkdir -p ~/lms-platform/{app,nginx,db}
cd ~/lms-platform
cp ~/proyecto-docker/app/package.json ~/proyecto-docker/app/server.js ~/proyecto-docker/app/Dockerfile app/

# Crear .env, nginx/nginx.conf, db/init.sql y docker-compose.yml con las especificaciones.
docker-compose up -d
docker-compose ps
docker-compose logs
```

---

#### **Parte 3: Verificación Funcional (8 minutos)**

**Objetivo:** Probar que toda la plataforma LMS funciona correctamente.

**A realizar:**

1. **Prueba el acceso a la API** a través del balanceador Nginx:
   - GET `http://localhost/api/cursos` (debe retornar los 3 cursos iniciales)

2. **Crea un nuevo curso** usando POST a `http://localhost/api/cursos` con datos:
   - nombre: "Física"
   - profesor: "Prof. Pérez"
   - estudiantes: 20
   - descripcion: "Mecánica clásica y relatividad"

3. **Verifica en la base de datos** que el nuevo curso se insertó correctamente usando:
   ```bash
   docker-compose exec db mysql -u${MYSQL_USER} -p${MYSQL_PASSWORD} ${MYSQL_DATABASE} -e "SELECT * FROM cursos;"
   ```

4. **Realiza 10 peticiones** a `http://localhost/api/cursos` para verificar balanceo de carga

5. **Verifica balanceo** revisando los logs de las 3 APIs confirmando que todas recibieron requests

6. **Confirma volúmenes:** Verifica que `mysql-data` y `app-data` existen y contienen datos

**Capturas requeridas:**
- [ ] GET /api/cursos respondiendo con datos iniciales
- [ ] POST nuevo curso exitoso
- [ ] SELECT en MySQL mostrando 4 cursos (3 iniciales + 1 nuevo)
- [ ] Múltiples requests distribuidos en balanceador
- [ ] Volúmenes creados y con datos

**Comandos esperados:**
```bash
curl http://localhost/api/cursos
curl -X POST http://localhost/api/cursos -H "Content-Type: application/json" -d '{"nombre":"Física","profesor":"Prof. Pérez","estudiantes":20,"descripcion":"Mecánica"}'
source .env && docker-compose exec db mysql -u${MYSQL_USER} -p${MYSQL_PASSWORD} ${MYSQL_DATABASE} -e "SELECT * FROM cursos;"
for i in {1..10}; do curl http://localhost/api/cursos; done
docker-compose logs api1 api2 api3
```

---

#### **Parte 4: Limpieza y Finalización (6 minutos)**

**Objetivo:** Documentar y limpiar la infraestructura.

**A realizar:**

1. **Genera un reporte final** que incluya:
   - Estado de todos los servicios (`docker-compose ps`)
   - Volúmenes creados (`docker volume ls`)
   - Redes creadas (`docker network ls`)
   - Imágenes utilizadas (`docker images`)

2. **Detén los servicios:**
   ```bash
   docker-compose stop
   ```

3. **Verifica estado después del stop:**
   ```bash
   docker-compose ps
   ```

4. **Para restaurar los servicios (opcional):**
   ```bash
   docker-compose start
   ```

5. **Para limpiar completamente (después de las pruebas):**
   ```bash
   docker-compose down -v
   ```

**Capturas requeridas:**
- [ ] Reporte final con estado de servicios
- [ ] Confirmación de stop
- [ ] Comandos documentados para restaurar

**Comandos esperados:**
```bash
docker-compose ps
docker volume ls
docker network ls
docker images
docker-compose stop
docker-compose ps
docker-compose start
docker-compose down -v
```

---

## 📝 ENTREGA DEL EJERCICIO 3

Debe incluir:

1. ✅ Screenshot del `docker-compose.yml` creado
2. ✅ Screenshot del `db/init.sql` con tablas y datos
3. ✅ Screenshot de `docker-compose ps` (todos servicios up)
4. ✅ Screenshot de respuesta GET /api/cursos
5. ✅ Screenshot de POST nuevo curso exitoso
6. ✅ Screenshot de SELECT en MySQL (4 cursos)
7. ✅ Screenshot de balanceo (múltiples requests)
8. ✅ Screenshot de reporte final
9. ✅ Listado de todos los comandos usados
