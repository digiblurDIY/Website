---
title: ESPHome ESP32 Install Procedures
description: How to Guide for that first initial install/flashing of ESPHome to an ESP32 device
image: /img/esphome_whiteback.png
keywords: [esphome esp32 how to flash, esphome esp32 how to]
---

To create your initial ESPHome config for the device.  On the ESPHome Dashboard

![alt text](/img/procedures/esphome_proc_esp32_1.png)

Click + New Device, hit Continue, and give it a unique name.

![alt text](/img/procedures/esphome_proc_esp32_2.png)

Choose the Correct Variant/Board type

![alt text](/img/procedures/esphome_proc_esp32_3.png)

Click Install or choose Skip if you plan on making changes to the default YAML config on this device

![alt text](/img/procedures/esphome_proc_esp32_4.png)

Select Manual Download

![alt text](/img/procedures/esphome_proc_esp32_5.png)

Select Modern Format - **DO NOT** Select Legacy

![alt text](/img/procedures/esphome_proc_esp32_6.png)

The device config will compile and download the bin to the computer default dwonload folder you are working on.

![alt text](/img/procedures/esphome_proc_esp32_7.png)

Click Close to return to the ESPHome Dashboard.

## How to Install/Flash the Modern/Factory bin of ESPHome

There are two methods.  Choose the one you are more comfortable with.  Browser based ESPHome Web Flasher (easiest) or ESPTool.py command line.  Connect the device and ensure it is ready for installation/flashing.  Some devices require GPIO 0 to be held to ground, some require the Boot button to be held and some simply need to be plugged into USB.  This will vary per device.

Note:  After this intial flash/install, all updates/changes can be done via the "Update via Network" option without using this manual method of plugging in the device to the computer/host.

### Install the ESPHome Factory bin via a Web Browser

Open an additional tab to ESPHome Web Tools https://web.esphome.io/  

Click Connect and select the USB TTL adapter connected.  If you do not see one listed, follow the on screen help to load the correct drivers.

![alt text](/img/procedures/esphome_proc_esp32_8.png)

Select Install.  Choose File button, browse to the bin previously downloaded from the compile procedure above and select install.

![alt text](/img/procedures/esphome_proc_esp32_9.png)

Hurry up and Wait! Some devices might require you to unplug and plug in the device to cycle power for them to boot up.  If you have GPIO 0 held to ground please remove this before trying to boot up the device into ESPHome.  Any additional updates/changes to the conifguration of the device can be done via the network update option.  Congratulations! 🎉

![alt text](/img/procedures/esphome_proc_esp32_10.png)

### Install the ESPHome Factory bin via ESPTool.py

ESPTool.py python tool is required and needs to be installed on the host machine.  [ESPTool.py installation procedure](https://docs.espressif.com/projects/esptool/en/latest/esp32/)  

```
esptool.py write_flash 0x0 your_esp32-factory.bin
```
Note: If you receive an error, try lowering the baud rate to 115200 or slower by adding the `--baud 115200` parameter.  

Some devices might require you to unplug and plug in the device to cycle power for them to boot up.  If you have GPIO 0 held to ground please remove this before trying to boot up the device into ESPHome.  Any additional updates/changes to the conifguration of the device can be done via the network update option.  Congratulations! 🎉