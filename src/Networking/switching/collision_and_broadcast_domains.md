# Dominios de switching

## Dominios de colisiones

En el tema anterior, obtuvo una mejor comprensión de lo que es un switch y cómo funciona. En este tema se explica cómo funcionan los switches entre sí y con otros dispositivos para eliminar colisiones y reducir la congestión de la red. Los términos colisiones y congestión se utilizan aquí de la misma manera que se utilizan en el tráfico callejero.

En segmentos Ethernet basados en hubs antiguos, los dispositivos de red compitieron por el medio compartido. Los segmentos de red que comparten el mismo ancho de banda entre dispositivos se conocen como dominios de colisión. Cuando dos o más dispositivos del mismo dominio de colisión tratan de comunicarse al mismo tiempo, se produce una colisión.

Si un puerto Ethernet de switch funciona en semidúplex, cada segmento está en su propio dominio de colisión. No hay dominios de colisión cuando los puertos del switch funcionan en dúplex completo. Sin embargo, podría haber un dominio de colisión si un puerto de switch funciona en semidúplex.

De manera predeterminada, los puertos de Ethernet del switch negociarán automáticamente el dúplex completo cuando el dispositivo adyacente también pueda funcionar en dúplex completo. Si el puerto del switch está conectado a un dispositivo que funciona en semidúplex, como por ejemplo un hub antiguo, el puerto de switch funcionará en modo semidúplex. En el caso de semidúplex, el puerto de switch formará parte de un dominio de colisión.

Como se muestra en la figura, se elige dúplex completo si ambos dispositivos cuentan con la funcionalidad, junto con su ancho de banda común más elevado.


el diagrama muestra que un PC y un switch negociarán automáticamente la configuración y las velocidades dúplex correspondientes. En este caso dúplex completo y 100Mb por segundo


## Dominios de difusión

Una serie de switches interconectados forma un dominio de difusión simple. Solo los dispositivos de capa de red, como los routers, pueden dividir un dominio de difusión de capa 2. Los routers se utilizan para segmentar los dominios de difusión, pero también segmentan un dominio de colisión.

Cuando un dispositivo desea enviar una difusión de capa 2, la dirección MAC de destino de la trama se establece solo en números uno binarios.

El dominio de difusión de capa 2 se denomina “dominio de difusión MAC”. El dominio de difusión MAC consta de todos los dispositivos en la LAN que reciben tramas de difusión de un host.





Cuando un switch recibe una trama de difusión, la reenvía por cada uno de sus puertos, excepto por el puerto de entrada en el que se recibió la trama de difusión. Cada dispositivo conectado al switch recibe una copia de la trama de difusión y la procesa.

En ocasiones, las difusiones son necesarias para localizar inicialmente otros dispositivos y servicios de red, pero también reducen la eficacia de la red. El ancho de banda de red se usa para propagar el tráfico de difusión. Si hay demasiadas difusiones y una carga de tráfico intensa en una red, se puede producir una congestión, lo que reduce el rendimiento de la red.

Cuando hay dos switches conectados entre sí, se aumenta el dominio de difusión, como se ve en la segunda mitad de la animación. En este caso, se reenvía una trama de difusión a todos los puertos conectados en el switch S1. El switch S1 está conectado al switch S2. Luego, la trama se propaga a todos los dispositivos conectados al switch S2.




## Alivio de la congestión en la red

Los switches LAN tienen características especiales que los hacen eficaces para aliviar la congestión de una red. De manera predeterminada, los puertos de switch interconectados tratan de establecer un enlace en dúplex completo y por lo tanto se eliminan los dominios de colisión. Cada puerto dúplex completo del switch ofrece el ancho de banda completo a los dispositivos conectados a dicho puerto. Las conexiones dúplex completas aumentaron notablemente el rendimiento de las redes LAN y se requieren para velocidades de Ethernet de 1 Gb/s y superiores.

Los switches interconectan segmentos LAN, usan una tabla de direcciones MAC para determinar los puertos de salida y pueden reducir o eliminar por completo las colisiones. Las características de los switches que alivian la congestión de la red incluyen las siguientes:

- **Velocidades de puertos rápidas** : las velocidades de los puertos del switch Ethernet varían según el modelo y el propósito. Por ejemplo, la mayoría de los switches de capa de acceso admiten velocidades de puerto de 100 Mbps y 1 Gbps. Los switches de capa de distribución admiten velocidades de puerto de 100 Mbps, 1 Gbps y 10 Gbps y los switches de nivel central y centro de datos admiten velocidades de puerto de 100 Gbps, 40 Gbps y 10 Gbps. Los switches con velocidades de puerto más rápidas cuestan más pero pueden reducir la congestión.
- **Cambio interno rápido** : los switches utilizan un bus interno rápido o memoria compartida para proporcionar un alto rendimiento.
- **Búferes de trama grande** : los switches utilizan búferes de memoria grande para almacenar temporalmente más tramas recibidas antes de tener que empezar a descartarlas. Esto permite que el tráfico de entrada desde un puerto más rápido (por ejemplo, 1 Gbps) se reenvíe a un puerto de salida más lento (por ejemplo, 100 Mbps) sin perder tramas.
- **Alta densidad de puertos** : un switch de alta densidad de puertos reduce los costos generales porque reduce el número de switches requeridos. Por ejemplo, si se necesitaran 96 puertos de acceso, sería menos costoso comprar dos switches de 48 puertos en lugar de cuatro switches de 24 puertos. Los switches de alta densidad de puertos también ayudan a mantener el tráfico local, lo que ayuda a aliviar la congestión.


## Verifique su comprensión - Cambiar dominios

