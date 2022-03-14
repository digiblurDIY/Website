---
title: "Amcrest Video Doorbell | Local Storage | RTSP Integration with Blue Iris and Home Assistant"
date: "2020-02-01"
---

<iframe allowfullscreen data-thumbnail-src="https://i.ytimg.com/vi/DHH0S2j6uBU/0.jpg" frameborder="0" height="266" src="https://www.youtube.com/embed/DHH0S2j6uBU?feature=player_embedded" width="320"></iframe>

  
Amcrest AD110 Doorbell integration with Blue Iris and Home Assistant.  I enjoyed this camera and bought myself a 2nd one due to the local control and integration features.  You can also utilize Micro SD card storage as well as Cloud Storage.  
  
Amcrest AD110 Video Doorbell - [https://amzn.to/2usgiKT](https://amzn.to/2usgiKT)  
Doorbell Transformer (only if needed) - [https://amzn.to/2seBWSg](https://amzn.to/2seBWSg)  
Coupon Code - DIGIBLUR  
  
Amcrest Installation Video - [https://youtu.be/RWxDH6Ap4FQ](https://youtu.be/RWxDH6Ap4FQ)  
  
Update#2: New Pull Request on HomeAssistant to add the correct motion sensor for the PIR! Hope to see it merged soon!  [https://github.com/home-assistant/home-assistant/pull/30932](https://github.com/home-assistant/home-assistant/pull/30932)  
  
UPDATE: It's been found by myself and other users after the video launch that the HA Motion Detection binary is from the video itself and is very sensitive.  In my initial testing it was fine during the day while making the video.  If you find yours too sensitive I'd use a NVR based binary sensor such as Blue Iris to trigger it in the meantime until they expose the PIR and Button push.  
  
\-=-=-=- Sample Home Assistant -=-=-=- 
stream:  
amcrest:  
 - host: 192.168.1.50  
   name: Doorbell Camera  
   username: admin  
   password: yourDEVICEpassword  
   stream\_source: rtsp  
   binary\_sensors:  
      - motion\_detected  
      - online  
  
**Sample Lovelace HomeAssistant Card**  
aspect\_ratio: 50%  
camera\_view: live  
entity: camera.amcrestdoor  
name: AmcrestDoorBell  
type: picture-entity  
  
**Products We Use/Recommend**  
Amazon US - [https://amzn.to/2YZNDeO](https://amzn.to/2YZNDeO)  
Amazon UK - [https://amzn.to/2TnG2R4](https://amzn.to/2TnG2R4)  
Amazon CA - [https://amzn.to/2HchPZe](https://amzn.to/2HchPZe)  
  
**Come chat with us!**  
Discord - [https://discord.gg/bNtTF2v](https://discord.gg/bNtTF2v)  
Patreon - [https://www.patreon.com/digiblurDIY](https://www.patreon.com/digiblurDIY)  
  
Links to products provided through the Amazon Affiliate program.
