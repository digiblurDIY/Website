---
title: "How to Control a Smart Light with a Smart Switch - Tasmota Tips Episode 3"
date: "2019-11-12"
---

  

<iframe width="320" height="266" data-thumbnail-src="https://i.ytimg.com/vi/WAdsWeWvQL4/0.jpg" src="https://www.youtube.com/embed/WAdsWeWvQL4?feature=player_embedded" frameborder="0" allowfullscreen></iframe>

  
Don't cover up the light switches!  Control your smart lights from the wall and keep the best of both worlds.  Regain your sanity and score a high Wife Approval Factor by learning how to control your smart RGB lights from the wall.   
  
**Switches**  
Teckin SR-41 - [https://amzn.to/2qFgrJh](https://amzn.to/2qFgrJh)  
Martin Jerry - [https://amzn.to/34Rd3tl](https://amzn.to/34Rd3tl)  
  
Tuya-Convert Process - [https://www.youtube.com/watch?v=dyUyewiKpRA](https://www.youtube.com/watch?v=dyUyewiKpRA)  
Smart Bulb Comparison - [https://www.youtube.com/watch?v=MnmUPF5rRro](https://www.youtube.com/watch?v=MnmUPF5rRro)  
  
**Rules referenced in the video**  
  
_rule1 on switch1#state=2 do publish cmnd/BT\_TeckinSB50/power toggle endon_  
_rule2 on System#Boot do Var1 0 endon on Switch1#State=3 do add1 1 endon on Var1#State>=2 do Var1 0 endon_  
_rule3 on Var1#State==0 do publish cmnd/BT\_TeckinSB50/dimmer 15 endon on Var1#State==1 do publish cmnd/BT\_TeckinSB50/dimmer 100 endon_  
  
**Get the Products We Use/Recommend**  
Amazon US - [https://amzn.to/2YZNDeO](https://amzn.to/2YZNDeO)  
Amazon UK - [https://amzn.to/2TnG2R4](https://amzn.to/2TnG2R4)  
Amazon CA - [https://amzn.to/2HchPZe](https://amzn.to/2HchPZe)  
  
**Come chat with us!**  
Discord - [https://discord.gg/bNtTF2v](https://discord.gg/bNtTF2v)  
Patreon - [https://www.patreon.com/digiblurDIY](https://www.patreon.com/digiblurDIY)  
  
Links to products provided through the Amazon Affiliate program.
