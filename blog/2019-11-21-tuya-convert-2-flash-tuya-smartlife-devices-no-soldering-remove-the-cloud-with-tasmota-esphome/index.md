---
title: "Tuya Convert 2 - Flash Tuya Smartlife Devices - No Soldering - Remove the cloud with Tasmota ESPHome"
date: "2019-11-21"
categories: 
  - "ct-tuya-convert"
  - "flash-tasmota"
  - "flash-tuya-ota"
  - "hack-tuya"
  - "smartlife-hack"
  - "tuya-convert"
  - "tuya-convert-walkthrough"
---

<iframe allowfullscreen data-thumbnail-src="https://i.ytimg.com/vi/dyUyewiKpRA/0.jpg" frameborder="0" height="266" src="https://www.youtube.com/embed/dyUyewiKpRA?feature=player_embedded" width="320"></iframe>

  
Welcome back to flashing your devices without any soldering or opening of devices!  Flash Smart switches, plugs, lights, sockets and more with ease!  This process allows you to flash your previously locked out devices that wouldn't flash before on the original version of Tuya Convert.  TC will convert both older and newer firmware devices automatically.  Use your Raspberry Pi, Linux PC, Proxmox, etc to unlock all the amazing features of open source firmware.  Protect your privacy and data and keep it in your home.  
  
Raspbian Buster Lite Download - [https://www.raspberrypi.org/downloads/raspbian/](https://www.raspberrypi.org/downloads/raspbian/)  
Etcher Link - [https://www.balena.io/etcher/](https://www.balena.io/etcher/)  
Putty Link - [https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)  
  
**Parts List**  
[Raspberry Pi 3](https://amzn.to/2SfpDQM)  
[32gb Micro SD Card](https://amzn.to/2MwYVNY)  
[Fliirc Case (optional: great RPi heat sink case)](https://amzn.to/2MB8KKI)  
[Raspberry Pi 3 Kit (UK)](https://amzn.to/2m73llY)  
  
**Tuya based favorites**  
[Martin Jerry Dimmer](https://amzn.to/2Thgun0)  
[Martin Jerry Switch](https://amzn.to/2qowzv3)  
[Martin Jerry 3 way](https://amzn.to/2LJ6WR5)  
[Moes 3-Way Smart Switch](https://amzn.to/2S3sPPd)  
[4 pack Smart Bulbs](https://amzn.to/2oqV2SU)  
[4 pack Smart Plugs](https://amzn.to/2G2YhXi)  
[and many more here on our page](https://amzn.to/2YZNDeO)  
  
**\*\*PLEASE READ!\*\*** Once you have configured the Wi-Fi settings and your Tasmota device connects to your Wi-Fi network, go to the web UI of the device. Click Console and type "Reset 5" (without quotes).  This will wipe flash memory of any Tuya firmware remnants to help prevent future corruption during Tasmota upgrades.  
  
**Steps for SSH/Putty Terminal (Copy and Paste)**  
sudo raspi-config  
sudo apt update  
sudo apt install git  
git clone https://github.com/ct-Open-Source/tuya-convert  
cd tuya-convert  
./install\_prereq.sh  
./start\_flash.sh  
  
**PLEASE NOTE!**  The thirdparty.bin file is included in the Tuya Convert github repo now and will be there for you automatically to flash.  
  
How to Configure Tasmota with HA - [https://www.youtube.com/watch?v=KOg5qwO3Rh4](https://www.youtube.com/watch?v=KOg5qwO3Rh4)  
  
[Devices/Toys we use](https://amzn.to/2YZNDeO) - 
Amazon UK Link - [https://amzn.to/2TnG2R4](https://amzn.to/2TnG2R4)  
Amazon CA Link - [https://amzn.to/2HchPZe](https://amzn.to/2HchPZe)  
  
Come chat with us!  
\-=-=-=-=-=-=-=-=-=  
Discord - [https://discord.gg/bNtTF2v](https://discord.gg/bNtTF2v)  
Patreon - [https://www.patreon.com/digiblurDIY](https://www.patreon.com/digiblurDIY)  
  
Huge Thanks to Tollbringer for his help with testing this process and major design help with the video thumbnail.  Looks great!
