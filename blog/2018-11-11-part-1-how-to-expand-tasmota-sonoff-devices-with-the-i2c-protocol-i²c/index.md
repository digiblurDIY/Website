---
title: "Part 1 - How to Expand Tasmota/Sonoff Devices with the I2C Protocol - I²C"
date: "2018-11-11"
---

<iframe allowfullscreen data-thumbnail-src="https://i.ytimg.com/vi/VixBNNKykIg/0.jpg" frameborder="0" height="266" src="https://www.youtube.com/embed/VixBNNKykIg?feature=player_embedded" width="320"></iframe>

  
  
Our first part of the I2C (I²C) sensor expansion with Tasmota. Add multiple sensors with minimal GPIO pin usage with a wide array of sensors on the market.  Add additional GPIO pins, LUX, Humidity, Pressure, Gas, Etc.  
  
**Parts Used in this Video:**  
  
[NodeMCU](https://amzn.to/2DcOkVW)  
[MCP23017 GPIO Expansion](https://amzn.to/2PPSN7v)  
[BME280 Temp/Humidity/Pressure](https://amzn.to/2DwD6wl)  
[SHT31 Temp/Humidity](https://amzn.to/2qEDiRK)  
[Female Jumper Wires](https://amzn.to/2DcCiMX)  
[PIR Motion AM312 Sensor](https://amzn.to/2DhrkpA)  
[ADS1115 4 Channel Analog Input](https://amzn.to/2qD9Xae)  
[Breadboard and Jumper Wires](https://amzn.to/2FfpsiO)  
  
**Tasmota Supported Sensors**  
[https://github.com/arendst/Sonoff-Tasmota/wiki/Sensors-Supported-by-Tasmota](https://github.com/arendst/Sonoff-Tasmota/wiki/Sensors-Supported-by-Tasmota)  
  
**CP2102 USB Drivers:**  
[https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers](https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers)  
  
**Precompiled Tasmota Bin with ADS1115 and MCP23017 i2c Enabled:**  
[https://github.com/digiblur/Sonoff-HydraBasic-Tasmota/raw/master/tasmota\_6307\_1m\_i2c\_sensors.bin](https://github.com/digiblur/Sonoff-HydraBasic-Tasmota/raw/master/tasmota_6307_1m_i2c_sensors.bin)  
  
**MCP23017 Console Commands Used:**  
  
sensor29 0,5  
sensor29 1,5  
sensor29 8,5  
sensor29 0,T  
sensor29 1,T  
sensor29 8,T  
  
sensor29 3,2,0  
sensor29 2,2,0  
**MCP23017 Rules:**  
  
rule1 on event#MCPINT\_D2=0 do backlog sensor29 0,OFF;sensor29 1,ON endon on event#MCPINT\_D2=1 do backlog sensor29 1,OFF;sensor29 0,ON endon  
  
rule2 on event#MCPINT\_D3=0 do backlog sensor29 8,OFF;sensor29 1,ON;rule1 1 endon on event#MCPINT\_D3=1 do backlog sensor29 8,ON;rule1 0;sensor29 0,OFF;sensor29 1,OFF endon  
  
  
**BH1750 Rule:**  
Rule1 on BH1750#Illuminance>%var1% do backlog var1 %value%; publish MCU/Lux %value%; var2 %value%; add1 100; sub2 100 endon  
      on BH1750#Illuminance<%var2% do backlog var2 %value%; publish MCU/Lux %value%; var1 %value%; add1 100; sub2 100 endon  
  
**Sample BH1750 HomeAssistant Configuration:**  
  
sensor:  
  - platform: mqtt  
    name: "MCU Lux"  
    state\_topic: "tele/MCU-I2C/SENSOR"  
    value\_template: "{{ value\_json\['BH1750'\].Illuminance }}"  
    unit\_of\_measurement: "lx"  
    availability\_topic: "tele/MCU-I2C/LWT"  
    payload\_available: "Online"  
    payload\_not\_available: "Offline"
