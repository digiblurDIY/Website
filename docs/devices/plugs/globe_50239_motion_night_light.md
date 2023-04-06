---
title: Globe 50239 Motion Night Light 🅱️
description: Globe 50239 Color Night Light with PIR motion detection WB3S Chipset 
image: /img/devices/globe_motion_plug1.jpg
keywords: [globe motion night light 50239]
---

# Globe 50239 Motion Night Light 🅱️

This device is not ESP based and will require Cloudcutter/ESPHome LibreTuya due to the WB3S module (bk7231t) chipset.

The night light is 5 channel color plug with a built in PIR motion sensor.  The PIR is not coupled to the LEDs, creating a very flexible use night light for notifications, motion for automated lighting, etc.

Purchase on [Amazon](https://amzn.to/3KC5ajh)  

<img src="/img/devices/globe_motion_plug1.jpg" width="50%" />

<details><summary>GPIO Layout</summary>     
<p>

| GPIO |    Component | Description |
|------ |-------------|-------------|         
|D1	| Button
|D2	| Warm White LEDs
|D4	| Cold White LEDs
|D5	| Red LEDs
|D8	| PIR Motion
|D16 | Green LEDs
|D17 | Blue LEDs
</p></details>

<details><summary>ESPHome YAML</summary>     
<p>

```yaml
substitutions:
  name: globe-motion
  friendly_name: Globe Motion

esphome:
  name: ${name}
  name_add_mac_suffix: true

libretuya:
  board: generic-bk7231t-qfn32-tuya
  framework:
    version: dev

logger:
api:
ota:

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
  ap:
    ssid: ${name}AP
    password: "ESPNotHome"

captive_portal:

web_server:

text_sensor:
  - platform: template
    name: ${friendly_name} Uptime Human Readable
    id: uptime_human
    icon: mdi:clock-start
  - platform: wifi_info
    ip_address:
      name: ${friendly_name} IP Address
      entity_category: diagnostic

sensor:
  - platform: uptime
    name: ${friendly_name} Uptime Sensor
    id: uptime_sensor
    update_interval: 60s
    on_raw_value:
      then:
        - text_sensor.template.publish:
            id: uptime_human
            state: !lambda |-
              int seconds = round(id(uptime_sensor).raw_state);
              int days = seconds / (24 * 3600);
              seconds = seconds % (24 * 3600);
              int hours = seconds / 3600;
              seconds = seconds % 3600;
              int minutes = seconds /  60;
              seconds = seconds % 60;
              return (
                (days ? to_string(days) + "d " : "") +
                (hours ? to_string(hours) + "h " : "") +
                (minutes ? to_string(minutes) + "m " : "") +
                (to_string(seconds) + "s")
              ).c_str();

binary_sensor:
  - platform: status
    name: ${friendly_name} Status
    entity_category: diagnostic

  - platform: gpio
    name: ${friendly_name} Motion
    pin: D8
    device_class: motion

  - platform: gpio
    name: ${friendly_name} Button
    pin:
      number: D1
      inverted: true

button:
  - platform: restart
    id: restart_button
    name: ${friendly_name} Restart
    entity_category: diagnostic

output:
  - platform: ledc
    id: output_red
    pin: D5
  - platform: ledc
    id: output_green
    pin: D16
  - platform: ledc
    id: output_blue
    pin: D17
  - platform: ledc
    id: output_cold_white
    pin: D4
  - platform: ledc
    id: output_warm_white
    pin: D2

light:
  - platform: rgbww
    name: ${friendly_name}
    id: the_light
    red: output_red
    green: output_green
    blue: output_blue
    cold_white: output_cold_white
    warm_white: output_warm_white
    cold_white_color_temperature: 6500 K
    warm_white_color_temperature: 2700 K
    color_interlock: true
    constant_brightness: true
    effects:
      - random:
      - random:
          name: "Slow Random"
          transition_length: 30s
          update_interval: 30s
      - random:
          name: "Fast Random"
          transition_length: 4s
          update_interval: 5s
```
</p></details>

Thanks to Tony for the YAML!

### Pics
![alt text](/img/devices/globe_motion_plug1.jpg "Globe 50239 Motion Night Light")
![alt text](/img/devices/globe_motion_plug2.webp "Globe 50239 Motion Night Light")
![alt text](/img/devices/globe_motion_plug3.webp "Globe 50239 Motion Night Light")