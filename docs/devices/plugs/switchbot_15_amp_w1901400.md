# SwitchBot 15Amp W1901400 

15 amp ESP32-C3 based plug for the North America market that does not block the other outlet.  This smart plug can currently be upgraded via the SwitchBot OTA process - [GitHub](https://github.com/kendallgoto/switchbota) or [digiblurDIY Video](https://youtu.be/iTexFQ0Th0I), no soldering or manual flashing invovled.  

Purchase via [Amazon](https://amzn.to/3MzVSSR)  
Purchase via [SwitchBot Store](https://switchbot.vip/3avyiJe)

<iframe allowfullscreen height="353" src="https://www.youtube.com/embed/iTexFQ0Th0I" width="625" youtube-src-=""></iframe>  

#### Tasmota Template
```json
{"NAME":"SwitchBot 15A Plug","GPIO":[0,0,32,0,0,0,224,320,321,0,0,0,0,0,0,0,0,0,2720,2656,2624,0],"FLAG":0,"BASE":1}
```

#### Settings   
Power calibration needs to be done via the [Tasmota Calibration Procedure](https://tasmota.github.io/docs/Power-Monitoring-Calibration/#calibration-procedure)  
To turn off the useless ESP32 Temperature use the following command on the console `SetSensor127 0`

<details><summary>GPIO Layout</summary>     
<p>
| GPIO |    Component | Description |
|------ |-------------|-------------|         
|GPIO02	| Button 1 | Plug ON/OFF Button
|GPIO06	| Relay 1 | Relay
|GPIO07	| Led_i 1 | Inverted LED 1
|GPIO08	| Led_i 2 | Inverted LED 2
|GPIO18	| BL0937 CF | Power Monitoring Pins
|GPIO19	| HLWBL CF1 | Power Monitoring Pins
|GPIO20	| HLWBL SEL_i | Power Monitoring Pins
</p></details>

<details><summary>Rules</summary>     
<p>
None necessary.
</p></details>

<details><summary>ESPHome YAML</summary>     
<p>
```yaml
None added yet.
```
</p></details>

![alt text](/img/devices/switchbot_bulb1.webp "SwitchBot 15Amp W1901400 #1")

![alt text](/img/devices/switchbot_plug1.webp "SwitchBot 15Amp W1901400 #2")