---
title: "Finally! A Tasmota WiFi Dimmer Smart Switch"
date: "2018-10-19"
---

<iframe allowfullscreen data-thumbnail-src="https://i.ytimg.com/vi/fyxxk2NrKG8/0.jpg" frameborder="0" height="266" src="https://www.youtube.com/embed/fyxxk2NrKG8?feature=player_embedded" width="320"></iframe>

  
  
Looking for a MQTT WiFi Dimmer Switch that works with Tasmota for local control that works with HomeAssistant and many other home automation solutions?  Check out this dimmer smart switch here on Amazon - [Oittm Dimmer Switch](https://amzn.to/2PzYI0l).  If they don't ship to your country/area try this variant [here](https://amzn.to/2PrkPX5) on Amazon.  
  
This is a 1 gang US sized WiFi dimmer smart switch with Tasmota firmware! No cloud or internet necessary.  All local control.  
  
The WiFi controller is an ESP8266 chip ready to be flashed with Tasmota firmware.  I've coded the serial communications necessary into the Tasmota firmware and compiled the firmware for you.  
  
Flash with a standard USB ESP8266 capable flasher device.  Do NOT connect it to mains power while flashing.  Flashing this device will void the warranty, do so at your own risk!  
  
Firmware - https://github.com/digiblur/TuyaDimmer-Tasmota/raw/master/TuyaDimmer\_Tasmota\_6216.bin  
  
Or you can snag one of the latest nightly builds here: http://thehackbox.org/tasmota/  
  
Example HomeAssistant YAML Configuration:  
  

\- platform: mqtt  
  name: "TuyaDimTest"  
  state\_topic: "stat/TuyaDimTest/POWER"  
  command\_topic: "cmnd/TuyaDimTest/POWER"  
  availability\_topic: "tele/TuyaDimTest/LWT"  
  brightness\_state\_topic: "stat/TuyaDimTest/RESULT"  
  brightness\_command\_topic: "cmnd/TuyaDimTest/Dimmer"  
  brightness\_scale: 100  
  brightness\_value\_template: \>  
 {% if value\_json.Dimmer is defined %}  
 {{ value\_json.Dimmer }}  
 {% else %}  
 {% if state\_attr('light.tuyadimtest','brightness') == none %}  
 0  
 {% else %}  
 {{ state\_attr('light.tuyadimtest','brightness') / 255 \* 100 }}  
 {% endif %}  
 {% endif %}  
  qos: 1  
  payload\_on: "ON"  
  payload\_off: "OFF"  
  payload\_available: "Online"  
  payload\_not\_available: "Offline"  
  retain: false

  
  
GitHub - https://github.com/digiblur/TuyaDimmer-Tasmota
