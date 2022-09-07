# SSMS118-01A1 Scene Light Smart Switch

Single pole smart light switch with RGB LEDs in face of the switch.

Sold under many different product brands:
- MoKo
- Orbecco
- KAUF
- Diydeg
- PAWACA

Easy to find when searching amazon for "rgb light switch" and look for the picture of the similar looking device.

Purchase via:

[Amazon](https://amzn.to/3roJxb3)

[Alibaba](https://alibaba.com/pla/wholesalers-Mechanical-wifi-smart-switch-with_62318172300.html)

[Aliexpress](https://www.aliexpress.com/item/3256803649753950.html)


## Images

![alt text](/img/devices/ssms118-rgb-switch.jpg "SSMS118 RGB Switch")

## Flashing

### TuyaConvert (Preferred)

These switches can be flashed with the OTA hacked called TuyaConvert.
You'll tuyaconvert this switch and then upload the full-rules bin afterwards.  It can be downloaded here:

[Full Rules bin](https://github.com/Jason2866/Tasmota-specials/blob/firmware/firmware/tasmota/other/tasmota-fullrules.bin)

### Serial Flashing

#### Video Tutorial
[Anatomy of an RGB Smart Switch - Teardown and Flash Tasmota](https://youtu.be/JDt74GjLe9g)

<details><summary>Switch Tear Down</summary>     
<p>
You'll have to push delicately the tabs in of the button cover to pull it off to access the four screws to pull open the switch:

![alt text](/img/devices/ssms118-rgb-switch-teardown1.jpg "Smart Scene Switch Tear Down removing the face plate")
![alt text](/img/devices/ssms118-rgb-switch-teardown2.jpg "Smart Scene Switch Tear Down removing screws")
![alt text](/img/devices/ssms118-rgb-switch-teardown3.jpg "Smart Scene Switch Tear Down removing back plate")
![alt text](/img/devices/ssms118-rgb-switch-teardown4.jpg "Smart Scene Switch Tear Down removing the PCBs")
![alt text](/img/devices/ssms118-rgb-switch-teardown5.jpg "Smart Scene Switch Tear Down removing LED Shield")

You'll need a FTDI adapter and here is the wiring diagram:

![alt text](/img/devices/ssms118-rgb-switch-flashing-pinout.jpg "5 Inside Flashing Pinout")

We use the full rules in the configuration and it requires the special `full-rules`

Open the TASMOTA [webinstaller](https://tasmota.github.io/install/) and flash it with the latest TASMOTA unoffical fullrules.

</p></details>

## TASMOTA Template
<hr/>

```json
{"NAME":"RGB Switch","GPIO":[257,0,259,161,418,417,0,0,258,32,416,224,0,0],"FLAG":0,"BASE":18}
```

<details><summary>GPIO Layout</summary>     
<p>

| GPIO |    Component | Description |
|------ |-------------|-------------|         
|GPIO00	| Relay_i 2   | Small corner red LED |
|GPIO01	| None
|GPIO02	| Relay_i 3   | Small corner blue LED | 
|GPIO03	| None        |
|GPIO04	| PWM 3       | Main switch PWM LEDs  |
|GPIO05	| PWM 2       | Main switch PWM LEDs  |
|GPIO09	| None
|GPIO10	| None
|GPIO12	| Relay_i 4  | Small corner green LED |
|GPIO13	| Button 1   | The main switch button |
|GPIO14	| PWM 1      | Main switch PWM LEDs   |
|GPIO15	| Relay 1    | Main light relay       |
|GPIO16	| None
|GPIO17 | None
</p></details>

<details><summary>Settings</summary>     
<p>

| Setting | Description
|---------------|-------------
| SetOption73 1 | Decouple the button from the relay
| SwitchMode1 5 | Enable the switch mode 5 on switch1 to use long press
| SetOption32 8 | Change the long press duration to be eight-tenths of a second
| SetOption1 1  | Avoid hard resetting the switch by long holding the button
| WebButton1 SwitchLoad | label the button for the light/fan relay
| WebButton2 RedLed | label for the button for the small corner red LED
| WebButton3 BlueLed | label for the button for the small corner blue LED
| WebButton4 GreenLed | label for the button for the small corner green LED
| WebButton5 SwitchLed | label for the button for the large switch LEDs

</p></details>

One liner to copy for the console:

```
backlog SetOption73 1; SwitchMode1 5; SetOption32 8; SetOption1 1; WebButton1 Load; WebButton2 RedLed; WebButton3 BlueLed; WebButton4 GreenLed; WebButton5 SwitchLed
```

## Night Light
<hr/>

Using the switch to power a light but also use the switch as a night light itself

### Rules

<details><summary>Explained rule</summary>
<p>

```
Rule1 
## When booting up set var1 to off to indicate the switch LEDs are off and var2 to indicate the brightness reset
ON system#boot DO 
    backlog var1 0; var2 0 
ENDON 
## When the LED's of the switch turn on/off set var1 value
ON power5#state=1 DO 
    var1 1 
ENDON 
ON power5#state=0 DO 
    var1 0 
ENDON 
## When the button is single pressed toggle the load relay
ON button1#state==10 DO 
    power1 TOGGLE 
ENDON 
## When a double press is pushed turn the night ligh off and on
ON button1#state==11 DO 
    IF (var1==0) 
        backlog color1 #FF8C00; 
                power5 1 
    ENDIF 
ENDON 
ON button1#state==11 DO 
    IF (var1==1) 
        power5 0 
    ENDIF 
ENDON 
## When a long press is used cycle through the brightness of the night light
ON button1#state==3 DO 
    IF (var2==0) 
        dimmer+ 
    ENDIF 
ENDON
ON button1#state==3 DO 
    IF (var2==1) 
        backlog dimmer 40; 
                var2 0 
    ENDIF 
ENDON 
ON dimmer#state==100 DO 
    var2 1 
ENDON
```

</p></details>

<details><summary>Condensed rule</summary>
<p>

```
Rule1 
ON system#boot DO backlog var1 0; var2 0 ENDON 
ON power5#state=1 DO var1 1 ENDON 
ON power5#state=0 DO var1 0 ENDON 
ON button1#state==10 DO power1 TOGGLE ENDON 
ON button1#state==11 DO IF (var1==0) backlog color1 #FF8C00; power5 1 ENDIF ENDON 
ON button1#state==11 DO IF (var1==1) power5 0 ENDIF ENDON 
ON button1#state==3 DO IF (var2==0) dimmer+ ENDIF ENDON
ON button1#state==3 DO IF (var2==1) backlog dimmer 40; var2 0 ENDIF ENDON 
ON dimmer#state==100 DO var2 1 ENDON
```

</p></details>

One liner rule (for copy pasting into console)

```
Rule1 ON system#boot DO backlog var1 0; var2 0 ENDON ON power5#state=1 DO var1 1 ENDON ON power5#state=0 DO var1 0 ENDON ON button1#state==10 DO power1 TOGGLE ENDON ON button1#state==11 DO IF (var1==0) backlog color1 #FF8C00; power5 1 ENDIF ENDON ON button1#state==11 DO IF (var1==1) power5 0 ENDIF ENDON ON button1#state==3 DO IF (var2==0) dimmer+ ENDIF ENDON ON button1#state==3 DO IF (var2==1) backlog dimmer 40; var2 0 ENDIF ENDON ON dimmer#state==100 DO var2 1 ENDON 
```

## Scene Light
<hr/>

Using the switch to optionally power a light but to toggle color settings on other TASMOTA smart bulbs using DevGroups
You'll need to know how to setup devgroups and put this switch and other smart bulbs in a group together

### Rules

<details><summary>Explained rule</summary>
<p>

```
Rule1 
## When booting up set var1 to indicate the state of the switch so we can reuse the single press
ON system#boot DO 
    backlog var1 0; var2 0 
ENDON 
## When the light comes on or off toggle the LEDs to match
ON power1#state=1 DO 
    backlog var1 1; 
            power2 1; power3 1; power4 1; power5 1 
ENDON 
ON power1#state=0 DO 
    backlog var1 0; 
            power4 0; power3 0; power2 0; power5 0 
ENDON 
## With a single press toggle the main light
ON button1#state==10 DO 
    IF (var1==1) 
        power1 0 
    ENDIF 
ENDON 
ON button1#state==10 DO 
    IF (var1==0) 
        power1 1 
    ENDIF 
ENDON 
## With a double press turn red
ON button1#state==11 DO 
    color1 1 
ENDON 
## With a triple press turn green
ON button1#state==12 DO 
    color1 2 
ENDON 
## With a quad press turn purple
ON button1#state==13 DO 
    color1 9 
ENDON 
## With a five press turn warm white
ON button1#state==14 DO 
    color1 #FF8C00 
ENDON 
## With a long press change the dimming levels starting at 40
ON button1#state==3 DO 
    IF (var2==0) 
        dimmer+ 
    ENDIF 
ENDON
ON button1#state==3 DO 
    IF (var2==1) 
        backlog dimmer 40; 
                var2 0 
    ENDIF 
ENDON 
ON dimmer#state==100 DO 
    var2 1 
ENDON
```

</p></details>

<details><summary>Condensed rule</summary>
<p>

```
Rule1 
ON system#boot DO backlog var1 0; var2 0 ENDON 
ON power1#state=1 DO backlog var1 1; power2 1; power3 1; power4 1; power5 1 ENDON 
ON power1#state=0 DO backlog var1 0; power4 0; power3 0; power2 0; power5 0 ENDON 
ON button1#state==10 DO IF (var1==1) power1 0 ENDIF ENDON 
ON button1#state==10 DO IF (var1==0) power1 1 ENDIF ENDON 
ON button1#state==11 DO color1 1 ENDON 
ON button1#state==12 DO color1 2 ENDON 
ON button1#state==13 DO color1 9 ENDON 
ON button1#state==14 DO color1 #FF8C00 ENDON 
ON button1#state==3 DO IF (var2==0) dimmer+ ENDIF ENDON
ON button1#state==3 DO IF (var2==1) backlog dimmer 40; var2 0 ENDIF ENDON 
ON dimmer#state==100 DO var2 1 ENDON
```

</p></details>

One liner rule (for copy pasting into console)

```
Rule1 ON system#boot DO backlog var1 0; var2 0 ENDON ON power1#state=1 DO backlog var1 1; power2 1; power3 1; power4 1; power5 1 ENDON ON power1#state=0 DO backlog var1 0; power4 0; power3 0; power2 0; power5 0 ENDON ON button1#state==10 DO IF (var1==1) power1 0 ENDIF ENDON ON button1#state==10 DO IF (var1==0) power1 1 ENDIF ENDON ON button1#state==11 DO color1 1 ENDON ON button1#state==12 DO color1 2 ENDON ON button1#state==13 DO color1 9 ENDON ON button1#state==14 DO color1 #FF8C00 ENDON ON button1#state==3 DO IF (var2==0) dimmer+ ENDIF ENDON ON button1#state==3 DO IF (var2==1) backlog dimmer 40; var2 0 ENDIF ENDON ON dimmer#state==100 DO var2 1 ENDON
```


## Fan
<hr/>

Using the switch as a bathroom fan switch.

### Demos

Single Press - 5 Minutes to keep the fan on

![alt text](/img/devices/ssms118-1x-duration.gif "Single Press Demo")

Double Press - 10 Minutes to keep the fan on

![alt text](/img/devices/ssms118-2x-duration.gif "Double Press Demo")

Triple Press - 15 Minutes to keep the fan on

![alt text](/img/devices/ssms118-3x-duration.gif "Triple Press Demo")

Quad Press - 30 Minutes to keep the fan on

![alt text](/img/devices/ssms118-4x-duration.gif "Quad Press Demo")

Hold Press - keep the fan on until pressed off

![alt text](/img/devices/ssms118-long-hold-stay-on.gif "Long Hold Demo")

### Rules

<details><summary>Explained rule</summary>
<p>

```
Rule1 
## When booting up set the blink settings and a variable to use for single presses
ON system#boot DO 
    backlog var1 0; 
            blinktime 10; blinkcount 20; 
            power1 0 
ENDON 
## When the fan is powered on set the variable value to 1 
ON power1#state=1 DO 
    var1 1 
ENDON 
## When the fan is powered off turn off all lights and timers
ON power1#state=0 DO 
    backlog var1 0; 
            power2 0; power3 0; power4 0; power5 0; 
            ruletimer1 0; ruletimer2 0 
ENDON 
## When the button is single pressed check the variable to see if the fan is on as well
ON button1#state==10 DO 
    IF (var1==1) 
        power1 0 
    ENDIF 
ENDON 
ON button1#state==10 DO 
    IF (var1==0) 
        backlog power1 TOGGLE; 
                power4 1; color1 2; power5 3; 
                ruletimer1 300; ruletimer2 5 
    ENDIF 
ENDON 
## When the button is double pressed turn on the fan timer for 10 minutes and set LEDs to blue and the blinking led to stop in 5 seconds
ON button1#state==11 DO 
    backlog power1 1; 
            power3 1; color1 3; power5 3; 
            ruletimer1 600; ruletimer2 5 
ENDON 
## When the button is triple pressed turn on the fan timer for 15 minutes and set LEDs to purple and the blinking led to stop in 5 seconds
ON button1#state==12 DO 
    backlog power1 1; 
            power2 1; power3 1; color1 9; power5 3; 
            ruletimer1 900; ruletimer2 5 
ENDON 
## When the button is double pressed turn on the fan timer for 30 minutes and set LEDs to red and the blinking led to stop in 5 seconds
ON button1#state==13 DO 
    backlog power1 1; 
            power2 1; color1 1; power5 3; 
            ruletimer1 1800; ruletimer2 5 
ENDON 
## When the button is held turn on the fan and set LEDs to red
ON button1#state==3 DO 
    backlog power1 1; 
            color1 1; power5 1 
ENDON 
## Blink timer ends turn off the main switch LEDs
ON rules#timer=2 DO 
    power5 0 
ENDON 
## Fan timer ends power off
ON rules#timer=1 DO 
    power1 0
ENDON
```

</p></details>

<details><summary>Condensed rule</summary>
<p>

```
Rule1 
ON system#boot DO backlog var1 0; blinktime 10; blinkcount 20; power1 0 ENDON 
ON power1#state=1 DO var1 1 ENDON 
ON power1#state=0 DO backlog var1 0; power2 0; power3 0; power4 0; power5 0; ruletimer1 0; ruletimer2 0 ENDON 
ON button1#state==10 DO IF (var1==1) power1 0 ENDIF ENDON 
ON button1#state==10 DO IF (var1==0) backlog power1 TOGGLE; power4 1; color1 2; power5 3; ruletimer1 300; ruletimer2 5 ENDIF ENDON 
ON button1#state==11 DO backlog power1 1; power3 1; color1 3; power5 3; ruletimer1 600; ruletimer2 5 ENDON 
ON button1#state==12 DO backlog power1 1; power2 1; power3 1; color1 9; power5 3; ruletimer1 900; ruletimer2 5 ENDON 
ON button1#state==13 DO backlog power1 1; power2 1; color1 1; power5 3; ruletimer1 1800; ruletimer2 5 ENDON 
ON button1#state==3 DO backlog power1 1; color1 1; power5 1 ENDON 
ON rules#timer=2 DO power5 0 ENDON 
ON rules#timer=1 DO power1 0 ENDON
```

</p></details>

One liner rule (for copy pasting into console)

```
Rule1 ON system#boot DO backlog var1 0; blinktime 10; blinkcount 20; power1 0 ENDON ON power1#state=1 DO var1 1 ENDON ON power1#state=0 DO backlog var1 0; power2 0; power3 0; power4 0; power5 0; ruletimer1 0; ruletimer2 0 ENDON ON button1#state==10 DO IF (var1==1) power1 0 ENDIF ENDON ON button1#state==10 DO IF (var1==0) backlog power1 TOGGLE; power4 1; color1 2; power5 3; ruletimer1 300; ruletimer2 5 ENDIF ENDON ON button1#state==11 DO backlog power1 1; power3 1; color1 3; power5 3; ruletimer1 600; ruletimer2 5 ENDON ON button1#state==12 DO backlog power1 1; power2 1; power3 1; color1 9; power5 3; ruletimer1 900; ruletimer2 5 ENDON ON button1#state==13 DO backlog power1 1; power2 1; color1 1; power5 3; ruletimer1 1800; ruletimer2 5 ENDON ON button1#state==3 DO backlog power1 1; color1 1; power5 1 ENDON ON rules#timer=2 DO power5 0 ENDON ON rules#timer=1 DO power1 0 ENDON
```

Activate the Rule with 

```
Rule1 1
```