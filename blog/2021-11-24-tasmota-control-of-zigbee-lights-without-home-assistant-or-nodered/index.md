---
title: "Tasmota Control of Zigbee Lights WithOUT Home Assistant or NodeRED"
date: "2021-11-24"
categories: 
  - "tasmota"
  - "zigbee"
---

   
  

<iframe allowfullscreen height="318" src="https://www.youtube.com/embed/LilhuCXYofE" width="382" youtube-src-=""></iframe>

  

  

Control your Zigbee Smart Lights with Tasmota Switches and #Zigbee2MQTT without any home automation in the middle  
  
<!--truncate-->

⚡All the Links  
Zigbee Bulbs - [https://amzn.to/30V9FRr](https://amzn.to/30V9FRr)  
Martin Jerry Switch [https://amzn.to/3r5OyHs](https://amzn.to/3r5OyHs)  
Linkind Switches [https://amzn.to/3ijr6RC](https://amzn.to/3ijr6RC)  
Athom Preflashed Switches [https://s.click.aliexpress.com/e/\_ABPV7g](https://s.click.aliexpress.com/e/_ABPV7g)  
Athom Store - [https://s.click.aliexpress.com/e/\_AfevDU](https://s.click.aliexpress.com/e/_AfevDU)  
KaufHA Preflashed BR30 [https://amzn.to/30OE6cJ](https://amzn.to/30OE6cJ)  
KaufHA Preflashed A19 [https://amzn.to/3cFGtAI](https://amzn.to/3cFGtAI)  
CC2652 Zigbee Coordinator - [https://shrsl.com/39qo2](https://shrsl.com/39qo2)  
  
_Please note, the product links above could be affiliate links, using them could earn digiblurDIY a small commission of most purchases and helps with future video projects. Thank you!  As an Amazon Associate I earn from qualifying purchases._  
  
Tasmota One Button Dimming & CT Control Rules

  

Paste each rule/command on one line in the console.  Change "ZigLinkindBulb" to your Zigbee2MQTT device name or group.  Do not forget to turn the rules On!

```
calcres 0

switchmode1 12

setoption32 12

rule1 ON system#boot do backlog0 var5 ZigLinkindBulb ; ledpower1 1 ; ledpower2 0 ; var1 ADD ; var2 3 ; var3 50 ; var4 153 ENDON
 ON switch1#state=2 do event zigtog ENDON
 ON switch1#state=4 do %var1%%var2% 25 ; event zigpush%var2% ENDON
 ON switch1#state=7 do event updown=%var1% ENDON on event#updown=ADD do var1 SUB ENDON on event#updown=SUB do var1 ADD ENDON

rule2 on switch1#state=8 do event ctdim=%var2% ENDON
 on event#ctdim=3 do var2 4 ; ledpower1 0 ; ledpower2 1 ; event zigtog ENDON
 on event#ctdim=4 do var2 3 ; ledpower1 1 ; ledpower2 0 ; event zigtog ENDON
 on event#zigpush3 do backlog0 ledpower1 0 ; publish zigbee2mqtt/%var5%/set {"brightness":%var3%} ; ledpower1 1 endon
 on event#zigpush4 do backlog0 ledpower2 0 ; publish zigbee2mqtt/%var5%/set {"color\_temp":%var4%} ; ledpower2 1 endon

rule3 ON Var3#State>255 do var3 255 endon on var3#state<0 do var3 0 endon
 ON Var4#State>500 do var4 500 endon on var4#state<153 do var4 153 endon
 on event#zigtog do publish zigbee2mqtt/%var5%/set/state TOGGLE endon

Rule0 1
``` 

As shown in the video this was using a [MJ Switch](https://amzn.to/3r5OyHs) with the following template setup for the two LEDs to blink/change.

```
{"NAME":"MJ-S01 2Way Switch","GPIO":[1,1,1,1,321,320,0,0,3840,160,544,224,0,0],"FLAG":0,"BASE":18}
```

**Tasmota Dimmer to Zigbee Rules (not in the video...yet)**

```
rule1 on dimmer#state do backlog var1 %value% ; MULT1 2.55 ; event pushzig endon
      on event#pushzig do publish zigbee2mqtt/ZigIkeaBulb/set {"state":"ON","brightness":%VAR1%} endon
      on power1#state=0 do publish zigbee2mqtt/ZigIkeaBulb/set/state OFF endon
      on power1#state=1 do publish zigbee2mqtt/ZigIkeaBulb/set/state ON endon
```

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
