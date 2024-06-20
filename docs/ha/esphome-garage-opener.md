# ESPHome Garage Opener

myQ newer model garage door openers have these "digital" buttons where you can't just use a relay to act like the button is being pushed to open/close the garage door.  I used a spare remote opener to control both of my doors without the cloud and keep it all local and reliable.  In a later revision I will also be adding vehicle sensors to determine if a vehicle is parked in the spot for automating the doors opening and closing.

## Parts

[Project Box](https://amzn.to/3yq107O) to fit everything in and keep dust, bugs, etc out of.  
[Spare Opener](https://amzn.to/3CoEgpI) (only needed if you have the digital buttons like myQ)   
[ESP32](https://amzn.to/3SNhQFv)  
[ESP32 Breakout](https://amzn.to/3RIhX40)  
[Dual Dry Contact Relay](https://amzn.to/3EurUPq)  
[Door Reed](https://amzn.to/3SRajpt)  (screws! no glue or stickers)  
[Dupont Jumpers](https://amzn.to/3SQHv03)  
[Wire](https://amzn.to/3fTGW7c)  
[Ferrule Crimp Kit](https://amzn.to/3egK1xU)  Optional but oh so awesome

And alternative could be done using two [Shelly 1](https://s.click.aliexpress.com/e/_DF9rCJZ) dry contact relays.

Links to products provided through the Amazon Affiliate program. As an Amazon Associate I earn from qualifying purchases.

## Wiring

![alt text](/img/diagrams/esphome_myq_killer_garage.webp "ESPHome Dual Relay myQ Killer")

Open the image in a new tab or download it for full zooming resolution. Thanks to Caleb for the drawing!

## ESPHome YAML Config

```yaml
substitutions:
  disp_name: digirage

esphome:
  name: digirage

esp32:
  board: esp32dev
  framework:
    type: arduino

## Static IP used - Change this to suit your network setup
wifi:
  ssid: !secret wifi_myssid
  password: !secret wifi_mypass
  manual_ip:
    static_ip: !secret ip_digirage
    gateway: !secret ip_gateway
    subnet: !secret ip_subnet
    dns1: !secret ip_dns1

#mqtt:
#  broker: !secret mqtt_broker
#  username: !secret mqtt_user
#  password: !secret mqtt_pass
#  reboot_timeout: 45s    

#esp32_ble_tracker:
#  scan_parameters:
#    active: true
#bluetooth_proxy:
#  active: true

logger:
api:
ota:
  platform: esphome
web_server:
  auth:
    username: admin
    password: !secret web_server_password 

switch:
  - platform: gpio
    name: ${disp_name} Relay1
    pin:
      number: GPIO22
      inverted: false
    id: relay1
    restore_mode: ALWAYS_OFF 
  - platform: gpio
    name: ${disp_name} Relay2
    pin:
      number: GPIO23
      inverted: false
    id: relay2
    restore_mode: ALWAYS_OFF 
  - platform: restart
    name: ${disp_name} Restart

binary_sensor:
  - platform: gpio
    name: ${disp_name} Reed1
    pin: 
      number: GPIO18
      mode: INPUT_PULLUP
    filters:
      - delayed_on: 100ms
      - delayed_off: 100ms
    id: reed_switch1
    internal: true
  - platform: gpio
    name: ${disp_name} Reed2
    pin: 
      number: GPIO19
      mode: INPUT_PULLUP
    filters:
      - delayed_on: 100ms
      - delayed_off: 100ms
    id: reed_switch2
    internal: true

    
cover:
  - platform: template
    device_class: garage
    name: ${disp_name} Door 1
    id: template_cover1
    lambda: |-
      if (id(reed_switch1).state) {
        return COVER_OPEN;
      } else {
        return COVER_CLOSED;
      }
    open_action:
      - switch.turn_on: relay1
      - delay: 0.5s
      - switch.turn_off: relay1
    close_action:
      - switch.turn_on: relay1
      - delay: 0.5s
      - switch.turn_off: relay1      
    stop_action:
      - switch.turn_on: relay1
      - delay: 0.5s
      - switch.turn_off: relay1      
  - platform: template
    device_class: garage
    name: ${disp_name} Door 2
    id: template_cover2
    lambda: |-
      if (id(reed_switch2).state) {
        return COVER_OPEN;
      } else {
        return COVER_CLOSED;
      }
    open_action:
      - switch.turn_on: relay2
      - delay: 0.5s
      - switch.turn_off: relay2
    close_action:
      - switch.turn_on: relay2
      - delay: 0.5s
      - switch.turn_off: relay2
    stop_action:
      - switch.turn_on: relay2
      - delay: 0.5s
      - switch.turn_off: relay2
```

