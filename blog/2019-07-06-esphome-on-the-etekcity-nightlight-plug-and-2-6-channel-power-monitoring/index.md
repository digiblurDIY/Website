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
{"NAME":"ETekNightLight","GPIO":\[0,0,0,0,37,21,0,0,132,133,17,130,52\],"FLAG":1,"BASE":45}  
**Work in progress Etekcity Plug Config**  
substitutions:  
  plug\_name: etekpower  
  # Higher value gives lower watt readout  
  current\_res: "0.00095"  
  # Lower value gives lower voltage readout  
  voltage\_div: "2040"  
  
esphome:  
  name: ${plug\_name}  
  platform: ESP8266  
  board: esp8285  
  
wifi:  
  ssid: !secret wifi\_ssid  
  password: !secret wifi\_pass  
  manual\_ip:  
    static\_ip: !secret ip\_etekpower  
    gateway: !secret ip\_gateway  
    subnet: !secret ip\_subnet  
    dns1: !secret ip\_dns1  
  
logger:  
#  level: NONE  
  
mqtt:  
  broker: !secret mqtt\_broker  
  username: !secret mqtt\_user  
  password: !secret mqtt\_pass  
  
ota:  
  
web\_server:  
  
binary\_sensor:  
  - platform: gpio  
    pin:  
      number: GPIO14  
      inverted: True  
    name: "${plug\_name}\_button"  
    on\_press:  
      then:  
        - switch.toggle: "${plug\_name}\_Relay"  
        - switch.toggle: "${plug\_name}\_LED\_Blue"  
switch:  
\- platform: gpio  
  name: "${plug\_name}\_Relay"  
  id: "${plug\_name}\_Relay"  
  pin: GPIO05  
  restore\_mode: ALWAYS\_ON  
\- platform: gpio  
  name: "${plug\_name}\_LED\_Blue"  
  id: "${plug\_name}\_LED\_Blue"  
  pin: GPIO16  
  inverted: False  
  restore\_mode: ALWAYS\_ON  
  
sensor:  
  - platform: hlw8012  
    sel\_pin:  
      number: GPIO15  
      inverted: False  
    cf\_pin: GPIO13  
    cf1\_pin: GPIO12  
    current\_resistor: ${current\_res}  
    voltage\_divider: ${voltage\_div}  
    change\_mode\_every: 3  
    update\_interval: 3s   
    current:  
      name: "${plug\_name}\_Amperage"  
      unit\_of\_measurement: A  
      accuracy\_decimals: 3  
      filters:  
      - calibrate\_linear:  
          - 0.000 -> 0.0  
          - 5.069 -> 6.69     
      # Make everything below 0.01A appear as just 0A.  
      # Furthermore it corrects 0.013A for the power usage of the plug.  
      - lambda: if (x < (0.01 - 0.013)) return 0; else return (x - 0.013);  
    voltage:  
      name: "${plug\_name}\_Voltage"  
      unit\_of\_measurement: V  
      accuracy\_decimals: 1  
    power:  
      name: "${plug\_name}\_Wattage"  
      unit\_of\_measurement: W  
      id: "${plug\_name}\_Wattage"  
      accuracy\_decimals: 0  
  
  - platform: uptime  
    name: ${plug\_name}\_Uptime Sensor  
  
  - platform: adc  
    pin: A0  
    name: "${plug\_name}\_LightSensor"  
    update\_interval: 5s  
  
light:  
  - platform: monochromatic  
    name: "${plug\_name}\_NightLight"  
    output: pwm\_nite  
  
output:  
  - platform: esp8266\_pwm  
    id: pwm\_nite  
    pin: 4
