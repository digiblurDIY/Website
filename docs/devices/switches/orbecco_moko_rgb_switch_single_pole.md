### Orbecco/Moko RGB Switch (Single Pole)

Single pole switch with an RGB faceplate. This is a 2TDS device.

Purchase via [Amazon](https://amzn.to/3PKs9Ib)

Supported in Tasmota, ESPHome. Not supported in WLED.

#### Quick Setup via Tasmota Console Command
```
backlog template {"NAME":"RGB Switch","GPIO":[320,1,322,1,418,417,0,0,321,160,416,224,544,0],"FLAG":26956,"BASE":18}
```

### Tasmota Template
```json
{"NAME":"RGB Switch","GPIO":[320,1,322,1,418,417,0,0,321,160,416,224,544,0],"FLAG":26956,"BASE":18}
```

<details><summary>GPIO Layout</summary>
<p>
| GPIO |    Component | Description |
|------ |-------------|-------------|         
|GPIO00| Led_i 1 | Status light
|GPIO02| Led_i 3 | Status Light
|GPIO04| PWM 3 | Switch PWM Light
|GPIO05| PWM 2 | Switch PWM Light
|GPIO012| Led_i 2 | Status Light
|GPIO013| Led_i 2 | Switch
|GPIO014| PWM 1 | Switch PWM Light
|GPIO015| Relay| Internal Relay
|GPIO016| LedLink | Status Light
</p></details>

<details><summary>Settings</summary>     
<p>
No data available
</p></details>

<details><summary>ESPHome YAML</summary>     
<p>
No data available
</p></details>