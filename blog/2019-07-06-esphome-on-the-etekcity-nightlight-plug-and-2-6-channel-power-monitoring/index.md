---
title: "ESPHome on the Etekcity NightLight plug and 2 & 6 Channel Power Monitoring"
date: "2019-07-06"
---

<iframe allowfullscreen data-thumbnail-src="https://i.ytimg.com/vi/mOO7zxCrVag/0.jpg" frameborder="0" height="266" src="https://www.youtube.com/embed/mOO7zxCrVag?feature=player_embedded" width="320"></iframe>

  
  
Finishing up the last bit of sensors and config on the Etekcity power monitoring plug.  No soldering required to flash the plug as they left us an open header to attach to.  Snuck in a little bit of the cool 3 way Martin Jerry switch.  
  
[Etekcity Plug](https://amzn.to/2LxBCFc)  
[Martin Jerry 3 way Switch](https://amzn.to/2RMdjEL)  
  
2 & 6 Channel Monitoring Boards with ESPHome - https://circuitsetup.us/  
  
Audio issues on the first piece, but we reset OBS to fix the issue!  Sorry guys/gals!  
  
**Tasmota Template for the Etekcity**  
(had issues with voltage readings dropping at random times)  
```
{"NAME":"ETekNightLight","GPIO":[0,0,0,0,37,21,0,0,132,133,17,130,52],"FLAG":1,"BASE":45}  
```
**Work in progress Etekcity Plug Config**  
```yaml
substitutions:  
  plug_name: etekpower  
  # Higher value gives lower watt readout  
  current_res: "0.00095"  
  # Lower value gives lower voltage readout  
  voltage_div: "2040"  
  
esphome:  
  name: ${plug_name}  
  platform: ESP8266  
  board: esp8285  
  
wifi:  
  ssid: !secret wifi_ssid  
  password: !secret wifi_pass  
  manual_ip:  
    static_ip: !secret ip_etekpower  
    gateway: !secret ip_gateway  
    subnet: !secret ip_subnet  
    dns1: !secret ip_dns1  
  
logger:  
#  level: NONE  
  
mqtt:  
  broker: !secret mqtt_broker  
  username: !secret mqtt_user  
  password: !secret mqtt_pass  
  
ota:
  platform: esphome
  
web_server:  
  
binary_sensor:  
  - platform: gpio  
    pin:  
      number: GPIO14  
      inverted: True  
    name: "${plug_name}_button"  
    on_press:  
      then:  
        - switch.toggle: "${plug_name}_Relay"  
        - switch.toggle: "${plug_name}_LED_Blue"  
switch:  
- platform: gpio  
  name: "${plug_name}_Relay"  
  id: "${plug_name}_Relay"  
  pin: GPIO05  
  restore_mode: ALWAYS_ON  
- platform: gpio  
  name: "${plug_name}_LED_Blue"  
  id: "${plug_name}_LED_Blue"  
  pin: GPIO16  
  inverted: False  
  restore_mode: ALWAYS_ON  
  
sensor:  
  - platform: hlw8012  
    sel_pin:  
      number: GPIO15  
      inverted: False  
    cf_pin: GPIO13  
    cf1_pin: GPIO12  
    current_resistor: ${current_res}  
    voltage_divider: ${voltage_div}  
    change_mode_every: 3  
    update_interval: 3s   
    current:  
      name: "${plug_name}_Amperage"  
      unit_of_measurement: A  
      accuracy_decimals: 3  
      filters:  
      - calibrate_linear:  
          - 0.000 -> 0.0  
          - 5.069 -> 6.69     
      # Make everything below 0.01A appear as just 0A.  
      # Furthermore it corrects 0.013A for the power usage of the plug.  
      - lambda: if (x < (0.01 - 0.013)) return 0; else return (x - 0.013);  
    voltage:  
      name: "${plug_name}_Voltage"  
      unit_of_measurement: V  
      accuracy_decimals: 1  
    power:  
      name: "${plug_name}_Wattage"  
      unit_of_measurement: W  
      id: "${plug_name}_Wattage"  
      accuracy_decimals: 0  
  
  - platform: uptime  
    name: ${plug_name}_Uptime Sensor  
  
  - platform: adc  
    pin: A0  
    name: "${plug_name}_LightSensor"  
    update_interval: 5s  
  
light:  
  - platform: monochromatic  
    name: "${plug_name}_NightLight"  
    output: pwm_nite  
  
output:  
  - platform: esp8266_pwm  
    id: pwm_nite  
    pin: 4
```