# Ikea VINDRIKTNING Multi-Sensor Build
![alt text](/img/devices/VINDRIKTNING.png "IKEA VINDRIKTNING Air Quality")

Purchase via [Ikea](https://www.ikea.com/us/en/p/vindriktning-air-quality-sensor-60515911/)


## Additional Hardware
<hr/>

### ESP Dev Board
You'll need to buy yourself an ESP development board of your choosing that is small enough to fit.
Here are tested boards that work:

- [Wemos D1 Mini](https://www.amazon.com/HiLetgo-NodeMcu-Development-ESP8266-Compatiable/dp/B073CQVFLK)
    - ESP8266
- [Wemos C3 Mini](https://www.aliexpress.com/item/3256803819421802.html)
    - ESP32 *but you must remove this part

    ![alt text](/img/devices/LOLIN-C3-MINI-FIX.png "Remove this part")
    - Has Bluetooth Low Energy *good for blerry
- [Wemos S2 Mini](https://www.aliexpress.com/item/1005003145192016.html)
    - ESP32
- [QUINLED-ESP32](https://shop.allnetchina.cn/products/quinled-esp32)
    - ESP32
    - Has Bluetooth Lowe Energy *good for blerry

### Sensors

All of these add-ons are optional but nice additions

#### Controllable LED indicators
In this mod we want to control the LEDs on the front and we'll need a few pixels to replace the soldered ones
- [WS2811](https://www.amazon.com/gp/product/B01CDTEH3Q)
    - You'll only need 3 pixels per sensor

#### LUX Sensor
One of the annoying things about the VINDRIKTNING when you get it from IKEA is that the front LED's never go off.
So at night if you put one of these in a room it's bright enough to bother you.
Adding a LUX sensor not only gives you LUX readings for the room, but allow you to turn off the LED's if you swapped the default LED's with the controllable ones.
- [BH1750](https://www.amazon.com/Ximimark-BH1750FVI-Digital-Intensity-Detector)

#### Temperature / Humidity Sensor
What's an air quality sensor if it can't give you a better gauge than just particulate.
So adding a BME280 will give you those values
- [BME280](amazon.com/Temperature-Humidity-Atmospheric-Barometric-Pressure/dp/B09YHHLND7)

### Motion Sensor
You can also add a motion sensor in the box to get motion as well
- [AM312](https://www.amazon.com/HiLetgo-Pyroelectric-Sensor-Infrared-Detector/dp/B07RT7MK7C)


## Compile Tasmota
<hr/>

Before you start soldering everything together you'll want to install tasmota on the chip.

The VINDRIKTNING, and BH1750 aren't part of the default sensors in the normal or allsensors build of tasmota.
You'll need to compile tasmota to get all the options.

I recommend you use [tasmocompiler](https://github.com/benzino77/tasmocompiler) to make it easy

### TasmoCompiler Screenshots
<hr/>

#### Step 1 Source:
![alt text](/img/devices/VINDRIKTNING-tasmocompiler1.png "TasmoCompiler Screenshot Step 1")

#### Step 2 WiFI Settings:

![alt text](/img/devices/VINDRIKTNING-tasmocompiler2.png "TasmoCompiler Screenshot Step 2")

#### Step 3 Features for D1 Mini:

![alt text](/img/devices/VINDRIKTNING-tasmocompiler3-wemosd1.png "TasmoCompiler Screenshot Step 3 for D1 Mini")

#### Step 3 Features for S2 Mini:

![alt text](/img/devices/VINDRIKTNING-tasmocompiler3-s2mini.png "TasmoCompiler Screenshot Step 3 for S2 Mini")

#### Step 3 Features for C3 Mini:

![alt text](/img/devices/VINDRIKTNING-tasmocompiler3-c3mini.png "TasmoCompiler Screenshot Step 3 for C3 Mini")

#### Step 3 Features for QuinESP32:

![alt text](/img/devices/VINDRIKTNING-tasmocompiler3-quinesp32.png "TasmoCompiler Screenshot Step 3 for QuinESP32")

#### Step 4 Custom Compile Options:

Add the following compile options

```
#define USE_VINDRIKTNING 
#define VINDRIKTNING_SHOW_PM1
#define VINDRIKTNING_SHOW_PM10
#define USE_BH1750
```

![alt text](/img/devices/VINDRIKTNING-tasmocompiler4.png "TasmoCompiler Screenshot Step 1")

#### Step 5 Version select:

![alt text](/img/devices/VINDRIKTNING-tasmocompiler5.png "TasmoCompiler Screenshot Step 5")

#### Step 6 Download ESP8266 / Wemos D1:
ESP8266 doesn't require the factory binary and you can just download the firmware.bin

![alt text](/img/devices/VINDRIKTNING-tasmocompiler6-wemosd1.png "TasmoCompiler Screenshot Step 6 ESP8266")

#### Step 6 Download QuinESP32, S2 Mini and C3 Mini

ESP32 chips require a factory.firmware.bin file to be used because it lays out the partitions differently based on the chip.

![alt text](/img/devices/VINDRIKTNING-tasmocompiler6-tasmota32.png "TasmoCompiler Screenshot Step 6 ESP32")


## Flash tasmota
<hr/>

Now use your favorite tool to install the tasmota.factory.bin file to the ESP board.

For ESP8266 [tasmotizer](https://github.com/tasmota/tasmotizer) works well.

For ESP32 chips you'll want to use [esptool.py](https://github.com/espressif/esptool)

```
esptool.py --baud 460800 --before default_reset --after hard_reset write_flash -z 0x0 <buildname>.factory.bin
```

<br/>

## Open it up
<hr/>

Remove the four screws from the back

![alt text](/img/devices/VINDRIKTNING-screws.jpg "Screw Removal")


## LED Mod
<hr/>

Pull the face off and remove the connectors attached to the PCB on the lid

![alt text](/img/devices/VINDRIKTNING-faceremoved.jpg "Screw Removal")

Remove the screws from the black PCB to remove the board from the faceplate.

If you are wanting to have controllable LEDs then you'll follow this next step to desolder the PCB leds.

Flip the PCB over and you'll see the LEDs on the board.  Get your soldering iron and flood each one with solder until it can be removed and cleaned up with some soldering wick

![alt text](/img/devices/VINDRIKTNING-desolder-leds.jpg "Pic of desoldered LEDs")

Now we'll get our LED pixels from our WS28xx strips

![alt text](/img/devices/VINDRIKTNING-ws28xx-pixels.png "Pic of 3 LEDs from a pixel strip")

We'll solder on some wires to the LED Strip

![alt text](/img/devices/VINDRIKTNING-ws28xx-solder.jpg "Pic of wires soldere on")

Adhere the LED strip to the PCB

![alt text](/img/devices/VINDRIKTNING-ws28xx-wired.jpg "Pic of pixel strip adhered to the PCB with wires")

To fit the new wires we'll want to modify the diffuser 

![alt text](/img/devices/VINDRIKTNING-trim-diffuser.png "Pic of diffuser trimmed")

Modify the lid to create enough space for the wires

![alt text](/img/devices/VINDRIKTNING-lid-trimmed.jpg "Pic of lid trimmed")


We'll screw the PCB back to the lid

![alt text](/img/devices/VINDRIKTNING-ws28xx-pcb-screwed-on.jpg "Pic of LED wires soldered")

Let's solder 

  - 5V wire from the pixel strip to the 5V pad on the PCB (Red Wire)
  - GND wire from the pixel strip to the GND pad on the PCB (Black Wire)
  - REST wire from the PCB will eventually go to the ESP dev board to read the PM2 sensor readings (Blue Wire)

![alt text](/img/devices/VINDRIKTNING-pcb-solder.jpg "Pic of the needed wires soldered to the PCB")

## Sensor board
<hr/>

We want to get a PCB dev board chunk to mount our sensors to

![alt text](/img/devices/VINDRIKTNING-addon-pcb.jpg "Pic of the bare pcb add on board")

Add the sensors to the board:

![alt text](/img/devices/VINDRIKTNING-addon-pcb-populated.jpg "Pic of the add on pcb with the sensors attached")

![alt text](/img/devices/VINDRIKTNING-addon-pcb-populated-pins.jpg "Pic of the add on pcb showing the sensor pins")

Let's solder

Populate the wires to the molex connector

![alt text](/img/devices/VINDRIKTNING-addon-pcb-wires1.jpg "Pic of the add on pcb showing wires going through the perf board")

Solder them to the pins of the molex connector
![alt text](/img/devices/VINDRIKTNING-addon-pcb-wires2.jpg "Pic of the wires soldered to the molex connector")

Solder the 3V wire to the VCC pins of the sensors
![alt text](/img/devices/VINDRIKTNING-addon-pcb-wire-3v.jpg "3V wires soldered to the sensor VCC pin")

Solder the Ground wire to the GND pins of the sensors
![alt text](/img/devices/VINDRIKTNING-addon-pcb-wire-gnd.jpg "Ground wires soldered to the sensor GND pin")

Solder the SCL wire to the SCL pins of the sensors
![alt text](/img/devices/VINDRIKTNING-addon-pcb-wire-scl.jpg "SCL wires soldered to the sensor SCL pin")

Solder the SDA wire to the SDA pins of the sensors
![alt text](/img/devices/VINDRIKTNING-addon-pcb-wire-sda.jpg "SDA wires soldered to the sensor SDA pin")

Here is the completed wiring of the sensor board
![alt text](/img/devices/VINDRIKTNING-addon-pcb-wire-done.jpg "Top of the completed wiring")

We need to find where we want to drill a hole in the case for the light to hit the LUX sensor

Dry fit the sensor add on board inside the case
![alt text](/img/devices/VINDRIKTNING-addon-pcb-dryfit.jpg "Pic of the sensor board inside the case")

Drill the hole in the case so the lux sensor can peek through
![alt text](/img/devices/VINDRIKTNING-lux-case-hole.jpg "Pic of the lux sensor hole in the case")

Line it up and use some hot glue to hold the add on sensor board in place
![alt text](/img/devices/VINDRIKTNING-sensor-board-hotglue.png "Pic add on sensor board hot glued into place")

## ESP Board Wiring
<hr/>

At this point we'll need to wire up the ESP chip

### QuinESP32 board

![alt text](/img/devices/VINDRIKTNING-quinesp32-wires.jpg "QuinESP32 wires soldered")

#### Pin Layout:

| GPIO |    Component | Description |
|------ |-------------|-------------|
|GPIO17	| WS28XX | 3 Controllable Pixels |
|GPIO16	| VINDRIKTNING | Ikea PM2 Sensor |
|GPIO19 | I2C SDA | I2C Sensors Chain SDA |
|GPIO18 | I2C SCL | I2C Sensors Chain SCL |
|VCC    | I2C 3V | I2C Sensor Chain 3V |
|GND    | Sensor Board | I2C Sensor Chain GND |
|GND    | VINDRIKTNING PCB | Ground for LED and PM2 sensor |
|5V     | VINDRIKTNING PCB | Powers the ESP chip off of the VINDRIKTNING PCB's USB-C port |

<br/>

#### Wiring Diagram:

![alt text](/img/devices/VINDRIKTNING-wiringdiagram-quinesp32.png "QuinESP32 wiring diagram")

### Wemos D1 Mini board

![alt text](/img/devices/VINDRIKTNING-wemosd1-wires.jpg "D1 wires soldered")

#### Pin Layout:

| GPIO |    Component | Description |
|------ |-------------|-------------|         
|GPIO13 / D7	| VINDRIKTNING | Ikea PM2 Sensor |
|GPIO2 / D4	| WS28XX | 3 Controllable Pixels |
|GPIO12 / D6 | I2C SDA | I2C Sensors Chain SDA |
|GPIO14 / D5 | I2C SCL | I2C Sensors Chain SCL |
|3V3    | I2C 3V | I2C Sensor Chain 3V |
|GND    | Sensor Board | I2C Sensor Chain GND |
|GND    | VINDRIKTNING PCB | Ground for LED and PM2 sensor |
|5V     | VINDRIKTNING PCB | Powers the ESP chip off of the VINDRIKTNING PCB's USB-C port |

<br/>

#### Wiring Diagram:
![alt text](/img/devices/VINDRIKTNING-wiringdiagram-d1mini.png "D1 mini wiring diagram")

### Wemos S2 Mini board

![alt text](/img/devices/VINDRIKTNING-s2-mini-wires.jpg "S2 wires soldered")

#### Pin Layout:

| GPIO |    Component | Description |
|------ |-------------|-------------|
|GPIO5 | I2C SCL | I2C Sensors Chain SCL |
|GPIO6 | I2C SDA | I2C Sensors Chain SDA |
|GPIO16	| WS28XX | 3 Controllable Pixels |
|GPIO18	| VINDRIKTNING | Ikea PM2 Sensor |
|3V3    | I2C 3V | I2C Sensor Chain 3V |
|GND    | Sensor Board | I2C Sensor Chain GND |
|GND    | VINDRIKTNING PCB | Ground for LED and PM2 sensor |
|VBUS     | VINDRIKTNING PCB | Powers the ESP chip off of the VINDRIKTNING PCB's USB-C port |

<br/>

#### Wiring Diagram:
![alt text](/img/devices/VINDRIKTNING-wiringdiagram-s2mini.png "S2 mini wiring diagram")


### LOLIN C3 Mini board

![alt text](/img/devices/VINDRIKTNING-c3-mini-wires.jpg "C3 wires soldered")

#### Pin Layout:

| GPIO |    Component | Description |
|------ |-------------|-------------|
|GPIO6 | I2C SDA | I2C Sensors Chain SDA |
|GPIO7 | I2C SCL | I2C Sensors Chain SCL |
|GPIO8	| WS28XX | 3 Controllable Pixels |
|GPIO10	| VINDRIKTNING | Ikea PM2 Sensor |
|3V3    | I2C 3V | I2C Sensor Chain 3V |
|GND    | Sensor Board | I2C Sensor Chain GND |
|GND    | VINDRIKTNING PCB | Ground for LED and PM2 sensor |
|VBUS     | VINDRIKTNING PCB | Powers the ESP chip off of the VINDRIKTNING PCB's USB-C port |

<br/>

#### Wiring Diagram:
![alt text](/img/devices/VINDRIKTNING-wiringdiagram-c3mini.png "C3 mini wiring diagram")



## Bench Test
<hr/>

Before cramming it all into the case pull it all out of the case connect it up and see if it all works.
LFMF (Learn from my fail) i've had sensors that were back and LED's that weren't working that took a ton more time and effort to fix once assembled.

![alt text](/img/devices/VINDRIKTNING-bench-test.jpg "Parts layed out and connected")

## Tasmota Settings

We can now configure tasmota to use these sensors.  Visit the console /cs? in the tasmota web interface.

Use the `template` command to create the template mapping out the GPIO pins we've used.

Then use the `module` command to select your newly created template

Once you've applied the template your sensors should show up

### QuinESP32 Template

```
template {"NAME":"VINDRIKTNING-QuinESP32-Multi-sensor","GPIO":[0,0,0,0,0,0,0,0,0,0,0,0,8096,1376,608,640,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"FLAG":0,"BASE":1}

module 0
```

![alt text](/img/devices/VINDRIKTNING-template-quinesp32.png "QuinESP32 Tasmota showing sensors")

### Wemos D1 Mini Template

```
template {"NAME":"VINDRIKTNING-D1-Multi-sensor","GPIO":[0,0,1376,0,0,0,0,0,640,7456,608,0,0,0],"FLAG":0,"BASE":18}

module 0
```

![alt text](/img/devices/VINDRIKTNING-template-d1mini.png "D1 Mini Tasmota showing sensors")

### Wemos S2 Mini Template

```
template {"NAME":"VINDRIKTNING-S2-Multi-sensor","GPIO":[0,0,0,0,0,608,640,0,0,0,0,0,0,0,0,0,1376,0,8096,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"FLAG":0,"BASE":1}

module 0
```

![alt text](/img/devices/VINDRIKTNING-template-s2mini.png "S2 Mini Tasmota showing sensors")

### LOLIN C3 Mini Template

```
template {"NAME":"VINDRIKTNING-C3-Multi-sensor","GPIO":[0,0,0,0,0,0,640,608,1376,0,8096,0,0,0,0,0,0,0,0,0,0,0],"FLAG":0,"BASE":1}

module 0
```

![alt text](/img/devices/VINDRIKTNING-template-c3mini.png "C3 Mini Tasmota showing sensors")

### Decouple dimmer and color changes from turning on the LEDs

If you did the modification of adding the WS28XX pixels then you'll want to decouple the dimming and color changes from automatically turning on the LEDs using the `SetOption20`.
The rules will be changing the colors all the time and we don't want it to turn on the LEDs when it does.  We'll control that with separately and it's explained later

```
SetOption20 1
```

### Rules or Berry Scripting
Now we want to control the LEDs to mimic the default behavior of the Ikea VINDRIKTNING.

![alt text](/img/devices/VINDRIKTNING-levels-table.png "Table of colors matched to the number of PM2 particles")

** Source of original image: https://www.airgradient.com/images/blog/aq-bands-ikea.jpg

If your compiled binary enabled berry scripting you can write a berry script to handle these changes.  This option if you are using an ESP32 chip.

If you want to make use of the default tasmota rules they will work too but not as smooth on color changes.  This option if you are using the D1 Mini or any ESP8266

![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) `This section is function but still needs polish.  If you have the skills to make the colors transition better please hit us up on discord and contribute your suggestions to make it better for everyone`


#### Tasmota Rules (Option 1 )

Turn LED off when LUX low:
```
Rule1 
    ON BH1750#Illuminance<20 
        DO Power1 0
    ENDON 
    ON BH1750#Illuminance>20 
        DO backlog Power1 1; dimmer0 50; 
    ENDON
```

Copy / pasteable version:

```
Rule1 ON BH1750#Illuminance<20 DO Power1 0 ENDON  ON BH1750#Illuminance>20 DO backlog Power1 1; dimmer0 50; ENDON
```

Now enable the rule:

```
Rule1 1
```

Change Color based on air quality:

```
Rule2
    ON VINDRIKTNING#PM2.5<35
        # Green / Good air quality
        DO backlog color2 2;dimmer0 25;
    BREAK
    ON VINDRIKTNING#PM2.5>85
        # Red / Bad quality
        DO backlog color2 1;dimmer0 25;
    BREAK
    ON VINDRIKTNING#PM2.5>35
        # Yellow / Low air quality
        DO backlog color2 805500;dimmer0 25;
    ENDON
```

Copy / Pasteable version:

```
Rule2 ON VINDRIKTNING#PM2.5<35 DO backlog color2 2;dimmer0 25; BREAK ON VINDRIKTNING#PM2.5>85 DO backlog color2 1;dimmer0 25; BREAK ON VINDRIKTNING#PM2.5>35 DO backlog color2 805500;dimmer0 25; ENDON
```

Enable Rule2

```
Rule2 1
```

#### Berry Script (Option 2 - Better)

Create new file `autoexec.be`:

```
def deal_with_pm25(value, trigger, msg)
  if value < 35
    tasmota.cmd('backlog color2 2;dimmer0 50')
  elif value < 85
    tasmota.cmd('backlog color2 805500;dimmer0 50')
  else
    tasmota.cmd('backlog color2 1;dimmer0 50')
  end
end

tasmota.add_rule("VINDRIKTNING#PM2.5", deal_with_pm25)

def nightmode(value, trigger, msg)
  if value < 20
    tasmota.cmd('power1 0')
  elif value > 20
    tasmota.cmd('power1 1')
  end
end

tasmota.add_rule("BH1750#Illuminance", nightmode)
```

## Assembly

Once you've gotten everything wired up, programmed and working on your bench.  Assemble it all back together

![alt text](/img/devices/VINDRIKTNING-lid-assembled.jpg "Lid of the sensor all assembled")

![alt text](/img/devices/VINDRIKTNING-lid-sensors-assembled.jpg "Lid of the sensor all assembled")

## Testing

To test the sensor I would take my soldering iron and burn some solder in rear of the sensor and wait.  You should see the colors of the LEDs change and it should reflect in the tasmota web UI with the numbers

If you cover the LUX sensor hole on the top you should see the LED turn off and the LUX readings drop to 0