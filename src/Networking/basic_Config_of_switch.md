# Configuración de parámetros iniciales de un switch

## 1. Secuencia de arranque de un switch
</br>
Antes de poder configurar un switch, debe encenderlo y permitirle pasar por la secuencia de arranque de cinco pasos. En este tema se tratan los conceptos básicos de la configuración de un switch e incluye un laboratorio.
</br></br>
Después de encender un switch Cisco, pasa por la siguiente secuencia de inicio de cinco pasos:
</br></br>

- **Paso 1**: Primero, el switch carga un programa de autodiagnóstico al encender (POST) almacenado en la memoria ROM. El POST verifica el subsistema de la CPU. Este comprueba la CPU, la memoria DRAM y la parte del dispositivo flash que integra el sistema de archivos flash.
- **Paso 2**: A continuación, el switch carga el software del cargador de arranque. El cargador de arranque es un pequeño programa almacenado en la memoria ROM que se ejecuta inmediatamente después de que el POST se completa correctamente.
- **Paso 3**: El cargador de arranque lleva a cabo la inicialización de la CPU de bajo nivel. Inicializa los registros de la CPU, que controlan dónde está asignada la memoria física, la cantidad de memoria y su velocidad.
- **Paso 4**: El cargador de arranque inicia el sistema de archivos flash en la placa del sistema.
- **Paso 5**: Por último, el cargador de arranque localiza y carga una imagen de software del sistema operativo de IOS en la memoria y delega el control del switch a IOS.

### 2. El comando boot system

Después de encender un switch Cisco, pasa por la siguiente secuencia de inicio de cinco pasos: Si no se establece esta variable, el switch intenta cargar y ejecutar el primer archivo ejecutable que puede encontrar. En los switches de la serie Catalyst 2960, el archivo de imagen generalmente se encuentra en un directorio que tiene el mismo nombre que el archivo de imagen (excepto la extensión de archivo .bin).

El sistema operativo IOS luego inicializa las interfaces utilizando los comandos Cisco IOS que se encuentran en el archivo de configuración de inicio. Se llama al archivo startup-config config.text y se encuentra en flash.

En el ejemplo, la variable de entorno BOOT se establece mediante el boot system comando del modo de configuración global. Observe que el IOS se ubica en una carpeta distinta y que se especifica la ruta de la carpeta. Use el comando show boot para ver en qué está configurado el archivo de arranque IOS actual.

```shell
S1(config)# boot system flash:/c2960-lanbasek9-mz.150-2.SE/ \
                        c2960-lanbasek9-mz.150-2.SE.bin
```

La tabla define cada parte del comando **`boot system`**.

</br>

| Comando                             | Definición                     |
| ----------------------------------- | ------------------------------ |
| **`boot syste`**                      | El comando principal           |
| **`flash:`**                          | The storage device             |
| **`c2960-lanbasek9-mz.150-2.SE/`**    | La ruta al sistema de archivos |
| **`c2960-lanbasek9-mz.150-2.SE.bin`** | El nombre del archivo IOS      |

## 3. Indicadores LED del switch

Los switches Cisco Catalyst tienen varios indicadores luminosos LED de estado. Puede usar los LED del switch para controlar rápidamente la actividad y el rendimiento del switch. Los diferentes modelos y conjuntos de características de los switches tienen diferentes LED, y la ubicación de estos en el panel frontal del switch también puede variar.

En la ilustración, se muestran los LED y el botón Mode de un switch Cisco Catalyst 2960.
<br>

<img src="https://i.ibb.co/hmY3yFq/Pasted-image-20240510152917.png" alt="Pasted-image-20240510152917" border="0">

El botón Modo (7 en la figura) se usa para alternar entre el estado del puerto, el dúplex del puerto, la velocidad del puerto y, si es compatible, el estado de la alimentación a través de Ethernet (PoE) de los LED del puerto (8 en la figura).


1. **LED del sistema**
   Muestra si el sistema está recibiendo energía y funciona correctamente. Si el LED está apagado, significa que el sistema no está encendido. Si el LED es de color verde, el sistema funciona normalmente. Si el LED es de color ámbar, el sistema recibe alimentación pero no funciona correctamente.

2. **LED del sistema de alimentación redundante (RPS)**
   Muestra el estado de RPS. Si el LED está apagado, el RPS está apagado o no está conectado correctamente. Si el LED es de color verde, el RPS está conectado y listo para proporcionar alimentación de respaldo. Si el LED parpadea y es de color verde, el RPS está conectado pero no está disponible porque está proporcionando alimentación a otro dispositivo. Si el LED es de color ámbar, el RPS está en modo de reserva o presenta una falla. Si el LED parpadea y es de color ámbar, la fuente de alimentación interna del switch presenta una falla, y el RPS está proporcionando alimentación.

3. **LED de estado del puerto**
   Muestra el estado de RPS. Si el LED está apagado, el RPS está apagado o no está conectado correctamente. Si el LED es de color verde, el RPS está conectado y listo para proporcionar alimentación de respaldo. Si el LED parpadea y es de color verde, el RPS está conectado pero no está disponible porque está proporcionando alimentación a otro dispositivo. Si el LED es de color ámbar, el RPS está en modo de reserva o presenta una falla. Si el LED parpadea y es de color ámbar, la fuente de alimentación interna del switch presenta una falla, y el RPS está proporcionando alimentación.
   
4. **LED de modo dúplex del puerto**
   Indica que el modo dúplex del puerto está seleccionado cuando el LED está verde. Al seleccionarlo, los LED del puerto que están apagados están en modo semidúplex. Si el LED del puerto es de color verde, el puerto está en modo dúplex completo.
   
5. **LED de velocidad del puerto**
   Indica que el modo de velocidad del puerto está seleccionado. Al seleccionarlo, los indicadores LED del puerto muestran colores con diferentes significados. Si el LED está apagado, el puerto está funcionando a 10 Mbps. Si el LED es verde, el puerto está funcionando a 100 Mbps. Si el LED parpadea en verde, el puerto está funcionando a 1000 Mbps.
   
1. **LED de modo de alimentación por Ethernet**
   Si se admite PoE, estará presente un LED de modo PoE. Si el LED está apagado, indica que no se seleccionó el modo de alimentación por Ethernet, que a ninguno de los puertos se le negó el suministro de alimentación y ninguno presenta fallas. Si el LED está parpadeando en ámbar, el modo PoE no está seleccionado, pero al menos uno de los puertos ha sido denegado o tiene una falla PoE. Si el LED es de color verde, indica que se seleccionó el modo de alimentación por Ethernet, y los LED del puerto muestran colores con diferentes significados. Si el LED del puerto está apagado, la alimentación por Ethernet está desactivada. Si el LED del puerto es de color verde, la alimentación por Ethernet está activada. Si el LED del puerto alterna entre verde y ámbar, se niega la alimentación por Ethernet, ya que, si se suministra energía al dispositivo alimentado, se excede la capacidad de alimentación del switch. Si el LED parpadea en ámbar, PoE está apagado debido a una falla. Si el LED es de color ámbar, se inhabilitó la alimentación por Ethernet para el puerto.
## Recuperarse de un bloqueo del sistema

El cargador de arranque proporciona acceso al switch si no se puede usar el sistema operativo debido a la falta de archivos de sistema o al daño de estos. El cargador de arranque tiene una línea de comandos que proporciona acceso a los archivos almacenados en la memoria flash.

Se puede acceder al cargador de arranque mediante una conexión de consola con los siguientes pasos:

**Paso 1**. Conecte una computadora al puerto de consola del switch con un cable de consola. Configure el software de emulación de terminal para conectarse al switch.  
**Paso 2**. Desconecte el cable de alimentación del switch.  
**Paso 3**. Vuelva a conectar el cable de alimentación al interruptor y, en 15 segundos, presione y mantenga presionado el botón **Mode** mientras el LED del sistema todavía parpadea en verde.  
**Paso 4**. Continúe presionando el botón **Mode** hasta que el LED del sistema se vuelva brevemente ámbar y luego verde sólido; luego suelte el botón **Mode**.  
**Paso 5**. The boot loader **switch:** El mensaje aparece en el software de emulación de terminal en la PC.

Escriba **help** o **?** en el símbolo del gestor de arranque para ver una lista de comandos disponibles.

De manera predeterminada, el switch intenta iniciarse automáticamente mediante el uso de información en la variable de entorno BOOT. Para ver la ruta de acceso de la variable de entorno BOOT del switch, escriba el comando **set**. A continuación, inicialice el sistema de archivos flash utilizando el comando **flash_init** para ver los archivos actuales en flash, como se muestra en la salida.
# Simulación de Consola Cisco

<div class="console-container" id="terminal"></div>

<script src="https://cdn.jsdelivr.net/npm/xterm/lib/xterm.js"></script>
