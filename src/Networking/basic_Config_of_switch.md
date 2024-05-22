# Configuración de parámetros iniciales de un switch

## Secuencia de arranque de un switch

Antes de poder configurar un switch, debe encenderlo y permitirle pasar por la secuencia de arranque de cinco pasos. En este tema se tratan los conceptos básicos de la configuración de un switch e incluye un laboratorio al final.

Después de encender un switch Cisco, pasa por la siguiente secuencia de inicio de cinco pasos:

Paso 1: Primero, el switch carga un programa de autodiagnóstico al encender (POST) almacenado en la memoria ROM. El POST verifica el subsistema de la CPU. Este comprueba la CPU, la memoria DRAM y la parte del dispositivo flash que integra el sistema de archivos flash.
Paso 2: A continuación, el switch carga el software del cargador de arranque. El cargador de arranque es un pequeño programa almacenado en la memoria ROM que se ejecuta inmediatamente después de que el POST se completa correctamente.
Paso 3: El cargador de arranque lleva a cabo la inicialización de la CPU de bajo nivel. Inicializa los registros de la CPU, que controlan dónde está asignada la memoria física, la cantidad de memoria y su velocidad.
Paso 4: El cargador de arranque inicia el sistema de archivos flash en la placa del sistema.
Paso 5: Por último, el cargador de arranque localiza y carga una imagen de software del sistema operativo de IOS en la memoria y delega el control del switch a IOS.

### El comando boot system

Después de encender un switch Cisco, pasa por la siguiente secuencia de inicio de cinco pasos: Si no se establece esta variable, el switch intenta cargar y ejecutar el primer archivo ejecutable que puede encontrar. En los switches de la serie Catalyst 2960, el archivo de imagen generalmente se encuentra en un directorio que tiene el mismo nombre que el archivo de imagen (excepto la extensión de archivo .bin).

El sistema operativo IOS luego inicializa las interfaces utilizando los comandos Cisco IOS que se encuentran en el archivo de configuración de inicio. Se llama al archivo startup-config config.text y se encuentra en flash.

En el ejemplo, la variable de entorno BOOT se establece mediante el boot system comando del modo de configuración global. Observe que el IOS se ubica en una carpeta distinta y que se especifica la ruta de la carpeta. Use el comando show boot para ver en qué está configurado el archivo de arranque IOS actual.

```shell
S1(config)# boot system flash:/c2960-lanbasek9-mz.150-2.SE/c2960-lanbasek9-mz.150-2.SE.bin
```


