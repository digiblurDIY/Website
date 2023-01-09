# DrChop Corner Floor Lamp
![alt text](/img/devices/drchop-corner-lamp.jpg "DrChop Corner Floor Lamp")

Purchase via [Amazon](https://amzn.to/3YGy7j9)

![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) `1/03/2023 - This device has a realtek chip. We will swap in ESP32-C3-12F Chip`

## Pinouts
<hr/>

### GPIO Layout

| GPIO |    Component | Description |
|------ |-------------|-------------|         
|GPIO3  | IR          | Infrared receiver |
|GPIO5  | Button 2    |             |
|GPIO21	| LEDs        | 48 LEDs in length BRG color order|
|GPIO18	| Button 1    |             |
|GPIO19 | Button 0    |             |

<br/>

## Additional Hardware
<hr/>
You'll need to buy yourself an 

[ESP-C3-12F Chip](https://a.aliexpress.com/_mOr497g)

ESP burner

[Amazon](https://www.amazon.com/gp/product/B089488G11?tag=digiblur-20)


## Pre-Flash ESP-C3-12F
<hr/>

### Chip Flashing

Our ESP Burner isn't designed for use with the ESP32-C3 in particular but because they are both the 12F format it will work.  It will require for use to a few jumper wires.  You can see which pins to apply here in this diagram:

![alt text](/img/devices/espburner-c3-pinout.png "ESP-C3-12F chip in burner board and jumper pins")

We want to flash WLED onto the chip but because this is an ESP32 chip you need to flash the factory firmware image then use wled

#### Compile WLED
To setup VSCode/Platformio to compile visit [here](https://kno.wled.ge/advanced/compiling-wled/)

We need to comment out or delete this line in https://github.com/Aircoookie/WLED/blob/main/wled00/pin_manager.cpp#L246

Line to ommit because we need to use GPIO pin 18 and 19:

```
    if (gpio > 17 && gpio < 20) return false;     // 18-19 USB-JTAG
```

Here is a sample of the platformio_override.ini file used

```
[platformio]
default_envs = WLED_drchop_corner_lamp

[env:WLED_drchop_corner_lamp]
board = esp32-c3-devkitm-1
platform = ${common.platform_wled_default}
platform_packages = ${common.platform_packages}
framework = arduino
board_build.partitions = tools/WLED_ESP32_4MB_1MB_FS.csv
upload_speed = 460800
build_unflags = ${common.build_unflags}
lib_deps = ${esp32c3.lib_deps}
```

After you build/compile the code it'll show up in the directory build_output/release/WLED_VERSION_drchop_corner_lamp.bin

#### Pre-Compiled WLED

[WLED-0.14.0-b1 with GPIO pin 18 and 19 enabled](/firmware/wled-0.14.0-b1-esp32c3-4m-gpio1819enabled.factory.bin)

Use ESPtool to flash it to the memory spaces `0x0`

[Instructions here](/wiki/ha/esphome-esp32-how-to-flash#install-the-esphome-factory-bin-via-esptoolpy)

```
esptool.py write_flash 0x0 wled-0.14.0-b1-esp32c3-4m-gpio1819enabled.factory.bin
```

<br/>

## Open it
<hr/>

Pry the back open

![alt text](/img/devices/drchop-pry-open.jpg "Pic of the device being pried opened")
![alt text](/img/devices/drchop-opened.jpg "Pic of inside the device case")

<br/>

## Desolder un-needed components
<hr/>

### Add Leaded Solder

Get some leaded solder and melt some on the existing pins of the Realtek chip

![alt text](/img/devices/drchop-addsolder.jpg "Pic of where to add more solder")


### Heat em up! Pull em off! RAWHIDE!

Now use your hot air tool, soldering iron, or heat gun to remove the chips

![alt text](/img/devices/drchop-chipremoved.jpg "Pic of Realtek chip removed from the board")

<br/>

## Solder new stuff
<hr/>
Now we want to solder the new chip back on

### ESP32 C3 12F

Use some solder wick and clean up the pads where you pulled the Realtek chip from, this will allow the ESP32 C3 12F chip to sit flat on the PCB

Place the ESP32-C3-12F on the board and solder it into place
![alt text](/img/devices/drchop-newchip.jpg "Pic of ESP32 C3 12F chip soldered onto the board")

Reassemble the board back into the case
![alt text](/img/devices/drchop-reassembled.jpg "Pic of ESP32 C3 12F chip soldered onto the board and in the case")


## WLED Settings
<hr/>

### General

| Location | Setting | Value | Description |
|---------|----------|-------|-------------|
| /settings/leds? | Maximum Current | 3000 mA | The power supply provided can do up to 3 amps |
| /settings/leds? | LED Voltage | 12V | These are 12 Volt LEDs |
| /settings/leds? | LED1 Type | WS281x | Main lamp LED type |
| /settings/leds? | LED1 Color Order | BRG | Main lamp LED color order |
| /settings/leds? | LED1 Length | 48 | Main lamp LED count on the face of the lamp |
| /settings/leds? | LED1 GPIO | 21 | Main lamp LED GPIO pin |
| /settings/leds? | Button 0 GPIO | 19 | Button 0 GPIO pin |
| /settings/leds? | Button 1 GPIO | 18 | Button 1 GPIO pin |
| /settings/leds? | Button 2 GPIO | 5 | Button 2 GPIO pin |
| /settings/leds? | IR GPIO | 3 | Pick your [remote type](https://kno.wled.ge/interfaces/json-ir/json_infrared/) if you have one the lamp comes with the receiver but no remote | 

## 3D Printable wall mount
<hr/>

Huge thanks to `oldcrazyeye` for the wonderful model:

[STL Downloads](https://www.thingiverse.com/thing:5776603)