# Infrared Remote running Tasmota firmware

## Hardware
<hr/>

## Prebuilt that can be flashed

There is a good number of tuya smart ir remote controllers from tuya under different brands
If you can find one with an ESP8266 chip inside then you can flash Tasmota onto it

![alt text](/img/devices/tuya-ir-remote.webp "Tuya Infrared Remote")

Purchase via [Amazon](https://amzn.to/3QCl2TP)

## DIY build

If you want to build one yourself you can!

The example we'll show in this page is using a Wemos D1 mini and it's IR shield.

Note: this is a short ranged IR device but very small so it can be hidden close to the targeted device.

![alt text](/img/devices/wemos-d1-ir-remote.webp "Wemos IR Shield")

Wemos D1: Purchase via [Amazon](https://www.amazon.com/HiLetgo-NodeMcu-Development-ESP8266-Compatiable/dp/B073CQVFLK)

IR Sheild: Purchase via [AliExpress](https://www.aliexpress.com/item/2251832704858866.html)

## Flashing Tasmota
<hr/>

### Prebuilt (FTDI Adapter)

We'll use a pry bar to pop the lid off

![alt text](/img/devices/tuya-ir-pry-open.webp "Pry open Tuya IR Remote")

You'll see all the needed pins to flash the chip with your FTDI Adapter

![alt text](/img/devices/tuya-ir-flashing-pins.webp "Pins to hook up your to flashing adapter")

### DIY (USB Cord)

Just plug in the MicroUSB cord to the wemos and plug it into your machine

### Web Tools Installer

Visit [Tasmota Web Installer](https://tasmota.github.io/install/)

Choose the tasmota-ir option in the menu and hit connect

Choose the com port of the device and click install tasmota

## Configure Tasmota
<hr/>

![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) `The pre-built device will need to be plugged into something that provides more juice than the computer USB port to power on and boot tasmota`

Now connect to the tasmota ssid with your smart phone or workstation then visit http://192.168.4.1 and configure tasmota to connect to your wifi access point.

Then visit the IP address of the device so we add the right template

### Prebuilt

visit the console and type in the following commands:

```
template {"NAME":"Uniplay IR","GPIO":[1,3200,1,3232,576,1088,0,0,320,32,1056,0,0,0],"FLAG":0,"BASE":62}
module 0
```

### DIY

visit the console and type in the following commands:

```
template {"NAME":"WemosIR","GPIO":[1056,0,1088,0,0,0,0,0,0,0,0,0,0,0],"FLAG":0,"BASE":18}
module 0
```

### Raw IR

I prefer to use the raw IR codes instead of just the "known" supported device codes that tasmota knows.  To do this you'll need to type in this command to set the option:

```
SetOption58 1
```

### GroupTopic

If you have the need to have multiple of these devices send the same codes it's nice to use the group topics to target many of these.  For example I have a Russound in ceiling speaker system that has multiple IR recievers for each room.  I can use a group topic to say power on to all of them with a mqtt publish to the group topic and they'll all send the command at once!

Let's set a group topic with the following command:

```
grouptopic2 irremotes
```

### Adding to home assistant

You'll want to configure the MQTT settings and any other settings inside tasmota so it will become autodiscovered in home assistant and we won't go into depth on this page for that.

## Learning Codes
<hr/>

This part is easy.  Visit the tasmota console /cs? in your browser.

Point a remote control at the device and push a button

Here is an example where we hit the power butto, you'll see a line like:

```
11:11:27.565 MQT: tele/infraredremote/RESULT = {"IrReceived":{"Protocol":"UNKNOWN","Bits":20,"Hash":"0x85B1439D","Repeat":0,"RawData":"+5810-2840+1940-5620C-1845C-20420AbCdCeC-20415AbCdCeCfAbCdCeCgAbCdCeC","RawDataInfo":[39,39,0]}}
```

The important details is the RawData: `"+5810-2840+1940-5620C-1845C-20420AbCdCeC-20415AbCdCeCfAbCdCeCgAbCdCeC"`

Note each one of these as a button you'll want to use to send that command

## Testing Codes (Console)
<hr/>
Tasmota has a command called `irsend` that can be used to have the IR transmitters fire off the codes you learned earlier

Reference: 

[Tasmota-IR](https://tasmota.github.io/docs/Tasmota-IR/)

We'll use the example raw code from above and send the following command:

```
irsend 0,+5810-2840+1940-5620C-1845C-20420AbCdCeC-20415AbCdCeCfAbCdCeCgAbCdCeC
```

You should see in the console the output of the command:

```
11:16:05.545 CMD: irsend 0,+5810-2840+1940-5620C-1845C-20420AbCdCeC-20415AbCdCeCfAbCdCeCgAbCdCeC
11:16:05.745 MQT: stat/infraredremote/RESULT = {"IRSend":"Done"}
```

If the raw code worked then you should see the device do what the remote should do.  In this example it was a power command for the speakers.  When I send that code the panel lit up letting me know the power send command worked!

Keep collecting up and testing all of your codes we will use them in homeassistant very soon.

## Home Assistant Settings
<hr/>

Home assistant doesn't have a native Tasmota IR integration so we have to build out the functionality in scripts that use the service calls like mqtt.publish

### Scripts (Per device)

I've found it useful to create a script per device for use in automations or lovelace entities.

Here is an example of a TV remote for a vizio TV

<details>
<summary>Script Code</summary>     
<p>

```yaml
sequence:
  - variables:
      power: >-
        0,+9140-4420+670-465Cd+665-1625+640dEdEdC-470EdCfGfGdE-1605+660fG-1600EkEkEdCdCdC-1595CdCdCdCdCkCkEkCdEkEkEkElC-39185A-2160C
      input: >-
        0,+9140-4420+670-490+640-470+665-1625EdE-495Ef+660iEi+635hEhEfGhEhEhEhEhEhEhE-1630EhEfGhEfGfGfGfGfG-465GhEmGhE-1620E-39195A-2160G
      volume_up: >-
        0,+9140-4420+670-490+640dE-1625E-470+660g+665gHdEdEfEfEgHfEfEfEfEfE-465IfEjIgIjIjIjCjI-1600HjIkIkIkC-1595CkClI-39195+9135-2160I
      volume_down: >-
        0,+9135-4420+670-470+665-490+640-1625+645-465+660dEdKfGfGhGhGdEhGhGhGhGhGhGhGdEjEjEjEjEjEjEjE-1600ElClElElE-1595C-39185A-2160C
      mute: >-
        0,+9135-4420+670-490+640-470+665-1625Ef+660fGfGdE-465GhEhEdEhEhEhEhEhEhEjGjGhEjGjCjGjCjC-1600GkGjCkCkCkG-1595C-39190+9140-2155G
      menu: >-
        0,+9135-4420+665-495+640-470C-1625EfC-490EfCf+660fIgEgEfCgEgEgEgEgEgEgEgEgE-465CjCgEjCjCjCjCjCgEgEjC-1620E
      vizio: >-
        0,+9130-4420+665-490+640-470+660-1625EdEdEdEdEfGhEhEdEhEhEhEhEhEhEfGhEhEfGhEfCfGfChEfC-465ChEfChE-1620E-39190+9135-2160C
      channel_up: >-
        0,+9130-4420+665-490+640dE-1625EdEdEdE-470+660gHfEfEgCfEfEfEfEfE-465Ci+670-460CgCgCgCiCiC-1600ClClClJlClClC-1595C-39185+9135-2160C
      channel_down: >-
        0,+9135-4420+670-490+640-470+660-1625E-465GdE-495EfGf+665hEhEdEhEhEhEhEhEhEfGfKfKfKfGfKfGfKhEhEhEhEhEhE-1620E-39190A-2190E
      arrow_up: >-
        0,+9140-4420+670-490+640dE-1625E-470+660dEdEgHdEfEfE-475HfEfEfEfE-1630EfEiHfEg+665gK-465KfElKlKfElKfEfE-1600HlK-1595K
      arrow_down: >-
        0,+9135-4420+670-470+660dE-1625+640dEdE-495GdE-490GfGfGiGfGfGfGfGfGdEfGfGdEd+665dJfGdJfGdJdJfGfGfGdJ-1620G
      arrow_left: >-
        0,+9135-4420+670-470+665-490+640-1625GdE-465CfGfGiEhGhGdEhGhGh+645-1620GhGhGhGhGiCiEiEkGdEdEiEiEhG-1630+635hGd+660kG
      arrow_right: >-
        0,+9140-4420+670-490+640dE-1625EdE-470+660dEdEdEfEfEgHfEfEfEfEfEdEg+665gIfEgIgIfEgIfEfEfE-465IfEfEjC-1600H
      back: >-
        0,+9140-4420+670-470+665dE-1625+640-490GhGdEd+660dIfGfGhGfGfGfGfGfGdIfGdEfGdEdEfGdEfGdEfG-465EfGfGdE-1620G-39185+9135-2185G
      exit: >-
        0,+9140-4420+670-490+640dE-1620E-470+665g+660gHgHgH-1625EjEgHjEjEjEjE-1630Ej+645-460H-465H-1600InHnHoHnHnHoCoHnCoHoHnC-1595H-39190+9135-2160H
      guide: >-
        0,+9140-4420+670-490+640dE-1625EdEdE-470+665dEdEfEfEg+660fEfEfEfEfEgHdEfEfEfEgHgIgHfEf+645-465IgHgHfEfEfE-39190+9135-2185E
      ok: >-
        0,+9135-4420+670-465+660-490+640-1625G-470+665iEfGfGfGhGhGiEhGhGhGhGhGiJiJhGdJdJdJhGdJhGhGdJ-1600JkJkJdC-1595C-39190A-2160J
      pause: >-
        0,+9135-4420+665-490+640-470C-1625EfCfC-465CfCfCgEgEhCgEgE-1630+635gEgEgE-1605+660-1600ChCmCmCh+670hNhChNhCmChChCmC-1595N-39185A-2160N
      play: >-
        0,+9135-4420+670-465+665-490+640-1625G-475+660fGfG-480+650fGhGhGfGhGhGhGhGhGh+645-1620G-470EfGhGhGoEoJoEoEhGhGdEoEhGnG-39185A-2165E
      ffwd: >-
        0,+9135-4420+670-490+640dE-1625EdE-470+660dEdEg+665fEfEgHfEfEfEfEfEgIfE-1630+635-465IfEfElIlIfE-460CmIfElIlI-1600I-1595I-39190A-2160I
      rwd: >-
        0,+9135-4420+670-490+640dE-1625EdEdE-470+665dEdEfEfEg+660fEfEfEfEfEfEdEfEgIfEfEgHgHgHfEgHfE-465HgHfE-1620E-39185A-2190E
      stop: >-
        0,+9135-4420+665-470C-490+640-1625FeFdCeFd+660eFgFgFdCgF-1620FgFgFgFdCdCdCdHgFgFdCdCgFgFgFgFdCdCgFiF-39185A-2185F
      amazon: >-
        0,+9140-4420+670-490+640-470+660-1625EdEdEf+665dEdEhEhEfIhEhEhEhEhEfIhE-465ChEjIhE-1600IkIkIjIkIjCkIjIjI-460I-39190A-2155I
      netflix: >-
        0,+9135-4420+670-490+640dE-1625EdE-470+660gHgHg+665fEfEgHfEfEfEfEfEfEfEgIfEgIfEfEfEgIgIfEgIfEgI-465IjI-39190+9140-2165H
      iheartradio: >-
        0,+9135-4420+670-470+660dE-1625+640d+665dHdHdH-465HfGfGiHfGfGfGfGfGiHfG-1630G-1600HiHkHkHkHkHiCiHiHkHiHiC-460H-39190A-2160H
      enter: >-
        0,+9145-4420+670-490+640dE-1625E-470+665dEg+660-495EdEfEfE-465HfEfEfEf+645-1620EkHfEkHfEfEfEkHkC-1600HkHnHkCkCkCnH-1595H-39190+9140-2160H
      num_space: >-
        0,+9140-4420+670-490+640-495E-1625E-470+660dEh+665hJdEgEgEhIgEgEgEgEgEgEgEgEgEgEgE-1630EgEhJhJ-465JlJlJlJlJ-460C-39190A-2160C
      num_1: >-
        0,+9140-4420+670-470+665-490+640-1625GfGdEfGfG-495GhG-1630+635fGhGhGhGhGhGhGdEd+660dEhGdEdE-465EdEh+645-1620GhGdEhGhGoG
      num_2: >-
        0,+9140-4420+670-490+640-470+665-1625EdEdEdEdE-495EhE-1630EfGhEhEhEhEhEfGhE-465GfGhEkGfGf+660hEfGhEhEkGhEhE-1620E-39190A-2165G
      num_3: >-
        0,+9140-4420+670-490+640-470+665-1625EdEdEdEfGfGhEhEf+660hEhE-1630EhEhEhEhE-465GkGhEkGkGkCkGkG-1600GlGkClGlC-1595G-39180A-2160G
      num_4: >-
        0,+9140-4420+670-490+640dE-1625EdEdEdE-470+660gHfEfEg+665fEfEfEfEfE-465IjIfEjIfEjCjCjC-1600IkIjCkIjIkIkI-1595C-39190+9135-2160I
      num_5: >-
        0,+9135-4420+670-490+640dE-1625EdEdE-495E-470+665dEfEfEhIfEfEfEfEfEfE-465IfEhIfEjIjIjIjC-1600IjIkIjIkCkI-1595I-39190+9130-2160C
      num_6: >-
        0,+9140-4420+665-495+640-490E-1625EfEfEfE-470Ch+660-1630EgEhCgEgEgEgEgEhCgEgE-465CgEhChChC-1600CkCk+670lCkClClC-1595C-39185+9135-2160C
      num_7: >-
        0,+9135-4420+665-490+640dE-1625E-495EdEdEdEdEfEfEdEfEfEfEfEfEfEfEfE-470CfEhC-465CiCiCiChCfEiCfEfE-1620E-39190A-2160C
      num_8: >-
        0,+9130-4420+670-470+660dE-1625+640dEdE-490GdE-465+665fGfGiJf+645-1620GfGfGfGiJiJiJfG-1600EiJiJiJmJmJmJiJiJmJmJmJ-39185+9135-2160J
      num_9: >-
        0,+9140-4420+670-490+640dE-1625+645dEdEdE-470+665dEfEfEh+660fEfEfEfEfEfEhIhIfE-1630E-465IhIlIhIfEfElIlC-1600ImI-1595I-39185A-2160I
      num_0: >-
        0,+9135-4420+670-490+640-470+660-1625EfGdEdEfGfGhEhEfGhEhEhEhEhEdEf+665dEfGhE-465IfIfIhEhEhEhEfIhEhE-1620E-39185+9140-2185E
  - choose:
      - alias: Power
        conditions:
          - condition: template
            value_template: '{{ command == ''power'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ power }}'
      - alias: Input
        conditions:
          - condition: template
            value_template: '{{ command == ''input'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ input }}'
      - alias: Volume Up
        conditions:
          - condition: template
            value_template: '{{ command == ''volume_up'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ volume_up }}'
      - alias: Volume Down
        conditions:
          - condition: template
            value_template: '{{ command == ''volume_down'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ volume_down }}'
      - alias: Mute
        conditions:
          - condition: template
            value_template: '{{ command == ''mute'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ mute }}'
      - alias: Vizio
        conditions:
          - condition: template
            value_template: '{{ command == ''vizio'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ vizio }}'
      - alias: Channel Up
        conditions:
          - condition: template
            value_template: '{{ command == ''channel_up'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ channel_up }}'
      - alias: Channel Down
        conditions:
          - condition: template
            value_template: '{{ command == ''channel_down'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ channel_down }}'
      - alias: Arrow Up
        conditions:
          - condition: template
            value_template: '{{ command == ''arrow_up'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ arrow_up }}'
      - alias: Arrow Down
        conditions:
          - condition: template
            value_template: '{{ command == ''arrow_down'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ arrow_down }}'
      - alias: Arrow Left
        conditions:
          - condition: template
            value_template: '{{ command == ''arrow_left'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ arrow_left }}'
      - alias: Arrow Right
        conditions:
          - condition: template
            value_template: '{{ command == ''arrow_right'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ arrow_right }}'
      - alias: Back
        conditions:
          - condition: template
            value_template: '{{ command == ''back'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ back }}'
      - alias: Exit
        conditions:
          - condition: template
            value_template: '{{ command == ''exit'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ exit }}'
      - alias: Guide
        conditions:
          - condition: template
            value_template: '{{ command == ''guide'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ guide }}'
      - alias: OK
        conditions:
          - condition: template
            value_template: '{{ command == ''ok'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ ok }}'
      - alias: Pause
        conditions:
          - condition: template
            value_template: '{{ command == ''pause'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ pause }}'
      - alias: Play
        conditions:
          - condition: template
            value_template: '{{ command == ''play'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ play }}'
      - alias: Fast Forward
        conditions:
          - condition: template
            value_template: '{{ command == ''ffwd'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ ffwd }}'
      - alias: Rewind
        conditions:
          - condition: template
            value_template: '{{ command == ''rwd'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ rwd }}'
      - alias: Stop
        conditions:
          - condition: template
            value_template: '{{ command == ''stop'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ stop }}'
      - alias: Amazon Video
        conditions:
          - condition: template
            value_template: '{{ command == ''amazon'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ amazon }}'
      - alias: Netflix
        conditions:
          - condition: template
            value_template: '{{ command == ''netflix'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ netflix }}'
      - alias: I Heart Radio
        conditions:
          - condition: template
            value_template: '{{ command == ''iheartradio'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ iheartradio }}'
      - alias: Enter
        conditions:
          - condition: template
            value_template: '{{ command == ''enter'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ enter }}'
      - alias: Number Pad Space
        conditions:
          - condition: template
            value_template: '{{ command == ''num_space'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ num_space }}'
      - alias: Number Pad 1
        conditions:
          - condition: template
            value_template: '{{ command == ''num_1'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ num_1 }}'
      - alias: Number Pad 2
        conditions:
          - condition: template
            value_template: '{{ command == ''num_2'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ num_2 }}'
      - alias: Number Pad 3
        conditions:
          - condition: template
            value_template: '{{ command == ''num_3'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ num_3 }}'
      - alias: Number Pad 4
        conditions:
          - condition: template
            value_template: '{{ command == ''num_4'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ num_4 }}'
      - alias: Number Pad 5
        conditions:
          - condition: template
            value_template: '{{ command == ''num_5'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ num_5 }}'
      - alias: Number Pad 6
        conditions:
          - condition: template
            value_template: '{{ command == ''num_6'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ num_6 }}'
      - alias: Number Pad 7
        conditions:
          - condition: template
            value_template: '{{ command == ''num_7'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ num_7 }}'
      - alias: Number Pad 8
        conditions:
          - condition: template
            value_template: '{{ command == ''num_8'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ num_8 }}'
      - alias: Number Pad 9
        conditions:
          - condition: template
            value_template: '{{ command == ''num_9'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ num_9 }}'
      - alias: Number Pad 0
        conditions:
          - condition: template
            value_template: '{{ command == ''num_0'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ num_0 }}'
      - alias: Menu
        conditions:
          - condition: template
            value_template: '{{ command == ''menu'' }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: '{{ mqtttopic }}'
              payload: '{{ menu }}'
    default: []
fields:
  command:
    description: IR Command Alias
    example: power_on
  mqtttopic:
    description: MQTT Topic for Tasmota IR blaster
    example: cmnd/irblaster/IRSend
mode: single
icon: mdi:remote
alias: Remote - Vizio TV
```
</p>
</details>

To test this script we can use the developer tools of homeassistant.  In our example we will use the device topic or group topic via MQTT so your MQTT topic will vary and you can find that out by visiting your tasmota device console and type the command(s):

```
topic
grouptopic
```

### Script Testing

Visit your homeassistant dev tools section and we'll test the script.  You can see in the screen show we are trying the power command with the topic of our new device


![alt text](/img/devices/tasmota-ir-script-testing.webp "HA Dev Tools script screenshot")

If you've done this successfully when you hit the call service button your IR blaster should send the power command to the TV!

When you've tested all the IR code in the script and are sure they all work we want to make this fancy in your home assistant dashboard

## Lovelace / Dashboard Remote card

Now is where everything comes together.

Here is an example of adding a single button so you can see the basics without getting overwhelmed

In the view where you want to add the card edit the dashboard hit + to add a new card.  Choose Manual and paste in the example here:

```
type: button
entity: script.remote_vizio_tv
name: Power
show_state: false
tap_action:
  action: call-service
  service: script.remote_vizio_tv
  service_data:
    command: power
    mqtttopic: cmnd/infraredremote/irsend
icon: mdi:power
icon_height: 50px
show_name: false
```

As you can see the button is of the script that we created with the tap action using the `call-service` to run the script and the service data is the command and the topic or grouptopic you want to have issue the command.

Once you've gotten the gist here is complete vizio tv remote card

![alt text](/img/devices/tasmota-ir-lovelace-card.webp "Example vizio tv remote lovelace card")

<details>
<summary>Card Code</summary>     
<p>

```yaml
type: vertical-stack
title: Vizio TV (Master Bedroom)
cards:
  - type: horizontal-stack
    cards:
      - type: button
        entity: script.remote_vizio_tv
        name: Power
        show_state: false
        tap_action:
          action: call-service
          service: script.remote_vizio_tv
          service_data:
            command: power
            mqtttopic: cmnd/masterbedinfraredremote/irsend
        icon: mdi:power
        icon_height: 50px
        show_name: false
      - type: button
        entity: script.remote_vizio_tv
        name: Input
        show_state: false
        tap_action:
          action: call-service
          service: script.remote_vizio_tv
          service_data:
            command: input
            mqtttopic: cmnd/masterbedinfraredremote/irsend
        icon: mdi:import
        icon_height: 50px
        show_name: true
  - type: horizontal-stack
    cards:
      - type: button
        entity: script.remote_vizio_tv
        name: Back
        show_state: false
        tap_action:
          action: call-service
          service: script.remote_vizio_tv
          service_data:
            command: back
            mqtttopic: cmnd/masterbedinfraredremote/irsend
        icon: mdi:arrow-left-bold-circle
        icon_height: 50px
        show_name: false
      - type: button
        entity: script.remote_vizio_tv
        name: Exit
        show_state: false
        tap_action:
          action: call-service
          service: script.remote_vizio_tv
          service_data:
            command: exit
            mqtttopic: cmnd/masterbedinfraredremote/irsend
        icon: mdi:keyboard-esc
        icon_height: 50px
        show_name: false
  - type: horizontal-stack
    cards:
      - type: button
        entity: script.remote_vizio_tv
        name: Vol +
        show_state: false
        tap_action:
          action: call-service
          service: script.remote_vizio_tv
          service_data:
            command: volume_up
            mqtttopic: cmnd/masterbedinfraredremote/irsend
          target: {}
        icon: mdi:volume-plus
        icon_height: 50px
        show_name: false
      - type: button
        entity: script.remote_vizio_tv
        show_state: false
        tap_action:
          action: call-service
          service: script.remote_vizio_tv
          service_data:
            command: arrow_up
            mqtttopic: cmnd/masterbedinfraredremote/irsend
          target: {}
        icon: mdi:arrow-up-box
        icon_height: 50px
        show_name: false
        name: Up
      - type: button
        entity: script.remote_vizio_tv
        name: CH +
        show_state: false
        tap_action:
          action: call-service
          service: script.remote_vizio_tv
          service_data:
            command: channel_up
            mqtttopic: cmnd/masterbedinfraredremote/irsend
          target: {}
        icon: mdi:arrow-up-bold
        icon_height: 50px
        show_name: true
        show_icon: false
  - type: horizontal-stack
    cards:
      - type: button
        entity: script.remote_vizio_tv
        show_state: false
        tap_action:
          action: call-service
          service: script.remote_vizio_tv
          service_data:
            command: arrow_left
            mqtttopic: cmnd/masterbedinfraredremote/irsend
          target: {}
        icon: mdi:arrow-left-box
        icon_height: 50px
        show_name: false
        name: Left
      - type: button
        entity: script.remote_vizio_tv
        show_state: false
        tap_action:
          action: call-service
          service: script.remote_vizio_tv
          service_data:
            command: enter
            mqtttopic: cmnd/masterbedinfraredremote/irsend
          target: {}
        icon: mdi:keyboard-return
        icon_height: 50px
        show_name: true
        name: OK
        show_icon: false
      - type: button
        entity: script.remote_vizio_tv
        show_state: false
        tap_action:
          action: call-service
          service: script.remote_vizio_tv
          service_data:
            command: arrow_right
            mqtttopic: cmnd/masterbedinfraredremote/irsend
          target: {}
        icon: mdi:arrow-right-box
        icon_height: 50px
        show_name: false
        name: Right
  - type: horizontal-stack
    cards:
      - type: button
        entity: script.remote_vizio_tv
        name: Vol -
        show_state: false
        tap_action:
          action: call-service
          service: script.remote_vizio_tv
          service_data:
            command: volume_down
            mqtttopic: cmnd/masterbedinfraredremote/irsend
          target: {}
        icon: mdi:volume-minus
        icon_height: 50px
        show_name: false
      - type: button
        entity: script.remote_vizio_tv
        show_state: false
        tap_action:
          action: call-service
          service: script.remote_vizio_tv
          service_data:
            command: arrow_down
            mqtttopic: cmnd/masterbedinfraredremote/irsend
          target: {}
        icon: mdi:arrow-down-box
        icon_height: 50px
        show_name: false
        name: Up
      - type: button
        entity: script.remote_vizio_tv
        name: CH -
        show_state: false
        tap_action:
          action: call-service
          service: script.remote_vizio_tv
          service_data:
            command: channel_down
            mqtttopic: cmnd/masterbedinfraredremote/irsend
          target: {}
        icon: mdi:arrow-down-bold
        icon_height: 50px
        show_name: true
        show_icon: false
  - type: horizontal-stack
    cards:
      - type: button
        entity: script.remote_vizio_tv
        name: Mute
        show_state: false
        tap_action:
          action: call-service
          service: script.remote_vizio_tv
          service_data:
            command: mute
            mqtttopic: cmnd/masterbedinfraredremote/irsend
        icon: mdi:volume-mute
        icon_height: 50px
        show_name: false
      - type: button
        entity: script.remote_vizio_tv
        show_state: false
        tap_action:
          action: call-service
          service: script.remote_vizio_tv
          service_data:
            command: vizio
            mqtttopic: cmnd/masterbedinfraredremote/irsend
          target: {}
        icon: mdi:television
        icon_height: 50px
        show_name: true
        name: Vizio
        show_icon: true
      - type: button
        entity: script.remote_vizio_tv
        show_state: false
        tap_action:
          action: call-service
          service: script.remote_vizio_tv
          service_data:
            command: menu
            mqtttopic: cmnd/masterbedinfraredremote/irsend
          target: {}
        icon: mdi:menu
        icon_height: 50px
        show_name: true
        name: Menu
        show_icon: true
  - type: horizontal-stack
    cards:
      - type: button
        entity: script.remote_vizio_tv
        show_state: false
        tap_action:
          action: call-service
          service: script.remote_vizio_tv
          service_data:
            command: num_1
            mqtttopic: cmnd/masterbedinfraredremote/irsend
          target: {}
        icon: mdi:numeric-1-box
        icon_height: 50px
        show_name: false
        name: '1'
      - type: button
        entity: script.remote_vizio_tv
        show_state: false
        tap_action:
          action: call-service
          service: script.remote_vizio_tv
          service_data:
            command: num_2
            mqtttopic: cmnd/masterbedinfraredremote/irsend
          target: {}
        icon: mdi:numeric-2-box
        icon_height: 50px
        show_name: false
        name: '2'
      - type: button
        entity: script.remote_vizio_tv
        show_state: false
        tap_action:
          action: call-service
          service: script.remote_vizio_tv
          service_data:
            command: num_3
            mqtttopic: cmnd/masterbedinfraredremote/irsend
          target: {}
        icon: mdi:numeric-3-box
        icon_height: 50px
        show_name: false
        name: '3'
  - type: horizontal-stack
    cards:
      - type: button
        entity: script.remote_vizio_tv
        show_state: false
        tap_action:
          action: call-service
          service: script.remote_vizio_tv
          service_data:
            command: num_4
            mqtttopic: cmnd/masterbedinfraredremote/irsend
          target: {}
        icon: mdi:numeric-4-box
        icon_height: 50px
        show_name: false
        name: '4'
      - type: button
        entity: script.remote_vizio_tv
        show_state: false
        tap_action:
          action: call-service
          service: script.remote_vizio_tv
          service_data:
            command: num_5
            mqtttopic: cmnd/masterbedinfraredremote/irsend
          target: {}
        icon: mdi:numeric-5-box
        icon_height: 50px
        show_name: false
        name: '5'
      - type: button
        entity: script.remote_vizio_tv
        show_state: false
        tap_action:
          action: call-service
          service: script.remote_vizio_tv
          service_data:
            command: num_6
            mqtttopic: cmnd/masterbedinfraredremote/irsend
          target: {}
        icon: mdi:numeric-6-box
        icon_height: 50px
        show_name: false
        name: '6'
  - type: horizontal-stack
    cards:
      - type: button
        entity: script.remote_vizio_tv
        show_state: false
        tap_action:
          action: call-service
          service: script.remote_vizio_tv
          service_data:
            command: num_7
            mqtttopic: cmnd/masterbedinfraredremote/irsend
          target: {}
        icon: mdi:numeric-7-box
        icon_height: 50px
        show_name: false
        name: '7'
      - type: button
        entity: script.remote_vizio_tv
        show_state: false
        tap_action:
          action: call-service
          service: script.remote_vizio_tv
          service_data:
            command: num_8
            mqtttopic: cmnd/masterbedinfraredremote/irsend
          target: {}
        icon: mdi:numeric-8-box
        icon_height: 50px
        show_name: false
        name: '8'
      - type: button
        entity: script.remote_vizio_tv
        show_state: false
        tap_action:
          action: call-service
          service: script.remote_vizio_tv
          service_data:
            command: num_9
            mqtttopic: cmnd/masterbedinfraredremote/irsend
          target: {}
        icon: mdi:numeric-9-box
        icon_height: 50px
        show_name: false
        name: '9'
  - type: horizontal-stack
    cards:
      - type: button
        entity: script.remote_vizio_tv
        show_state: false
        tap_action:
          action: call-service
          service: script.remote_vizio_tv
          service_data:
            command: enter
            mqtttopic: cmnd/masterbedinfraredremote/irsend
          target: {}
        icon: mdi:keyboard-return
        icon_height: 50px
        show_name: false
        name: enter
      - type: button
        entity: script.remote_vizio_tv
        show_state: false
        tap_action:
          action: call-service
          service: script.remote_vizio_tv
          service_data:
            command: num_0
            mqtttopic: cmnd/masterbedinfraredremote/irsend
          target: {}
        icon: mdi:numeric-0-box
        icon_height: 50px
        show_name: false
        name: '0'
      - type: button
        entity: script.remote_vizio_tv
        show_state: false
        tap_action:
          action: call-service
          service: script.remote_vizio_tv
          service_data:
            command: num_space
            mqtttopic: cmnd/masterbedinfraredremote/irsend
          target: {}
        icon: mdi:keyboard-space
        icon_height: 50px
        show_name: false
        name: num_space
```
</p>
</details>