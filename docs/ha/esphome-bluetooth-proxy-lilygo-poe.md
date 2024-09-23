---
title: ESPHome Bluetooth Proxy LILYGO T-Internet-POE ESP32
description: How To Create a LILYGO T-Internet-POE ESP32 Home Assistant Bluetooth Proxy
image: /img/devices/lilygo-poe1.webp
date: "2024-09-23"
keywords: [power over ethernet proxy, poe bluetooth proxy, home assistant bluetooth, bluetooth compatible devices, bluetooth proxy, bluetooth proxies, bluetooth auto discovery]
---

# ESPHome Bluetooth Proxy LILYGO T-Internet-POE ESP32

ESPHome YAML Configuration to create an LILYGO T-Internet-POE ESP32 ESP32 (original Dual Core chip) Home Assistant Bluetooth Active Proxy all over Ethernet with power.  Bluetooth and Wi-Fi are both 2.4ghz so why not cut down on some of that traffic right?    In layman's terms, it is a remote network attached Bluetooth adapter Home Assistant can use to communicate with Bluetooth devices.  For instance, put one in your backyard to pick up temperature sensors in the pool and greenhouse; list of [Bluetooth Compatible Devices](/wiki/ha/bluetooth-compatible-devices)   

For proper installation procedures remember to do a Factory format/modern install of the ESPHome bin file created.  Additional info on the [ESPHome ESP32 Install Procedures](/wiki/ha/esphome-esp32-how-to-flash)

Purchase the LilyGo T-Internet from [Amazon](https://amzn.to/3ziCbhG) or [Aliexpress](https://s.click.aliexpress.com/e/_DCbLzET) (affiliate) - be sure to select the version with the Suit for easier flashing!

Need a case for it?  [3D Printer STL File](https://www.printables.com/model/527288-lilygo-t-internet-poe-case)

<img src="/img/devices/lilygo-poe1.webp" width="750" />

## LILYGO T-Internet-POE YAML

```yaml
esphome:
  name: esp32-lilypoe-btproxy
  friendly_name: esp32-lilypoe-btproxy
  
esp32:
  board: esp32dev
  framework:
    type: esp-idf

logger:
#  level: VERY_VERBOSE
api:
ota:
  - platform: esphome

esp32_ble_tracker:
  scan_parameters:
    interval: 1100ms
    window: 1100ms
    active: true

bluetooth_proxy:   
  active: true
  cache_services: true  

button:
  - platform: safe_mode
    name: (Safe Mode)
    entity_category: diagnostic    

ethernet:
  type: LAN8720
  mdc_pin: GPIO23
  mdio_pin: GPIO18
  clk_mode: GPIO17_OUT
  phy_addr: 0
# Change the ethernet config to a static IP if needed
#  manual_ip:
#    static_ip: 192.168.12.23
#    gateway: 192.168.12.1
#    subnet: 255.255.255.0
#    dns1: 192.168.12.1
```


