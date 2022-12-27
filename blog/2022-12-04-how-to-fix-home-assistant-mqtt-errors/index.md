---
title: "How to FIX Home Assistant MQTT YAML Errors"
date: "2022-12-04"
categories: 
  - "home assistant"
  - "tasmota"
  - "mqtt"
  - "yaml"
description: How to FIX Home Assistant MQTT Errors
image: /img/ha_proxies.jpg
keywords: [home assistant, tasmota, mqtt errors, yaml errors]
authors: digiblur
---

As of Home Assistant 2022.12 you are now REQUIRED to change any of your manual MQTT configs in the Configuration YAML file.  Any devices that are using Auto Discovery or other automatic integrations are not impacted by this change.  I've covered some of the changes and how I edit things in the video linked below.  I also included two before and after configs below to see the necessary changes.

<iframe allowfullscreen height="353" src="https://www.youtube.com/embed/GHrnBn_Tu64" width="625" youtube-src-=""></iframe>    

### Before

```yaml
light:
  - platform: mqtt
    name: "Sink Light"
    state_topic: "tele/SinkDimmer/STATE"
    state_value_template: "{{ value_json.POWER }}"
    command_topic: "cmnd/SinkDimmer/POWER"
    availability_topic: "tele/SinkDimmer/LWT"
    brightness_state_topic: "tele/SinkDimmer/STATE"
    brightness_command_topic: "cmnd/SinkDimmer/Dimmer"
    brightness_scale: 100
    brightness_value_template: "{{ value_json.Dimmer }}"
    qos: 2
    payload_on: "ON"
    payload_off: "OFF"
    payload_available: "Online"
    payload_not_available: "Offline"
```
### After
<!--truncate-->

```yaml
mqtt:
  light:
    name: "Sink Light"
    state_topic: "tele/SinkDimmer/STATE"
    state_value_template: "{{ value_json.POWER }}"
    command_topic: "cmnd/SinkDimmer/POWER"
    availability_topic: "tele/SinkDimmer/LWT"
    brightness_state_topic: "tele/SinkDimmer/STATE"
    brightness_command_topic: "cmnd/SinkDimmer/Dimmer"
    brightness_scale: 100
    brightness_value_template: "{{ value_json.Dimmer }}"
    qos: 2
    payload_on: "ON"
    payload_off: "OFF"
    payload_available: "Online"
    payload_not_available: "Offline"
```

The difference is small as it is simply tucking the platforms up under the `mqtt:` tag but the change can be massive if you have a LOT of manual MQTT like I did from various services.  If you get stuck feel free to hit us up in Discord (link in the footer)