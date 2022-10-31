# ESPHome Bluetooth Proxy ESP32 YAML

ESPHome YAML Configuration to create an ESP32 (original Dual Core chip) Home Assistant Bluetooth Active Proxy.  In layman's terms, it is a remote network attached Bluetooth adapter Home Assistant can use to communicate with Bluetooth devices.  For instance, put one in your backyard to pick up temperature sensors in the pool and greenhouse; list of [Bluetooth Compatible Devices](/wiki/ha/bluetooth-compatible-devices)   

This file can be used as a base to adapt to other ESP32 Devices such as [SwitchBot Outdoor Plug](/2021/03/27/how-to-flash-the-wyze-outdoor-plug-esphome-or-tasmota-local-control), [ESP32 NodeMCU](https://amzn.to/3SNhQFv) Dev Boards, [ESP32 Power over Ethernet Boards](https://www.mouser.com/new/olimex/olimex-esp32-poe-dev-boards/), and more.

## ESP32 WiFi YAML

```yaml
substitutions:
  display_name: esp32-btproxy
  
esphome:
  name: ${display_name}
  platform: ESP32
  board: esp-wrover-kit

# Change the WiFi config to a non-static IP if needed
wifi:
  ssid: !secret wifi_myssid
  password: !secret wifi_mypass
  manual_ip:
    static_ip: !secret ip_esp32_btproxy
    gateway: !secret ip_gateway
    subnet: !secret ip_subnet
    dns1: !secret ip_dns1
  ap: 
    ssid: ${display_name}_AP
    password: !secret wifi_mypass
    ap_timeout: 3min
    
captive_portal:
logger:
api:
ota:

esp32_ble_tracker:
  scan_parameters:
    active: true
bluetooth_proxy:   
  active: true

button:
  - platform: safe_mode
    name: ${display_name} (Safe Mode)
```

## ESP32 Olimex POE YAML

<img src="/img/devices/olimex_esp32_poe_iso.webp" width="350" />

```yaml
substitutions:
  display_name: esp32poe-btproxy

esphome:
  name: ${display_name}

esp32:
  board: esp32-poe-iso
  framework:
    type: arduino

logger:
api:
ota:

esp32_ble_tracker:
  scan_parameters:
    interval: 1100ms
    window: 1100ms
    active: true

bluetooth_proxy:
  active: true

button:
  - platform: safe_mode
    name: ${display_name} (Safe Mode)

# Change the ethernet config to a non-static IP if needed
ethernet:
  type: LAN8720
  mdc_pin: GPIO23
  mdio_pin: GPIO18
  clk_mode: GPIO17_OUT
  phy_addr: 0
  power_pin: GPIO12
  manual_ip:
    static_ip: 192.168.1.21
    gateway: 192.168.1.1
    subnet: 255.255.255.0
    dns1: 192.168.1.1

sensor:
  - platform: adc
    pin: GPIO39
    name: ${display_name} gpio39
    update_interval: 10s
```
