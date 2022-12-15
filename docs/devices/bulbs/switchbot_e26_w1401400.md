---
title: SwitchBot RGB+CT E26 Bulb W1401400
description: SwitchBot W1401400 ESP32-C3 Smart Bulb Template and Setup for TASMOTA and ESPHome
image: /img/switchbot_bulb5.webp
keywords: [switchbot bulb tasmota template, Switchbot W1401400 Template, Switchbot Plug ESPHome, 2AKXB-W1401400, switchbot tasmota, switchbot bluetooth proxy]
---
# SwitchBot RGB+CT E26 Bulb W1401400 
5 Channel RGB+CT E26 800 lumen bulb with an ESP32-C3.  This smart bulb can currently be upgraded via the SwitchBot OTA process - [GitHub](https://github.com/kendallgoto/switchbota) or [digiblurDIY Video](https://youtu.be/iTexFQ0Th0I), no soldering or manual flashing invovled.  

Purchase via [Amazon](https://amzn.to/38Vhuv3)  
Purchase via [SwitchBot Store](https://switchbot.vip/3mkXt45)

Supported in TASMOTA 12.0.2.2 or later, use this [TASMOTA Stock Bin file](/firmware/tasmota32c3_2022_06_26.bin) or [Bluetooth enabled](https://github.com/tasmota/install/raw/0533fd275fad9f4f3bf8350a6afdb9c6176d6879/firmware/unofficial/tasmota32c3-bluetooth.bin) until the next standard Tasmota release. Thanks to Cossid for his [efforts](https://github.com/arendst/Tasmota/pull/15839)!    

Please note the required SetOption below for correct color order.  A user configurable brightness limit of default of 9 is set via the template SM2335 Dat option.  This was found to be close to stock as possible.  Setting this higher could create power supply issues, excessive **heat/fire**, LED flame out errors, etc.

Until the next Tasmota standard release, it is necessary to upgrade to 12.0.2.2 or later dev version.  

<iframe allowfullscreen height="353" src="https://www.youtube.com/embed/iTexFQ0Th0I" width="625" youtube-src-=""></iframe>  

#### Quick Setup via TASMOTA Console Command
```
backlog template {"NAME":"Switchbot E26 Bulb","GPIO":[0,0,0,0,9128,9088,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"FLAG":0,"BASE":1}; module 0; so37 25; so59 1
```

### TASMOTA Template
```json
{"NAME":"Switchbot E26 Bulb","GPIO":[0,0,0,0,9128,9088,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"FLAG":0,"BASE":1}
```

### GPIO Layout

| GPIO |    Component | Description |
|------ |-------------|-------------|         
|GPIO04	| SM2335 Dat | Data - Brightness limit - Default 9
|GPIO05	| SM2335 Clk | Clock

### TASMOTA Settings

| Setting | Description
|---------------|-------------
| setoption37 25 | Set the correct RGB+CT order
| setoption59 1  | Report light state changes via MQTT

<details><summary>Rules</summary>     
<p>
None necessary.
</p></details>

<details><summary>ESPHome YAML</summary>     
<p>

```yaml
# Current BETA PR via Cossid https://github.com/esphome/esphome/pull/3924
external_components:
  - source:
      type: git
      url: https://github.com/dentra/esphome.git
      ref: web-server-idf
    components: [ web_server_base, web_server_idf, web_server, captive_portal ]
  - source:
      type: git
      url: https://github.com/Cossid/esphome.git
      ref: sm2335
    components: [ sm10bit_base, sm2335 ]

sm2335:
  data_pin: GPIO4
  clock_pin: GPIO5
  max_power_color_channels: 9
  max_power_white_channels: 9

# Individual outputs
output:
  - platform: sm2335
    id: output_red
    channel: 1
  - platform: sm2335
    id: output_green
    channel: 0
  - platform: sm2335
    id: output_blue
    channel: 2
  - platform: sm2335
    id: output_coldwhite
    channel: 4
  - platform: sm2335
    id: output_warmwhite
    channel: 3

light:
  - platform: rgbww
    restore_mode: RESTORE_DEFAULT_OFF
    name: "${friendly_name}"
    red: output_red
    green: output_green
    blue: output_blue
    cold_white: output_coldwhite 
    warm_white: output_warmwhite 
    cold_white_color_temperature: 6536 K
    warm_white_color_temperature: 2000 K
    color_interlock: true
```
</p></details>

### Pics & Disassembly

Pop the diffuser off with a spudger.  Remove the silicone around the edge of the LED board.  Use a spudger again to remove this board as it just using tension connector pins.  It might stick a little especially if the bulb is cold.  You will see the back of the ESP32-C3 for manual serial flashing if needed. 

**The P9 pad is like GPIO 0 in the ESP32-C3 world, it needs to be grounded at power up to enter into bootloader mode.**  [ESP32 flashing procedures](/wiki/tasmota/how_to_flash_esp32)

![alt text](/img/devices/switchbot_bulb1.webp "SwitchBot RGB+CT E26 W1401400 #1")

![alt text](/img/devices/switchbot_bulb2.webp "SwitchBot RGB+CT E26 W1401400 #2")

![alt text](/img/devices/switchbot_bulb3.webp "SwitchBot RGB+CT E26 W1401400 #3")

![alt text](/img/devices/switchbot_bulb4.webp "SwitchBot RGB+CT E26 W1401400 #4")