---
title: This DIY mmWave Presence Sensor Changed Everything - LD1125H How To Guide
date: "2023-05-24"
description: Complete How To Guide for building the perfect mmWave Presence Sensor for Home Assistant
image: /img/thumbs/esphome-ld1125.jpg
categories: 
  - "esphome"
  - "home assistant"
  - "mmwave"
keywords: [esphome, homeassistant presence, ld1125, mmwave]
authors: digiblur
---

After searching through many mmWave sensors, some bad, some great, some expensive,  I've landed on the LD1125G.  An inexpensive sensor and stupid quick!  In the video below I cover the testing process, building and installing open source ESPHome software on the ESP32.  No cloud, no additional apps, and 100% local.

The use of a PIR has plagued my bathrooms from time to time with lights going out too early based on various activities in the bathroom.  One cheat I did was to use the humidity sensor that drives the fan to force the light to be on when the humidity is high.  This has worked well for the most part but I've been looking to fix the pain point in the smart home world for quite some time.  I've finally found a sensor that works quick, easy to install and use.  This has unlocked various new automations for the bathroom such as; turn on the vent if someone is in the bathroom for more than a minute or two, turn off the light once the person leaves and still allow the vent to run to pull down the humidity.  Fully automating the light and fan in the bathroom may sound silly to some individuals but it is the thing that makes the home a true Smart Home and not use a remote controlled one.

### Full Video 

<iframe allowfullscreen height="353" src="https://www.youtube.com/embed/VE62MAQDuCw" width="625" youtube-src-=""></iframe>  

### Wiring Diagram

![alt text](/img/diagrams/esphome-mmwave-ld1125-diagram.webp)

Thanks Caleb for the awesome diagram!  For a power source, I'm currently using a 5VDC power supply in my attic that powers many ESP based projects around the house in the walls, ceiling, etc.  

### What do you need?

*Affiliate Links
1. [mmWave LD1125G](https://s.click.aliexpress.com/e/_DmoBDV3) - Make sure to choose HLK-LD1125H-24G! or [Aliexpress #2](https://www.aliexpress.us/item/3256803963128099.html?aff_fcid=75d3a769a22b421d81e9eb2e0ad8844b-1684940455088-04288-_DmoBDV3&tt=CPS_NORMAL&aff_fsk=_DmoBDV3&aff_platform=shareComponent-detail&sk=_DmoBDV3&aff_trace_key=75d3a769a22b421d81e9eb2e0ad8844b-1684940455088-04288-_DmoBDV3&terminal_id=e89bf994bae64845acc04c9ef4d83ef1&afSmartRedirect=y&gatewayAdapt=glo2usa)
2. [ESP32 NodeMCU Dev Board](https://amzn.to/3IE33tM) or [ESP32 NodeMCU Dev Board](https://s.click.aliexpress.com/e/_DDSKt7r)
3. [2.0mm to 2.54mm Pitch Female to Female Jumpers](https://amzn.to/45oCToF)
4. [Optional BME280](https://amzn.to/45pwF86)
5. [Optional USB Screw Terminals](https://amzn.to/3WxeE3D)
6. 5VDC Power Source

Read more  👉
<!--truncate-->

### ESPHome Code

Thanks to patrick3399 for his awesome [YAML repo of Hi-Link mmWave sensors on Github](https://github.com/patrick3399/Hi-Link_mmWave_Radar_ESPHome)

I've changed up a few things such as debug sensors, debug logs and added the BME280 sensors.

```yaml
substitutions:
  devicename: "esp32-mastbath" 
  upper_devicename: "esp32-mastbath" 
  update_time: 30s
esphome:
  name: $devicename
  on_boot:    #LD1125H Initial Setting
    priority: -200
    then:
      - uart.write:
          id: LD1125H_UART_BUS
          data: !lambda |-
            std::string th1st = "mth1=" + str_sprintf("%.0f",id(LD1125H_mth1).state) +"\r\n";
            return std::vector<uint8_t>(th1st.begin(), th1st.end());
      - uart.write:
          id: LD1125H_UART_BUS
          data: !lambda |-
            std::string th2st = "mth2=" + str_sprintf("%.0f",id(LD1125H_mth2).state) +"\r\n";
            return std::vector<uint8_t>(th2st.begin(), th2st.end());
      - uart.write:
          id: LD1125H_UART_BUS
          data: !lambda |-
            std::string th3st = "mth3=" + str_sprintf("%.0f",id(LD1125H_mth3).state) +"\r\n";
            return std::vector<uint8_t>(th3st.begin(), th3st.end());
      - uart.write:
          id: LD1125H_UART_BUS
          data: !lambda |-
            std::string rmaxst = "rmax=" + str_sprintf("%.1f",id(LD1125H_rmax).state) +"\r\n";
            return std::vector<uint8_t>(rmaxst.begin(), rmaxst.end());

i2c:
  sda: GPIO19
  scl: GPIO21
  scan: True  

esp32:
  board: nodemcu-32s
  framework:
    type: esp-idf  #Suggest Use ESP-IDF Framework, or Plug Out the UART Cable Might Cause ESP32 Hang. 
external_components:
  - source:
      type: git
      url: https://github.com/ssieb/custom_components #Thanks for @ssieb components.
    components: [ serial ]
logger:
  level: INFO  #You Can Use "INFO" Level
  baud_rate: 0
api:
ota:
wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
  power_save_mode: LIGHT
#  manual_ip:
#    static_ip: !secret ip_esp32mastbath
#    gateway: !secret ip_gateway
#    subnet: !secret ip_subnet
#    dns1: !secret ip_dns1
uart:
  id: LD1125H_UART_BUS
  rx_pin: GPIO16  #For ESP32, you can use any pin, Recommend Use UART_2, Don't use UART_0, It might Cause Boot Fail or System Hang
  tx_pin: GPIO17  #For ESP32, you can use any pin, Recommend Use UART_2, Don't use UART_0, It might Cause Boot Fail or System Hang
#  rx_pin: GPIO1  #For ESP32, you can use any pin, Recommend Use UART_2, Don't use UART_0, It might Cause Boot Fail or System Hang
#  tx_pin: GPIO0 #For ESP32, you can use any pin, Recommend Use UART_2, Don't use UART_0, It might Cause Boot Fail or System Hang
  baud_rate: 115200
  data_bits: 8
  stop_bits: 1
  parity: NONE
#  debug:
#    direction: BOTH
#    dummy_receiver: false
#    after:
#      delimiter: "\n"
#    sequence:
#      - lambda: UARTDebug::log_string(direction, bytes);
globals:
  - id: LD1125H_Last_Time
    type: time_t
    restore_value: no
    initial_value: time(NULL)
  - id: LD1125H_Last_Mov_Time
    type: time_t
    restore_value: no
    initial_value: time(NULL)
  - id: LD1125H_Clearence_Status
    type: bool
    restore_value: no
    initial_value: "false"
status_led:
  pin:
    number: GPIO2 #ESP32 OnBroad LED
    inverted: false
#web_server:   #Avoid Using Web Server To Prevent Hang
#  port: 80
interval:
  - interval: 1s #Clearance Scan Time
    setup_priority: -200
    then:
      lambda: |-
        if ((time(NULL)-id(LD1125H_Last_Time))>id(LD1125H_Clear_Time).state) {
          if ((id(LD1125H_Clearence_Status) == false) || (id(LD1125H_Occupancy).state != "Clearance")) {
            id(LD1125H_Occupancy).publish_state("Clearance");
            id(LD1125H_Clearence_Status) = true;
          }
          if (id(LD1125H_MovOcc_Binary).state == true) {
            id(LD1125H_MovOcc_Binary).publish_state(false);
          }
          if (id(LD1125H_Mov_Binary).state == true) {
            id(LD1125H_Mov_Binary).publish_state(false);
          }
        }
number:
  - platform: template
    name: ${upper_devicename} LD1125H mth1 #mth1 is 0~2.8m Sensitivity.
    id: LD1125H_mth1
    icon: "mdi:cogs"
    optimistic: true
    restore_value: true #If you don't want to store the setting at ESP, set it to false.
    initial_value: "60.0" #Default mth1 Setting
    min_value: 10.0
    max_value: 600.0
    step: 5.0
    set_action:
      then:
        - uart.write:
            id: LD1125H_UART_BUS
            data: !lambda |-
              std::string th1st = "mth1=" + str_sprintf("%.0f",x) +"\r\n";
              return std::vector<uint8_t>(th1st.begin(), th1st.end());
  - platform: template
    name: ${upper_devicename} LD1125H mth2 #mth2 is 2.8~8m Sensitivity.
    id: LD1125H_mth2
    icon: "mdi:cogs"
    optimistic: true
    restore_value: true #If you don't want to store the setting at ESP, set it to false.
    initial_value: "30" #Default mth2 Setting
    min_value: 5
    max_value: 300
    step: 5
    set_action:
      then:
        - uart.write:
            id: LD1125H_UART_BUS
            data: !lambda |-
              std::string th2st = "mth2=" + str_sprintf("%.0f",x) +"\r\n";
              return std::vector<uint8_t>(th2st.begin(), th2st.end());
  - platform: template
    name: ${upper_devicename} LD1125H mth3 #mth3 is above 8m Sensitivity.
    id: LD1125H_mth3
    icon: "mdi:cogs"
    optimistic: true
    restore_value: true #If you don't want to store the setting at ESP, set it to false.
    initial_value: "20" #Default mth3 Setting
    min_value: 5
    max_value: 200
    step: 5
    set_action:
      then:
        - uart.write:
            id: LD1125H_UART_BUS
            data: !lambda |-
              std::string th3st = "mth3=" + str_sprintf("%.0f",x) +"\r\n";
              return std::vector<uint8_t>(th3st.begin(), th3st.end());
  - platform: template
    name: ${upper_devicename} LD1125H rmax #rmax is max detection distance.
    id: LD1125H_rmax
    icon: "mdi:cogs"
    optimistic: true
    restore_value: true #If you don't want to store the setting at ESP, set it to false.
    initial_value: "8" #Default rmax Setting
    min_value: 0.4
    max_value: 12
    step: 0.1
    set_action:
      then:
        - uart.write:
            id: LD1125H_UART_BUS
            data: !lambda |-
              std::string rmaxst = "rmax=" + str_sprintf("%.1f",x) +"\r\n";
              return std::vector<uint8_t>(rmaxst.begin(), rmaxst.end());
  - platform: template
    name: ${upper_devicename} LD1125H Clearence Time
    id: LD1125H_Clear_Time
    icon: "mdi:cogs"
    optimistic: true
    restore_value: true #If you don't want to store the setting at ESP, set it to false.
    initial_value: "5" #LD1125H Mov/Occ > Clearence Time Here
    min_value: 0.5
    max_value: 20
    step: 0.5
  - platform: template
    name: ${upper_devicename} LD1125H Movement Time
    id: LD1125H_Mov_Time
    icon: "mdi:cogs"
    optimistic: true
    restore_value: true #If you don't want to store the setting at ESP, set it to false.
    initial_value: "1" #LD1125H Mov > Occ Time Here
    min_value: 0.5
    max_value: 10
    step: 0.5
sensor:
  - platform: bme280_i2c
    temperature:
      name: ${upper_devicename} BME280 Temp
      accuracy_decimals: 1     
      oversampling: 2x
    pressure:
      name: ${upper_devicename} BME280 Pressure
      oversampling: 2x
    humidity:
      name: ${upper_devicename} BME280 Humidity
      accuracy_decimals: 1     
      oversampling: 2x
    address: 0x76
    update_interval: ${update_time}   
#  - platform: aht10
#    temperature:
#      accuracy_decimals: 2     
#      name: ${upper_devicename} AHT21 Temp
#    humidity:
#      accuracy_decimals: 2     
#      name: ${upper_devicename} AHT21 Humidity
#    update_interval: ${update_time}     
#  - platform: wifi_signal
#    name: ${upper_devicename} WiFi Signal
#    update_interval: 60s
  - platform: uptime
    name: ${upper_devicename} Uptime
  - platform: template
    name: ${upper_devicename} LD1125H Distance
    id: LD1125H_Distance
    icon: "mdi:signal-distance-variant"
    unit_of_measurement: "m"
    accuracy_decimals: 2
    filters:    # Use Fliter To Debounce
    - sliding_window_moving_average:
        window_size: 8
        send_every: 2
    - heartbeat: 0.2s
text_sensor:
  - platform: serial
    uart_id: LD1125H_UART_BUS
    name: ${upper_devicename} LD1125H UART Text
    id: LD1125H_UART_Text
    icon: "mdi:format-text"
    internal: True #If Don't Want to See UART Receive Data, Set To True
    on_value:
      lambda: |-
        if (id(LD1125H_UART_Text).state.substr(0,3) == "occ") {
          id(LD1125H_Distance).publish_state(atof(id(LD1125H_UART_Text).state.substr(9).c_str()));
          if ((time(NULL)-id(LD1125H_Last_Mov_Time))>id(LD1125H_Mov_Time).state) {
            id(LD1125H_Occupancy).publish_state("Occupancy");
            if (id(LD1125H_MovOcc_Binary).state == false) {
              id(LD1125H_MovOcc_Binary).publish_state(true);
            }
            if (id(LD1125H_Mov_Binary).state == true) {
              id(LD1125H_Mov_Binary).publish_state(false);
            }
          }
          if (id(LD1125H_MovOcc_Binary).state == false) {
            id(LD1125H_MovOcc_Binary).publish_state(true);
          }
          id(LD1125H_Last_Time) = time(NULL);
          if (id(LD1125H_Clearence_Status) == true) {
            id(LD1125H_Clearence_Status) = false;
          }
        }
        else if (id(LD1125H_UART_Text).state.substr(0,3) == "mov") {
          id(LD1125H_Distance).publish_state(atof(id(LD1125H_UART_Text).state.substr(9).c_str()));
          id(LD1125H_Occupancy).publish_state("Movement");
          if (id(LD1125H_MovOcc_Binary).state == false) {
            id(LD1125H_MovOcc_Binary).publish_state(true);
          }
          if (id(LD1125H_Mov_Binary).state == false) {
            id(LD1125H_Mov_Binary).publish_state(true);
          }
          id(LD1125H_Last_Mov_Time) = time(NULL);
          id(LD1125H_Last_Time) = time(NULL);
          if (id(LD1125H_Clearence_Status) == true) {
            id(LD1125H_Clearence_Status) = false;
          }
        }
  - platform: template
    name: ${upper_devicename} LD1125H Occupancy Status
    id: LD1125H_Occupancy
    icon: "mdi:motion-sensor"
binary_sensor:
  - platform: status
    name: ${upper_devicename} Status
  - platform: template
    name: ${upper_devicename} LD1125H Occupancy or Movement
    id: LD1125H_MovOcc_Binary
    device_class: occupancy
  - platform: template
    name: ${upper_devicename} LD1125H Movement
    id: LD1125H_Mov_Binary
    device_class: motion  
```






