# Feit Electric A19 800lm RGBW Bulb (BPA800/RGBW/AG/2 OR BPA800/RGBW/AG/2P)

4 Channel RGBW E26 800 lumen bulb using the SM16716 LED driver. It seems that ESP8266 bulbs can be identified if your bulbs are angled to the right in packaging (like this //). If they are angled to the left, they are the P version and may contain the WB2L.

Purchase for 2 via [Amazon](https://amzn.to/3CppvEX)  
Purchase for 2P via [Amazon](https://amzn.to/3AGdNEu)  
Purchase via Costco (Costco does not sell this model anymore)  

Supported in Tasmota, ESPHome. Not supported in WLED.

#### Quick Setup via Tasmota Console Command for 2
```
backlog template {"NAME":"Feit BPA800/RGBW/AG/2","GPIO":[0,0,0,0,140,37,0,0,38,142,141,0,0],"FLAG":0,"BASE":18}; module 0; so37 54; ledtable 0
```

#### Quick Setup via Tasmota Console Command for 2P
```
backlog template {"NAME":"Feit BPA800/RGBW/AG/2P","GPIO":[0,0,0,0,37,47,0,0,141,142,140,0,0],"FLAG":0,"BASE":48}; ledtable 0
```

#### Tasmota Template for 2
```json
{"NAME":"Feit BPA800/RGBW/AG/2","GPIO":[0,0,0,0,140,37,0,0,38,142,141,0,0],"FLAG":0,"BASE":18}
```

#### Tasmota Template for 2P
```json
{"NAME":"BPA800/RGBW/AG/2P","GPIO":[0,0,0,0,37,47,0,0,141,142,140,0,0],"FLAG":0,"BASE":48}
```

### GPIO Layout for 2

| GPIO |    Component | Description |
|------ |-------------|-------------|         
|GPIO04	| SM16716 CLK | Clock
|GPIO013| SM16716 PWR | Power
|GPIO014| SM16716 DAT | Data

### Settings for 2

| Setting | Description
|---------------|-------------
| setoption37 54 | Correct red/blue mismatch
| ledtable 0  | Enable software gamma correction
| setoption59 1  | Report light state changes via MQTT

### GPIO Layout for 2P

| GPIO |    Component | Description |
|------ |-------------|-------------|
|GPIO4|PWM1|PWM 1
|GPIO5|PWM2i|PWM 2 Inverted       
|GPIO012| SM16716 DAT | Data
|GPIO013| SM16716 PWR | Power
|GPIO014| SM16716 CLK | Clock

### Settings for 2P

| Setting | Description
|---------------|-------------
| ledtable 0 | Enable software gamma correction
| setoption59 1  | Report light state changes via MQTT

### Rules
None necessary.

### ESPHome YAML for 2P
```yaml
esphome:
  name: BPA800 2P
  friendly_name: Feit Bulb
  platform: ESP8266
  board: esp01_1m

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
  ap:
    ssid: "Feit bulb"
    password: # !secret wifi_ap_password

captive_portal:

api:

logger:

ota:
  platform: esphome

sm16716:
  data_pin: GPIO14
  clock_pin: GPIO4
  num_channels: 3
  num_chips: 1

output:
  - platform: sm16716
    id: output_red
    channel: 0
    power_supply: rgb_power
  - platform: sm16716
    id: output_green
    channel: 1
    power_supply: rgb_power
  - platform: sm16716
    id: output_blue
    channel: 2
    power_supply: rgb_power
  - platform: esp8266_pwm
    id: output_cold_white
    pin: GPIO5
  - platform: esp8266_pwm
    id: output_warm_white
    pin: GPIO12

light:
  - platform: rgbww
    name: ${friendly_name}
    id: light
    red: output_red
    green: output_green
    blue: output_blue
    cold_white: output_cold_white
    warm_white: output_warm_white
    cold_white_color_temperature: 6500 K
    warm_white_color_temperature: 2700 K

power_supply:
  - id: rgb_power
    pin: GPIO13
```


![alt text](/img/devices/feit-bpa800-rgbw-ag-2.webp "Feit Electric BPA800/RGBW/AG/2")

![alt text](/img/devices/feit-bpa800-rgbw-ag-2p.webp "Feit Electric BPA800/RGBW/AG/2P")