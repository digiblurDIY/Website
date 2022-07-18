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

Open the tasmota [webinstaller](https://tasmota.github.io/install/) and flash it with the latest tasmota release.


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

</p></details>

<details><summary>Condensed rule</summary>
<p>

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

</p></details>

One liner rule (for copy pasting into console)

```
Rule1 ON system#boot DO backlog var1 300; var2 10; var3 1 ENDON ON button1#state DO backlog power1 toggle; ruletimer2 %var2%; var3 0 ENDON ON rules#timer=2 DO var3 1 ENDON ON switch1#state=1 DO event motion=%var3% ENDON ON rules#timer=1 DO event timeroff=%var3% ENDON ON power1#state=0 DO event poweroff=%var3% ENDON ON event#motion=1 DO backlog power1 1; ruletimer1 %var1% ENDON ON event#timeroff=1 DO power1 0 ENDON ON event#poweroff=1 DO ruletimer1 0 ENDON 
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
Let's get it setup that you can adjust these timers and entities to show up how you'd want them to and control the timer settings via home assistant dashboard

![alt text](/img/devices/cloudfree_milfra_lovelace.jpg "Dashboard Card View")

### Display as

The daylight sensor will show up as a sensors but have horrible entity id's and names.
Let's rename them and adjust the shown as option accordingly

![alt text](/img/devices/cloudfree_milfra_motion_entity.jpg "HomeAssistant Entity settings motion")

![alt text](/img/devices/cloudfree_milfra_daylight_entity.jpg "HomeAssistant Entity settings daylight")

### Helpers

Now if you want to create a helper in home assistant that has a slider of duration for this switch then on change of the helper have an automation trigger and publish the new value.  You can adjust it's value from home assistant easily and have the switch pick up the changes.



Visit your home assistant instance and got to `/config/helpers` and create two helpers per switch that you want

![alt text](/img/devices/cloudfree_milfra_blind_helper.jpg "Blind Timer Helper")

![alt text](/img/devices/cloudfree_milfra_light_helper.jpg "Light Timer Helper")

### Script


Visit your home assistant instance and got to `/config/script/dashboard` and create a new script with it's content below:
<details><summary>Adjust timeout script</summary>
<p>

```yaml
alias: Lights - Adjust motion light timer setting
sequence:
  - choose:
      - conditions:
          - condition: template
            value_template: '{{ timer == "lighttime" }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: 'cmnd/{{topic}}/var1'
              payload: '{{duration}}'
              retain: true
      - conditions:
          - condition: template
            value_template: '{{ timer == "blindtime" }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: 'cmnd/{{topic}}/var2'
              payload: '{{duration}}'
              retain: true
    default: []
mode: single
icon: mdi:timer-edit
fields:
  timer:
    description: Which timer to adjust.  Can be either lighttime or blindtime
    example: lighttime
  topic:
    description: MQTT Topic for the motion switch.  You can get this by running the command topic in the web console of tasmota
    example: exampleswitch
  duration:
    description: number of seconds
    example: 15
```

</p></details>

### Automation

Visit your home assistant instance and got to `/config/automation/dashboard` and create a new automation with it's content below but with adjusted values to match your switch name and helpers entity_id's:

<details><summary>Input Helper Triggered automation</summary>
<p>


```yaml
alias: Lights - Adjust Motion Light timer
description: >-
  Picks up the input helper changes and applies them back to the tasmota switch
  via MQTT script
trigger:
  - platform: state
    entity_id:
      - input_number.test_motion_switch_blindtime
    id: blindtime-adjusted
  - platform: state
    entity_id:
      - input_number.test_motion_switch_duration
    id: lighttime-adjusted
condition: []
action:
  - choose:
      - conditions:
          - condition: trigger
            id: blindtime-adjusted
        sequence:
          - service: script.lights_adjust_motion_light_timer_setting
            data:
              timer: blindtime
              topic: motion-test-switch
              duration: '{{ states(''input_number.test_motion_switch_blindtime'') | int }}'
      - conditions:
          - condition: trigger
            id: lighttime-adjusted
        sequence:
          - service: script.lights_adjust_motion_light_timer_setting
            data:
              timer: lighttime
              topic: motion-test-switch
              duration: >-
                {{ states('input_number.test_motion_switch_duration') | int * 60
                }}
    default: []
mode: single
```

</p></details>

After you've done all of that you shouldn't have any issues adjusting your helper values and having it adjust it on the tasmota motion switch!