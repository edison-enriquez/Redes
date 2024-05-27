# Conceptos de enrutamiento

## Dos funciones del router

Antes de que un router reenvíe un paquete a cualquier lugar, tiene que determinar la mejor ruta para que el paquete tome. En este tema se explica cómo los enrutadores realizan esta determinación.

Los switches Ethernet se utilizan para conectar dispositivos finales y otros dispositivos intermediarios, como otros conmutadores Ethernet, a la misma red. Un router conecta varias redes, lo que significa que posee varias interfaces, cada una de las cuales pertenece una red IP diferente.

Cuando un router recibe un paquete IP en una interfaz, determina qué interfaz debe usar para reenviar el paquete hacia el destino. Esto se conoce como enrutamiento. La interfaz que usa el router para reenviar el paquete puede ser el destino final o una red conectada a otro router que se usa para llegar a la red de destino. Generalmente, cada red a la que se conecta un router requiere una interfaz separada, pero puede que este no siempre el caso.

Las funciones principales de un router son determinar la mejor ruta para reenviar paquetes basándose en la información de su tabla de enrutamiento, y reenviar paquetes hacia su destino.

### Ejemplo de Funciones del router
El router usa su tabla de routing para encontrar la mejor ruta para reenviar un paquete. Haga clic en Reproducir en la animación de la ilustración, para seguir un paquete desde la computadora de origen hasta la computadora de destino. Observe cómo tanto R1 como R2 utilizan sus respectivas tablas de enrutamiento IP para determinar primero la mejor ruta y, a continuación, reenviar el paquete.

[![Video]()](./video/video_routing_1.mov)


## Mejor ruta es igual a la coincidencia más larga

¿Qué significa que el router deba encontrar la mejor coincidencia en la tabla de routing? La mejor ruta de la tabla de enrutamiento también se conoce como la coincidencia más larga. La coincidencia más larga es un proceso que el router utiliza para encontrar una coincidencia entre la dirección IP de destino del paquete y una entrada de enrutamiento en la tabla de enrutamiento.

La tabla de enrutamiento contiene entradas de ruta que consisten en un prefijo (dirección de red) y una longitud de prefijo. Para que haya una coincidencia entre la dirección IPv4 de destino de un paquete y una ruta en la tabla de routing, una cantidad mínima de los bits del extremo izquierdo deben coincidir entre la dirección IPv4 del paquete y la ruta en la tabla de routing. La máscara de subred de la ruta en la tabla de routing se utiliza para determinar la cantidad mínima de bits del extremo izquierdo que deben coincidir. Recuerde que un paquete IP sólo contiene la dirección IP de destino y no la longitud del prefijo.

La mejor coincidencia es la ruta de la tabla de routing que contiene la mayor cantidad de bits del extremo izquierdo coincidentes con la dirección IPv4 de destino del paquete. La ruta con la mayor cantidad de bits del extremo izquierdo equivalentes, o la coincidencia más larga, es siempre la ruta preferida.

Nota: El término longitud del prefijo se utilizará para hacer referencia a la parte de red de direcciones IPv4 e IPv6.

### Ejemplo de coincidencia más larga de direcciones IPv4
En la tabla, un paquete IPv4 tiene la dirección IPv4 de destino 172.16.0.10. El router tiene tres rutas posibles que coinciden con este paquete: 172.16.0.0/12, 172.16.0.0/18 y 172.16.0.0/26. De las tres rutas, 172.16.0.0/26 tiene la coincidencia más larga y se elige para reenviar el paquete. Recuerde que para que cualquiera de estas rutas se considere una coincidencia debe tener al menos la cantidad de bits coincidentes que se indica en la máscara de subred de la ruta.

|Dirección IPv4 de destino	|Dirección de host en formato binario|
|--|--|
|172.16.0.10|	10101100.00010000.00000000.00001010|


|Entradas de ruta	|Longitud del prefijo/prefijo	|Dirección de host en formato binario|
|1	|172.16.0.0/12	|10101100.00010000.000000001010|
|2	|172.16.0.0/18	|10101100.00010000.00000000.00001010|
|3	172.16.0.0/26	10101100.00010000.00000000.00001010|

Ejemplo de coincidencia más larga de direcciones IPv6
En la tabla, un paquete IPv6 tiene la dirección IPv6 de destino 2001:db8:c000: :99. En este ejemplo se muestran tres entradas de ruta, pero sólo dos de ellas son una coincidencia válida, siendo una de ellas la coincidencia más larga. Las dos primeras entradas de ruta tienen longitudes de prefijo que tienen el número requerido de bits coincidentes como indica la longitud del prefijo. La primera entrada de ruta con una longitud de prefijo de /40 coincide con los 40 bits del extremo izquierdo de la dirección IPv6. La segunda entrada de ruta tiene una longitud de prefijo de /48 y con los 48 bits que coinciden con la dirección IPv6 de destino, y es la coincidencia más larga. La tercera entrada de ruta no coincide porque su prefijo /64 requiere 64 bits coincidentes. Para que el prefijo 2001:db8:c 000:5555: :/64 sea una coincidencia, los primeros 64 bits deben ser la dirección IPv6 de destino del paquete. Solo coinciden los primeros 48 bits, por lo que esta entrada de ruta no se considera una coincidencia.

Para el paquete IPv6 de destino con la dirección 2001:db8:c000: :99, considere las tres entradas de ruta siguientes:

|Entradas de ruta	|Longitud del prefijo/prefijo	|¿Coincide?|
|1	|2001:db8:c000::/40	|Partido de 40 bits|
|2	|2001:db8:c000::/48	|Partido de 48 bits (partido más largo)|
|3	|2001:db8:c000:5555:: /64	|No coincide con 64 bits|

## Creación de la tabla de enrutamiento
Una tabla de enrutamiento consta de prefijos y sus longitudes de prefijo. Pero, ¿cómo aprende el router sobre estas redes? ¿Cómo rellena R1 en la figura su tabla de enrutamiento?

Redes desde la perspectiva de R1


1. **Redes conectadas directamente**

Las redes conectadas directamente son redes que están configuradas en las interfaces activas de un router. Una red conectada directamente se agrega a la tabla de enrutamiento cuando una interfaz se configura con una dirección IP y una máscara de subred (longitud de prefijo) y está activa (arriba y arriba).

2. **Redes remotas**

Las redes remotas son redes que no están conectadas directamente al router. Un router descubre redes remotas de dos maneras:

- Rutas estáticas : se agrega a la tabla de enrutamiento cuando se configura manualmente una ruta. Protocolos de enrutamiento dinámico : se han añadido a la tabla de enrutamiento cuando los protocolos de enrutamiento aprenden dinámicamente acerca de la red remota. Estos protocolos incluyen el protocolo de información de routing versión 2 (RIPv2), abrir primero la ruta más corta (OSPF) y el protocolo de routing de gateway interior mejorado (EIGRP).

3. **Ruta predeterminada**

Una ruta predeterminada específica un router de salto siguiente que se utilizará cuando la tabla de enrutamiento no contiene una ruta específica que coincida con la dirección IP de destino. La ruta predeterminada puede configurarse manualmente como ruta estática o puede introducirla el protocolo de routing.

Una ruta predeterminada sobre IPv4 tiene una entrada de ruta de 0.0.0.0/0 y una ruta predeterminada sobre IPv6 tiene una entrada de ruta de: :/0. La longitud del prefijo /0 indica que cero bits o ningún bit deben coincidir con la dirección IP de destino para que se utilice esta entrada de ruta. Si no hay rutas con una coincidencia más larga, más de 0 bits, entonces la ruta predeterminada se utiliza para reenviar el paquete. A veces, la ruta predeterminada se conoce como una puerta de enlace de último recurso.

### Preguntas

1. ¿Qué tabla utiliza un router para determinar cómo reenviar un paquete IP?
2. ¿Qué acción tomará un router en un paquete con una dirección IP de destino que se encuentra en una red remota?
3. Qué se utiliza para determinar el número mínimo de bits de extrema izquierda que deben coincidir entre el prefijo en la entrada de ruta y la dirección IP de destino.

