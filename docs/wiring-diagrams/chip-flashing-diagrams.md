---
title: Chip Flashing Diagrams
description: Wiring diagrams for flashing Espressif and Beken Wi-Fi chips via serial USB, with form factor and pin-compatible module swap reference
image: /img/diagrams/Chip Flashing - ESP8266-12F.png
keywords: [esp8266, esp32, esp32-c3, bk7231n, beken, cb2s, cbu, esp-02s, esp-12f, flashing, wiring diagram, serial, usb, transplant, chip swap, realtek, rtl8710]
---

# Chip Flashing Diagrams

Found a Beken or Realtek chip inside your device and want to swap it out, or just need to flash it? These wiring diagrams and tables cover the most common Wi-Fi module form factors, who makes chips in each footprint, and which Espressif modules can be dropped in as a direct transplant.

:::tip
Instead of a physical chip swap you can also flash [ESPHome with Tuya Cloudcutter](https://digiblur.com/2024/12/13/tuya-cloudcutter-with-esphome-bk7231-how-to-guide-home-assistant) or [OpenBeken](https://github.com/openshwprojects/OpenBK7231T_App) directly onto the Beken chip with no soldering required.
:::

---

## 2S Form Factor

Small module. Pins differ between front and back pads. Some vertical mount boards expose and use both sides.

### Beken
| Module | Chip |
|---|---|
| CB2S | BK7231N |
| WB2S | BK7231T |

### Realtek
| Module | Chip |
|---|---|
| WR2 | RTL8710BN |
| WR2E | RTL8710BN |

### Espressif — Drop-in Transplant Options
| Module | Chip | Notes |
|---|---|---|
| TYWE2S | ESP8266 | Tuya's ESP8266 module in this footprint — flash directly, no swap needed |
| ESP-02S | ESP8266 / ESP8285 | Direct drop-in |
| ESP8685-WROOM-03 | ESP32-C3 | Direct drop-in |
| WT32C3-01N | ESP32-C3 | Direct drop-in |

---

## 2L Form Factor

Small module, same pads on both sides. The back side pad layout is compatible with 2S footprint boards. A 2L→2S transplant can be tricky — the 2L exposes pads along its edges for soldering while 2S does not, making it harder to get a clean result going the other direction.

### Beken
| Module | Chip |
|---|---|
| CB2L | BK7231N |
| WB2L | BK7231T |
| WB2L-M1 | BK7231T |

### Realtek
| Module | Chip |
|---|---|
| WR2L | RTL8710BN |
| WR2LE | RTL8710BN |

### Espressif — Drop-in Transplant Options
| Module | Chip | Notes |
|---|---|---|
| ESP-02S | ESP8266 / ESP8285 | Compatible via back-side pads |
| ESP8685-WROOM-03 | ESP32-C3 | Compatible via back-side pads |

---

## 3S / ESP-12F Form Factor

Large module with castellated edges. Most boards in this form factor do not use the bottom pad row.

### Beken
| Module | Chip |
|---|---|
| CB3S | BK7231N |
| CB3L | BK7231N |
| CB3SE | BK7231N |
| WB3S | BK7231T |
| WB3L | BK7231T |

### Realtek
| Module | Chip | Notes |
|---|---|---|
| WR3 | RTL8710BN | |
| WR3E | RTL8710BN | |
| WR3N | RTL8710BN | |
| WR3L | RTL8710BN | |
| WR3LE | RTL8710BN | |
| WBR3 | RTL8720CF | RTL8720CF has known stability concerns — community support is limited compared to RTL8710BN |
| CR3L | RTL8720CF | RTL8720CF has known stability concerns — community support is limited compared to RTL8710BN |

### Espressif — Drop-in Transplant Options
| Module | Chip | Notes |
|---|---|---|
| TYWE3S | ESP8266 | Tuya's ESP8266 module in this footprint — flash directly, no swap needed |
| ESP-12F | ESP8266 | May need 10K pull-up on EN & GPIO0, 10K pull-down on GPIO15 |
| ESP-12S | ESP8266 | Same resistor considerations as ESP-12F |
| ESP32-C3-12F | ESP32-C3 | Same resistor considerations as ESP-12F; GPIO2 & GPIO8 pulled high, GPIO9 pulled low for flash mode |
| ESP32-C5 | ESP32-C5 | Adds a Zigbee radio — harder to find and pricier; not all variants are bottom-row compatible |
| ESP32-C6 | ESP32-C6 | Adds a Zigbee radio — harder to find and pricier; not all variants are bottom-row compatible |

---

## CBU Form Factor

Larger square module.

### Beken
| Module | Chip |
|---|---|
| CBU | BK7231N |

### Realtek
| Module | Chip | Notes |
|---|---|---|
| WBRU | RTL8720CF | RTL8720CF has known stability concerns — community support is limited compared to RTL8710BN |

### Espressif — Drop-in Transplant Options
| Module | Chip | Notes |
|---|---|---|
| ESP32-C3-WROOM-06 | ESP32-C3 | Also sold as ESP8685-WROOM-06; requires 10K pull-up resistors on IO8 and IO9 for flashing |

---

## Beken Flashing Diagrams

### BK7231N — CB2S Format
The CB2S is a compact module found in many smart plugs, switches, and bulbs. It uses the BK7231N MCU running at 120 MHz with 2 MB flash and 256 KB RAM. Tap the CEN pin once every second while flashing until it connects.

![Beken BK7231N CB2S Flashing Diagram](/img/diagrams/Chip%20Flashing%20-%20BKN-CB2S.png "Beken BK7231N CB2S Format Flashing Diagram")

### BK7231N — CBU Format
The CBU is a larger square module found in smart bulbs and some switches. Same BK7231N MCU as the CB2S but with more available GPIO pins. Tap the CEN pin once every second while flashing until it connects.

![Beken BK7231N CBU Flashing Diagram](/img/diagrams/Chip%20Flashing%20-%20BKN-CBU.png "Beken BK7231N CBU Format Flashing Diagram")

---

## Espressif Flashing Diagrams

### ESP8266 — ESP-02S Format
The ESP-02S is a small form factor ESP8266 (ESP8285) module and a direct drop-in for CB2S and WB2S boards. CB2L and WB2L share the same back-side footprint, but the swap can be trickier since the 2L exposes pads on its edges while the ESP-02S does not. Pull GPIO-0 to GND during power-up to enter flashing mode.

![Espressif ESP8266 ESP-02S Flashing Diagram](/img/diagrams/Chip%20Flashing%20-%20ESP-02S.png "Espressif ESP8266 ESP-02S Format Flashing Diagram")

### ESP8266 — ESP-12F Format
The classic ESP8266 module. Pin-compatible with CB3S, WB3S, CB3L, WB3L, WBR3, and TYWE3S. May need 10K pull-up resistors on EN and GPIO0, and a 10K pull-down on GPIO15. Pull GPIO-0 to GND during power-up to enter flashing mode.

![Espressif ESP8266 ESP-12F Flashing Diagram](/img/diagrams/Chip%20Flashing%20-%20ESP8266-12F.png "Espressif ESP8266 ESP-12F Format Flashing Diagram")

### ESP32-C3 — 12F Format
The ESP32-C3-12F shares the same pad layout as the ESP-12F but upgrades to a 160 MHz RISC-V core with BLE 5 support. Same resistor considerations as the ESP-12F apply. When entering flash mode, GPIO2 and GPIO8 need to be pulled high while GPIO9 is pulled low. The development board can be used by holding the flash button to ground GPIO0.

![Espressif ESP32-C3 12F Flashing Diagram](/img/diagrams/Chip%20Flashing%20-%20ESP32-C3-12F.png "Espressif ESP32-C3 12F Format Flashing Diagram")

### ESP8685 / ESP32-C3 — WROOM-06 Format
The ESP8685 (also known as ESP32-C3-WROOM-06) is a pin-compatible replacement for the CBU module. Requires 10K pull-up resistors on IO8 and IO9 as shown in the diagram.

![Espressif ESP8685 ESP32-C3 WROOM-06 Flashing Diagram](/img/diagrams/Chip%20Flashing%20-%20ESP32-C3-WROOM-06.png "Espressif ESP8685 ESP32-C3 WROOM-06 Format Flashing Diagram")
