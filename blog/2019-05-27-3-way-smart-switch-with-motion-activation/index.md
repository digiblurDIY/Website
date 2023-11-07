---
title: "3 Way Smart Switch with Motion Activation"
date: "2019-05-27"
---

  

<iframe width="320" height="266" data-thumbnail-src="https://i.ytimg.com/vi/hSul1V42fFM/0.jpg" src="https://www.youtube.com/embed/hSul1V42fFM?feature=player_embedded" frameborder="0" allowfullscreen></iframe>

  
  
  
Installing the true 3 Way Smart Switch from Etekcity.  As always we flash the switch with open source firmware, Tasmota for 100% local control.  No soldering required to flash!  After the setup we do a slight modification to add a motion sensor to solve an issue I had in our laundry room.  
  
[Etekcity 3 Way (2 pack)](https://amzn.to/2EAhRZI)  
[Etekcity Single Pole](https://amzn.to/2HItL5L)  
**Flashing**  
[FTDI USB Flasher](https://amzn.to/2QtDHTq)  
[Jumper Wires](https://amzn.to/2ECRORk)  
Straight Header Pins https://amzn.to/30EZsUK  
  
**To Add Motion Activation**  
[AM312](https://amzn.to/2EAKtBL)  
[Angled Header Pins](https://amzn.to/2EyxqB6)  
  
**Installation Tools**  
[Wago 221 Wire Connectors](https://amzn.to/2HCXrRE)  
[Circuit Tester](https://amzn.to/2MlDAKS)  
  
**Soldering gear I use**  
[Station](https://amzn.to/2MaLE1d)  
[Solder](https://amzn.to/2Qrd9SE)   
[Flux](https://amzn.to/2Md7DEF)   
[Helping Hands](https://amzn.to/2M9CSAv)  
  
**Additional Links**  
[Tasmota](https://github.com/arendst/Sonoff-Tasmota)  
[NodeMCU Pyflasher](https://github.com/marcelstoer/nodemcu-pyflasher)  
[3 Way Switch Diagrams](https://www.easy-do-it-yourself-home-improvements.com/3-way-switch-wiring-diagram.html)  
[Cliff Quicktest](https://www.newark.com/cliff-electronic-components/cl1857/qt1-usa-canada-13a-fuse-quicktest/dp/08AC2593)  
  
**Tasmota Template**  
```
{"NAME":"Etekcity 3Way","GPIO":[255,255,0,255,23,29,0,0,82,22,10,0,0],"FLAG":0,"BASE":18}  
```
**Setup Commands for the Console**  
  
backlog switchtopic 0;switchmode1 1;switchmode2 5;switchmode3 1;powerretain 1;rule1 on event#ON do power2 TOGGLE endon;rule1 1;rule2 on event#OFF do power2 TOGGLE endon;rule2 1;  
  
rule3 on power1#state=1 do backlog rule1 0; rule2 1 endon on power1#state=0 do backlog rule1 1; rule2 0 endon  
rule3 1  
  
  
**Sample Home Assistant Config**  
  
\- platform: mqtt  
  name: "SW-HallWay"  
  state\_topic: "stat/SW-HallWay/POWER1"  
  command\_topic: "cmnd/SW-HallWay/EVENT"  
  availability\_topic: "tele/SW-HallWay/LWT"  
  qos: 1  
  payload\_on: "ON"  
  payload\_off: "OFF"  
  payload\_available: "Online"  
  payload\_not\_available: "Offline"  
  retain: false  
  
Take note of the slightly different command topic.  
  
**Rule Addition for Motion**  
rule3 on power1#state=1 do backlog rule1 0; rule2 1 endon on power1#state=0 do backlog rule1 1; rule2 0 endon on switch3#state=1 do backlog event ON ; RuleTimer1 300 endon on Rules#Timer=1 do event OFF endon  
  
**Come chat with us!**  
[Discord](https://discord.gg/bNtTF2v)  
[Patreon](https://www.patreon.com/digiblurDIY)
