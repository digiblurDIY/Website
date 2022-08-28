# Vont Color SLB02 A19 RGB+2700K

4 Channel RGB+WW(2700K) E26 810 lumen bulb with an ESP32-C3.  This smart bulb can flashed via soldering without destroying the bulb.

Purchase via [Amazon](https://amzn.to/3EoVow6)  

### digiblurDIY Video
<iframe allowfullscreen height="353" src="https://www.youtube.com/embed/92F7DqQrZWg" width="625" youtube-src-=""></iframe>  

### Tasmota Template
```json
{"NAME":"Vont ESP32-C3 A19 RGBW","GPIO":[0,0,0,0,419,418,416,417,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"FLAG":0,"BASE":1}
```

<details><summary>GPIO Layout</summary>     
<p>
| GPIO |    Component | Description |
|------ |-------------|-------------|         
|GPIO04	| PWM 4 | Warm White
|GPIO05	| PWM 3 | Blue
|GPIO06	| PWM 1 | Red
|GPIO07	| PWM 2 | Green
</p></details>

<details><summary>Settings</summary>     
<p>

| Setting | Description
|---------------|-------------
| setoption59 1  | Report light state changes via MQTT
</p></details>

### Pics

![alt text](/img/devices/vontcolorpro_1.jpg "Vont Color Bulb #1")

![alt text](/img/devices/vontcolorpro_2.jpg "Vont Color Bulb #2")

![alt text](/img/devices/vontcolorpro_3.png "Vont Color Bulb #3")

![alt text](/img/devices/vontcolor_1.jpg "Vont Color Bulb #4")

