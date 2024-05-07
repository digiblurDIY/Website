---
title: Sonoff Basic R4 ESP32-C3
description: Sonoff Basic R4 Relay Template and Setup for TASMOTA and ESPHome
image: /img/devices/sonoff_basic_r4_thumb.webp
keywords: [sonoff basic tasmota template, Sonoff Basic R4 Template, Sonoff Basic R4 ESPHome, 2APN5-BASICR4, sonoff tasmota, sonoff basic bluetooth proxy]
---

# Sonoff Basic R4 ESP32-C3

This is basically, no pun intended, the OG Sonoff Basic Relay from years ago but with the ESP32-C3 chip inside.  And yup!  That adds Bluetooth to do all the ESPHome Bluetooth Proxy things!  FCC ID of 2APN5-BASICR4 https://fccid.io/2APN5BASICR4

Purchase on [iTead](https://itead.cc/product/sonoff-basicr4-wi-fi-smart-switch/ref/28/)  

### Video Setup

<iframe allowfullscreen height="353" src="https://www.youtube.com/embed/D8y2FZ2-mQg" width="625" youtube-src-=""></iframe>  

### Tasmota Template
```json
{"NAME":"Sonoff Basic R4 ESP32C3","GPIO":[0,0,0,0,224,0,544,0,0,32,0,0,0,0,0,0,0,0,0,0,0,0],"FLAG":0,"BASE":1}
```
### GPIO Layout

| GPIO |    Component | Description |
|------ |-------------|-------------|         
|GPIO04	| Relay 
|GPIO06	| LED
|GPIO09	| Button

### ESPHome YAML

```yaml
esphome:
  name: basic-r4
  friendly_name: basic-r4
  platformio_options:
    board_build.mcu: esp32c3
    board_build.variant: esp32c3  
# added the line below to prevent bootloops when flashing modern bin via serial
    board_build.flash_mode: dio    

esp32:
  variant: ESP32C3
  board: esp32-c3-devkitm-1
  framework:
    type: esp-idf
    sdkconfig_options:
      CONFIG_BT_BLE_50_FEATURES_SUPPORTED: y
      CONFIG_BT_BLE_42_FEATURES_SUPPORTED: y
      CONFIG_ESP_TASK_WDT_TIMEOUT_S: "10"    
# Would not boot with the stock ESP32-C3 ESPHome 2023.9 default YAML config until I added/change the settings above for ESP32C3

logger:
captive_portal:
api:
ota:

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
#  domain: !secret wifi_mydomain   
  ap:

esp32_ble_tracker:
  scan_parameters:
    active: true

bluetooth_proxy:
  active: true    

binary_sensor:
  - platform: gpio
    pin:
      number: GPIO9
      mode:
        input: true
        pullup: true
      inverted: true
    id: button_1
    on_press:
      then:
        - light.toggle: light_1

output:
  - platform: gpio
    pin: GPIO4
    id: relay_1

light:
  - platform: binary
    name: Light
    id: light_1
    output: relay_1

status_led:
  pin:
    number: GPIO6
    inverted: yes  

```
### Pics
![alt text](/img/devices/sonoff_basic_r4_1.webp)
![alt text](/img/devices/sonoff_basic_r4_2.webp)
![alt text](/img/devices/sonoff_basic_r4_3.webp)
![alt text](/img/devices/sonoff_basic_r4_4.webp)
![alt text](/img/devices/sonoff_basic_r4_5.webp)