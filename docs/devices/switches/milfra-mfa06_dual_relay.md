---
title: Milfra MFA06 Motion Dual Relay Smart Switch
description: Milfra MFA06 Motion Smart Switch Template & Setup - How to configure TASMOTA and setup the MFA06 Dual Button switch with Home Assistant
image: /img/devices/milfra-mfa06_1.webp
keywords: [MFA06 Template, Milfra MFA06, Tasmota Motion Switch, MQTT Motion Switch]
---
# Milfra MFA06 Motion Switch (Dual Button/Relay)

Smart switch with 2 buttons & 2 Relays.  This switch also has a motion sensor and daylight (non-lux) sensor.

Purchase Milfra MFA06 via [Amazon](https://amzn.to/3Ol1Its)

## Images

![alt text](/img/devices/milfra-mfa06_1.webp "Milfra MFA06")

![alt text](/img/devices/milfra-mfa06_3.webp "Milfra MFA06")

![alt text](/img/devices/milfra-mfa06_2.webp "Milfra MFA06")

## Flashing

You'll need a [USB TTL adapter](https://amzn.to/3tIybRd) and here is the wiring diagram:

![alt text](/img/devices/cloudfree_milfra_flashing_pinout.webp "Milfra MFA05 Inside Flashing Pinout")

You can just use dupont wires and push them into the slots no soldering required like shown here:

![alt text](/img/devices/cloudfree_milfra_flashing_dupont.webp "Milfra MFA05 Inside Flashing Pinout")

Open the TASMOTA [webinstaller](https://tasmota.github.io/install/) and flash it with the regular TASMOTA release.


## TASMOTA Template

```json
{"NAME":"Milfra MFA06 Dual Relay","GPIO":[33,0,0,0,32,160,0,0,224,288,161,0,225,0],"FLAG":0,"BASE":18}
```

<details><summary>GPIO Layout</summary>     
<p>

| GPIO |    Component | Description |
|------ |-------------|-------------|         
|GPIO00	| Button 2    | Bottom button |
|GPIO04	| Button 1    | Top button |
|GPIO05	| Switch1 | Motion Sensor |
|GPIO12	| Relay1 | Actual mains relay 1 |
|GPIO13	| Led 1 | Blue LED
|GPIO14	| Switch2 | Daylight Sensor Switch |
|GPIO16	| Relay2 | Actual mains relay 2 |
</p></details>

## Settings

| Setting | Description
|---------------|-------------
| switchmode1 2 | Set the motion sensor off=idle / on=motion
| switchmode2 1 | Set the light sensor off=dark / on=light
| setoption114 1 | Detach switches from relays and send MQTT messages instead

```
backlog switchmode1 2; switchmode2 1; setoption114 1; 
```

## Rules 

### Motion light

This rule will give you the basic motion controlled switch rule but allow you to configure a blind time so if you turn off the switch it won't just immediately turn back on while you leave the room. This rule can be input in the console of the TASMOTA webui

### Explained rules

This rule executes the turning on an off the light

```
Rule1 
## System Boots up and sets the default values for each of our timers
ON system#boot DO 
    backlog 
        ### Used for duration for the light to stay on after motion stops
        var1 300; 
        ### Used for blind time where the motion doesn't turn back on the light after a button turns it off
        var2 10; 
        ### Used as a boolean value to say if blind time is enabled or not
        var3 1 
ENDON 
## When the button is pressed on the physical switch
ON button1#state DO 
    backlog 
        ### toggle the light on / off
        power1 toggle; 
        ### set a timer for blind time
        ruletimer2 %var2%; 
        ### Enable blind time by setting the variable to 0 indicating the motion events are disabled
        var3 0 
ENDON 
## Blind Time timer is finished re-enable the motion sensor
ON rules#timer=2 DO 
    var3 1 
ENDON 
## Motion detected
ON switch1#state=1 DO
    ### Trigger an event we can trigger on named motion
    event motion=%var3% 
ENDON 
## Motion light timer expires
ON rules#timer=1 DO 
    ### Trigger an event we can trigger on named timeroff
    event timeroff=%var3% 
ENDON 
## Power was turned off via the button, web ui, ha etc...
ON power1#state=0 DO 
    ### Trigger an event we can trigger on named poweroff
    event poweroff=%var3% 
ENDON 
## Motion event occurs
ON event#motion=1 DO 
    backlog 
        ### Turn on the light
        power1 1; 
        ### Start the timer to allow the light to turn back off when the timer is done
        ruletimer1 %var1% 
ENDON 
## Light timer event occurs
ON event#timeroff=1 DO 
    ### Power off the light
    power1 0 
ENDON 
## Power going off event occurs
ON event#poweroff=1 DO 
    ### kill the light timer because we don't need it to turn off the light
    ruletimer1 0 
ENDON 
```

Rule2
<hr/>
This rule publishes the adjustments of the blind and light time values when they are adjusted

```
Rule2 
## When the var1 (light time) variable values change it publishes them to MQTT to persist
ON Var1 DO 
  publish2 stat/%topic%/light_time %Var1% 
ENDON
## When the var2 (blind time) variable values change it publishes them to MQTT to persist
ON Var2 DO 
  publish2 stat/%topic%/blind_time %Var2% 
ENDON
```

Rule3
<hr/>
This rule publishes the HomeAssistant Discovery details about the switch so the blind and light time get adjustment sliders in the configuration page of the device.  Thanks Tony (DrTFav) for this excellent addition!

```
Rule3 
## When the system boots up publish the HA discovery JSON to the right endpoint in MQTT for this device
ON system#boot DO 
## Publish the discovery details for the light time and adjust the steps or min max values you see appropriate
  publish2 homeassistant/number/%macaddr%_light_time/config 
    {
      "name":"Light Time",
      "state_topic":"stat/%topic%/light_time",
      "availability_topic":"tele/%topic%/LWT",
      "payload_available":"Online",
      "payload_not_available":"Offline",
      "command_topic":"cmnd/%topic%/Var1",
      "min":15,
      "max":1800,
      "retain":true,
      "step":15,
      "unit_of_measurement":"s",
      "unique_id":"%macaddr%_light_time",
      "device":{"connections":[["mac","%macaddr%"]]}
    } 
ENDON
ON system#boot DO 
## Publish the discovery details for the blind time and adjust the steps or min max values you see appropriate
  publish2 homeassistant/number/%macaddr%_blind_time/config 
    {
      "name":"Blind Time",
      "state_topic":"stat/%topic%/blind_time",
      "availability_topic":"tele/%topic%/LWT",
      "payload_available":"Online",
      "payload_not_available":"Offline",
      "command_topic":"cmnd/%topic%/Var2",
      "min":0,
      "max":60,
      "retain":true,
      "step":5,
      "unit_of_measurement":"s",
      "unique_id":"%macaddr%_blind_time",
      "device":{"connections":[["mac","%macaddr%"]]}
    } 
ENDON
```

One liner rules (for copy pasting into console)

Rule1 
<hr/>

```
Rule1 ON system#boot DO backlog var1 300; var2 10; var3 1 ENDON ON button1#state DO backlog power1 toggle; ruletimer2 %var2%; var3 0 ENDON ON rules#timer=2 DO var3 1 ENDON ON switch1#state=1 DO event motion=%var3% ENDON ON rules#timer=1 DO event timeroff=%var3% ENDON ON power1#state=0 DO event poweroff=%var3% ENDON ON event#motion=1 DO backlog power1 1; ruletimer1 %var1% ENDON ON event#timeroff=1 DO power1 0 ENDON ON event#poweroff=1 DO ruletimer1 0 ENDON 
```

Rule2
<hr/>

```
Rule2 ON Var1 DO publish2 stat/%topic%/light_time %Var1% ENDON ON Var2 DO publish2 stat/%topic%/blind_time %Var2% ENDON
```

Rule3
<hr/>

```
Rule3 ON system#boot DO publish2 homeassistant/number/%macaddr%_light_time/config {"name":"Light Time","state_topic":"stat/%topic%/light_time","availability_topic":"tele/%topic%/LWT","payload_available":"Online","payload_not_available":"Offline","command_topic":"cmnd/%topic%/Var1","min":15,"max":1800,"retain":true,"step":15,"unit_of_measurement":"s","unique_id":"%macaddr%_light_time","device":{"connections":[["mac","%macaddr%"]]}} ENDON ON system#boot DO publish2 homeassistant/number/%macaddr%_blind_time/config {"name":"Blind Time","state_topic":"stat/%topic%/blind_time","availability_topic":"tele/%topic%/LWT","payload_available":"Online","payload_not_available":"Offline","command_topic":"cmnd/%topic%/Var2","min":0,"max":60,"retain":true,"step":5,"unit_of_measurement":"s","unique_id":"%macaddr%_blind_time","device":{"connections":[["mac","%macaddr%"]]}} ENDON
```


Activate the Rules with 

```
Rule1 1
Rule2 1
Rule3 1
```

## Using retain to adjust timeouts

This will be as easy as publishing the desired values into MQTT with a retain flag set. Then when the switch comes back online and able to talk to MQTT it will say hey.. pick up these retained values and change the variables to the time periods we selected.

```
topic
```

Copy this name and we'll use it later

Adjusting from the TASMOTA console using the 'publish2' command which is the retain publish command to push a retained message to the MQTT broker

`var1` for `light timer` duration:

```
publish2 cmnd/<TOPIC>/var1 <NUMBER OF SECONDS>
```

`var2` for the (`blind time`) delay before refire of the motion on:

```
publish2 cmnd/<TOPIC>/var2 <NUMBER OF SECONDS>
```

This will allow these settings to trump the defaults on the boot up of the switch.


## Home Assistant

![alt text](/img/devices/cloudfree_milfra_homeassistant.webp "Device View")

### Display as

The daylight sensor will show up as a sensors but have horrible entity id's and names.
Let's rename them and adjust the shown as option accordingly

![alt text](/img/devices/cloudfree_milfra_motion_entity.webp "HomeAssistant Entity settings motion")

![alt text](/img/devices/cloudfree_milfra_daylight_entity.webp "HomeAssistant Entity settings daylight")

After you've done all of that you shouldn't have any issues adjusting your helper values and having it adjust it on the TASMOTA motion switch!