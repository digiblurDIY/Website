---
title: "DIY Smart Garage Opener LOCAL Shelly Plus"
date: "2021-12-01"
categories: 
  - "esp32"
  - "esp8266"
  - "shelly-plus-1"
  - "shelly1"
  - "smart-garage-door"
---

<iframe allowfullscreen height="305" src="https://www.youtube.com/embed/nSrm6h7r-KE" width="367" youtube-src-=""></iframe>

  

Fully local smart garage opener without relying on the cloud or paying fees to open YOUR garage door.  Full setup and wiring...more below

<!--truncate-->

⚡**Parts**

Shelly Plus 1  [https://s.click.aliexpress.com/e/\_ASFDDt](https://s.click.aliexpress.com/e/_ASFDDt)  
Bluetooth Temp Sensors - [https://s.click.aliexpress.com/e/\_9jN4hg](https://s.click.aliexpress.com/e/_9jN4hg)  
Hardened Door Sensor - [https://amzn.to/2ZJZVtm](https://amzn.to/2ZJZVtm)  
Smaller Door Sensor- [https://amzn.to/3romwqw](https://amzn.to/3romwqw)

Shelly Plus 1 (Shelly Store) [https://bit.ly/3qazTtY](https://bit.ly/3qazTtY)  

  

_Please note, the product links above could be affiliate links, using them could earn digiblurDIY a small commission of most purchases and helps with future video projects. Thank you!  As an Amazon Associate I earn from qualifying purchases._

  

⚡**Tasmota Templates Setup**

Shelly Plus 1 Tasmota Setup (all one command/line below):  
```
backlog template {"NAME":"ShellyPlus1","GPIO":[320,0,0,0,192,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,32,224,0,0,0,0,0,0,0,0,0,0,0,0,0],"FLAG":0,"BASE":1} ; switchmode1 2 ; Delay 1 ; Module 0
```

⚡**Resources  
**Tasmota32 Solo Bluetooth - [https://tasmota.github.io/install/firmware/unofficial/tasmota32solo1-bluetooth.bin  
](https://tasmota.github.io/install/firmware/unofficial/tasmota32solo1-bluetooth.bin)Previous Garage Shelly Video - [https://youtu.be/\_oRr8FZyyQ0  
](https://youtu.be/_oRr8FZyyQ0)Previous Shelly 1 Plus Video Flashing Tasmota - [https://youtu.be/eLoOT3mXcMs  
](https://youtu.be/eLoOT3mXcMs)ATC PVVX Project - [https://github.com/pvvx/ATC\_MiThermometer](https://github.com/pvvx/ATC_MiThermometer)

  

**Tasmota Garage Setup & Rules (for easy copy and paste from the video)**

_switchmode1 2_

_poweronstate 0_

_setoption0 0_

_pulsetime1 10_

(This rule below should all be pasted at one time)

_Rule1 on switch1#state=0 do publish2 stat/%topic%/status closed endon on switch1#state=1 do publish2 stat/%topic%/status open endon_

  

Turn on the rule with this command:

  

_Rule1 1_

**Home Assistant Configuration YAML Sample Code**

  

cover:

  - platform: mqtt

    name: "Garage Door"

    command\_topic: "cmnd/GarageDoor/POWER"

    state\_topic: "stat/GarageDoor/status"

    availability\_topic: "tele/GarageDoor/LWT"

    qos: 1

    payload\_available: "Online"

    payload\_not\_available: "Offline"

    payload\_open: "ON"

    payload\_close: "ON"

    payload\_stop: "ON"

    state\_open: "open"

    state\_closed: "closed"

    device\_class: garage

  

**Can't see the little garage door being up or down in the Home Assistant GUI?  Create an easy to read binary sensor**

**Secondary Binary Sensor YAML Config**

  

binary\_sensor:

  - platform: mqtt

    name: "Garage Door State"

    state\_topic: "stat/GarageDoor/status"

    payload\_on: "open"

    payload\_off: "closed"

    availability\_topic: "tele/GarageDoor/LWT"

    payload\_available: "Online"

    payload\_not\_available: "Offline"

    qos: 1

    device\_class: opening  

  

⚡Products We Use/Recommend

Amazon US - [https://amzn.to/2YZNDeO](https://amzn.to/2YZNDeO)  
Amazon UK - [https://amzn.to/2TnG2R4](https://amzn.to/2TnG2R4)  
Amazon CA - [https://amzn.to/2JWsNq5](https://amzn.to/2JWsNq5)  
  

⚡Be Social!⚡

Main Website: 🌐 https://digiblur.com/ 
Discord Chat: https://discord.com/invite/dgRZSw6 
Patreon: https://www.patreon.com/digiblurdiy 
Join YouTube: https://www.youtube.com/@digiblurDIY/videos  
Facebook: https://www.facebook.com/groups/digiblurdiy 
Instagram: https://www.instagram.com/digiblurdiy 
_Please note, the product links above could be affiliate links, using them could earn digiblurDIY a small commission of most purchases and helps with future video projects. Thank you!  As an Amazon Associate I earn from qualifying purchases._
