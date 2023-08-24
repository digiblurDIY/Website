---
title: TreatLife/Esmlfe DS03 Fan Dimmer Combo Beken 🅱️
description: TreatLife/Esmlfe DS03 Fan Dimmer Combo with Beken WB3S Chipset - How to Setup & Flash ESPHome via the Tuya-Cloudcutter Process for local control use with Home Assistant
image: /img/devices/treatlife_fan_face.webp
keywords: [TreatLife DS03]
---

# TreatLife/Esmlfe DS03 Fan Dimmer Combo Beken 🅱️

Single gang Decora fan controller & light dimmer combo.  This fan/dimmer combo can be flashed with ESPHome via the [Tuya-CloudCutter](https://digiblur.com/2023/08/19/updated-tuya-cloudcutter-with-esphome-bk7231-how-to-guide) process all over-the-air with no soldering.  See here for the [Complete How To Guide](https://digiblur.com/2023/08/19/updated-tuya-cloudcutter-with-esphome-bk7231-how-to-guide)

Purchase via [Amazon](https://amzn.to/3OQBMH7)  

<img src="/img/devices/treatlife_fan_face.webp" width="50%" />

<details><summary>GPIO Layout</summary>     
<p>

| GPIO |    Component | Description |
|------ |-------------|-------------|         
|P10	| Secondary MCU RX
|P11	| Secondary MCU TX
</p></details>

### ESPHome YAML
```
esphome:
  name: treatlife-fan
  friendly_name: treatlife-fan
  name_add_mac_suffix: false

bk72xx:
## Uncomment the board type you need below (check your kickstart version/name installed on the device if you are unsure)
#  board: generic-bk7231t-qfn32-tuya
#  board: generic-bk7231n-qfn32-tuya
  framework:
    version: dev

logger:
  baud_rate: 0

web_server:
api:
ota:
captive_portal:
mdns:
tuya:

uart:
  rx_pin: P10
  tx_pin: P11
  baud_rate: 115200  

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
#  domain: !secret wifi_mydomain    
  ap:
    ssid: ${name}AP
    password: "ESPNotHome"

button:
- platform: restart
  name: Restart

debug:
  update_interval: 30s

text_sensor:
- platform: debug
  reset_reason:
    name: Reset Reason
- platform: libretiny
  version:
    name: LibreTiny Version

sensor:
- platform: uptime
  name: Uptime

light:
  - platform: "tuya"
    name: Light
    dimmer_datapoint: 10
    switch_datapoint: 9
    min_value: 100
    max_value: 1000

fan:
  - platform: "tuya"
    name: Speed
    switch_datapoint: 1
    speed_datapoint: 3
    speed_count: 4    
```

