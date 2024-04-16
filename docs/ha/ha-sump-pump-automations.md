# Sump Pump Cycle Counting Automations

In this guide, we'll walk you through setting up cycle counting for your pump, allowing you to track its usage and receive notifications when needed. Major hat-tip to the awesome Jim from PA for the intial legwork on this process and for sharing it with many.

## Parts

[Shelly PM Mini G3](https://amzn.to/3W1CiHk) Super small, relay-less, in-line power monitor. Easy to fit in most receptable work boxes.
[Sonoff S31](https://amzn.to/3WG3cBG) The classic Tasmota/ESPHome power monitoring plug. Note the 15A relay inside and configure it accordingly so it's ALWAYS ON. Visit the [S31 Device Page](https://digiblur.com/wiki/devices/plugs/sonoff_s31) for more details on flashing or configuring.

Note that any other power monitoring solution such as a [CircuitSetup](https://circuitsetup.us/product-category/power-management/?v=3e8d115eb4b3) or [Emporia Vue](https://digiblur.com/2024/03/14/emporia-vue-gen3-esp32-esphome-home-assistant) can also work.

Links to products provided through the Amazon Affiliate program. As an Amazon Associate I earn from qualifying purchases.


## Get the Entity ID
Before you begin, you'll need to determine the entity ID for the power monitoring item you want to track.
Go to Settings > Devices and service and click on Entities at the top.
Find the sensor that reports power usage for the device.
Note the Entity ID listed
![alt text](/img/procedures/sump_01_shellypowersensorentity.png "Find the sensor entity id")

Click the power entity in the list and click "Show more" to open the device's history.
Narrow down the window to a few hours and observe the energy usage pattern when the pump is running to determine the threshold value you wish to use to trigger the counter.
Note: The Shelly PM Mini reports in watts, and my pump is measuring around 70-80W on startup up to about 800W at the peak, so I'm using 100 as my threshold.
![alt text](/img/procedures/sump_02_sumpusagewatts.png "screenshotof watts used")


## Create the Counter Helper
Go to Settings > Devices & services
Click on Helpers at the top
Click Create Helper and choose "Counter"
Give it a name, choose an icon and click Create.
![alt text](/img/procedures/sump_03_createcounterhelper.png "screenshot of creating counter")
Open the newly created counter helper and click on the gear icon.
Make a note of the Entity ID of the Counter (should be counter.whatever_you_used with underscores in place of any spaces)
![alt text](/img/procedures/sump_04_counterhelperentityid.png "screenshot of where to find the entity ID of the counter")


## Create the Automation to Count Cycles
Go to Settings > Automations and scenes
Click Create Automation
Click Create new automation to start from scratch
Click the three dot icon a the top right and switch to "Edit in YAML"
Paste in the example code, adjusting the entity IDs, 'above' and 'for' values to the ones for your install. You can also paste the automation as-is, then switch back to the visual editor to lookup your sensor/counter.
In this example, we are looking for above 100 watts for more than 5 seconds.

```yaml
alias: Sump Pump Cycle Count
description: Increments a cycle counter each time power usage is above the threshold
trigger:
  - platform: numeric_state
    entity_id: sensor.shellypmminig3_84fce639a9c8_power
    above: "100"
    for: "00:00:05"
condition: []
action:
  - service: counter.increment
    data: {}
    entity_id: counter.sump_pump_cycle_count
mode: single
```

## Create the Automation to Reset the Cycle Count Daily
Go to Settings > Automations and scenes
Click Create Automation
Click Create new automation to start from scratch
Click the three dot icon a the top right and switch to "Edit in YAML"
Paste in the example code, adjusting the entity IDs, 'above' and 'for' values to the ones for your install.

```yaml
alias: Sump Pump Cycle Count Reset at Midnight
description: "resets the referenced counter daily at midnight"
trigger:
  - platform: time
    at: "00:00:00"
condition: []
action:
  - service: counter.reset
    data: {}
    entity_id: counter.sump_pump_cycle_count
mode: single
```

## Bonus Alert Automation!
I've also created a push notification for when the pump runs longer than it should. In my case, the pump usually runs for about eight seconds each cycle, so if it runs for more than two or three times that, I want to know!

Go to Settings > Automations and scenes
Click Create Automation
Click Create new automation to start from scratch
Click the three dot icon a the top right and switch to "Edit in YAML"
Paste in the example code, adjusting the entity IDs, 'above' and 'for' values to the ones for your install.

```yaml
alias: Sump Pump Power Notice
description: ""
trigger:
  - platform: numeric_state
    entity_id:
      - sensor.shellypmminig3_84fce639a9c8_power
    for:
      hours: 0
      minutes: 0
      seconds: 20
    above: 100
condition: []
action:
  - service: notify.mobile_app_my_phone_name
    metadata: {}
    data:
      message: Sump Pump runtime longer than expected. Check for stuck float.
mode: single
```

That's it! Go enjoy your cool-and-stuff counters and graphs!
![alt text](/img/procedures/sump_05_counterweeklygraph.png "screenshot of daily counts for a week")
![alt text](/img/procedures/sump_06_countercard.png "dashboard screenshot of sump pump entities")