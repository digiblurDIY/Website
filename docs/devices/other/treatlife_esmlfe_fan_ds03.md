# TreatLife/Esmlfe DS03 Fan Dimmer Combo

Single gang Decora fan controller & light dimmer combo.  Currently the ESMLFE Model on [Amazon](https://amzn.to/3hgfoqX) is using an ESP8266.  The TreatLife version is no longer shipping with an ESP chip and will require a transplant - see [digiblurDIY Transplant Video](https://youtu.be/d_HpkIiWC3Y).

Flashing instructions and photos can be found at the bottom of this configuration page.

Purchase via [Amazon](https://amzn.to/3hgfoqX)  

#### Tasmota Template
None necessary.  Tasmota GUI -> Configuration -> Configure Module -> Tuya MCU (54)  
***OR***  
issue a ***Module 54*** command on the Tasmota Console. 

### GPIO Layout

| GPIO |    Component | Description |
|------ |-------------|-------------|         
|GPIO01	| Tuya Tx | 
|GPIO03	| Tuya Rx | 

### Settings 

| Setting | Description
|---------------|-------------
| setoption97 1 | Set 115200 TuyaMCU Serial Baud Rate
| setoption59 1 | Report light state changes via MQTT
| setoption68 0 | Make sure it is single color dimming mode
| ledtable 0 | Optional linear dimming setting
| tuyamcu 11,1 | Assign Relay1 to dpID 1
| tuyamcu 12,9 | Assign Relay2 to dpID 9
| tuyamcu 21,10 | Assign Dimmer to dpID 10
| dimmerrange 10,1000 | Assign the upper and lower dimmer button range to match the buttons (this is not set per bulb type)

### Rules

OPTION A: Does NOT turn the fan on when the speed/preset is changed:  

Rule1 on TuyaReceived#Data=55AA03070005030400010016 do publish2 stat/%topic%/speed 3,0 endon
      on TuyaReceived#Data=55AA03070005030400010117 do publish2 stat/%topic%/speed 3,1 endon
      on TuyaReceived#Data=55AA03070005030400010218 do publish2 stat/%topic%/speed 3,2 endon
      on TuyaReceived#Data=55AA03070005030400010319 do publish2 stat/%topic%/speed 3,3 endon

OPTION B: The fan turns on when the speed/preset is changed:

Rule1 on TuyaReceived#Data=55AA03070005030400010016 do backlog power1 1 ; publish2 stat/%topic%/speed 3,0 endon on TuyaReceived#Data=55AA03070005030400010117 do backlog power1 1 ; publish2 stat/%topic%/speed 3,1 endon on TuyaReceived#Data=55AA03070005030400010218 do backlog power1 1 ; publish2 stat/%topic%/speed 3,2 endon on TuyaReceived#Data=55AA03070005030400010319 do backlog power1 1 ; publish2 stat/%topic%/speed 3,3 endon

Enable the rule with the following

Rule1 1

### ESPHome YAML
```yaml
substitutions:
  device_name: DeviceName #change
  friendly_name: Device Friendly Name #change
  
esphome:
  name: ${device_name}

esp8266:
  board: esp01_1m
  restore_from_flash: true

preferences:
  flash_write_interval: 5min

wifi:
  # https://esphome.io/components/wifi
  power_save_mode: HIGH
  
#captive_portal:
# doesn't work under esp-idf
  
#web_server:
  #port: 80
  # https://esphome.io/components/web_server.html
# doesn't work under esp-idf

logger:
  # https://esphome.io/components/logger

api:
  #password: !secret esphome_api_password
  # https://esphome.io/components/api
  reboot_timeout: 0s #disable auto-reboot if homeassistant is not connecting

ota:
  platform: esphome
  #password: !secret esphome_ota_password
  # https://esphome.io/components/ota

uart:
  rx_pin: GPIO3
  tx_pin: GPIO1
  baud_rate: 115200

tuya:

sensor:
  - platform: wifi_signal
    name: ${friendly_name} Wifi Signal
    update_interval: 60s

  - platform: uptime
    name: ${friendly_name} uptime

light:
  - platform: "tuya"
    output_id: tuya_lgt_dev
    name: ${friendly_name} Light
    dimmer_datapoint: 10
    switch_datapoint: 9
    min_value: 100
    max_value: 1000

fan:
  - platform: "tuya"
    name: ${friendly_name} Speed
    switch_datapoint: 1
    speed_datapoint: 3
    speed_count: 4

number:
  - platform: "tuya"
    name: ${friendly_name} Dimmer Minimum
    entity_category: config
    min_value: 10
    max_value: 1000
    step: 10
    number_datapoint: 105
    on_value:
      then:
        - lambda: |-
            id(tuya_lgt_dev).set_min_value(x);
```

## Flashing and Full Setup Procedure

Disconnect any power going to the device!  Remove the 4 screws and the face plate will come off.  There are no ribbon cables or wires to worry about.

![alt text](/img/devices/treatlife_fan_face.webp "Treatlife Fan Controller")

The TYWE3S module containing the flash-able ESP8266 chip is wide out in the open.  There are multiple choices you can use to flash this chip with the 3v3 and GND headers.  Using a TTL USB adapter, you need to connect the following wires:  3v3 (do not use 5 volts!), Ground, RX, and TX.  GPIO 0 will also need to be attached to ground to enable flash mode on an ESP8266.  Instead of soldering, if you have a 3D printer you can also make a pogo pin jig as shown here and below.  Remember that RX goes TX and TX goes to RX on the USB TTL adapter.

![alt text](/img/devices/treatlife_fan_board1.webp "Treatlife Fan Controller")

Also, note you will need to put a jumper between NRESET and GND locations. This keeps the secondary TuyaMCU in a reset loop during the flashing of Tasmota.  Without this jumper the flashing process will not work.  

![alt text](/img/devices/treatlife_fan_board2.webp "Treatlife Fan Controller")

treatlife_fan_board_pins1

Once you've connected the necessary wires to your USB TTL device you can utilize Tasmotizer to flash the chip.  Additional information available on flashing Tuya devices can be found here in the Tasmota Wiki  

![alt text](/img/devices/tywes3_pinout.webp "Treatlife Fan Controller")

![alt text](/img/devices/treatlife_fan_board2.webp "Treatlife Fan Controller")

![alt text](/img/devices/treatlife_fan_board_pins2.webp "Treatlife Fan Controller")

Once flashed, disconnect GPIO 0 so it will boot up into Tasmota.  You need to scan the WiFi access points with a phone, laptop, or tablet.  You should see a tasmota-xxxx or similar named WiFi access point.  Connect to this AP, accept any messages about no internet connectivity if your device prompts you, this is normal.  Browse to 192.168.4.1 if it does not open the Tasmota page automatically. Click scan, select your home WiFi network and enter the password for your network.  Check the box show password to make sure you have the password correct.  Save the settings.  The Fan controller should now be on your network.  You can look on your router or WiFi attached devices and find the IP address of the device.  Browse to this IP address to complete the rest of the Tasmota setup.

It's all down hill after this...  click the Console button on the Tasmota GUI of the fan switch.  Issue the following commands.  Take note it will restart during many of the commands, wait for the console to somewhat settle down before issuing the next one.  

### Tasmota Setup

`module 54`

`backlog so97 1 ; tuyamcu 11,1 ; tuyamcu 12,9 ; tuyamcu 21,10`

`backlog ledtable 0 ; dimmerrange 10,1000 ; so59 1 ; so68 0`

### Rules

There is a configuration choice to decide; by default the fan speed can be changed while the fan is off and it will not turn on.  This can be a good or bad thing depending on your choices.  Pick the Rule Set you like (you can change it later by simply copy and pasting the rule back into the console)

Add the following rule, this should be all on ONE line in the Tasmota Console on the Switch.

(SELECT ONE)

**OPTION A: Does NOT turn the fan on when the speed/preset is changed:**  
*Rule1 on TuyaReceived#Data=55AA03070005030400010016 do publish2 stat/%topic%/speed 3,0 endon
      on TuyaReceived#Data=55AA03070005030400010117 do publish2 stat/%topic%/speed 3,1 endon
      on TuyaReceived#Data=55AA03070005030400010218 do publish2 stat/%topic%/speed 3,2 endon
      on TuyaReceived#Data=55AA03070005030400010319 do publish2 stat/%topic%/speed 3,3 endon*

**OPTION B: The fan turns on when the speed/preset is changed:**

*Rule1 on TuyaReceived#Data=55AA03070005030400010016 do backlog power1 1 ; publish2 stat/%topic%/speed 3,0 endon on TuyaReceived#Data=55AA03070005030400010117 do backlog power1 1 ; publish2 stat/%topic%/speed 3,1 endon on TuyaReceived#Data=55AA03070005030400010218 do backlog power1 1 ; publish2 stat/%topic%/speed 3,2 endon on TuyaReceived#Data=55AA03070005030400010319 do backlog power1 1 ; publish2 stat/%topic%/speed 3,3 endon*

**Enable the rule with the following**

*Rule1 1*

![alt text](/img/devices/treatlife_fan_tas1.webp "Treatlife Fan Controller")

### Testing

You can then add the necessary MQTT configuration, device name, etc and it should be safe to disconnect the wires, reassemble the switch and install it on the wall, on mains AC power to the fan.  You might be asking at this point "how do I control the fan speed from the GUI?"  You will need to utilize the following commands to send the fan speeds on the console

***TuyaSend4 3,0***  (fan speed 1)  
***TuyaSend4 3,1***  (fan speed 2)  
***TuyaSend4 3,2***  (fan speed 3)  
***TuyaSend4 3,3***  (fan speed 4)  

You can also send those over MQTT if you like from various automations using cmnd/topic/tuyasend4 with a payload of 3,0 , etc.  

### Home Assistant Configuration

If you already have a "fan" and "light" section do not duplicate these sections in your Configuration YAML file.  Don't forget to change the "yourtopic" topic to the MQTT topic configured in your fan switch MQTT page of Tasmota from the previous steps

As of 2022.6 Home Assistant MQTT Fan has changed...again... 

(if the configuration YAML file already has an MQTT: section do not add another)

```yaml
mqtt:
  fan:
    - name: "Your Fan"  
      qos: 1
      state_topic: "stat/yourtopic/POWER1"
      command_topic: "cmnd/yourtopic/POWER1"
      availability_topic: "tele/yourtopic/LWT"
      percentage_state_topic: "stat/yourtopic/speed"
      percentage_value_template: '{{ ((value | replace("3,","")) | int + 1) * 25 }}'
      percentage_command_topic: "cmnd/yourtopic/tuyasend4"
      percentage_command_template: "3,{{ ((value | int - 1) / 25) | int }}"
      preset_mode_state_topic: "stat/yourtopic/speed"
      preset_mode_value_template: '{{ value | replace("3,0", "turtle") | replace("3,1", "low") | replace("3,2", "medium") | replace("3,3", "high") }}'
      preset_mode_command_topic: "cmnd/yourtopic/tuyasend4"
      preset_mode_command_template: '{{ value | replace("turtle", "3,0") | replace("low", "3,1") | replace("medium", "3,2") | replace("high", "3,3") }}'
      preset_modes:
        - "turtle"
        - "low"
        - "medium"
        - "high"
      payload_available: "Online"
      payload_not_available: "Offline"
      payload_on: "ON"
      payload_off: "OFF"

  light:
    - name: "Your Light"
      state_topic: "tele/yourtopic/STATE"
      state_value_template: "{{ value_json.POWER2 }}"
      command_topic: "cmnd/yourtopic/POWER2"
      availability_topic: "tele/yourtopic/LWT"
      brightness_state_topic: "tele/yourtopic/STATE"
      brightness_command_topic: "cmnd/yourtopic/Dimmer"
      brightness_scale: 100
      brightness_value_template: "{{ value_json.Dimmer }}"
      payload_on: "ON"
      payload_off: "OFF"
      payload_available: "Online"
      payload_not_available: "Offline"
```

That's it!  Enjoy!  If you need help feel free to pop into [Discord](https://discord.com/invite/dgRZSw6) and ask for a hand.  

