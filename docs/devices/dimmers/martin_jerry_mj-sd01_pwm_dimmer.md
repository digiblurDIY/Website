# Martin Jerry MJ-SD01 (Single Pole PWM Dimmer)

### Description

The versatile single pole dimmer by Martin Jerry.  No secondary MCU to contend with so you can easily control the buttons to do almost anything you want.  There's **no template needed** when used with TASMOTA as it built right into the Configure Module selection screen.  PCDiem as done a great job at documenting all the features he's packed into the device software [here](https://tasmota.github.io/docs/PWM-dimmer-switch/).  

Need a 3 way version?  Use this model with other dimmers/switches utilizing [TASMOTA Device Groups](/wiki/wiring-diagrams/tasmota-devgroups)

Martin Jerry sells the switch in both the Tuya Smartlife model or TASMOTA Pre-Flashed.  **Pre-Flashed is the way to go!**

**Purchase TASMOTA Pre-Flashed via [Amazon](https://amzn.to/3U790CU)  **

### digiblurDIY Video
<iframe allowfullscreen height="353" src="https://www.youtube.com/embed/uU7oy-Kz7T8" width="625" youtube-src-=""></iframe>  

#### Tasmota Template
None necessary.  Tasmota GUI -> Configuration -> Configure Module -> PWM Dimmer (73)  
***OR***  
issue a ***Module 73*** command on the Tasmota Console. 

### GPIO Layout

| GPIO |    Component | Description |
|------ |-------------|-------------|         
|GPIO00 | Button 3 | Up button
|GPIO01 | Button 2 | Down button
|GPIO03 | Led_i 4 | Dim Level 5
|GPIO04 | LedLink_i | Red Status LED
|GPIO05 | Led_i 3 | Dim Level 4
|GPIO012 | Led_i 2 | Dim Level 3
|GPIO013 | PWM 1 | Dimming level
|GPIO014	| Led_i 1   | Dim Level 2
|GPIO015	| Button_i 1 | Power button
|GPIO016	| Relay_i  | Dimmer power and Dim Level LED 1 and Blue Status LED

### TASMOTA Settings

| Setting | Description
|---------------|-------------
| setoption73 0 | Should already be defaulted to off to allow the buttons to function
| setoption59 1  | Report light state changes via MQTT
| dimmerrange | Set as necessary based on the bulbs used

### ESPHome YAML Config

```yaml
None yet.
```

### Pics

![alt text](/img/devices/mj-sd01_3.webp "Martin Jerry MJ-SD01 #1")
![alt text](/img/devices/mj-sd01_2.webp "Martin Jerry MJ-SD01 #1")
![alt text](/img/devices/mj-sd01_1.webp "Martin Jerry MJ-SD01 #1")
