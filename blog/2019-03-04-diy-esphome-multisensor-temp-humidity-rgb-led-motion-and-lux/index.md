---
title: "DIY ESPHome Multisensor - Temp, Humidity, RGB LED, Motion and LUX"
date: "2019-03-04"
---

<iframe width="320" height="266" data-thumbnail-src="https://i.ytimg.com/vi/9Yu57vjz7AY/0.jpg" src="https://www.youtube.com/embed/9Yu57vjz7AY?feature=player_embedded" frameborder="0" allowfullscreen></iframe>

  
I built another multisensor for the bedroom and I decided to change up a few components.  Dive in and take a step by step approach to build it with Otto Winter's ESPHome software this time around as it's been a year since I built the initial Bruh Automation version.  ESPHome is easy to use and configure; No Arduino IDE, no coding, just a config file and the sensors wired up!   
  
**Parts List Used**   
[NodeMCU](https://amzn.to/2DqS4lb)  
[TSL2561 LUX](https://amzn.to/2URwvRH) Sensor  or [Sensor#2](https://amzn.to/2EfGwmk)  
[Jumper Wires](https://amzn.to/2UTDDNM)  
[AM312 Motion Sensor](https://amzn.to/2I5HJkg)  
[5mm Neopixel](https://amzn.to/2GlgtMX) or  [8mm Neopixel](https://amzn.to/2GlHb8a)  
[DHT22 Temp/Humidity](https://amzn.to/2I4isa7)  
  
**Sample ESPHome YAML** (replace the IP address and WiFi information)  
  
esphomeyaml:  
  name: sensor\_node1  
  platform: ESP8266  
  board: nodemcuv2  
  
wifi:  
  ssid: 'yourWIFIhere'  
  password: 'yourPASShere'  
  manual\_ip:  
    static\_ip: 10.10.1.40  change this IP and remove this message  
    gateway: 10.10.1.1  
    subnet: 255.255.255.0  
    dns1: 10.10.1.1  
    dns2: 10.10.1.1  
     
\# Enable logging  
logger:  
  
\# Enable Home Assistant API  
api:  
  
ota:
  platform: esphome
  
sensor:  
  - platform: dht  
    pin: D7  
    model: dht22     
    temperature:  
      name: "SenseNode Temp"  
    humidity:  
      name: "SenseNode Humidity"  
    update\_interval: 30s  
  - platform: tsl2561  
    name: "SenseNode LUX"  
    address: 0x39  
    update\_interval: 5s     
     
binary\_sensor:  
  - platform: gpio  
    pin: D6  
    name: "SenseNode Motion"  
    device\_class: motion  
    on\_press:  
      then:  
        - light.turn\_on: ESPD4led     
    on\_release:  
      then:  
        - light.turn\_off: ESPD4led     
light:  
  - platform: fastled\_clockless  
    chipset: WS2812  
    pin: D3  
    num\_leds: 1  
    rgb\_order: RGB  
    name: "SenseNode LED"  
  - platform: binary  
    name: "SenseNode D4Led"  
    output: D4led  
    id: ESPD4led  
     
i2c:  
  sda: D2  
  scl: D1  
  scan: False  
   
output:  
  - platform: gpio  
    pin: D4  
    id: D4led  
    inverted: True  
  
**3D Cases Used**  
[https://www.thingiverse.com/thing:2361388](https://www.thingiverse.com/thing:2361388)  
[https://www.thingiverse.com/thing:2477685](https://www.thingiverse.com/thing:2477685)  
  
Huge shout out to Bruh Automation for starting me on this ESP8266 journey on the first version of this multisensor a year ago.
