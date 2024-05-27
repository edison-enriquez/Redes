# Configuración básica de un router

## Topología
Un router utiliza una tabla de enrutamiento para determinar a dónde enviar los paquetes. Pero antes de sumergirse en los detalles de la tabla de enrutamiento IP, este tema revisa las tareas básicas de configuración y verificación del enrutador. También completarás una actividad de Rastreador de paquetes para actualizar tus habilidades.

La topología de la figura se utilizará para los ejemplos de configuración y verificación. También se usará en el siguiente tema para discutir la tabla de enrutamiento IP.

![alt text](./img/topology.png)

### Comandos de Configuración
Los siguientes ejemplos muestran la configuración completa de R1.

```bash
Router> enable
Router# configure terminal
Enter configuration commands, one per line. End with CNTL/Z.
Router(config)# hostname R1
R1(config)# enable secret class 
R1(config)# line console 0  
R1(config-line)# logging synchronous
R1(config-line)# password cisco 
R1(config-line)# login 
R1(config-line)# exit 
R1(config)# line vty 0 4 
R1(config-line)# password cisco 
R1(config-line)# login 
R1(config-line)# transport input ssh telnet 
R1(config-line)# exit 
R1(config)# service password-encryption 
R1(config)# banner motd #
Enter TEXT message. End with a new line and the #
***********************************************
WARNING: Unauthorized access is prohibited!
***********************************************
#
R1(config)# ipv6 unicast-routing
R1(config)# interface gigabitethernet 0/0/0
R1(config-if)# description Link to LAN 1
R1(config-if)# ip address 10.0.1.1 255.255.255.0 
R1(config-if)# ipv6 address 2001:db8:acad:1::1/64 
R1(config-if)# ipv6 address fe80::1:a link-local
R1(config-if)# no shutdown
R1(config-if)# exit
R1(config)# interface gigabitethernet 0/0/1
R1(config-if)# description Link to LAN 2
R1(config-if)# ip address 10.0.2.1 255.255.255.0 
R1(config-if)# ipv6 address 2001:db8:acad:2::1/64 
R1(config-if)# ipv6 address fe80::1:b link-local
R1(config-if)# no shutdown
R1(config-if)# exit
R1(config)# interface serial 0/1/1
R1(config-if)# description Link to R2
R1(config-if)# ip address 10.0.3.1 255.255.255.0 
R1(config-if)# ipv6 address 2001:db8:acad:3::1/64 
R1(config-if)# ipv6 address fe80::1:c link-local
R1(config-if)# no shutdown
R1(config-if)# exit
R1# copy running-config startup-config 
Destination filename [startup-config]? 
Building configuration...
[OK]
R1#
```

### Comandos de verificación
Algunos comandos de verificación comunes incluyen los siguientes:

- `show ip interface brief`
- `show running-config interface interface-type number`
- `show interfaces`
- `show ip interface`
- `show ip route`
- `ping`

En cada caso, ip reemplace ipv6 por la versión IPv6 del comando. La figura muestra de nuevo la topología para facilitar la referencia.

![alt text](./img/ipv6%20topology.png)