---
title: "3 Way DIY Smart Dimming"
date: "2019-04-29"
---

  

<iframe allowfullscreen data-thumbnail-src="https://i.ytimg.com/vi/TjqD6UQ_oMQ/0.jpg" frameborder="0" height="266" src="https://www.youtube.com/embed/TjqD6UQ_oMQ?feature=player_embedded" width="320"></iframe>

  

  
  
3-Way Dimming without the cloud! I show the hallway 3 way light that was in dire need of dimming at night from our motion activated lights.  All of the Tasmota rules and links to wiring diagrams are included below. Enjoy! Subscribe, give us a thumbs up, and feel free to comment if you have any questions.  
  
[Acenx Dimmer Switch](https://amzn.to/2VA54Qz)  
  
Zemismart Switch  
  
[3-Way Switch Diagrams](https://www.easy-do-it-yourself-home-improvements.com/3-way-switch-wiring-diagram.html)  
  
[How to Flash the Acenx/Martin Jerry Dimmer](https://www.youtube.com/watch?v=ZHA4p3yS4gE)  
  
[Amazon US Link](https://amzn.to/2DDNYI4)  
  
**Connect with Us**  
Patreon - https://www.patreon.com/digiblurDIY  
Discord - https://discord.gg/bNtTF2v  
**Primary Dimmer Rules**  
Rule1 on Switch2#state=2 do Dimmer - endon on Switch3#state=2 do Dimmer + endon on Switch2#state=3 do Dimmer 30 endon on Switch3#state=3 do Dimmer 100 endon  
Rule2 on Power1#State=1 do backlog publish cmnd/SW\_Hall\_Secondary/ledpower 1; ledpower 0 endon on Power1#State=0 do backlog publish cmnd/SW\_Hall\_Secondary/ledpower 0; ledpower 1 endon  
Rule3 on Dimmer#State>=70 do Var1 15 endon on Dimmer#State<70 do Var1 85 endon on System#Boot do Var1 15 endon on Event#TogDim do Dimmer %var1% endon  
  
**Secondary Switch Rules**  
Rule1 on Switch1#State=2 do publish cmnd/SW\_Hall\_Primary/Power TOGGLE endon  
Rule2 on Switch1#State=3 do publish cmnd/SW\_Hall\_Primary/Event TogDim endon
