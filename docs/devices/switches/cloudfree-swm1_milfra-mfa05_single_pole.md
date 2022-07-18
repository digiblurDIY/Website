# CloudFree SWM1 / Milfra MFA05 Motion Switch (Single Pole)

Single Pole smart motion switch.  This switch has a motion sensor, daylight (non-lux) sensor, single button and relay.

Purchase CloudFree SWM1 via [cloudfree.shop](https://cloudfree.shop/product/cloudfree-motion-light-switch/)

Purchase Milfra MFA05 via [Amazon](https://amzn.to/3NQUJ9W)


## Tasmota Template

```json
{"NAME":"CloudFree SWM1","GPIO":[32,0,0,0,0,160,0,0,224,576,161,0,0,0],"FLAG":0,"BASE":18}
```

```json
{"NAME":"Milfra PIR switch","GPIO":[32,0,0,0,0,192,0,0,224,320,0,0,289,0],"FLAG":0,"BASE":18}
```

<details><summary>GPIO Layout</summary>     
<p>

| GPIO |    Component | Description |
|------ |-------------|-------------|         
|GPIO00	| Button      | The main switch button |
|GPIO01	| None
|GPIO02	| None
|GPIO03	| None
|GPIO04	| None
|GPIO05	| Switch1 | Motion Sensor Switch |
|GPIO09	| None
|GPIO10	| None
|GPIO12	| Relay1 | Actual relay to toggle on/off |
|GPIO13	| LedLink_i | LED
|GPIO14	| Switch2 | Daylight Sensor Switch |
|GPIO15	| None
|GPIO16	| None
</p></details>

<details><summary>Settings</summary>     
<p>

| Setting | Description
|---------------|-------------
| switchmode1 2 | Set the motion sensor to inverted follow mode
| switchmode2 1 | Set the switch to follow mode
| setoption114 1 | Detach switches from relays and send MQTT messages instead

</p></details>

## Rules 

### Basic motion light

Here is the basic motion controlled switch rule that you can input in the console of the tasmota webui

<details><summary>Explained rule</summary>
<p>

```
Rule1
## When the switch boots up set the timeout duration default variable (var1) to 300 seconds
ON system#boot DO
    backlog var1 300
ENDON 
## When the button is pressed on the switch toggle the light off or on
ON button1#state DO
    power1 toggle
ENDON
## If the motion switch goes on the power on the light and start the timer
ON switch1#state=1 DO
    backlog power1 1; 
    ruletimer1 %var1% 
ENDON
## When the timer expires turn off the light
ON rules#timer=1 DO 
    power1 0 
ENDON 
## if the power is off then kill off the timer isn't not needed anymore
ON power1#state=0 DO
    ruletimer1 0 
ENDON
```

</p></details>

<details><summary>Condensed rule</summary>
<p>

```
Rule1 ON system#boot DO backlog var1 300 ENDON 
      ON button1#state DO power1 toggle ENDON
      ON switch1#state=1 DO backlog power1 1; ruletimer1 %var1% ENDON
      ON rules#timer=1 DO power1 0 ENDON 
      ON power1#state=0 DO ruletimer1 0 ENDON
```

</p></details>

One liner rule (for copy pasting into console)

```
Rule1 ON system#boot DO backlog var1 300 ENDON ON button1#state DO power1 toggle ENDON ON switch1#state=1 DO backlog power1 1; ruletimer1 %var1% ENDON ON rules#timer=1 DO power1 0 ENDON ON power1#state=0 DO ruletimer1 0 ENDON
```

Activate the Rule with 

```
Rule1 1
```

### Motion light with blind time

This rule will give you the basic motion controlled switch rule but allow you to configure a blind time so if you turn off the switch it won't just immediately turn back on while you leave the room.  This rule can be input in the console of the tasmota webui

<details><summary>Explained rule</summary>
<p>

```
Rule1 
## System Boots up and sets the default values for each of our timers
ON system#boot DO 
    backlog 
        ### Used for duration for the light to stay on after motion stops
        var1 300; 
        ### Used for blind time where the motion doesn't turn back on the light after a button turns it off
        var2 5; 
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

</p></details>

<details><summary>Condensed rule</summary>
<p>

```
Rule1 ON system#boot DO backlog var1 30; var2 5; var3 1 ENDON 
      ON button1#state DO backlog power1 toggle; ruletimer2 %var2%; var3 0 ENDON 
      ON rules#timer=2 DO var3 1 ENDON 
      ON switch1#state=1 DO event motion=%var3% ENDON 
      ON rules#timer=1 DO event timeroff=%var3% ENDON 
      ON power1#state=0 DO event poweroff=%var3% ENDON 
      ON event#motion=1 DO backlog power1 1; ruletimer1 %var1% ENDON 
      ON event#timeroff=1 DO power1 0 ENDON 
      ON event#poweroff=1 DO ruletimer1 0 ENDON 
```

</p></details>

One liner rule (for copy pasting into console)

```
Rule1 ON system#boot DO backlog var1 30; var2 5; var3 1 ENDON ON button1#state DO backlog power1 toggle; ruletimer2 %var2%; var3 0 ENDON ON rules#timer=2 DO var3 1 ENDON ON switch1#state=1 DO event motion=%var3% ENDON ON rules#timer=1 DO event timeroff=%var3% ENDON ON power1#state=0 DO event poweroff=%var3% ENDON ON event#motion=1 DO backlog power1 1; ruletimer1 %var1% ENDON ON event#timeroff=1 DO power1 0 ENDON ON event#poweroff=1 DO ruletimer1 0 ENDON 
```

Activate the Rule with 

```
Rule1 1
```

## Using retain to adjust timeouts

Each one of these rules is using variales to make sure there are default values to adhere to if they can't get the values from MQTT.  We want to be able to adjust there values with homeassistant or per switch etc..

This will be as easy as publishing the desired values into MQTT with a retain flag set.  Then when the switch comes back online and able to talk to MQTT it will say hey.. pick up these retained values and change the variables to the time periods we selected.

We'll want to find our switches topic to know where to publish the change.  Visit the tasmota web console and type in the following command:

```
topic
```

Copy this name and we'll use it later

Adjusting from the tasmota console using the publish2 command which is the retain publish command to push a change to the MQTT broker

var1 for light timer duration:

```
publish2 cmnd/<TOPIC>/var1 <NUMBER OF SECONDS>
```

var2 for the delay before refire of the motion on

```
publish2 cmnd/<TOPIC>/var2 <NUMBER OF SECONDS>
```

This will allow these settings to trump the defaults on the boot up of the switch.

Now if you want to create a helper in home assistant that has a slider of duration for this switch then on change of the helper have an automation trigger and publish the new value.  You can adjust it's value from home assistant easily and have the switch pick up the changes.

## Images

![alt text](/img/devices/cloudfree_milfra_motion_switch_main.jpg "CloudFree SWM1 / Milfra MFA05")

![alt text](/img/devices/cloudfree_milfra_motion_switch_inside1.jpg "CloudFree SWM1 / Milfra MFA05 Inside 1")

![alt text](/img/devices/cloudfree_milfra_motion_switch_inside2.jpg "CloudFree SWM1 / Milfra MFA05 Inside 2")

## Flashing

### CloudFree SWM1
None needed it's already running TASMOTA! OH YEAH BABY ❤️ CloudFree

### Milfra MFA05

You'll need a FTDI adapter and here is the wiring diagram:

![alt text](/img/devices/cloudfree_milfra_flashing_pinout.jpg "Milfra MFA05 Inside Flashing Pinout")

You can just use dupont wires and push them into the slots no soldering required like shown here:

![alt text](/img/devices/cloudfree_milfra_flashing_dupont.jpg "Milfra MFA05 Inside Flashing Pinout")

Open the tasmota [webinstaller](https://tasmota.github.io/install/) and flash it with the latest tasmota release.