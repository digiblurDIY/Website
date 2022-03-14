---
title: "Power Monitoring with the ShellyEM"
date: "2019-08-18"
---

The ShellyEM is an all in one power monitoring solution for monitoring two circuits up to 120A.  
  

<iframe allowfullscreen data-thumbnail-src="https://i.ytimg.com/vi/pdo0IzpEEMI/0.jpg" frameborder="0" height="266" src="https://www.youtube.com/embed/pdo0IzpEEMI?feature=player_embedded" width="320"></iframe>

  
  
[**Buy a ShellyEM**](https://shelly.cloud/product/wifi-smart-home-automation-shelly-em-energy-meter/?ref=25157)  
  
[Products I use and recommend](https://amzn.to/2YZNDeO)  
[Amazon UK Link](https://amzn.to/2TnG2R4)  
[Amazon CA Link](https://amzn.to/2HchPZe)  
  
**Come chat with us!**  
Discord - https://discord.gg/bNtTF2v  
Patreon - https://www.patreon.com/digiblurDIY  
  
**Sample Home Assistant Sensor via MQTT**  
  
  - platform: mqtt  
    name: "ShellyEM1 Watts"  
    state\_topic: "shellies/shellyem-B9E17C/emeter/0/power"  
    qos: 0  
    unit\_of\_measurement : "W"  
    icon: mdi:flash-circle  
  - platform: mqtt  
    name: "ShellyEM1 Volts"  
    state\_topic: "shellies/shellyem-B9E17C/emeter/0/voltage"  
    qos: 0  
    unit\_of\_measurement : "V"  
    icon: mdi:flash-circle  
#    availability\_topic: "shellies/shellyem-B9E17C/online"  
#    payload\_available: "Online"  
#    payload\_not\_available: "Offline"
