---
title: Sonoff S31
description: iTead SonOff S31 Smart Power Monitoring Plug Template and Setup for TASMOTA and ESPHome
image: /img/devices/sonoff-s31_1.webp
keywords: [sonoff s31 tasmota template, itead s31 Template, s31 Plug ESPHome, solderless flashing tasmota plug]
---

# Sonoff S31

One of the top favorite smart plugs.  Easy to disassemble with a screw driver, exposed pin headers to the ESP8266, button on GPIO 0, and excellent power monitoring!  You can even flash it without soldering utilizing a [USB TTL adapter](https://amzn.to/3WonIHp) and [dupont test clips known as clippy bois](https://amzn.to/3jtnZdl) - see the pics section below.  

Purchase on Amazon [Amazon](https://amzn.to/3K4qpIx)  
Purchase on iTead [iTead](https://itead.cc/product/sonoff-s31/ref/28/)  
Purchase on Aliexpress [Aliexpress](https://s.click.aliexpress.com/e/_Dk8wPtl)

### Video Setup

<iframe allowfullscreen height="353" src="https://www.youtube.com/embed/q6aCfDDEkwE" width="625" youtube-src-=""></iframe>  

### Tasmota Template

None needed as it is built into TASMOTA.  Click Configuration -> Configure Module -> Pick Sonoff S31 and hit Save.

![alt text](/img/devices/sonoff-s31_9.webp)

### TASMOTA Settings

The power calibration for the S31 is usually pretty close on default but it can be fine tuned via [Tasmota Calibration Procedure](https://tasmota.github.io/docs/Power-Monitoring-Calibration/#calibration-procedure)  

<details><summary>GPIO Layout</summary>     
<p>

| GPIO |    Component | Description |
|------ |-------------|-------------|         
|GPIO00	| Button 1
|GPIO01	| CSE7766 Tx | Power monitoring chip
|GPIO03	| CSE7766 Rx | Power monitoring chip
|GPIO12	| Relay1 | Relay for Load
|GPIO13	| Led_i_1 | Onboard LED

</p></details>

<details><summary>ESPHome YAML</summary>     
<p>

```yaml
# Basic Config
esphome:
  name: sonoff_s31
  platform: ESP8266
  board: esp01_1m

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password

logger:
  baud_rate: 0 # (UART logging interferes with cse7766)
  
api:
ota:

uart:
  rx_pin: RX
  baud_rate: 4800

binary_sensor:
  - platform: gpio
    pin:
      number: GPIO0
      mode: INPUT_PULLUP
      inverted: True
    name: "Sonoff S31 Button"
    on_press:
      - switch.toggle: relay
  - platform: status
    name: "Sonoff S31 Status"

sensor:
  - platform: cse7766
    current:
      name: "Sonoff S31 Current"
      accuracy_decimals: 1
    voltage:
      name: "Sonoff S31 Voltage"
      accuracy_decimals: 1
    power:
      name: "Sonoff S31 Power"
      accuracy_decimals: 1
      id: my_power
  - platform: total_daily_energy
    name: "Sonoff S31 Daily Energy"
    power_id: my_power

switch:
  - platform: gpio
    name: "Sonoff S31 Relay"
    pin: GPIO12
    id: relay
    restore_mode: ALWAYS_ON

status_led:
  pin:
    number: GPIO13
    inverted: True
```
</p></details>


### Pics
![alt text](/img/devices/sonoff-s31_2.webp)
![alt text](/img/devices/sonoff-s31_3.webp)
![alt text](/img/devices/sonoff-s31_4.webp)
![alt text](/img/devices/sonoff-s31_5.webp)
![alt text](/img/devices/sonoff-s31_6.webp)
![alt text](/img/devices/sonoff-s31_7.webp)
![alt text](/img/devices/sonoff-s31_8.webp)

![alt text](/img/devices/sonoff-s31_10.webp)


