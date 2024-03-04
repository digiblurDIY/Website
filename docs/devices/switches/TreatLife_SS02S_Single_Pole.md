# TreatLife SS02S (Single Pole)
![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) `1/9/2022 - No longer ships with an ESP8266 and one must be installed in order to use Tasmota or ESPHome.`

[Purchase on Amazon](https://amzn.to/37VkumA)

Single Pole Decora US switch.  No special setup is required with Tasmota.  The template is all that is needed to setup this device.

#### Tasmota Template
```json
{"NAME":"Treatlife Single Pole","GPIO":[0,0,0,0,288,576,0,0,224,32,0,0,0,0],"FLAG":0,"BASE":18, "CMND": "SO30 1 | SO13 1"}
```

### ESPHome YAML

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
    id: white_led_output

light:
  - platform: binary
    name: ${friendly_name}
    id: ${device_name}
    output: switch_output
    on_turn_on:
      - light.turn_on: white_led
    on_turn_off:
      - light.turn_off: white_led

  - platform: binary
    id: white_led
    output: white_led_output

binary_sensor:
  - platform: gpio
    pin:
      number: GPIO13
    id: ${device_name}_button
    name: ${friendly_name} Button
    on_press:
      - light.toggle: ${device_name}

status_led:
  # Red LED
  pin:
    number: GPIO5
    inverted: yes
```

### GPIO Layout

| GPIO |    Component | Description |
|------ |-------------|-------------|         
|GPIO00	| None
|GPIO01	| None
|GPIO02	| None
|GPIO03	| None
|GPIO04	| Led | White LED under button
|GPIO05	| LedLinki | Red Status LED
|GPIO09	| None
|GPIO10	| None
|GPIO12	| Relay1 | Actual relay to toggle on/off
|GPIO13	| Button1 | Button
|GPIO14	| None
|GPIO15	| None
|GPIO16	| None

### Settings

| Setting | Description
|---------------|-------------
| setoption13 1 | Set On/Off switch to respond instantly
| setoption30 1 | Sets domain to a light

### Rules

```
None are necessary
```

![alt text](/img/devices/treatlife_ss02s_main.webp "TreatLife SS02S")