---
title: "Tuya Convert 2.3 Update | Flash Tuya Smartlife Devices | No Soldering! | Remove the cloud | Custom Firmware"
date: "2020-01-06"
---

<iframe allowfullscreen data-thumbnail-src="https://i.ytimg.com/vi/dt5-iZc4_qU/0.jpg" frameborder="0" height="266" src="https://www.youtube.com/embed/dt5-iZc4_qU?feature=player_embedded" width="320"></iframe>

  
  
The 2.3 refresh of the Tuya Convert process with a few additional features such as the Tuya Donor, custom bin file menu, start with ESPHome, update Tasmota, etc.  Flash all your devices without any soldering or opening of devices!  This process allows you to flash your previously locked out devices that wouldn't flash before on the original version of Tuya Convert.  TC will convert both older and newer firmware devices automatically.  Use your Raspberry Pi, Linux PC, Proxmox, etc to unlock all the amazing features of open source firmware.  Protect your privacy and data and keep it in your home.  
  
**Parts List**  
[Raspberry Pi 4](https://amzn.to/2sNZjCg) or [Pi 3](https://amzn.to/2SfpDQM)  
[32gb Micro SD Card](https://amzn.to/36CAXdH)  
[Fliirc Case (optional: great RPi heat sink case)](https://amzn.to/2QuUDKR)  
[Wemos D1 Mini (optional)](https://amzn.to/2rXTTUT)  
  
**Tuya based favorites**  
[Aoycocr Plugs in Video](https://amzn.to/37CB9tf)  
[Martin Jerry Dimmer](https://amzn.to/2Thgun0)  
[Martin Jerry Switch](https://amzn.to/2qowzv3)  
[4 pack Smart Plugs](https://amzn.to/2G2YhXi)  
[Aoycocr Switch 3 LED](https://amzn.to/36spuNt)  
[Lohas Smart Light 4 pack](https://amzn.to/2Z4qiWd)  
[and many more](https://amzn.to/2YZNDeO)  
  
[Zemismart downlights](http://s.click.aliexpress.com/e/BmQxnSLQ)  
[Zemismart downlight (Amazon)](https://amzn.to/2OrKpIC)  
  
**Links**  
Raspbian Buster Lite - [https://downloads.raspberrypi.org/raspbian\_lite/images/raspbian\_lite-2019-09-30/2019-09-26-raspbian-buster-lite.zip](https://downloads.raspberrypi.org/raspbian_lite/images/raspbian_lite-2019-09-30/2019-09-26-raspbian-buster-lite.zip)  
Etcher Link - [https://www.balena.io/etcher/](https://www.balena.io/etcher/)  
Putty Link - [https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)  
Tuya Donor Files - [https://github.com/digiblur/Tuya-Convert-Donor](https://github.com/digiblur/Tuya-Convert-Donor)  
  
**Set your WiFi Country Code!!** [https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md](https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md)  
  
**Steps for SSH/Putty Terminal**  
sudo apt update  
sudo apt install git  
git clone https://github.com/ct-Open-Source/tuya-convert  
cd tuya-convert  
./install\_prereq.sh  
./start\_flash.sh  
  
**NOTE:** If you have an issue with a device not working and it is an ESP82xx based device, you can try the older 2.3 branch; delete your old tuya-convert folder, run the git command below then run install\_prereq.sh again.  
  
git clone https://github.com/digiblur/tuya-convert -b development  
**  
Others**  
Tasmota - [https://github.com/arendst/Tasmota](https://github.com/arendst/Tasmota)  
EspHome - [https://esphome.io/](https://esphome.io/)  
Tasmota MQTT Configuration How-to - [https://youtu.be/KOg5qwO3Rh4](https://youtu.be/KOg5qwO3Rh4)  
ct-Tuya-Convert Github - [https://github.com/ct-Open-Source/tuya-convert](https://github.com/ct-Open-Source/tuya-convert)  
**  
Products We Use/Recommend**  
Amazon US - [https://amzn.to/2YZNDeO](https://amzn.to/2YZNDeO)  
Amazon UK - [https://amzn.to/2TnG2R4](https://amzn.to/2TnG2R4)  
Amazon CA - [https://amzn.to/2HchPZe](https://amzn.to/2HchPZe)  
  
Come chat with us!  
Discord - [https://discord.gg/bNtTF2v](https://discord.gg/bNtTF2v)  
Patreon - [https://www.patreon.com/digiblurDIY](https://www.patreon.com/digiblurDIY)  
  
Links to products provided through the Amazon Affiliate program.
