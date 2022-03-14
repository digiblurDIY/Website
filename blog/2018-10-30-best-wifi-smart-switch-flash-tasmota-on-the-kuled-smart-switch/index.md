---
title: "Best WiFi Smart Switch? - Flash Tasmota on the KULED Smart Switch"
date: "2018-10-30"
---

<iframe width="320" height="266" data-thumbnail-src="https://i.ytimg.com/vi/4nX90vhAniQ/0.jpg" src="https://www.youtube.com/embed/4nX90vhAniQ?feature=player_embedded" frameborder="0" allowfullscreen></iframe>

  
  
The KULED WiFi Smart Switch unboxing and Tasmota firmware flashing tutorial.  These switches have been welcomed by many as an easy solution to their smarthome projects.  
  
Can it replace a Sonoff Switch?  You be the judge. One of the easiest devices to flash, with NO soldering!  Don't forget to set your flashing adapter to 3.3 volts!  
  
Parts List:  
KULED SmartSwitch (2 Pack)  
USB FTDI Adapter(for Flashing, set jumper to 3v3 - NOT 5 volts)  
Male Headers  
Jumper Wires  
  
  
![alt text](images/GPIO%20PINS.jpg)  
  
Verify your header layout is the same as pictured, some switch variants have labels the layout is different.  

### HomeAssistant Binary Sensor Config YAML

\- platform: mqtt  
  name: "KuLED Test"  
  state\_topic: "stat/KULED-1/POWER"  
  command\_topic: "cmnd/KULED-1/POWER"  
  availability\_topic: "tele/KULED-1/LWT"  
  qos: 1  
  payload\_on: "ON"  
  payload\_off: "OFF"  
  payload\_available: "Online"  
  payload\_not\_available: "Offline"  
  retain: false

  
  
GitHub with the pictures and sample HomeAssistant Config - https://github.com/digiblur/KULED-Smartswitch-Tasmota  
  
There is a danger of electrocution if not installed properly. If you don't know how to install this device, please call an electrician.
