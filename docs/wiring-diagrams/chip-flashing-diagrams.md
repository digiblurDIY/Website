---
title: Chip Flashing Diagrams
description: Wiring diagrams for flashing Espressif and Beken Wi-Fi chips via serial USB with pin-compatible module cross reference
image: /img/diagrams/Chip Flashing - ESP8266-12F.png
keywords: [esp8266, esp32, esp32-c3, bk7231n, beken, cb2s, cbu, esp-02s, esp-12f, flashing, wiring diagram, serial, usb, transplant]
---

# Chip Flashing Diagrams

Found a Beken or Espressif chip inside your device?  These wiring diagrams show you exactly how to hook up a serial USB adapter and flash custom firmware.  If you found a Beken chip and want to swap it out for an Espressif module, use the cross reference table below to find the pin-compatible replacement that shares the same footprint — no board modifications needed.

## Pin-Compatible Swap Reference

The following modules share the same footprint and pinout so you can desolder one and drop in the other.  This is commonly referred to as an "ESP Transplant" or chip swap.

| Form Factor | Beken / Tuya Modules | Espressif Drop-in Replacements | Notes |
|---|---|---|---|
| 2S (small, pins differ front/back) | CB2S, WB2S, TYWE2S (BK7231N/T) | ESP-02S (ESP8266), ESP8685-WROOM-03 (ESP32-C3), WT32C3-01N (ESP32-C3) | Pins differ between front and back pads; some vertical mount boards use both sides |
| 2L (small, same pins both sides) | CB2L, WB2L (BK7231N/T) | ESP-02S (ESP8266), ESP8685-WROOM-03 (ESP32-C3) | Same pads on both sides; back side is compatible with 2S footprint, but 2L→2S swap can be tricky since 2L allows edge/bottom soldering while 2S does not |
| 3S / ESP-12F (large) | CB3S, WB3S, CB3L, WB3L, WBR3, TYWE3S (BK7231N/T) | ESP-12F (ESP8266), ESP-12S (ESP8266), ESP32-C3-12F (ESP32-C3), ESP32-C5 (Zigbee), ESP32-C6 (Zigbee) | ESP modules may need 10K pull-up on EN/GPIO0 and pull-down on GPIO15; C5/C6 add a Zigbee radio — neat option but harder to find and more costly; not all C5/C6 variants are bottom-row compatible, most 12F boards don't use the bottom row anyway |
| CBU (square) | CBU, WBRU (BK7231N/T) | ESP32-C3-WROOM-06 / ESP8685-WROOM-06 (ESP32-C3) | Pin-compatible replacement |
| WR2 | WR2, WR2E (Realtek) | ESP-02S (ESP8266), ESP8685-WROOM-03 (ESP32-C3) | Same footprint as 2S family |
| WR3 | WR3 (Realtek) | ESP-12F (ESP8266), ESP32-C3-12F (ESP32-C3) | Same footprint as 3S/ESP-12F family |
| BL-62B | BL-62B (BouffaloLab BL602) | ESP-12F (ESP8266), ESP32-C3-12F (ESP32-C3) | Same footprint as 3S/ESP-12F family |

:::tip
Instead of a physical chip swap you can also flash [ESPHome with Tuya Cloudcutter](https://digiblur.com/2024/12/13/tuya-cloudcutter-with-esphome-bk7231-how-to-guide-home-assistant) or [OpenBeken](https://github.com/openshwprojects/OpenBK7231T_App) directly onto the Beken chip with no soldering required.
:::

---

## Beken Modules

### BK7231N - CB2S Format
The CB2S is a compact module found in many Tuya smart plugs, switches, and bulbs.  It uses the BK7231N MCU running at 120 MHz with 2 MB flash and 256 KB RAM.  Tap the CEN pin when flashing once every second until it flashes.

![Beken BK7231N CB2S Flashing Diagram](/img/diagrams/Chip%20Flashing%20-%20BKN-CB2S.png "Beken BK7231N CB2S Format Flashing Diagram")

### BK7231N - CBU Format
The CBU is a larger square module commonly found in smart bulbs and some switches.  Same BK7231N MCU as the CB2S but with more available GPIO pins.  Tap the CEN pin when flashing once every second until it flashes.

![Beken BK7231N CBU Flashing Diagram](/img/diagrams/Chip%20Flashing%20-%20BKN-CBU.png "Beken BK7231N CBU Format Flashing Diagram")

---

## Espressif Modules

### ESP8266 - ESP-02S Format
The ESP-02S is a small form factor ESP8266 (ESP8285) module.  It is a direct drop-in for CB2S and WB2S modules.  CB2L and WB2L share the same back-side footprint, but the swap can be trickier since the 2L exposes pads on its edges while the ESP-02S does not.  Pull GPIO-0 to GND during power-up to enter flashing mode.

![Espressif ESP8266 ESP-02S Flashing Diagram](/img/diagrams/Chip%20Flashing%20-%20ESP-02S.png "Espressif ESP8266 ESP-02S Format Flashing Diagram")

### ESP8266 - ESP-12F Format
The ESP-12F is the classic ESP8266 module found in many smart home devices.  It is pin-compatible with the CB3S, WB3S, CB3L, WB3L, WBR3, and TYWE3S modules.  Pull GPIO-0 to GND during power-up to enter flashing mode.

![Espressif ESP8266 ESP-12F Flashing Diagram](/img/diagrams/Chip%20Flashing%20-%20ESP8266-12F.png "Espressif ESP8266 ESP-12F Format Flashing Diagram")

### ESP32-C3 - 12F Format
The ESP32-C3-12F shares the same pad layout as the ESP-12F but upgrades to a 160 MHz RISC-V core with BLE 5 support.  When flashing, GPIO2 and GPIO8 need to be pulled high while GPIO9 is pulled low.  The development board can be used by holding the flash button to ground out GPIO0.

![Espressif ESP32-C3 12F Flashing Diagram](/img/diagrams/Chip%20Flashing%20-%20ESP32-C3-12F.png "Espressif ESP32-C3 12F Format Flashing Diagram")

### ESP8685 / ESP32-C3 - WROOM-06 Format
The ESP8685 (also known as ESP32-C3-WROOM-06) is a pin-compatible replacement for the CBU module.  This module requires 10K ohm pull-up resistors on IO8 and IO9 as shown in the diagram.

![Espressif ESP8685 ESP32-C3 WROOM-06 Flashing Diagram](/img/diagrams/Chip%20Flashing%20-%20ESP32-C3-WROOM-06.png "Espressif ESP8685 ESP32-C3 WROOM-06 Format Flashing Diagram")
