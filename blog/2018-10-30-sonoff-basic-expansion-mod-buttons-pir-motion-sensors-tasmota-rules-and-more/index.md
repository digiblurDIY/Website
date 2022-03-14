---
title: "Sonoff Basic Expansion Mod - Buttons, PIR Motion Sensors, Tasmota Rules and more!"
date: "2018-10-30"
---

<iframe width="320" height="266" data-thumbnail-src="https://i.ytimg.com/vi/WsatPkC2Hf0/0.jpg" src="https://www.youtube.com/embed/WsatPkC2Hf0?feature=player_embedded" frameborder="0" allowfullscreen></iframe>

  
  
The Sonoff Hydra-Basic with two capacitive touch buttons and a PIR motion sensor.  Break into the powerful Rules of the Tasmota firmware and control more than one light/function with a Sonoff Basic.  
  
**Parts List:**  
Sonoff Basic  
USB FTDI Adapter(Sonoff Flashing)  
Male Headers  
AM312 PIR Sensor  
Capacitive Touch Button  
Jumper Wires  
Fuses (optional but recommended)  
  
DrZzs video on step by step how to flash a Sonoff - https://www.youtube.com/watch?v=KMiP9Ku71To  
  
  

### Tasmota Rules Commands Used:

```
backlog switchmode1 3;switchmode2 1;switchmode3 1rule1 on switch2#state=1 do publish cmnd/S20Beta/POWER TOGGLE endonrule1 onrule2 on switch3#state=1 do publish HydraBasic/PIR/state YES endon on switch3#state=0 do publish HydraBasic/PIR/state NO endonrule2 onrule3 on switch3#state=1 do publish cmnd/TuyaDimTest/Dimmer 75 endon on switch3#state=0 do publish cmnd/TuyaDimTest/Dimmer 25 endonrule3 on
```

### [](https://github.com/digiblur/Sonoff-HydraBasic-Tasmota#homeassistant-binary-sensor-config-yaml)HomeAssistant Binary Sensor Config YAML

\- platform: mqtt  
    name: "HydraBasic Motion"  
    state\_topic: "HydraBasic/PIR/state"  
    availability\_topic: "tele/HydraBasic/LWT"  
    qos: 1  
    payload\_on: "YES"  
    payload\_off: "NO"  
    payload\_available: "Online"  
    payload\_not\_available: "Offline"  
    retain: false  
    device\_class: motion

  
GitHub Link with all the rules and sample HomeAssistant Config - https://github.com/digiblur/Sonoff-HydraBasic-Tasmota  
  
The Sonoff Basic is mains powered device!  There is a danger of electrocution if not installed properly. If you don't know how to install a Sonoff, please call an electrician.
