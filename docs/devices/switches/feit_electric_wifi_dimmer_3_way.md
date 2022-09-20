### Feit Electric Wifi Dimmer (3 Way)

Tuya MCU (Nuvoton) dimmer. This is a 2TDS device.

Purchase via [Amazon](https://amzn.to/3AfJZwX)
Purchase via [Costco](https://www.costco.com/feit-electric-smart-dimmer%2C-3-pack.product.100518151.html)

Supported in Tasmota, ESPHome.

#### Quick Setup via Tasmota Console Command
```
backlog template {"NAME":"Feit MCU Dimmer","GPIO":[255,107,255,108,255,255,0,0,255,0,255,0,255],"FLAG":0,"BASE":54}; TuyaMCU 21,2; DimmerRange 10,1000
```

### Tasmota Template
```json
{"NAME":"Feit MCU Dimmer","GPIO":[255,107,255,108,255,255,0,0,255,0,255,0,255],"FLAG":0,"BASE":54}
```

<details><summary>GPIO Layout</summary>     
<p>
| GPIO |    Component | Description |
|------ |-------------|-------------|         
|GPIO01	| Tuya TX | MCU Transmit
|GPIO03| Tuya RX | MCU Recieve
</p></details>

<details><summary>Settings</summary>     
<p>
| Setting | Description
|---------------|-------------
| TuyaMCU 21,2 | Enable MCU communication
| DimmerRange 10,1000  | Set dimming range, can change if needed
</p></details>

<details><summary>ESPHome YAML</summary>
<p>

```yaml
esphome:
  name: Feit MCU Dimmer
  friendly_name: Feit Dimmer
  platform: ESP8266
  board: esp01_1m

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
  ap:
    ssid: "Feit Dimmer"
    password: # !secret wifi_ap_password

captive_portal:

api:

ota:

# disable serial logging by setting baud_rate to 0 because baud_rate/serial connection is used by tuyamcu
logger:
  baud_rate: 0

uart:
  rx_pin: GPIO3
  tx_pin: GPIO1
  baud_rate: 9600

tuya:

light:
  - platform: "tuya"
    name: "Feit Dimmer Light"
    dimmer_datapoint: 2
    switch_datapoint: 1
    min_value: 10
    max_value: 1000
```

</p></details>

### Serial Flashing

After unscrewing and pulling the faceplate off of the HV internals, you should be faced with the TYWE2S module.

![alt text](/img/devices/feit-mcu-dimmer-pins.jpeg "Feit Dimmer Pins")

If the shield has not already been removed, remove it.

![alt text](/img/devices/feit-mcu-dimmer-remove-shield.jpeg "Feit Dimmer Pins")

Solder (!very carefully!) or touch (you must have surgeon hands) GPIO0 and flash as you would normally.

![alt text](/img/devices/feit-mcu-dimmer-io-zero.jpeg "Feit Dimmer Pins")