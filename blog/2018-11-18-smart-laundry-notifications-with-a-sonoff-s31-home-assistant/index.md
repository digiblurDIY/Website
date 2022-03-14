---
title: "Smart Laundry Notifications with a Sonoff S31 & Home Assistant"
date: "2018-11-18"
---

<iframe allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen frameborder="0" height="315" src="https://www.youtube.com/embed/ktHQrhAF8VQ" width="560"></iframe>

  
  
  
Make your Laundry Smarter with our favorite smart plug, the [Sonoff S31](https://amzn.to/2PyVQBQ), and Home Assistant with Voice Notifications when the Washer and/or Dryer are finished.  Easy power monitoring and automations with this step by step tutorial of the setup.  
  
[Sonoff S31](https://amzn.to/2PyVQBQ)  
  
[Soldering Iron Station](https://amzn.to/2DwJpiW)  
[Helping Hands(as shown)](https://amzn.to/2TqQZ3M)  
[Better Helping Hands](https://amzn.to/2Q3tKhI)  
[0.015 Solder](https://amzn.to/2OQDd74)  
[Female Jumper Wires](https://amzn.to/2DcCiMX)  
[USB FTDI for Flashing](https://amzn.to/2Ke2V4W)  
  
**Tasmota Backlog (modify to your values)**  
backlog ssid MyWiFiz; password SooperSekret; mqtthost 192.168.1.5; mqttuser me123; mqttpassword 123that; powerretain 1; topic SNF-Washer; sensorretain 1; poweronstate 1; friendlyname SNF-Washer; teleperiod 60  
  
**Home Assistant Config Sample & Automations:**  
**(configuration.yaml)**  
 sensor:

  - platform: mqtt

    name: "Dryer State"

    state\_topic: "hass/state/dryer"

    icon: mdi:tumble-dryer

  - platform: mqtt  
    name: "Washer State"  
    state\_topic: "hass/state/washer"  
    icon: mdi:washing-machine  
  - platform: mqtt  
    name: "Washer Watts"  
    state\_topic: "tele/SNF-Washer/SENSOR"  
    value\_template: "{{value\_json\['ENERGY'\].Power }}"  
    qos: 2  
    unit\_of\_measurement : "W"  
    icon: mdi:flash-circle  
    availability\_topic: "tele/SNF-Washer/LWT"  
    payload\_available: "Online"  
    payload\_not\_available: "Offline"  
  - platform: mqtt  
    name: "Washer Voltage"  
    state\_topic: "tele/SNF-Washer/SENSOR"  
    value\_template: "{{value\_json\['ENERGY'\].Voltage }}"  
    qos: 2  
    unit\_of\_measurement : "V"  
    icon: mdi:flash-circle  
    availability\_topic: "tele/SNF-Washer/LWT"  
    payload\_available: "Online"  
    payload\_not\_available: "Offline"  
  - platform: mqtt  
    name: "Washer Amps"  
    state\_topic: "tele/SNF-Washer/SENSOR"  
    value\_template: "{{value\_json\['ENERGY'\].Current }}"  
    qos: 2  
    unit\_of\_measurement : "A"  
    icon: mdi:flash-circle  
    availability\_topic: "tele/SNF-Washer/LWT"  
    payload\_available: "Online"  
    payload\_not\_available: "Offline"  
  - platform: mqtt  
    name: "Washer Energy Today"  
    state\_topic: "tele/SNF-Washer/SENSOR"  
    value\_template: "{{value\_json\['ENERGY'\].Today }}"  
    qos: 2  
    unit\_of\_measurement : "kWh"  
    availability\_topic: "tele/SNF-Washer/LWT"  
    payload\_available: "Online"  
    payload\_not\_available: "Offline"  
  - platform: mqtt  
    name: "Washer Energy Yesterday"  
    state\_topic: "tele/SNF-Washer/SENSOR"  
    value\_template: "{{value\_json\['ENERGY'\].Yesterday }}"  
    qos: 2  
    unit\_of\_measurement : "kWh"  
    availability\_topic: "tele/SNF-Washer/LWT"  
    payload\_available: "Online"  
    payload\_not\_available: "Offline"  
  
  - platform: mqtt  
    state\_topic: "tele/SNF-Washer/STATE"  
    name: "Washer Signal"  
    unit\_of\_measurement: "%"  
    value\_template: "{{value\_json\['Wifi'\].RSSI }}"  
    availability\_topic: "tele/SNF-Washer/LWT"  
    qos: 1  
    payload\_available: "Online"  
    payload\_not\_available: "Offline"  
  
**(group.yaml)**  
  
  washerpanel:  
    name: Washer  
    entities:  
      - sensor.washer\_state  
      - sensor.washer\_voltage  
      - sensor.washer\_watts  
      - sensor.washer\_amps  
      - sensor.washer\_energy\_today  
      - sensor.washer\_energy\_yesterday  
      - sensor.washer\_signal  
  
**(automations.yaml)**  
\- alias: 'Dryer State - Door'  
  trigger:  
    platform: numeric\_state  
    entity\_id: sensor.dryer\_watts  
    above: 7  
    below: 20  
    for:  
      seconds: 2  
  action:  
    - service: mqtt.publish  
      data:  
        topic: hass/state/dryer  
        payload: 'Door Open'  
        retain: 'true'  
\- alias: 'Dryer State - Drying'  
  trigger:  
    platform: numeric\_state  
    entity\_id: sensor.dryer\_watts  
    above: 50  
    for:  
      seconds: 2  
  action:  
    - service: mqtt.publish  
      data:  
        topic: hass/state/dryer  
        payload: 'Drying'  
        retain: 'true'  
\- alias: 'Dryer State - Idle'  
  trigger:  
    platform: numeric\_state  
    entity\_id: sensor.dryer\_watts  
    below: 6  
    for:  
      seconds: 2  
  action:  
    - service: mqtt.publish  
      data:  
        topic: hass/state/dryer  
        payload: 'Idle'  
        retain: 'true'  
\# -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- 
#  Washing Machine Start/Finish  
\# -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- 
\- alias: 'Washer State - Start'  
  trigger:  
    platform: numeric\_state  
    entity\_id: sensor.washer\_watts  
    above: 5  
    for:  
      seconds: 4  
\# Make sure washer isn't already running and delaying between cycles - don't re-trigger and cause stopwatch reset  
  condition:  
    condition: template  
    value\_template: "{{ states.sensor.washer\_state.state != 'Washing' }}"  
  action:  
    - service: mqtt.publish  
      data:  
        topic: hass/state/washer  
        payload: 'Washing'  
        retain: 'true'  
\- alias: 'Washer State - Idle'  
  trigger:  
    platform: numeric\_state  
    entity\_id: sensor.washer\_watts  
    below: 5  
    for:  
      minutes: 5  
  action:  
    - service: mqtt.publish  
      data:  
        topic: hass/state/washer  
        payload: 'Idle'  
        retain: 'true'  
\- alias: 'Dryer Finished'  
  trigger:  
    platform: state  
    entity\_id: sensor.dryer\_state  
    from: 'Drying'  
    to: 'Idle'  
  action:  
    - service: media\_player.volume\_set  
      data:  
        entity\_id:  
          - media\_player.craft\_room\_speaker  
          - media\_player.kitchen\_speaker  
          - media\_player.master\_speaker  
          - media\_player.bedroom\_speaker  
        volume\_level: '0.50'  
    - service: tts.google\_say  
      entity\_id:  
        - media\_player.craft\_room\_speaker  
        - media\_player.kitchen\_speaker  
        - media\_player.master\_speaker  
        - media\_player.bedroom\_speaker  
      data\_template:  
         message: "Hey.. Guess what..  The dryer is done! Exciting stuff, right?"  
\- alias: 'Washer Finished'  
  trigger:  
    platform: state  
    entity\_id: sensor.washer\_state  
    from: 'Washing'  
    to: 'Idle'  
  condition:  
    condition: template  
    value\_template: "{{ states.sensor.dryer\_state.state != 'Drying' }}"  
  action:  
    - service: media\_player.volume\_set  
      data:  
        entity\_id:  
          - media\_player.craft\_room\_speaker  
          - media\_player.kitchen\_speaker  
          - media\_player.master\_speaker  
          - media\_player.bedroom\_speaker  
        volume\_level: '0.50'  
    - service: tts.google\_say  
      entity\_id:  
        - media\_player.craft\_room\_speaker  
        - media\_player.kitchen\_speaker  
        - media\_player.master\_speaker  
        - media\_player.bedroom\_speaker  
      data\_template:  
  
         message: "Laundry in the washer can be moved over!"
