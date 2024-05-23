# Conceptos de switching

## Switching en la red

El concepto de switching y reenvío de tramas es universal en la tecnología de redes y en las telecomunicaciones. En las redes LAN, WAN y en la red pública de telefonía conmutada (PSTN), se usan diversos tipos de switches.

La decisión sobre cómo un switch reenvía el tráfico se toma en relación con el flujo de ese tráfico. Hay dos términos asociados a las tramas que entran y salen de una interfaz:

- **Entrada** - Este término se usa para describir el puerto por donde una trama ingresa al dispositivo.
- **Salida** - Este término se usa para describir el puerto que las tramas utilizarán al salir del dispositivo.

Un switch LAN mantiene una tabla a la que hace referencia al reenviar tráfico a través del switch. La única inteligencia de un switch LAN es su capacidad de usar su tabla para reenviar tráfico. Un switch LAN reenvía tráfico basado en el puerto de entrada y la dirección MAC de destino de una trama Ethernet. Con un switch LAN, hay solamente una tabla de switching principal que describe una asociación estricta entre las direcciones MAC y los puertos; por lo tanto, una trama Ethernet con una dirección de destino determinada siempre sale por el mismo puerto de salida, independientemente del puerto de entrada por el que ingresa.

**Nota**: Una trama Ethernet nunca se reenviará fuera del mismo puerto en el que se recibió.

## Tabla de direcciones MAC del switch

Un switch se compone de circuitos integrados y del software complementario que controla las rutas de datos a través del switch. Los switches usan direcciones MAC de destino para dirigir las comunicaciones de red a través del switch, fuera del puerto apropiado, hacia el destino.

Para definir qué puerto usar para transmitir una trama, el switch primero debe saber qué dispositivos existen en cada puerto. A medida que el switch aprende la relación de los puertos con los dispositivos, construye una tabla llamada tabla de direcciones MAC. Esta tabla se almacena en la Memoria de Contenido Direccionable (Content-Addressable Memory, CAM), la cual es un tipo especial de memoria utilizada en aplicaciones de búsqueda de alta velocidad. Por esta razón, la tabla de direcciones MAC a veces también se denomina tabla CAM.

Los switches LAN determinan cómo manejar las tramas de datos entrantes manteniendo la tabla de direcciones MAC. Un switch llena su tabla de direcciones MAC al registrar la dirección MAC de origen de cada dispositivo conectado a cada uno de sus puertos. El switch hace referencia a la información en la tabla de direcciones MAC para enviar tramas destinadas a un dispositivo específico fuera del puerto que se ha asignado a ese dispositivo.

## El método Aprender y Reenviar del Switch

El siguiente proceso de dos pasos se realiza para cada trama de Ethernet que ingresa a un switch.

**Paso 1. Aprender - Examinando la dirección Origen MAC**

Se revisa cada trama que ingresa a un switch para obtener información nueva. Esto se realiza examinando la dirección MAC de origen de la trama y el número de puerto por el que ingresó al switch.

- Si la dirección MAC de origen no existe en la tabla de direcciones MAC, la dirección MAC y el número de puerto entrante son agregados a la tabla.
- Si la dirección MAC de origen existe, el switch actualiza el temporizador para esa entrada. De manera predeterminada, la mayoría de los switches Ethernet guardan una entrada en la tabla durante cinco minutos. Si la dirección MAC de origen existe en la tabla, pero en un puerto diferente, el switch la trata como una entrada nueva. La entrada se reemplaza con la misma dirección MAC, pero con el número de puerto más actual.



**Paso 2. Reenviar - Examinadno la dirección destino MAC**

Si la dirección MAC de destino es una dirección de unidifusión, el switch busca una coincidencia entre la dirección MAC de destino de la trama y una entrada de la tabla de direcciones MAC:

- Si la dirección MAC de destino está en la tabla, reenviará la trama por el puerto especificado.
- Si la dirección MAC de destino no está en la tabla, el switch reenviará la trama por todos los puertos, excepto por el de entrada. Esto se conoce como unidifusión desconocida. Si la dirección MAC de destino es de difusión o de multidifusión, la trama también se envía por todos los puertos, excepto por el de entrada.

## Métodos de reenvío del switch

Los switches toman decisiones de reenvío de capa 2 muy rápidamente. Esto se debe al software en los circuitos integrados para aplicaciones específicas (ASIC, por sus siglas en ingles). Los ASIC reducen el tiempo de manejo de paquetes dentro del dispositivo y permiten que el dispositivo pueda manejar una mayor cantidad de puertos sin disminuir el rendimiento.

Los switches de capa 2 utilizan uno de estos dos métodos para cambiar tramas:

- **Almacenamiento y reenvío de switching** - Este método toma una decisión de reenvío en una trama después de haber recibido la trama completa y revisada para la detección de errores mediante un mecanismo matemático de verificación de errores conocido como Verificación por Redundancia Cíclica (Cyclic Redundancy Check, CRC). El intercambio por almacenamiento y envío es el método principal de switching LAN de Cisco.
- **Método de corte** - Este método inicia el proceso de reenvío una vez que se determinó la dirección MAC de destino de una trama entrante y se estableció el puerto de salida.


## Intercambio de almacenamiento y reenvío

El intercambio de almacenamiento y reenvío, a diferencia del intercambio de corte, tiene laS siguientes características principales:

- **Verificación de errores** - Después de recibir la trama completa en el puerto de entrada, el switch compara el valor de Secuencia de Verificación de Trama (Frame Check Sequence, FCS) en el último campo del datagrama con sus propios cálculos de FCS. FCS es un proceso de verificación de errores que contribuye a asegurar que la trama no contenga errores físicos ni de enlace de datos. Si la trama no posee errores, el switch la reenvía. De lo contrario, se descartan las tramas.
- **Almacenamiento en búfer automático** - El proceso de almacenamiento en buffer que usan los switches de almacenamiento y envío proporciona la flexibilidad para admitir cualquier combinación de velocidades de Ethernet. Por ejemplo, manejar una trama entrante que viaja a un puerto Ethernet de 100 Mbps que debe enviarse a una interfaz de 1 Gbps, requeriría utilizar el método de almacenamiento y reenvío. Ante cualquier incompatibilidad de las velocidades de los puertos de entrada y salida, el switch almacena la trama completa en un buffer, calcula la verificación de FCS, la reenvía al buffer del puerto de salida y después la envía.

La figura ilustra cómo almacenar y reenviar toma una decisión basada en la trama Ethernet.

La figura ilustra cómo almacenar y reenviar toma una decisión basada en la trama Ethernet.

![[Pasted image 20240511115410.png]]
## Switching por método de corte

El método de switching de almacenamiento y reenvío elimina las tramas que no pasan la comprobación FCS. Por lo tanto, no reenvía tramas no válidas.

Por el contrario, los switches que usan el método de corte pueden reenviar tramas no válidas, ya que no realizan la verificación de FCS. Sin embargo, el switching de corte tiene la capacidad de realizar un cambio de trama rápida. Esto significa que los switches que usan el método de corte pueden tomar una decisión de reenvío tan pronto como encuentren la dirección MAC de destino de la trama en la tabla de direcciones MAC, tal y como se muestra en la ilustración.



El switch no tiene que esperar a que el resto de la trama ingrese al puerto de entrada antes de tomar la decisión de reenvío.

El switching libre de fragmentos es una forma modificada de corte, en la que el switch solo comienza a reenviar la trama después de haber leído el campo Tipo. El switching libre de fragmentos proporciona una mejor verificación de errores que el método de corte, con prácticamente ningún aumento de latencia.

La velocidad de latencia más baja del switching por corte hace que resulte más adecuado para las aplicaciones mas demandantes de Tecnología Informática de Alto Rendimiento (High-Performance Computing, HPC) que requieren latencias de proceso a proceso de 10 microsegundos o menos.

El método switching de corte puede reenviar tramas con errores. Si hay un índice de error alto (tramas no válidas) en la red, el switching por método de corte puede tener un impacto negativo en el ancho de banda, de esta forma, se obstruye el ancho de banda con las tramas dañadas y no válidas.



## Actividad: El Switch!

Utilice esta actividad para comprobar su comprensión de cómo un switch aprende y reenvía tramas.



**Pregunta 1** - ¿Adónde reenviará la trama el switch?

- [ ] fa1
- [ ] fa2
- [ ] fa3
- [ ] fa4
- [ ] fa5
- [ ] fa6
- [ ] fa7
- [ ] fa8
- [ ] fa9
- [ ] fa10
- [ ] fa11
- [ ] fa12

**Pregunta 2** - ¿Cuáles de estas afirmaciones sobre el reenvío de una trama por parte del switch son verdaderas?

- [ ] Switch agrega la dirección MAC de origen que actualmente no está en la tabla de direcciones MAC.
 - [ ] La trama es una trama de difusión y se reenvía a todos los puertos.
 - [ ] La trama es una trama de unidifusión y se reenvía solamente a un puerto específico.
 - [ ] La trama es una trama de unidifusión y se distribuye por saturación a todos los puertos.
 - [ ] La trama es de unidifusión, pero se descarta en el switch.

