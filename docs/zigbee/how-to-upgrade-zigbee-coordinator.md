---
title: "How to Upgrade the Zigbee Coordinator"
date: "2023-02-01"
categories: 
  - "zigbee"
description: How to Upgrade the Z-Stack Firmware on the CC2652 based chipsets
image: /img/devices/sonoff-zigbee-stick.jpg
keywords: [zstack, cc2652 upgrade, zigbee2mqtt upgrade, koenkk zigbee]
authors: digiblur
---

This update includes the various Ti based coordinators such as the [Sonoff Dongle-P](https://amzn.to/3Dveu4E), [Athom USB/Ethernet](https://s.click.aliexpress.com/e/_DCRNAJh), [Tubes USB/Ethernet](https://tubeszb.com/collections/coordinators), [Zigstar](https://zig-star.com/), [Electrolama](https://shop.electrolama.com/collections/usb-rf-sticks/products/zzh-multiprotocol-rf-stick), and [others](https://www.zigbee2mqtt.io/guide/adapters/).  

For the USB users there are two methods.  Using the Ti.com Windows application and the easier Python script method.  Easier if you can do a little command line copying and pasting. Would you like a video to help walkthrough both processes?  If not, skip the video and use the links and/or the commands below:

<iframe allowfullscreen height="353" src="https://www.youtube.com/embed/4S_c_m6z-RY" width="625" youtube-src-=""></iframe>   

### Windows App Method

Download FLASH-PROGRAMMER 2(https://www.ti.com/tool/FLASH-PROGRAMMER)  (registration required by Ti)

Download the necessary hex file based on your coordinator model from the Z-Stack Github - Refer to the [readme](https://github.com/Koenkk/Z-Stack-firmware/tree/Z-Stack_3.x.0_coordinator_20221226/coordinator/Z-Stack_3.x.0/bin)  

Open the Ti application and plug in your stick while holding down the bootloader button.  Select the correct Target Device.  With the correct firmware selected, make sure "Erase", "Program" and "Verify" are all checked under "Actions" and press the blue button to start flashing.  Once it is successful, remove the USB stick and re-attach to your Zigbee host machine.

### Python Script Method

Download the [cc2528-bsl Python Script](https://github.com/JelmerT/cc2538-bsl).  It currently supports TI CC13xx/CC2538/CC26xx chipsets.  Follow the readme to install any necessary dependencies for Linux, Windows, etc.  

Download the necessary hex file based on your coordinator model from the Z-Stack Github - Refer to the [readme](https://github.com/Koenkk/Z-Stack-firmware/tree/Z-Stack_3.x.0_coordinator_20221226/coordinator/Z-Stack_3.x.0/bin)  

Some USB Sticks such as the ZigStar and Sonoff Dongle-P can utilize a command line that will force the stick into bootloader mode.  If your device does not have this option, please put it into bootloader mode by holding the BSL button during power up of the USB stick.  Ethernet based coordinators will need to navigate to the web interface of the device and put it into BSL(bootloader) mode.  

To flash the firmware use the command line (use the second one if your model supports auto bootloader mode)

```python3 cc2538-bsl.py -p PORT -evw FIRMWARE```  
```python3 cc2538-bsl.py -p PORT --bootloader-sonoff-usb -evw FIRMWARE```

* replace the PORT with the USB port name such as COM3, COM5, etc for Windows users. Linux and others such as /dev/ttyUSB0)  Windows users can use the `mode` command to see which ports are available.  Linux and others use `ls /dev/ttyUSB*`
* ethernet based coordinators should use `socket://IP:6638` as the port or other as indicated by the manufacturer
* replace the `FIRMWARE` with the necessary hex file for you model of coordinator

Once it is successful, remove the USB stick and re-attach the device to the Zigbee host machine and restart ZHA/Zigbee2MQTT

