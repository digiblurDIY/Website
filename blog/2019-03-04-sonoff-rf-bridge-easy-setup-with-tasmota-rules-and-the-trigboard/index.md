---
title: "Sonoff RF Bridge Easy Setup with Tasmota Rules and the trigBoard"
date: "2019-03-04"
---

<iframe width="320" height="266" data-thumbnail-src="https://i.ytimg.com/vi/w_CchtI-oK0/0.jpg" src="https://www.youtube.com/embed/w_CchtI-oK0?feature=player_embedded" frameborder="0" allowfullscreen></iframe>

  
  
  
Easy setup of wireless sensors utilizing the Sonoff 433mhz RF Bridge.  Custom MQTT topics and automations with Tasmota rules all self contained in the bridge.  We also check out the trigBoard from Kevin Darrah with deep sleep modes and custom sensors all from a battery powered ESP8266 based board.  
  
[Sonoff RF Bridge](https://amzn.to/2WF2XIM)  
[TrigBoard](https://www.kevindarrah.com/wiki/index.php?title=TrigBoard)  
  
[Amazon US Link](https://amzn.to/2DDNYI4)  
  
How to Flash the RF Bridge with Tasmota: [https://youtu.be/OfSbIFIJPuc?t=40](https://youtu.be/OfSbIFIJPuc?t=40)  
  
**Wireless Sensors**  
[Door](https://www.banggood.com/GS-WDS07-Wireless-Door-Magnetic-Strip-433MHz-for-Security-Alarm-Home-System-p-1174915.html)   
[Water](https://www.banggood.com/DY-SQ100B-Water-Leakage-Detector-Rustproof-Sensor-Alarm-433MHz-for-Security-Home-Alarm-System-p-1266537.html)  
  
**Sample Home Assistant Sensor Configuration**  
  
  - platform: mqtt  
    name: "Freezer Door"  
    state\_topic: "RFBridge/sensor1"  
    availability\_topic: "tele/RFBridge1/LWT"  
    qos: 1  
    payload\_on: "Open"  
    payload\_off: "Closed"  
    payload\_available: "Online"  
    payload\_not\_available: "Offline"  
    device\_class: door
