---
title: Globe 50329-U Smart Plug
description: Globe 50329-U Smart Plug
image: /img/devices/globe_smart_plug1.jpg
keywords: [globe smart plug 50329]
---

# Globe 50329 Smart Plug 🅱️

This device is not ESP based and will require [Cloudcutter](https://github.com/tuya-cloudcutter/tuya-cloudcutter)/ESPHome [LibreTiny](https://docs.libretiny.eu/) due to the CB2S module (bk7231n) chipset.

<img src="/img/devices/globe_50329_smart_plug_1.jpg" width="50%" />
<img src="/img/devices/globe_50329_smart_plug_2.jpg" width="50%" />
<img src="/img/devices/globe_50329_smart_plug_3.jpg" width="50%" />

### GPIO Layout

| GPIO |    Component | Description |
|------ |-------------|-------------|         
|P7	| LED Status
|P24	| Relay
|P26 | Button

### Firmware
1.1.7 - BK7231N / oem_bk7231n_plug

<img src="/img/devices/globe_50329_smart_plug_4.jpg" width="50%" />

### ESPHome YAML
```yaml
substitutions:
  name: globe-motion
  friendly_name: Globe Motion

esphome:
  name: ${name}
  name_add_mac_suffix: true

bk72xx:
  board: generic-bk7231n-qfn32-tuya

logger:
api:
ota:
  platform: esphome

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
  ap:
    ssid: ${name}AP
    password: "ESPNotHome"

captive_portal:

web_server:

text_sensor:
  - platform: libretiny
    version:
      name: LibreTiny Version

binary_sensor:
  - platform: gpio
    id: binary_switch_1
    pin:
      number: P26
      inverted: true
      mode: INPUT_PULLUP
    on_press:
      then:
        - switch.toggle: switch_1

switch:
  - platform: gpio
    id: switch_1
    name: Relay 1
    pin: P24

status_led:
  pin:
    number: P7
    inverted: true
```
