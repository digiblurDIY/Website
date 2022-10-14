# CloudFree SWM1 / Milfra MFA05 Motion Switch (Single Pole)

Single Pole smart motion switch.  This switch has a motion sensor, daylight (non-lux) sensor, single button and relay.

Purchase CloudFree SWM1 via [cloudfree.shop](https://cloudfree.shop/product/cloudfree-motion-light-switch/)

Purchase Milfra MFA05 via [Amazon](https://amzn.to/3NQUJ9W)

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

Open the TASMOTA [webinstaller](https://tasmota.github.io/install/) and flash it with the latest TASMOTA release.


## Tasmota Template

```json
{"NAME":"CloudFree/Milfra PIR MFA05","GPIO":[32,0,0,0,0,160,0,0,224,576,161,0,0,0],"FLAG":0,"BASE":18}
```

![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) `Some Milfra MFA05 switches don't have the LDR / Daylight sensor soldered on. This template is the only difference for the cloudfree one. Use the cloudfree one if you have the LDR on your board. You can add one by visiting here to buy the right one: ` https://www.amazon.com/dp/B00N1ZJUN4

```json
{"NAME":"Milfra PIR MFA05 No LUX","GPIO":[32,0,0,0,0,160,0,0,224,576,0,0,0,0],"FLAG":0,"BASE":18}
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
| setoption73 1 | Detach buttons from relays and send MQTT messages instead  (Used for double press)

You can apply thsese settings by running this command via the tasmota web console `/cs?`

```
backlog switchmode1 2; switchmode2 1; setoption114 1; setoption73 1;
```

</p></details>

## Rules 

### Motion light

This rule will give you the basic motion controlled switch rule but allow you to configure a blind time so if you turn off the switch it won't just immediately turn back on while you leave the room. This rule can be input in the console of the TASMOTA webui

<details><summary>Explained rules</summary>
<p>

Rule1
<hr/>

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

</p></details>

<details><summary>Condensed rules</summary>
<p>

Rule1
<hr/>

```
Rule1 ON system#boot DO backlog var1 300; var2 10; var3 1 ENDON 
      ON button1#state DO backlog power1 toggle; ruletimer2 %var2%; var3 0 ENDON 
      ON rules#timer=2 DO var3 1 ENDON 
      ON switch1#state=1 DO event motion=%var3% ENDON 
      ON rules#timer=1 DO event timeroff=%var3% ENDON 
      ON power1#state=0 DO event poweroff=%var3% ENDON 
      ON event#motion=1 DO backlog power1 1; ruletimer1 %var1% ENDON 
      ON event#timeroff=1 DO power1 0 ENDON 
      ON event#poweroff=1 DO ruletimer1 0 ENDON 
```
Rule2
<hr/>

```
Rule2 ON Var1 DO publish2 stat/%topic%/light_time %Var1% ENDON
      ON Var2 DO publish2 stat/%topic%/blind_time %Var2% ENDON
```

Rule3 
<hr/>

```
Rule3 ON system#boot DO publish2 homeassistant/number/%macaddr%_light_time/config {"name":"Light Time","state_topic":"stat/%topic%/light_time","availability_topic":"tele/%topic%/LWT","payload_available":"Online","payload_not_available":"Offline","command_topic":"cmnd/%topic%/Var1","min":15,"max":1800,"retain":true,"step":15,"unit_of_measurement":"s","unique_id":"%macaddr%_light_time","device":{"connections":[["mac","%macaddr%"]]}} ENDON
      ON system#boot DO publish2 homeassistant/number/%macaddr%_blind_time/config {"name":"Blind Time","state_topic":"stat/%topic%/blind_time","availability_topic":"tele/%topic%/LWT","payload_available":"Online","payload_not_available":"Offline","command_topic":"cmnd/%topic%/Var2","min":0,"max":60,"retain":true,"step":5,"unit_of_measurement":"s","unique_id":"%macaddr%_blind_time","device":{"connections":[["mac","%macaddr%"]]}} ENDON
```

</p></details>

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

Each one of these rules are using variables to make sure there are default values to adhere to if they can't get the values from MQTT. We want to be able to adjust the values with Home Assistant or per switch etc..

This will be as easy as publishing the desired values into MQTT with a retain flag set. Then when the switch comes back online and able to talk to MQTT it will say hey.. pick up these retained values and change the variables to the time periods we selected.

We'll want to find our switches device topic to know where to publish the change. Visit the TASMOTA web console and type in the following command:

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
When you visit the device page in Home Assistant you can adjust these timers as shown:

![alt text](/img/devices/cloudfree_milfra_homeassistant.jpg "Device View")

### Display as

The daylight sensor will show up as a sensors but have horrible entity id's and names.
Let's rename them and adjust the shown as option accordingly

![alt text](/img/devices/cloudfree_milfra_motion_entity.jpg "HomeAssistant Entity settings motion")

![alt text](/img/devices/cloudfree_milfra_daylight_entity.jpg "HomeAssistant Entity settings daylight")

After you've done all of that you shouldn't have any issues adjusting your helper values and having it adjust it on the TASMOTA motion switch!