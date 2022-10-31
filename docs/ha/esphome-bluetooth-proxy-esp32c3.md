# ESPHome Bluetooth Proxy ESP32-C3 YAML

ESPHome YAML Configuration to create an ESP32-C3 Home Assistant Bluetooth Active Proxy.  In layman's terms, it is a remote network attached Bluetooth adapter Home Assistant can use to communicate with Bluetooth devices.  For instance, put one in your backyard to pick up temperature sensors in the pool and greenhouse; list of [Bluetooth Compatible Devices](/wiki/ha/bluetooth-compatible-devices)   

Thanks to Cossid on Discord for help with config options to get this booting correctly!  This file can be used as a base to adapt to other ESP32-C3 Devices such as SwitchBot [Plugs](/wiki/devices/plugs/switchbot_15_amp_w1901400), [Bulbs](/wiki/devices/bulbs/switchbot_e26_w1401400), or even just [ESP32-C3 NodeMCU](https://amzn.to/3zrlyx4) Dev Boards.

## The YAML

```yaml
substitutions:
  display_name: esp32c3-btproxy

esphome:
  name: ${display_name}
  platformio_options:
    board_build.mcu: esp32c3
    board_build.variant: esp32c3  

esp32:
  variant: ESP32C3
  board: esp32dev
  framework:
    type: esp-idf
    sdkconfig_options:
      CONFIG_BT_BLE_50_FEATURES_SUPPORTED: y
      CONFIG_BT_BLE_42_FEATURES_SUPPORTED: y
      CONFIG_ESP_TASK_WDT_TIMEOUT_S: "10"    

logger:
api:
ota:

button:
  - platform: safe_mode
    name: ${display_name} (Safe Mode)

# Change the WiFi config to a non-static IP if needed
wifi:
  ssid: !secret wifi_myssid
  password: !secret wifi_mypass
  manual_ip:
    static_ip: !secret ip_esp32c3_btproxy
    gateway: !secret ip_gateway
    subnet: !secret ip_subnet
    dns1: !secret ip_dns1

esp32_ble_tracker:
  scan_parameters:
    interval: 1100ms
    window: 1100ms
    active: true

bluetooth_proxy:
  active: true
```