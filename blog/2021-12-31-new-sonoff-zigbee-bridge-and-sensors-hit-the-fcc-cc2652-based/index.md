---
title: "New Sonoff Zigbee Bridge and Sensors hit the FCC - CC2652 based!"
date: "2021-12-31"
categories: 
  - "cc2652"
  - "esp32"
  - "itead"
  - "sonoff"
  - "zigbee"
  - "zigbee-bridge"
---

`<table align="center" cellpadding="0" cellspacing="0" style="margin-left: auto; margin-right: auto;"><tbody><tr><td style="text-align: center;"><a href="https://blogger.googleusercontent.com/img/a/AVvXsEh58ABPuytFdfu2KtBcM4UJjG0eOWrqf0vg-vXC8x9A8qiXq1MMizHc1kFC1VLimbvw_5IeZLuz8N15CkNwLGFOjojm3SwcPeZVg2Sab1mUMHSzqzKApcnCWfTn8zZaHio9fxIDuBHgZ2iEw4uaKsUBbUcSheIgmSUNvTFM_yxWAfi00we-EghP-YUu1g=s839" style="margin-left: auto; margin-right: auto;"><img border="0" data-original-height="671" data-original-width="839" height="370" src="https://blogger.googleusercontent.com/img/a/AVvXsEh58ABPuytFdfu2KtBcM4UJjG0eOWrqf0vg-vXC8x9A8qiXq1MMizHc1kFC1VLimbvw_5IeZLuz8N15CkNwLGFOjojm3SwcPeZVg2Sab1mUMHSzqzKApcnCWfTn8zZaHio9fxIDuBHgZ2iEw4uaKsUBbUcSheIgmSUNvTFM_yxWAfi00we-EghP-YUu1g=w461-h370" width="461"></a></td></tr><tr><td style="text-align: center;">CC2652 Zigbee Bridge (source: fccid.io)</td></tr></tbody></table>`

  

[![](https://blogger.googleusercontent.com/img/a/AVvXsEirWenWXI4n7dKy3t_hit_JbvFAKYlgrTKcpkhg-QVHgd5nAYnKVGjkHojCbOXVEG4y6nAwrgJ2Mg105RdpeTharxjNPFOZPPeMf_GUQ3F0zwj6ZjIvixkP2SE85cNqauXgtQQZInQe7AbRJxj689EQkDr7LG1C9umGpu8Vb2PQ0-Mf-_4LWb4ohyvNSw=w474-h268)](https://blogger.googleusercontent.com/img/a/AVvXsEirWenWXI4n7dKy3t_hit_JbvFAKYlgrTKcpkhg-QVHgd5nAYnKVGjkHojCbOXVEG4y6nAwrgJ2Mg105RdpeTharxjNPFOZPPeMf_GUQ3F0zwj6ZjIvixkP2SE85cNqauXgtQQZInQe7AbRJxj689EQkDr7LG1C9umGpu8Vb2PQ0-Mf-_4LWb4ohyvNSw=s735)

  

**UPDATE: Slated release March 2022**

And just like that iTead Sonoff drops the mic and busts out with some new Zigbee gear to hit the FCC to top of the fun of 2021.  I'm really hoping they got them right this time around.  The previous version motion sensor performed rather poorly and was full of issues in my motion sensor round up video.  The door sensor had battery contact issues for some users as well so here's and early drink to them pulling the nose up!  

<!--truncate-->

So the really cool thing when I looked at the internal photos was the CC2652 chipset!  NICE!  It might be a little overkill'ish but I do get it from an economy of scale type thing.  Why not do it all CC2652?  The chipset works so well and they've hit a sweet spot with the USB CC2652 series coordinator, so it seems they are going all in with this chipset.  

On the release list is the button, temp/humidity sensor, motion sensor, door/window sensor and the Zigbee bridge.  I know what you are already thinking....is it ESP based?  YUP!  ESP32 and they even broke out the pins for us in via holes at standard pitch for what appears to be solderless flash for the DIY folks. Unfortunately or maybe fortunately for some, I do not see an Ethernet or POE based model but at least [ZigStar](https://zig-star.com/projects/zigbee-gw-lan/) and [Tube](https://www.tubeszb.com/) are breathing a sigh of relief with their ethernet based CC2652 based coordinators. Ethernet is preferred in the case of Zigbee since it also uses the 2.4ghz band and could interfere with itself if the channels for both interfaces are not chosen correctly.

[![](https://blogger.googleusercontent.com/img/a/AVvXsEicMmK9fqPB_2WOiWIrQxpM0XEe64uETeVF6XTYc9qVwO4e4750uaI9FA5HFaku-1-Eu4KDnQ90Z-YyYj1WUZ_pWF1Gfr-fz1pOIfvhowOG-m1mH1NavPqpnYzAPalu4vVvlsah3PcS1083q92PgUekAJVmWc_x1mWwmXFwPfmermOt65bNgKu5Ggkygw=w351-h297)](https://blogger.googleusercontent.com/img/a/AVvXsEicMmK9fqPB_2WOiWIrQxpM0XEe64uETeVF6XTYc9qVwO4e4750uaI9FA5HFaku-1-Eu4KDnQ90Z-YyYj1WUZ_pWF1Gfr-fz1pOIfvhowOG-m1mH1NavPqpnYzAPalu4vVvlsah3PcS1083q92PgUekAJVmWc_x1mWwmXFwPfmermOt65bNgKu5Ggkygw=s582)

  

Now the curiosity in me after doing the [long range Zigbee testing](https://youtu.be/QNOWCGL6gFE) got me thinking about custom firmware in various Zigbee devices to correct issues we seen from various devices like the [Aqara sensors becoming router "sticky" or not liking some routers](https://community.hubitat.com/t/xiaomi-aqara-devices-pairing-keeping-them-connected/623), Sonoff motion sensors failing to report motion when motion was in the room, Ikea upgrades, Linkind EFR SDK upgrades, etc.  Could we correct issues like this if necessary so we wouldn't have to buy stuff over again?

`<table align="center" cellpadding="0" cellspacing="0" style="margin-left: auto; margin-right: auto;"><tbody><tr><td style="text-align: center;"><a href="https://blogger.googleusercontent.com/img/a/AVvXsEhe1BIaHyWp1nhd8K9ya5zSCtIPRsBe3QXMiOqPpk1kOJg28hLqV4lhnpjpqeDcQbFI_fZjfsIyJf1xI4LOcw2uZVCrAQdL2Iw036jSPzkobcKSiKTIlo_JKJv3VMCbHhUpkNWORxsWhmSPFLIJsXus8rlr3l-1HVootJcfpEzdkzUuZgIzAQ0z0RCoPA=s534" style="margin-left: auto; margin-right: auto;"><img border="0" data-original-height="398" data-original-width="534" height="239" src="https://blogger.googleusercontent.com/img/a/AVvXsEhe1BIaHyWp1nhd8K9ya5zSCtIPRsBe3QXMiOqPpk1kOJg28hLqV4lhnpjpqeDcQbFI_fZjfsIyJf1xI4LOcw2uZVCrAQdL2Iw036jSPzkobcKSiKTIlo_JKJv3VMCbHhUpkNWORxsWhmSPFLIJsXus8rlr3l-1HVootJcfpEzdkzUuZgIzAQ0z0RCoPA=s320" width="320"></a></td></tr><tr><td style="text-align: center;">New Sonoff Motion Sensor (source: fccid.io)</td></tr></tbody></table>`

  

Would there be enough pins broken out to JTAG these?  Hard to say at this point but quite possibly it wouldn't be needed at all in these new versions.  Time will tell and I can't wait to get my hands on this lineup.  

  

If you get bored over the holidays go check out the FCC source documents and let me know if you find anything interesting.  Or go checkout some of our Zigbee videos.

  

Zigbee Bridge - [https://fccid.io/2APN5ZBBRIDGEP](https://fccid.io/2APN5ZBBRIDGEP)

Door/Window Sensor - [https://fccid.io/2APN5SNZB-04P](https://fccid.io/2APN5SNZB-04P)

Motion Sensor - [https://fccid.io/2APN5SNZB-03P](https://fccid.io/2APN5SNZB-03P)

Temp/Humidity Sensor - [https://fccid.io/2APN5SNZB-02P](https://fccid.io/2APN5SNZB-02P)

Button - [https://fccid.io/2APN5SNZB-01P](https://fccid.io/2APN5SNZB-01P)

  

⚡Products We Use/Recommend

Amazon US - [https://amzn.to/2YZNDeO](https://amzn.to/2YZNDeO)  
Amazon UK - [https://amzn.to/2TnG2R4](https://amzn.to/2TnG2R4)  
Amazon CA - [https://amzn.to/2JWsNq5](https://amzn.to/2JWsNq5)  
  

⚡Be Social!⚡

YouTube - [https://youtube.digiblur.com](https://youtube.digiblur.com/)  
Discord Chat - [https://discord.digiblur.com](https://discord.digiblur.com/)  
Patreon - [https://patreon.digiblur.com](https://patreon.digiblur.com/)  
Facebook - [https://facebook.digiblur.com](https://facebook.digiblur.com/)  
Instagram - [https://instagram.digiblur.com](https://instagram.digiblur.com/)  
_Please note, the product links above could be affiliate links, using them could earn digiblurDIY a small commission of most purchases and helps with future video projects. Thank you!  As an Amazon Associate I earn from qualifying purchases._
