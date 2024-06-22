---
title: Wyze Plug Outdoor Dual Outlet WLPPO1
description: Wyze Plug Outdoor Dual Outlet WLPPO1 Smart Plug Template and Setup for TASMOTA and ESPHome with Bluetooth Proxy Support
image: /img/devices/wyzeoutdoor.webp
keywords: [wyze outdoor tasmota template, wyze outdoor WLPPO1-1 Template, Wyze Plug Outdoor ESPHome, 2AUIU-WLPPO1, wyze tasmota, wyze bluetooth proxy, WLPP01]
---

# Wyze Outdoor Plug Dual Outlet WLPPO1

![alt text](/img/devices/wyzeoutdoor.webp "Wyze Outdoor Plug Dual Outlet WLPPO1")

An IP64 outdoor plug with dual outlets, ESP32, power monitoring (combined) and to top it off even a LUX sensor.  This plug has an upgraded antenna to help with extending range while outdoors which also allows for enhanced bluetooth peformance. FCC ID of [2AUIU-WLPPO1](https://fccid.io/2AUIUWLPPO1)

Purchase on Amazon [Amazon](https://amzn.to/3r1l5k4) or from [Wyze.com WLPP01](https://www.wyze.com/products/wyze-plug-outdoor)

### How to Flash ESPHome or TASMOTA

The Wyze Outdoor Plug will need to be flashed manually using either of two methods.  The easiest will be done via BDM Frame [Amazon](https://amzn.to/3R2EkV6) or [Aliexpress](https://s.click.aliexpress.com/e/_DdAVZt1) with test pins for a **no soldering solution** or you can solder the plug.

![alt text](/img/devices/wyzeout_bdm.webp "Wyze Outdoor Plug Dual Outlet WLPPO1")

Or you can solder the plug

![alt text](/img/devices/wyzeout5.webp "Wyze Outdoor Plug Dual Outlet WLPPO1")

Keep in mind the ESP32 requires more power than some of the older USB TTL adapters you might have used in the ESP8266 world.  I recommend the [little red guy CP2102](https://amzn.to/3R5obhx) or if you want the sure thing the [VoltLink Programmer](https://www.tindie.com/products/voltlog/voltlink-cp2102n-usb-serial-adapter-programmer/) is the one and done programmer.  

**ESPHome users** - Use the Modern Download bin to install Tasmota!  See this guide [ESPHome ESP32 Install Procedures](https://digiblur.com/wiki/ha/esphome-esp32-how-to-flash)  
**Tasmota users** - Use the [Tasmota Web Installer](https://tasmota.github.io/install/)

If you want to switch between Tasmota and ESPHome or vice versa this CANNOT be done via OTA.  You will need to serial flash the device again, so choose your firmware wisely.  

The screws on the Wyze Outdoor Plug are triangle head screws and may require an additional screw driver purchase such as the nice [iFixIt Kit](https://amzn.to/3fhaQQz) or others [kits](https://amzn.to/3suihr8).  

### Tasmota Template
```json
{"NAME":"Wyze Outdoor Plug","GPIO":[0,0,0,0,0,576,0,0,0,0,0,224,321,7713,7712,320,0,0,0,0,0,2624,2656,2720,0,0,0,0,225,0,4704,0,0,0,0,0],"FLAG":0,"BASE":1}
```

### ESPHome YAML
```yaml
substitutions:
  # Higher value gives lower watt readout
  current_res: "0.001"
  # Lower value gives lower voltage readout
  voltage_div: "770"  
  update_time: 10s  

esphome:
  name: wyzeoutdoor
  friendly_name: WyzeOutdoor
  name_add_mac_suffix: false

esp32:
  board: esp32dev
  framework:
    type: esp-idf

logger:
api:
ota:
  platform: esphome
captive_portal:
mdns:
#web_server:
# disabled to due potential memory issues

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
#  domain: !secret wifi_mydomain   
  ap:
    password: !secret ap_password

esp32_ble_tracker:
  scan_parameters:
    active: true

bluetooth_proxy:
  active: true    

switch:
  - platform: gpio
    name: Relay1
    pin:
      number: GPIO15
      inverted: false
    restore_mode: ALWAYS_ON
    id: relay1
    on_turn_on:
      - light.turn_on: relay1_led
    on_turn_off:
      - light.turn_off: relay1_led
  - platform: gpio
    name: Relay2
    pin:
      number: GPIO32
      inverted: false
    restore_mode: ALWAYS_ON       
    id: relay2
    on_turn_on:
      - light.turn_on: relay2_led
    on_turn_off:
      - light.turn_off: relay2_led
  - platform: restart
    name: Restart

output:
  - platform: gpio
    pin: GPIO19
    inverted: True
    id: relay1_led_gpio
  - platform: gpio
    pin: GPIO16
    inverted: True
    id: relay2_led_gpio

light:
  - platform: binary
    name: Relay1 LED
    id: relay1_led
    restore_mode: RESTORE_DEFAULT_ON     
    internal: true    
    output: relay1_led_gpio
  - platform: binary
    name: Relay2 LED
    id: relay2_led
    internal: true
    output: relay2_led_gpio
    restore_mode: RESTORE_DEFAULT_ON         

sensor:
  - platform: adc
    pin: GPIO34
    name: LUX
    update_interval: 10s
    attenuation: 11db
  - platform: hlw8012
    sel_pin:
      number: GPIO25
      inverted: true
    cf_pin: GPIO27
    cf1_pin: GPIO26
    current_resistor: ${current_res}
    voltage_divider: ${voltage_div}
    change_mode_every: 3
    update_interval: 3s    
    current:
      name: Amps
      unit_of_measurement: A
      accuracy_decimals: 2
    voltage:
      name: Volts
      unit_of_measurement: V
      accuracy_decimals: 1
    power:
      name: Watts
      unit_of_measurement: W
      accuracy_decimals: 0    
      filters:
        - calibrate_linear:
            - 0.0 -> 0.0
            - 134 -> 58 

binary_sensor:
  - platform: gpio
    internal: true
    pin:
      number: GPIO18
      mode: INPUT_PULLDOWN
      inverted: True
    name: Button1
    on_press:
      - switch.toggle: relay1
  - platform: gpio
    internal: true
    pin:
      number: GPIO17
      mode: INPUT_PULLDOWN
      inverted: True
    name: Button2
    on_press:
      - switch.toggle: relay2

status_led:
  pin:
    number: GPIO5
    inverted: true  
```

### GPIO Layout

| GPIO |    Component | Description |
|------ |-------------|-------------|         
|GPIO05	| Status LED
|GPIO15	| Relay 1
|GPIO16	| Led inverted 2
|GPIO17	| Button Inverted PullDown 1
|GPIO18	| Button Inverted PullDown 2
|GPIO19	| Led inverted 1
|GPIO25	| hlw8012 sel pin | Power Monitoring
|GPIO26	| hlw8012 cf1 pin | Power Monitoring
|GPIO27	| hlw8012 cf pin | Power Monitoring
|GPIO32	| Relay 2
|GPIO34	| LUX Analog | Light Sensor

### Pics
![alt text](/img/devices/wyzeoutdoor.webp "Wyze Outdoor Plug Dual Outlet WLPPO1 #1")

![alt text](/img/devices/wyzeout1.webp "Wyze Outdoor Plug Dual Outlet WLPPO1 #2")

![alt text](/img/devices/wyzeout2.webp "Wyze Outdoor Plug Dual Outlet WLPPO1 #3")

![alt text](/img/devices/wyzeout5.webp "Wyze Outdoor Plug Dual Outlet WLPPO1 #4")

![alt text](/img/devices/wyzeout6.webp "Wyze Outdoor Plug Dual Outlet WLPPO1 #5")

![alt text](/img/devices/wyzeout_bdm.webp "Wyze Outdoor Plug Dual Outlet WLPPO1 #5")