# Laboratorio 1.1: Repaso y administración de GNU/Linux (Ubuntu Server).

**Universidad San Francisco Xavier de Chuquisaca**

**Asignatura:** Trabajando en la Nube (COM610)

**Docente:** Ing. Marcelo Quispe Ortega

**Semestre:** 1/2026

## Introducción para el Estudiante

En Linux, no usamos ventanas ni ratón para administrar servidores. Usamos la **Terminal**. Cada comando es una instrucción precisa. La terminal distingue entre mayúsculas y minúsculas (`Archivo.txt` no es lo mismo que `archivo.txt`).

## 🎯 Objetivos del Laboratorio

- **Configurar y desplegar** entornos de servidor Linux mediante virtualización, comprendiendo la asignación crítica de recursos de hardware.

- **Operar sistemas remotos** de manera segura utilizando protocolos SSH y técnicas de reenvío de puertos (Port Forwarding).

- **Implementar estructuras de acceso lógico** mediante la administración avanzada de usuarios, grupos y permisos de archivos bajo el estándar de jerarquía de archivos (FHS).

- **Gestionar el ciclo de vida del software y servicios** del sistema utilizando gestores de paquetes y orquestadores de procesos (Systemd).

- **Ejecutar diagnósticos de infraestructura** básicos mediante el monitoreo de recursos (CPU, RAM, Red) y la auditoría de registros (logs) del sistema.

## 🛠️ Sección 1: Preparación del Entorno Virtual

En esta etapa, simularemos la **provisión de hardware**. En un entorno real, estarías instalando un servidor físico en un rack o contratando el servicio de algún proveedor en la Nube; aquí, utilizaremos **VirtualBox** para crear un "servidor virtual" con las especificaciones necesarias para nuestra infraestructura.

**1.1. Creación de la Máquina Virtual (VM)**

Abre VirtualBox y haz clic en el botón **Nueva**. Sigue estas configuraciones cuidadosamente:

- **Nombre y Sistema Operativo:**

    - **Nombre:** `COM610-Lab1.1`

    - **Imagen ISO:** Busca y selecciona el archivo `.iso` de **Ubuntu Server 24.04.4 LTS** que [descargaste](https://ubuntu.com/download/server).
    
    - **Tipo y Versión:** Verifica que se auto-seleccionen como **Linux** y **Ubuntu (64-bit)**.

    - **Importante:** Marca la casilla **Omitir instalación desatendida**. Esto es vital para que tú mismo realices el proceso de instalación y aprendas cada paso.

    - **Hardware (Recursos del sistema):**

        Ajusta los recursos según la potencia de tu computadora física:

        - **Memoria Base (RAM):**

            - Si tu PC tiene 4 GB de RAM: Asigna **1024 MB**.

            - Si tu PC tiene 6 GB o más: Asigna **2048 MB**.

        - **Procesadores:**

            - Si tu PC tiene hasta 4 núcleos: Asigna **1 CPU**.

            - Si tu PC tiene más de 4 núcleos: Asigna **2 CPUs**.

        - **Disco Duro Virtual:**

            - Selecciona "Crear un disco duro virtual ahora".

            - Tamaño del disco: **20.00 GB**.

**1.2. Instalación del Sistema Operativo**

Inicia la VM haciendo clic en **Flecha Verde (Iniciar)**. El instalador de Ubuntu es puramente textual; usa las flechas del teclado para moverte y la tecla **Enter** para seleccionar.

1. **Idioma:** Selecciona **Spanish** (o Español).

2. **Teclado:** Elige la distribución que coincida con tu teclado físico (usualmente *Spanish* o *Spanish - Latin American*). Puedes probarlo en la sección "Identify keyboard".

3. **Tipo de instalación:** Selecciona la opción por defecto: **Ubuntu Server**.

4. **Red:** El instalador detectará una IP automáticamente (DHCP). No realices cambios, presiona **Hecho**.

5. **Proxy y Mirror:** Deja ambos campos en blanco (por defecto) y presiona **Hecho**.

6. **Configuración de Almacenamiento:**

    - Selecciona **Use an entire disk** (Usar todo el disco).

    - **¡Cuidado!** Asegúrate de que el disco seleccionado sea el de **20 GB**.

    - Presiona **Hecho** y confirma la escritura en el disco cuando se te solicite.

7. **Configuración del Perfil:** Introduce tu nombre, el nombre del servidor (ej. `srv-lab1`), tu nombre de usuario y una contraseña que no olvides (sugerencia: tu documento de identidad).

8. **Upgrade a Ubuntu Pro:** Selecciona **Skip for now** (Omitir por ahora).

9. **Configuración de SSH:** Marca con la barra espaciadora la opción **Install OpenSSH server**. Esto nos permitirá administrar el servidor remotamente más adelante.

10. **Software adicional:** No selecciones nada de la lista. Presiona **Hecho**.

11. **Finalización:** El sistema comenzará a instalarse. Cuando termine, aparecerá la opción **Reboot Now**. Presiona Enter, retira el medio de instalación si VirtualBox te lo pide, y espera a que aparezca el prompt de login.

**1.3. Acceso Remoto: Configuración de Reenvío de Puertos (Port Forwarding)**

Como tu servidor está dentro de una red interna de VirtualBox (NAT), tu computadora física no "ve" directamente al servidor. Para administrarlo de forma profesional, vamos a crear un "puente" o túnel que conecte un puerto de tu PC con el puerto de servicio SSH del servidor.

1. **Configuración en VirtualBox**

    1. Con la VM **COM610-Lab1.1** seleccionada (puede estar encendida o apagada), haz clic en **Configuración**.

    2. Ve al menú **Red**.

    3. Asegúrate de que en el "Adaptador 1" esté seleccionado **Conectado a: NAT**.

    4. Haz clic en el botón desplegable **Avanzadas**.

    5. Haz clic en el botón **Reenvío de puertos**.

    6. En la ventana que aparece, haz clic en el icono de **Agregar nueva regla** (el símbolo `+` verde a la derecha) y completa los datos exactamente así:

        | Nombre | Protocolo | IP anfitrión | Puerto anfitrión | IP invitado | Puerto invitado |
        | - | - | - | - | - | - |
        | SSH | TCP |   | 2222 | 10.0.2.15 | 22 |

        **¿Qué significa esto?** Le estamos diciendo a VirtualBox: "*Cualquier petición que llegue a mi PC real por el puerto 2222, envíala automáticamente al puerto 22 (SSH) de mi servidor virtual*".

    7. Haz clic en **Aceptar** en ambas ventanas para guardar.

2. **Instalación de la Terminal y Prueba de Conexión**

    Para administrar servidores, los profesionales no suelen usar la ventana pequeña de VirtualBox, sino una terminal moderna.

    1. **Instala Warp:** Descarga e instala [Warp Terminal](https://app.warp.dev/referral/3DY6RJ). Es una terminal inteligente que te ayudará mucho en este semestre.

    2. **Prueba la conexión:** Abre Warp en tu PC física y escribe el siguiente comando (reemplaza `marcelo` por el nombre de usuario que elegiste durante la instalación):

        ``` bash
        ssh -p 2222 marcelo@127.0.0.1
        ```
    3. **Primer acceso:** La terminal te preguntará: *"Are you sure you want to continue connecting (yes/no/[fingerprint])?"*. Escribe **yes** y presiona **Enter**.

    4. **Contraseña:** Introduce la contraseña que configuraste en la instalación. **Nota:** No verás asteriscos ni puntos mientras escribes por seguridad; solo escribe y presiona **Enter**.

    Si lograste entrar, verás que el texto de la terminal cambia (ej. `marcelo@srv-lab1:~$`). ¡Felicidades, ya estás administrando tu servidor de forma remota!

## 🖥️ Sección 2: Práctica Guiada (Administración de Sistemas)

Ahora que estás conectado a tu servidor mediante **Warp** vía SSH, verás una línea de texto que espera tus órdenes (el *prompt*). En un servidor, no hay íconos; todo se hace mediante verbos y sustantivos (comandos y rutas).

**2.1. Gestión de Archivos y Directorios: "Navegando en el Almacenamiento"**

Un administrador debe saber organizar la información. En Linux, todo es un archivo.

- `pwd` **(Print Working Directory)**: Te dice en qué lugar del mundo (del servidor) estás.

    ```bash
    pwd
    ```
    > Debería devolver `/home/tu_usuario`.

- `ls` (List): Lista el contenido de una carpeta.

    ```bash
    ls -la
    ```
    > La `-l` es formato largo y la `-a` muestra archivos ocultos.

- `mkdir` **(Make Directory)**: Crea carpetas para organizar servicios.

    ```bash
    mkdir -p lab1/respaldos
    ```
    > El `-p` crea toda la ruta si no existe.

- `touch`: Crea un archivo vacío. Útil para "marcar" archivos de prueba.

    ```bash
    touch lab1/notas.txt
    ```

- `cp` **(Copy)** y `mv` **(Move/Rename)**:

    ```bash
    cp lab1/notas.txt lab1/notas_backup.txt
    ```

    ```bash
    mv lab1/notas.txt /tmp/
    ```
    > Mueve el archivo a la carpeta temporal.

    ```bash
    mv lab1/notas_backup.txt lab1/final.txt
    ```
    > Renombrar o cambiar el nombre de un archivo.

- `rm` **(Remove)**: Borra archivos. ¡Cuidado! En Linux no hay papelera de reciclaje.

    ```bash
    rm lab1/final.txt
    ```
    > Para borrar carpetas con contenido usa `rm -rf`.

- `head` y `tail`: Para leer el principio o el final de archivos largos (como logs).

    ```bash
    tail -f /var/log/syslog
    ```
    > El `-f` permite ver en tiempo real cómo se escribe el archivo.

- `grep` y `find`: Los buscadores del sistema.

    ```bash
    find /etc -name "hostname"
    ```
    > Busca un archivo llamado hostname en `/etc`.

    ```bash
    grep "error" /var/log/syslog
    ```
    > Filtra todas las líneas que digan "error".

**2.2. Administración de Usuarios y Grupos: "Acceso Lógico"**

En infraestructura, nunca compartimos contraseñas. Cada departamento tiene su grupo y cada empleado su usuario.

- `groupadd` / `groupdel`: Gestión de grupos.

    ```bash
    sudo groupadd ventas
    ```
    > Crea el grupo Ventas.

    ```bash
    sudo groupadd -g 2000 contabilidad
    ```
    > Crea el grupo con un ID específico.

- `useradd` / `usermod`: Creación de usuarios.

    ```bash
    sudo useradd -u 2001 -g contabilidad -md /home/jperez -s /bin/bash -c "Juan Perez" jperez
    ```
    Ejemplo completo donde: 
    - `-u`: Especifica el ID de usuario.

    - `-g`: Le asigna al grupo contabilidad.
    
    - `-md`: Crea y selecciona su carpeta personal.

    - `-s`: Le da una terminal (bash).

    - `-c`: Añade un comentario con su nombre real.

- `passwd` y `chage`: Seguridad de contraseñas.

    ```bash
    sudo passwd jperez
    ```
    > Asigna contraseña.

    ```bash
    sudo chage -M 90 jperez
    ```
    > Obliga a cambiar la contraseña cada 90 días.

**2.3. El Comando `sudo` y Gestión de Paquetes: "Instalando la Capa de Software"**

- `sudo` es el prefijo que te da poderes de "Dios" (Root) temporalmente. Sin él, no puedes modificar el sistema.

- `apt` **(Advanced Package Tool)**: Es tu "tienda de aplicaciones".

    ```bash
    sudo apt update
    ```
    > Actualiza la lista de software disponible. **Hazlo siempre primero**.

    ```bash
    sudo apt upgrade
    ```
    > Descarga e instala las actualizaciones de seguridad del SO.

    ```bash
    sudo apt install nginx
    ```
    > Instala el servidor web Nginx.

    ```bash
    sudo apt remove nginx
    ```
    > Borra el programa pero deja la configuración.

    ```bash
    sudo apt purge nginx
    ```
    > Borra el programa y todos sus archivos de configuración.

**2.4. Control de Servicios: `systemctl`**

Una vez instalado un programa (como `Nginx`), este corre como un "demonio" o servicio en segundo plano.

- `status`: Verifica si el servicio está vivo.

    ```bash
    sudo systemctl status nginx
    ```

- `stop` / `start` / `restart`: detiene, inicia y/o reinicia.

    ```bash
    sudo systemctl status nginx
    ```

    ```bash
    sudo systemctl stop nginx
    ```
    >  Apaga el servidor web    .

- `enable` / `disable`:

    ```bash
    sudo systemctl enable nginx
    ```
    > Hace que el servidor web encienda solo cuando se prenda la computadora.

**2.5. Permisos de Archivos: `chmod` y `chown`**

Esto determina quién puede ver o modificar qué. Es la base de la seguridad en el Data Center.

- `chown` `(Change Owner)`: Cambia el dueño y el grupo.

    ```bash
    sudo chown jperez:contabilidad informe.txt
    ```

- `chmod` **(Change Mode)**: Cambia los permisos (Lectura=4, Escritura=2, Ejecución=1).

    ```bash
    sudo chmod 640 informe.txt
    ```

    Donde:
    - `6` (4+2): Dueño puede leer y escribir.

    - `4`: Grupo puede solo leer.

    - `0`: El resto del mundo no puede hacer nada.

**2.6. Comandos de Red: "Verificando la Conectividad"**

Un servidor desconectado no sirve de nada.

- `ip addr`: Te muestra tu dirección IP real. Busca la que está bajo `eth0` o `enp0s3`.

    ```bash
    ip addr
    ```

- `ping`: Verifica si puedes "ver" a otro equipo.

    ```bash
    ping -c 4 google.com
    ```
    > Envía 4 paquetes a Google.

- `ss` o `netstat`: Muestra qué puertos están abiertos en tu servidor (quién está escuchando).

    ```bash 
    ss -tunlp
    ```
    > Muestra puertos TCP/UDP activos y qué programa los usa.

**2.7. Diagnóstico de Hardware y Sistema Base**

Antes de realizar cambios, debemos conocer nuestra plataforma.

1. **Identificación del Sistema:**

    - `uname -a`: Muestra la versión del kernel y la arquitectura.

        ```bash
        uname -a
        ```

    - `hostnamectl`: Verifica el nombre del nodo. Puedes cambiarlo con `sudo`. 
        
        ```bash
        sudo hostnamectl set-hostname nodo-monitoreo-usfx
        ```

2. **Exploración de Hardware:**

    - `lscpu`: Visualiza los núcleos y arquitectura del procesador.

        ```bash
        lscpu
        ```

    - `lsblk`: Lista los bloques de almacenamiento. 

        ```bash
        lsblk
        ```
        > Identifica el nuevo disco de 5GB (probablemente aparece como `sdb` o `sdc`).

**2.8. Configuración de Red Avanzada (Netplan)**

Creamos una segunda interfaz de red en VirtualBox para la máquina virtual y configuramos la interfaz tipo puente con una IP fija para que el servidor sea localizable dentro de la misma red del anfitrión.

1. Identifica el nombre de la nueva interfaz (ej. `enp0s8`) con `ip addr`.

    ```bash
    ip addr
    ```

2. Edita la configuración:

    ```bash
    sudo nano /etc/netplan/01-netcfg.yaml
    ```

3. Aplica una configuración similar a esta (ajustando a tu red local):

    ```yaml
    network:
    version: 2
    ethernets:
        enp0s8:
        dhcp4: no
        addresses: [192.168.1.100/24] # Usa una IP libre de tu red real
        gateway4: 192.168.1.1
        nameservers:
            addresses: [8.8.8.8, 1.1.1.1]
    ```

4. Aplica los cambios: 
    ```bash
    sudo netplan apply
    ```

**2.9. Instalación de Software y Repositorios de Terceros**

A veces el software oficial no es suficiente y necesitamos repositorios PPA (Personal Package Archives).

1. **Agregar Repositorio:** 

    ```bash
    sudo add-apt-repository ppa:pitti/proctools -y
    ```

2. **Actualizar e Instalar:** 

    ```bash
    sudo apt update && sudo apt install ncdu nload -y
    ```

    - `ncdu`: Herramienta visual para ver qué carpetas ocupan más espacio.

    - `nload`: Monitor de tráfico de red en tiempo real.

**2.10. Monitoreo de Rendimiento y Procesos**

¿Cómo saber si el servidor está sufriendo?

1. **Memoria y CPU:**

    - `free -m`: Verifica que la nueva SWAP aparezca sumada a la RAM.

        ```bash
        free -m
        ```

    - `htop`: Visualiza el uso de CPU. Identifica procesos con mucho consumo.

        ```bash
        htop
        ```

    - `vmstat 1 5`: Reporta estadísticas en tiempo real sobre los recursos del sistema. 

        ```bash
        vmstat 1 5
        ```
        > Observa la entrada/salida y el uso de memoria virtual cada segundo.

2. **Gestión de Procesos:**

    - `ps` (Process Status) muestra una instantánea de los procesos activos, permitiendo identificar su PID (ID de proceso).
        
        ```bash
        ps -aux | grep nginx
        ```
        > Localiza el ID de proceso (PID) de Nginx.
    
    - `kill` envía señales a dichos procesos (generalmente terminarlos) usando su PID.

        ```bash
        sudo kill -HUP [PID]
        ```
        > Reinicia un proceso sin apagarlo (recarga configuración).

        ```bash
        sudo kill -9 [PID]
        ```
        > Finaliza el proceso de manera forzada.

**2.11. Auditoría, Logs y Pruebas de Estrés**

Simularemos una falla crítica para aprender a leer los registros.

1. **Visualización de Logs:**

    ```bash
    journalctl -p err
    ```
    > Muestra solo los errores del sistema desde el último arranque.

    ```bash
    tail -n 20 /var/log/auth.log
    ```
    > Revisa los últimos intentos de acceso al servidor.

2. **Prueba de Estrés:**

    - Instala el paquete `stress`:
    
        ```bash
        sudo apt install stress
        ```

    - **Ejercicio de carga:** Ejecuta:

        ```bash
        stress --cpu 2 --io 1 --vm 1 --vm-bytes 128M --timeout 60s
        ```

    - En otra terminal abierta con `htop`, observa cómo cambian las barras de color y el "Load Average".

3. **Prueba de Escritura (Rendimiento de Disco):**

    ```bash
    dd if=/dev/zero of=/mnt/datosA/testfile bs=1G count=1 oflag=dsync
    ```
    > Esto creará un archivo de 1GB y te dirá la velocidad real (MB/s) de tu almacenamiento.

**2.12. Automatización con Cron**

Programaremos una tarea de limpieza automática.

1. Escribe:

    ```bash
    sudo crontab -e
    ```

2. Añade una regla para que el sistema limpie los logs temporales todos los días a las 03:00 AM:

    ```
    0 3 * * * rm -rf /var/tmp/*
    ```

## 🏗️ Sección 3: Práctica Individual (Desafío de Infraestructura)

**"El Nodo de Servicios USFX"**

**Contexto del Escenario:**

Has sido contratado por la Facultad de Tecnología para configurar un servidor base que servirá como nodo para alojar aplicaciones académicas. Tu tarea es preparar el sistema siguiendo estrictas políticas de seguridad y organización.

**Ejercicio 1: Jerarquía de Aplicaciones y Permisos**

El servidor debe albergar una aplicación llamada `plataforma_usfx`.

1. Crea la carpeta `/srv/plataforma_usfx`.

2. Crea un grupo de sistema llamado `desarrolladores`.

3. Crea un usuario llamado `webmaster` (con su propia carpeta personal y shell /bin/bash).

4. Cambia el dueño de la carpeta `/srv/plataforma_usfx` para que pertenezca al usuario `webmaster` y al grupo `desarrolladores`.

5. Configura los permisos para que el dueño tenga control total, el grupo pueda leer y entrar a la carpeta, y el resto del mundo no tenga acceso alguno.

**Ejercicio 2: Automatización de Seguridad**

El departamento de seguridad exige que todos los servidores limpien sus archivos temporales de auditoría semanalmente.

1. Crea un archivo vacío en `/tmp/audit_test.log`.

2. Programa una tarea en el `crontab` de **root** que elimine todos los archivos con extensión `.log` dentro de `/tmp/` todos los domingos a las 23:59.

**Ejercicio 3: Despliegue de Servicio y Monitoreo de Red**

La facultad necesita un servidor de prueba activo.

1. Instala el servidor web **Nginx**.

2. Asegúrate de que el servicio esté configurado para iniciar automáticamente con el sistema.

3. Utiliza el comando `ss` o `netstat` para demostrar que el servidor está escuchando peticiones en el puerto 80.

        Captura requerida: Salida del comando de red filtrando por el puerto 80.

**Ejercicio 4: Gestión de Usuarios y Seguridad de Acceso**

Se debe dar acceso a un pasante para que solo monitoree el sistema.

1. Crea el usuario `pasante_it`.

2. Configura su cuenta para que la contraseña expire obligatoriamente en 30 días.

3. Bloquea al usuario para que **no pueda** usar el comando `sudo` (verifica que no esté en el grupo `sudo` o `admin`). Registra el intento fallido de usar `sudo` con ese usuario.

**Ejercicio 5: Diagnóstico de Estrés de Recursos**

Debes documentar cómo se comporta el servidor ante una carga de trabajo simulada.

1. Ejecuta una prueba de estrés (`stress`) que consuma 1 núcleo de CPU y 128MB de RAM durante 30 segundos.

2. Mientras la prueba corre, abre otra terminal y usa `htop` para identificar el proceso de `stress` y el porcentaje de uso de CPU.

**Ejercicio 6: Acceso Seguro mediante Llaves SSH (Uso de `ssh-keygen` y `ssh-copy-id`).**

Para evitar el uso de contraseñas (que son vulnerables a ataques de fuerza bruta), configuraremos un acceso basado en criptografía de clave pública, el estándar utilizado en nubes como AWS.

1. **Generación de llaves en la PC Real:** Desde la terminal de tu computadora física (Warp o PowerShell), genera un par de llaves RSA de 4096 bits utilizando `ssh-keygen`.

2. **Transferencia de la llave al Servidor:** Envía tu llave pública al servidor virtual utilizando el comando `ssh-copy-id`.

3. **Prueba de conexión sin contraseña:** Intenta ingresar al servidor. Ahora el sistema no debería pedirte tu contraseña de usuario.

### 📄 Instrucciones para los Entregables

Para aprobar este laboratorio, debes presentar un **Informe Técnico en formato PDF** que cumpla estrictamente con los siguientes puntos:

1. **Estructura del Informe:**

    - Portada (Nombre, Carrera, Asignatura).

    - Desarrollo: Una sección por cada una de las **6 ejercicios** planteadas arriba.

2. **Requisitos de las Capturas de Pantalla:**

    - Deben ser claras y legibles (se recomienda el uso de modo oscuro en la terminal para mejor contraste).

    - **Descripción Obligatoria:** Debajo de cada captura, debes escribir una breve explicación del comando utilizado y qué resultado se está observando.

    - *Ejemplo:* "En la imagen superior se observa el comando `ls -l /srv/plataforma`, donde se verifican los permisos asignados al usuario y grupo."

3. **Conclusión Final:**

    - Al finalizar el documento, incluye una breve conclusión personal (mínimo 10 líneas) sobre la importancia de la administración por línea de comandos en la gestión de infraestructura de TI.