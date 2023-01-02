---
title: "ESPHome Dual Relay Garage Opener - myQ Killer"
date: "2022-10-10"
categories: 
  - "home assistant"
  - "esphome"
  - "garage door"
---

## digiblurDIY Video
<iframe allowfullscreen height="353" src="https://www.youtube.com/embed/FgebGcBuHxI" width="625" youtube-src-=""></iframe> 

myQ newer model garage door openers have these "digital" buttons where you can't just use a relay to act like the button is being pushed to open/close the garage door.  I used a spare remote opener to control both of my doors without the cloud and keep it all local and reliable.  In a later revision I will also be adding vehicle sensors to determine if a vehicle is parked in the spot for automating the doors opening and closing.

## Parts
[Project Box](https://amzn.to/3yq107O) to fit everything in and keep dust, bugs, etc out of.  
<!--truncate-->
[Spare Opener](https://amzn.to/3CoEgpI) (only needed if you have the digital buttons like myQ)   
[ESP32](https://amzn.to/3SNhQFv)  
[ESP32 Breakout](https://amzn.to/3RIhX40)  
[Dual Dry Contact Relay](https://amzn.to/3EurUPq)  
[Door Reed](https://amzn.to/3SRajpt)  (screws! no glue or stickers)  
[Dupont Jumpers](https://amzn.to/3SQHv03)  
[Wire](https://amzn.to/3fTGW7c)  
[Ferrule Crimp Kit](https://amzn.to/3egK1xU)  Optional but oh so awesome

And alternative could be done using two [Shelly 1](https://s.click.aliexpress.com/e/_DF9rCJZ) dry contact relays.

Links to products provided through the Amazon Affiliate program. As an Amazon Associate I earn from qualifying purchases.

## Wiring

![alt text](/img/diagrams/esphome_myq_killer_garage.webp "ESPHome Dual Relay myQ Killer")

Open the image in a new tab or download it for full zooming resolution. Thanks to Caleb for the drawing!

Full ESPHome Configuration File in this [article](/wiki/ha/esphome-garage-opener). 
