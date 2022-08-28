# Martin Jerry MJ-S01 (Single Pole)

Single Pole Decora US switch.  This switch has a customizable Red and Blue LED, this setup uses a rule to toggle between the two LEDs.  As of the Summer of 2022, Martin Jerry is now offering a TASMOTA Pre-flashed model!

Pre-Flashed with TASMOTA [Amazon](https://amzn.to/3K4qpIx)  
Purchase via [Amazon](https://amzn.to/2IM0cn5)

Detailed video integration into Home Assistant
<iframe allowfullscreen height="353" src="https://www.youtube.com/embed/H7GlOoJrOjU" width="625" youtube-src-=""></iframe>  


### Tasmota Template
```json
{"NAME":"MJ-S01 2Way Switch","GPIO":[1,1,1,1,288,321,0,0,224,32,544,1,0,0],"FLAG":0,"BASE":18, "CMND": "SO30 1 | SO13 1"}
```

<details><summary>ESPHome YAML</summary>     
<p>

```yaml
substitutions:
  device_name: light_switch1   #CustomizeThis
  friendly_name: Light Switch1 #CustomizeThis
  icon: "mdi:light-switch"

esphome:
  name: ${device_name}
  platform: ESP8266
  board: esp01_1m

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
  ap:
    ssid: ${device_name} Portal
    password: !secret esphome_ap_password

web_server:

captive_portal:

logger:

api:

ota:

output:
  - platform: gpio
    pin: GPIO12
    id: switch_output

  - platform: gpio
    pin:
      number: GPIO4
    inverted: true      
    id: red_led_output

light:
  - platform: binary
    name: ${friendly_name}
    id: ${device_name}
    output: switch_output
    on_turn_on:
      - light.turn_on: red_led
    on_turn_off:
      - light.turn_off: red_led

  - platform: binary
    id: red_led
    output: red_led_output

binary_sensor:
  - platform: gpio
    pin:
      number: GPIO13
    id: ${device_name}_button
    name: ${friendly_name} Button
    on_press:
      - light.toggle: ${device_name}

status_led:
  # Blue LED
  pin:
    number: GPIO5
    inverted: true
```
</p></details>

<details><summary>GPIO Layout</summary>     
<p>

| GPIO |    Component | Description |
|------ |-------------|-------------|         
|GPIO00	| None
|GPIO01	| None
|GPIO02	| None
|GPIO03	| None
|GPIO04	| Led1 | Red LED
|GPIO05	| Led2 | Blue LED
|GPIO09	| None
|GPIO10	| None
|GPIO12	| Relay1 | Actual relay to toggle on/off
|GPIO13	| Button1 | Button
|GPIO14	| None
|GPIO15	| None
|GPIO16	| None
</p></details>


<details><summary>Settings</summary>     
<p>

| Setting | Description
|---------------|-------------
| setoption13 1 | Set On/Off switch to respond instantly
| setoption30 1 | Sets domain to a light
</p></details>


<details><summary>Rules</summary>     
<p>

If a Red LED while Off and Blue LED while On is desired paste the following rule into the Tasmota console.  If you want opposite colors, edit the template in the configure template screen and transpose Led_i with Led and vice versa. The "i" stands for inverted.  Copy the below rule as one line to the Tasmota console:  

```
Rule1 on power1#state do backlog ledpower1 %value%; ledpower2 %value% endon
      on power1#boot do backlog ledpower1 %value%; ledpower2 %value% endon
```

Activate the Rule with 

```
Rule1 1
```
</p></details>

### Pics

![alt text](/img/devices/mj-s01_main.jpg "Martin Jerry MJ-S01")

![alt text](/img/devices/mj-s01_inside1.jpg "Martin Jerry MJ-S01 Insides")
