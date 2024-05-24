# Ejemplo de Configuración de una VLAN - CISCO

<!--src="https://ipcisco.com/cisco-packet-tracer-configuration-examples"></-->
En este ejemplo de **VLAN Cisco Packet Tracer**, se aprendera cómo configurar VLAN en conmutadores Cisco. Para esto, se usara la  topología VLAN a continuación. En esta topología, se utilizan 2 conmutadores Cisco Catalyst 2950-24 y 6 PC . Después de este ejemplo de VLAN Packet Tracer , puede configurar las VLAN en su red.

![topología-vlan-rastreador de paquetes](./images/topología-vlan-rastreador%20de%20paquetes.png)

Puede DESCARGAR el ejemplo de Cisco Packet Tracer con formato .pkt [`Click HERE`](./labs/VLANs.pkt)

## Configuraciones de PC

Para nuestro ejemplo de configuración de VLAN, configuraremos las direcciones IP de nuestra PC como se muestra a continuación. Estas direcciones IP serán necesarias al final de este ejemplo de configuración para probar nuestra configuración.
<br/> <br/> 

- PC 1 –> 192.168.1.2 VLAN 2
- PC 2 –> 192.168.1.3 VLAN 2
- PC 3 –> 192.168.1.4 VLAN 3
- PC 4 –> 192.168.1.6 VLAN 3
- PC 5 –> 192.168.1.7 VLAN 3
- PC 6 –> 192.168.1.8 VLAN 2

## Configuración de VLAN en el Switch 1
<br/> <br/> 
Después de las configuraciones de IP de la PC, ahora podemos comenzar los pasos de configuración de VLAN Packet Tracer:
1. Configuraremos puertos de acceso que accederán a VLAN específicas. Haremos esto con el comando "`witchport mode access `" en estas interfaces.
2. También configuraremos la VLAN a la que accederá este puerto.
3. Después de eso, configuraremos el puerto troncal que transportará múltiples VLAN con el comando `swithcport mode trunk`.
4. Luego también configuraremos este puerto con el comando `no negotiate`"para evitar la negociación sobre la función del puerto.
5. Por último, configuraremos las VLAN permitidas con el comando `switchport trunk allowed vlan` en este troncal y guardaremos nuestra configuración.

```bash
Switch 1(config)# interface fastEthernet 0/2
Switch 1(config-if)# switchport mode access
Switch 1(config-if)# switchport access vlan 2

Switch 1(config)# interface fastEthernet 0/3
Switch 1(config-if)# switchport mode access
Switch 1(config-if)# switchport access vlan 2

Switch 1(config)# interface fastEthernet 0/4
Switch 1(config-if)# switchport mode access
Switch 1(config-if)# switchport access vlan 3

Switch 1(config)# interface fastEthernet 0/1
Switch 1(config-if)# switchport mode trunk
Switch 1(config-if)# switchport nonegotiate

Switch 1(config-if)# switchport trunk allowed vlan 2-4

Switch 1# copy running-config startup-config
```

## Configuración de VLAN en el Switch 2
Después de configurar el primer conmutador, configuraremos el conmutador 2 de forma similar al conmutador 1 como se muestra a continuación.

```bash
Switch 2(config)# interface fastEthernet 0/2
Switch 2(config-if)# switchport mode access
Switch 2(config-if)# switchport access vlan 3

Switch 2(config)# interface fastEthernet 0/3
Switch 2(config-if)# switchport mode access
Switch 2(config-if)# switchport access vlan 2

Switch 2(config)# interface fastEthernet 0/4
Switch 2(config-if)# switchport mode access
Switch 2(config-if)# switchport access vlan 2

Switch 2(config)# interface fastEthernet 0/1
Switch 2(config-if)# switchport mode trunk

Switch 2(config-if)# switchport nonegotiate

Switch 2(config-if)# switchport trunk allowed vlan 2-4

Switch 2# copy running-config startup-config
```

## Comprobando la configuración de VLAN
Nuestro último paso del ejemplo de VLAN Packet Tracer es la verificación de la configuración . Para verificar nuestra configuración de VLAN Packet Tracer, usaremos comandos de verificación como `show vlan brief`, `show interfaces`, `show interfaces trunk`, etc.


```bash
Switch# show vlan brief
VLAN Name Status Ports
—- ——————————– ——— ——————————-
1 default active Fa0/5, Fa0/6, Fa0/7, Fa0/8 Fa0/9,
Fa0/10, Fa0/11, Fa0/12 Fa0/13, Fa0/14,
Fa0/15, Fa0/16 Fa0/17, Fa0/18, Fa0/19,
Fa0/20 Fa0/21, Fa0/22, Fa0/23, Fa0/24

2 VLAN0002 active Fa0/2, Fa0/3

3 VLAN0003 active Fa0/4

1002 fddi-default active
1003 token-ring-default active
1004 fddinet-default active
1005 trnet-default active
```


```bash
Switch# show interfaces fasthernet 0/1 switchport
Name: Fa0/1 Switchport: Enabled Administrative Mode: trunk Operational Mode: trunk
Administrative Trunking Encapsulation: dot1q
Operational Trunking Encapsulation: dot1q
Negotiation of Trunking: Off Access Mode VLAN: 1 (default)
Trunking Native Mode VLAN: 1 (default) Voice VLAN: none
Administrative private-vlan host-association: none
Administrative private-vlan mapping: none
Administrative private-vlan trunk native VLAN: none
Administrative private-vlan trunk encapsulation: dot1q
Administrative private-vlan trunk normal VLANs: none
Administrative private-vlan trunk private VLANs: none
Operational private-vlan: none Trunking VLANs Enabled: ALL
Pruning VLANs Enabled: 2-1001
Capture Mode Disabled
Capture VLANs Allowed:
ALL Protected: false
```

```bash
Switch# show interfaces fastEthernet 0/2 switchport
Name: Fa0/2
Switchport: Enabled Administrative Mode: static access Operational Mode: static access
Administrative Trunking Encapsulation: dot1q
Operational Trunking Encapsulation: native
Negotiation of Trunking: Off
Access Mode VLAN: 2 (VLAN0002)
Trunking Native Mode VLAN: 1 (default) Voice VLAN: none
Administrative private-vlan host-association: none
Administrative private-vlan mapping: none
Administrative private-vlan trunk native VLAN: none
Administrative private-vlan trunk encapsulation: dot1q
Administrative private-vlan trunk normal VLANs: none
Administrative private-vlan trunk private VLANs: none
Operational private-vlan: none Trunking VLANs Enabled: ALL
Pruning VLANs Enabled: 2-1001
Capture Mode Disabled
Capture VLANs Allowed:
ALL Protected: false Appliance trust: none
```


```bash
Switch# show interfaces fastEthernet 0/3 switchport

Name: Fa0/3 Switchport:
Enabled Administrative Mode: static access Operational Mode: static access
Administrative Trunking Encapsulation: dot1q 
Operational Trunking Encapsulation: native 
Negotiation of Trunking: Off 
Access Mode VLAN: 2 (VLAN0002) Trunking Native Mode VLAN: 1 (default) Voice VLAN: none
Administrative private-vlan host-association: none
Administrative private-vlan mapping: none
Administrative private-vlan trunk native VLAN: none
Administrative private-vlan trunk encapsulation: dot1q 
Administrative private-vlan trunk normal VLANs: none
Administrative private-vlan trunk private VLANs: none 
Operational private-vlan: none 
Trunking VLANs Enabled: ALL 
Pruning VLANs Enabled: 2-1001 
Capture Mode Disabled 
Capture VLANs Allowed: ALL 
Protected: false Appliance trust: none
```


```bash
Switch# show interfaces fastEthernet 0/4 switchport
Name: Fa0/4
Switchport: Enabled
Administrative Mode: static access
Operational Mode: static access
Administrative Trunking Encapsulation: dot1q
Operational Trunking Encapsulation: native
Negotiation of Trunking: Off Access Mode VLAN: 3 (VLAN0003)
Trunking Native Mode VLAN: 1 (default) Voice VLAN: none
Administrative private-vlan host-association: none
Administrative private-vlan mapping: none
Administrative private-vlan trunk native VLAN: none
Administrative private-vlan trunk encapsulation: dot1q
Administrative private-vlan trunk normal VLANs: none
Administrative private-vlan trunk private VLANs: none
Operational private-vlan: none
Trunking VLANs Enabled: ALL
Pruning VLANs Enabled: 2-1001
Capture Mode Disabled
Capture VLANs Allowed:
ALL Protected: false Appliance trust: none
```


```bash 
Switch# show interfaces trunk
Port Mode Encapsulation Status Native vlan Fa0/1 on 802.1q trunking 1
Port Vlans allowed on trunk Fa0/1 2-4
Port Vlans allowed and active in management domain Fa0/1 2,3
Port Vlans in spanning tree forwarding state and not pruned Fa0/1 2,3

```

Puede verificar las mismas salidas para el interruptor 2. Las salidas para el interruptor 1 y el interruptor también se encuentran en los siguientes documentos de configuración

```bash
Switch 2# muestra breve vlan
Switch 2# muestra interfaces fastEthernet 0/1 switchport
Switch 2# muestra interfaces fastEthernet 0/2 switchport
Switch 2# muestra interfaces fastEthernet 0/3 switchport
Switch 2# muestra interfaces fastEthernet 0/4 switchport
Switch 2# muestra interfaces troncal

```

Para **verificar** la comunicación entre las **mismas VLAN**, ahora usaremos el comando ping para verificar la comunicación entre dos PC en la misma VLAN. Aquí, si las PC están en la misma VLAN, el ping se realizará correctamente. Si están en diferentes VLAN, el ping no tendrá éxito.


```bash
PC 1>ipconfig
FastEthernet0 Connection:(default port)
Link-local IPv6 Address………: FE80::2D0:BCFF:FED8:3229
IP Address………………….: 192.168.1.2
Subnet Mask…………………: 255.255.255.0
Default Gateway……………..: 0.0.0.0

 
```

```bash
PC>ping 192.168.1.3

Pinging 192.168.1.3 with 32 bytes of data:
Reply from 192.168.1.3: bytes=32 time=0ms TTL=128
Reply from 192.168.1.3: bytes=32 time=0ms TTL=128
Reply from 192.168.1.3: bytes=32 time=0ms TTL=128
Reply from 192.168.1.3: bytes=32 time=0ms TTL=128

Ping statistics for 192.168.1.3: Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds: Minimum = 0ms, Maximum = 0ms, Average = 0ms
```

```bash 
PC>ping 192.168.1.4

Pinging 192.168.1.4 with 32 bytes of data:
Request timed out.
Request timed out.
Request timed out.
Request timed out.

Ping statistics for 192.168.1.4: Packets: Sent = 4, Received = 0, Lost = 4 (100% loss)
```

```bash
PC>ping 192.168.1.6

Pinging 192.168.1.6 with 32 bytes of data:
Request timed out.
Request timed out.
Request timed out.
Request timed out.

Ping statistics for 192.168.1.6: Packets: Sent = 4, Received = 0, Lost = 4 (100% loss)
```


```bash
PC>ping 192.168.1.7

Pinging 192.168.1.7 with 32 bytes of data:
Request timed out.
Request timed out.
Request timed out.
Request timed out.

Ping statistics for 192.168.1.7: Packets: Sent = 4, Received = 0, Lost = 4 (100% loss)
```

```bash
PC>ping 192.168.1.8

Pinging 192.168.1.8 with 32 bytes of data:

Reply from 192.168.1.8: bytes=32 time=0ms TTL=128
Reply from 192.168.1.8: bytes=32 time=0ms TTL=128
Reply from 192.168.1.8: bytes=32 time=0ms TTL=128
Reply from 192.168.1.8: bytes=32 time=0ms TTL=128

Ping statistics for 192.168.1.8: Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds: Minimum = 0ms, Maximum = 0ms, Average = 0ms

 
```


Como puede ver arriba, la PC 1 puede hacer ping a las PC en la misma VLAN , incluso si está conectada a un conmutador diferente.