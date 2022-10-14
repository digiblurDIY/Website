---
id: how_to_flash_esp32
title: ESP32 Flashing 
---
# How to Flash an ESP32 with Tasmota

The ESP32 is a little different beast than the ESP8266 variant chips in the terms of writing software to the chip itself.  There are several different pieces that are necessary when writing Tasmota32 to the ESP32.  In order to not forget the files, uploading the wrong ones due to mismatches, etc.  there are two recommended methods to write Tasmota32 to the ESP32 line.   

### Tasmota Web Installer

Follow the directions via the browser at the [Tasmota WebInstaller](http://tasmota.github.io/install)

### Esptool.py with a full Tasmota factory bin

ESPTool.py python tool is required and needs to be installed on the host machine.  [ESPTool.py installation procedure](https://docs.espressif.com/projects/esptool/en/latest/esp32/)  

Identify the ESP32 and the flash memory size.  This can easily be done via:

```
esptool.py flash_id
```

Download the full factory build from the Tasmota Github.  Example: tasmota32c3-bluetooth.factory.bin - for the ESP32-C3 4M with Bluetooth drivers enabled

```
esptool.py write_flash 0x0 tasmota32<buildname>.factory.bin
```
Note: If you receive an error, try lowering the baud rate to 115200 or slower by adding the `--baud 115200` parameter.
