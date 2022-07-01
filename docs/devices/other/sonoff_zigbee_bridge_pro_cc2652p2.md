# Sonoff Zigbee Bridge Pro ESP32 CC2652P2

### Overview 
Flash Tasmota on the ESP32 - Removes dependency of the cloud and Ewelink app  
Flash ZStack Firmware on the CC2652 Chipset - Enable usage for ZHA or Zigbee2MQTT  
Configure Tasmota for Passthrough Serial  
Setup ZHA or Zigbee2MQTT to use the device  

Keep in mind this is a WiFi based device, a solid WiFi network is recommended combined with a Zigbee channel and WiFi channel that is not stepping on each causing self interference.  The USB Based CC2552 or Ethernet models are highly recommended.

![alt text](/img/zigbee_channels.png "Zigbee Channels")

## 1. Flash Tasmota

### Remove the 4 screws under the rubber caps

### Pull the board out and find the 3V3, RX, TX, GND, GPIO 0 holes


