# Vont Color Pro SLB04-RCWV1 A19 RGB+CT

5 Channel RGB+CT E26 810 lumen bulb with an ESP32-C3.  This smart bulb can flashed via soldering without destroying the bulb.

Purchase via [Amazon](https://amzn.to/3Eq4WH8)  

### digiblurDIY Video
<iframe allowfullscreen height="353" src="https://www.youtube.com/embed/92F7DqQrZWg" width="625" youtube-src-=""></iframe>  

### Quick Setup via Tasmota Console Command
```
backlog template {"NAME":"Vont ESP32-C3 A19 RGBCT","GPIO":[0,0,0,452,419,418,416,417,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"FLAG":0,"BASE":1,"CMND":"so92 1"}; module 0; so92 1; so59 1
```

### Tasmota Template
```json
{"NAME":"Vont ESP32-C3 A19 RGBCT","GPIO":[0,0,0,452,419,418,416,417,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"FLAG":0,"BASE":1,"CMND":"so92 1"}
```

### GPIO Layout

| GPIO |    Component | Description |
|------ |-------------|-------------|         
|GPIO03 | PWM_i 5 | Warm White
|GPIO04	| PWM 4   | Cool White
|GPIO05	| PWM 3   | Blue
|GPIO06	| PWM 1   | Red
|GPIO07	| PWM 2   | Green

### TASMOTA Settings

| Setting | Description
|---------------|-------------
| setoption92 1 | Set the correct color temperature method
| setoption59 1  | Report light state changes via MQTT

### ESPHome YAML Config

```yaml
substitutions:
  display_name: <your display name>
  friendly_name: <your friendly name>

esphome:
  name: ${display_name}
  platformio_options:
    board_build.mcu: esp32c3
    board_build.variant: esp32c3  
# added the line below to prevent bootloops when flashing modern bin via serial
    board_build.flash_mode: dio    
    
esp32:
  variant: ESP32C3
  board: esp32-c3-devkitm-1
  framework:
    type: esp-idf
    sdkconfig_options:
      CONFIG_BT_BLE_50_FEATURES_SUPPORTED: y
      CONFIG_BT_BLE_42_FEATURES_SUPPORTED: y
      CONFIG_ESP_TASK_WDT_TIMEOUT_S: "10"

logger:
api:
ota:

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password

output:
 - platform: ledc
   id: red_output
   pin: GPIO6
 - platform: ledc
   id: green_output
   pin: GPIO7
 - platform: ledc
   id: blue_output
   pin: GPIO5
 - platform: ledc
   id: white_output
   pin: GPIO4
 - platform: ledc
   id: ct_output
   inverted: true
   pin: GPIO3

light:
 - platform: rgbct
   restore_mode: RESTORE_DEFAULT_ON
   name: "${friendly_name}"
   red: red_output
   green: green_output
   blue: blue_output
   white_brightness: white_output
   color_temperature: ct_output
   cold_white_color_temperature: 153 mireds
   warm_white_color_temperature: 500 mireds
   color_interlock: true
```

### Pics

![alt text](/img/devices/vontcolorpro_1.webp "Vont Color Pro Bulb #1")

![alt text](/img/devices/vontcolorpro_2.webp "Vont Color Pro Bulb #2")

![alt text](/img/devices/vontcolorpro_3.webp "Vont Color Pro Bulb #3")

![alt text](/img/devices/vontcolorpro_4.webp "Vont Color Pro Bulb #4")

