---
title: "DIY Smart Laundry - Electric Dryer Voice Notifications"
date: "2019-04-18"
---

<iframe width="320" height="266" data-thumbnail-src="https://i.ytimg.com/vi/1tqJkw5f0iA/0.jpg" src="https://www.youtube.com/embed/1tqJkw5f0iA?feature=player_embedded" frameborder="0" allowfullscreen></iframe>

  
  
Do you use an electric dryer and need a solution to send voice notifications when the cycle is complete?  Let's build a simple non-invasive DIY sensor that monitors the electrical draw from the dryer using a Wemos D1/NodeMCU, a couple resistors, capacitor and a split core current transformer.  You can also apply this same project to many other electrical monitoring projects in the home.   
  
**Parts List**  
[Split Core Current Transformer](https://amzn.to/2XDcnoX)  
[Wemos D1 Mini](https://amzn.to/2SHvFpk)   
[10µF Capacitor](https://amzn.to/2VFhGC6)  
[10k Resistors](https://amzn.to/2ErWhWi)   
[Preformed Jumpers](https://amzn.to/2Ha3bCs)  
[Breadboard](https://amzn.to/2HbdINP)  
  
[Alternative NodeMCU 8266](https://amzn.to/2Eo3Ahu)   
[Alternative NodeMCU 8285](https://amzn.to/2TdNMIo)  
  
[Amazon US Link](https://amzn.to/2DDNYI4)  
  
**Connect with Us**  
Patreon - [https://www.patreon.com/digiblurDIY](https://www.patreon.com/digiblurDIY)  
Discord - [https://discord.gg/bNtTF2v](https://discord.gg/bNtTF2v)  
  
**Misc Links**  
Wiring Diagrams and Arduino Sketch - [https://github.com/digiblur/digiDryerMon](https://github.com/digiblur/digiDryerMon)  
Arduino IDE Download - [https://www.arduino.cc/en/Main/Software](https://www.arduino.cc/en/Main/Software)  
AsyncMQTT - [https://github.com/marvinroger/async-mqtt-client](https://github.com/marvinroger/async-mqtt-client)  
ESPAsyncTCP - [https://github.com/me-no-dev/ESPAsyncTCP](https://github.com/me-no-dev/ESPAsyncTCP)  
  
Boards Manager Address for Arduino IDE Config:  
http://arduino.esp8266.com/stable/package\_esp8266com\_index.json  
**Sample Home Assistant Config**  
  
sensor:  
  - platform: mqtt  
    name: "Dryer Current"  
    state\_topic: "digiDryerMon-4A443E/SCT"  
    unit\_of\_measurement : "A"  
    icon: mdi:flash-circle  
    availability\_topic: "digiDryerMon-4A443E/LWT"  
    payload\_available: "Online"  
    payload\_not\_available: "Offline"  
  
  - platform: mqtt  
    name: "DryerMon Signal"  
    state\_topic: "digiDryerMon-4A443E/RSSI"  
    unit\_of\_measurement: "dBm"  
    availability\_topic: "digiDryerMon-4A443E/LWT"  
    payload\_available: "Online"  
    payload\_not\_available: "Offline"   
  
  - platform: mqtt  
    name: "DryerMon Status"  
    state\_topic: "digiDryerMon-4A443E/BUILD"  
    availability\_topic: "digiDryerMon-4A443E/LWT"  
    payload\_available: "Online"  
    payload\_not\_available: "Offline"  
  
Sample Home Assistant Voice Notifications from the S31 Video - [https://www.digiblur.com/2018/11/smart-laundry-notifications-with-sonoff.html](https://www.digiblur.com/2018/11/smart-laundry-notifications-with-sonoff.html)
