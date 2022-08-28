# Vont Color Pro SLB04-RCWV1 A19 RGB+CT

5 Channel RGB+CT E26 810 lumen bulb with an ESP32-C3.  This smart bulb can flashed via soldering without destroying the bulb.

Purchase via [Amazon](https://amzn.to/3Eq4WH8)  

#### digiblurDIY Video
<iframe allowfullscreen height="353" src="https://www.youtube.com/embed/92F7DqQrZWg" width="625" youtube-src-=""></iframe>  

#### Quick Setup via Tasmota Console Command
```
backlog template {"NAME":"Vont ESP32-C3 A19 RGBCT","GPIO":[0,0,0,452,419,418,416,417,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"FLAG":0,"BASE":1,"CMND":"so92 1"}; module 0; so92 1; so59 1
```

#### Tasmota Template
```json
{"NAME":"Vont ESP32-C3 A19 RGBCT","GPIO":[0,0,0,452,419,418,416,417,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"FLAG":0,"BASE":1,"CMND":"so92 1"}
```

<details><summary>GPIO Layout</summary>     
<p>
| GPIO |    Component | Description |
|------ |-------------|-------------|         
|GPIO03	| PWM_i 5 | Warm White
|GPIO04	| PWM 4 | Cool White
|GPIO05	| PWM 3 | Blue
|GPIO06	| PWM 1 | Red
|GPIO07	| PWM 2 | Green
</p></details>

<details><summary>Settings</summary>     
<p>

| Setting | Description
|---------------|-------------
| setoption92 1 | Set the correct color temperature method
| setoption59 1  | Report light state changes via MQTT
</p></details>

![alt text](/img/devices/vontcolorpro_1.jpg "Vont Color Pro Bulb #1")

![alt text](/img/devices/vontcolorpro_2.jpg "Vont Color Pro Bulb #2")

![alt text](/img/devices/vontcolorpro_3.png "Vont Color Pro Bulb #3")

![alt text](/img/devices/vontcolorpro_4.png "Vont Color Pro Bulb #4")

