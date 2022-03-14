---
title: "How to Control Smart Light Color and Brightness with a Dimmer - Tasmota Tips Episode 5"
date: "2019-12-10"
---

<iframe width="320" height="266" data-thumbnail-src="https://i.ytimg.com/vi/iUPbxC1PscM/0.jpg" src="https://www.youtube.com/embed/iUPbxC1PscM?feature=player_embedded" frameborder="0" allowfullscreen></iframe>

  
You heard right! We show you how to use a wall mounted dimmer to control your smart lights! This gives you the best of both worlds. You can also change the color temperature too with long press actions.  
  
**Products Used**  
[Lohas RGB+CT Lights](https://amzn.to/2YAkseB)  
[MJ Dimmer](https://amzn.to/358w76S)  
  
[Optional Bench Power Tester](https://amzn.to/2E8tiqx)  
Tuya-Convert Process - [https://www.youtube.com/watch?v=dyUyewiKpRA](https://www.youtube.com/watch?v=dyUyewiKpRA)  
  
**Sample Rules**  
rule2 on power1#state do publish cmnd/lohastest\_new/power %value% endon  
         on dimmer#state do publish cmnd/lohastest\_new/dimmer %value% endon  
  
rule1 on switch3#state=2 do dimmer + endon  
         on switch2#state=2 do dimmer - endon  
         on switch2#state=3 do publish cmnd/lohastest\_new/ct - endon  
         on switch3#state=3 do publish cmnd/lohastest\_new/ct + endon  
  
rule1 on switch3#state=2 do dimmer + endon  
         on switch2#state=2 do dimmer - endon  
         on switch2#state=3 do publish cmnd/lohastest\_new/ct 153 endon  
         on switch3#state=3 do publish cmnd/lohastest\_new/ct 500 endon  
  
**Get the Products We Use/Recommend**  
Amazon US - [https://amzn.to/2YZNDeO](https://amzn.to/2YZNDeO)  
Amazon UK - [https://amzn.to/2TnG2R4](https://amzn.to/2TnG2R4)  
Amazon CA - [https://amzn.to/2HchPZe](https://amzn.to/2HchPZe)  
  
**Come chat and join the community!**  
Discord - [https://discord.gg/bNtTF2v](https://discord.gg/bNtTF2v)  
Patreon - [https://www.patreon.com/digiblurDIY](https://www.patreon.com/digiblurDIY)
