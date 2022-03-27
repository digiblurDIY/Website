---
id: how_to_flash_esp32
title: ESP32 Flashing 
---
# How to Flash an ESP32 with Tasmota

#### Esptool.py via full Tasmota factory bin

```
esptool.py --chip esp32 --baud 460800 --before default_reset --after hard_reset write_flash -z 0x0 <buildname>.factory.bin
```

