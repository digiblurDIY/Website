---
title: "Shelly Plug US with Power Monitoring - First Look"
date: "2020-08-20"
categories: 
  - "flash-tasmota"
  - "homeassistant"
---

 [![](images/00100lrPORTRAIT_00100_BURST20200819141355240_COVER.jpg)](https://1.bp.blogspot.com/-3paCyewT_fc/Xz19-8oZtUI/AAAAAAAEd4c/XRoVZ39uga8tNwEU28WP432hR6K_OhcSwCLcBGAsYHQ/s2904/00100lrPORTRAIT_00100_BURST20200819141355240_COVER.jpg)

  

UPDATE: Full video review/setup an issue or two I found - [https://youtu.be/\_TSJB\_IzxG0](https://youtu.be/_TSJB_IzxG0)

  

If you are familiar with the Shelly devices from the Shelly1 to Shelly 2.5, etc this might be old hat for you.  They are 120VAC power, 15A smart plugs with power monitoring!  Local control options right out of the box.  No flashing, no Tuya Convert, etc. required.  If you are thinking at first glance you might have seen this plug before, you might not be wrong.  Subscribe and enable notifications for the [digiblurDIY YouTube](https://www.youtube.com/digiblurDIY) channel to catch an upcoming video on it.

  

Purchase from the [ShellyUS Store](https://bit.ly/2QlEGWx) - [2 Pack US Plugs](https://bit.ly/2YcSVRC) (use the 10% off coupon of travis10)

  

There are a few things they got right and few things they didn't get right unfortunately.  For starters the design is a plus, it doesn't block the second plug.  You can put two of these on the same outlet with ease.  Power monitoring is another huge plus!  Great for those washer and gas dryer notifications on the laundry which is still one our favorite automations to this day.  The software that comes with the [ShellyPlugUS](https://shopusa.shelly.cloud/shelly-plug-us-two-pack-wifi-smart-home-automation-1?tracking=hWYa3wkmANWQWaLcM8r4S3mpUjjqYMfS) is open and welcomes developers.  You can opt to use their cloud or if you are like me and don't care for their app much, I just add it to my network using the AP mode and enable MQTT on it.  And last but not least, you can easily upgrade this to Tasmota or ESPHome.  Yes!  I said upgrade as there are some issues with the stock firmware that I will explain shortly.  

  

So what's the bad?  Flip it over to the back....

  

[![](images/IMG_20200819_201900.jpg)](https://1.bp.blogspot.com/-KTE9y7X0P4w/Xz3SPA-yewI/AAAAAAAEd6g/06yY_XF0syQLmRXsTk6XYYqeuYI2LbOGQCLcBGAsYHQ/s1990/IMG_20200819_201900.jpg)

  

Notice something missing? No screws and no pin header!  C'mon Shelly!  Don't forget your roots, that's why you have so many die hard fans.  You had an opportunity to knock the Sonoff S31 plug off the throne of "the" go to power monitoring plug for the DIY crows but you blew it.

  

**So about that stock firmware...**

  

[![](images/shellyplug_main.PNG)](https://1.bp.blogspot.com/-x9xBOFXFtKc/Xz3QqwXdq2I/AAAAAAAEd6M/KJ0-eX-jEsI7FXwRl6IR6QDosv0qkqiUACLcBGAsYHQ/s960/shellyplug_main.PNG)

  

The web interface is the same one you are used to, power monitoring was right on point.  I plugged in a 60 watt bulb and my Kill-a-watt meter also agreed it was 57 watts.  Sadly no amps, no volts, etc. but we will get to that.  

  

[![](images/shelly1us_mqtt.PNG)](https://1.bp.blogspot.com/-vKn4g_HIwL4/Xz3StNFo4hI/AAAAAAAEd6s/ATnYDM7wCkMk9AJXQqPWnxpQBsPgF77LwCLcBGAsYHQ/s835/shelly1us_mqtt.PNG)

  

Enabled MQTT and put in our broker information.  I kept it default and didn't choose retain to see how things worked.  Unfortunately it doesn't even retain the online presence in MQTT and didn't seem to fully support LWT (Last Will and Testament).  I enabled retain and tried again.  The only thing it retained was the state of the plug and energy information.  That's definitely a problem if it doesn't properly support one of the fundamentals of MQTT.  

  

`<table align="center" cellpadding="0" cellspacing="0" style="margin-left: auto; margin-right: auto;"><tbody><tr><td style="text-align: center;"><a href="https://1.bp.blogspot.com/-_EonDmCR6xc/Xz3UVIIpW9I/AAAAAAAEd68/McUTEYfKOh8jFpVfMamnb_TxlbY7fVsrACLcBGAsYHQ/s1007/shellyus_mqtt_data.PNG" style="margin-left: auto; margin-right: auto;"><img border="0" data-original-height="491" data-original-width="1007" height="312" src="images/shellyus_mqtt_data.PNG" title="MQTT info" width="640"></a></td></tr><tr><td style="text-align: center;"><span style="text-align: left;">MQTT info</span></td></tr></tbody></table>`

  

[  
![](images/shellyus_mqtt_retain_example.PNG)](https://1.bp.blogspot.com/-NQPU4saca_A/Xz3UVIoCk4I/AAAAAAAEd64/_5WgPh5_s6cUGiQZK2UFBJuUzHtyDlGuQCLcBGAsYHQ/s1006/shellyus_mqtt_retain_example.PNG)

  

Take for instance a Tasmota device shown above.  It has a retained message on plug\_lamp1 as the MQTT broker dropped the Offline message after the Tasmota device fell from the network.  This allows anything else that connects to MQTT such as HomeAssistant to see that the device is offline and not allow the user to interact with it.  The stock Shelly firmware seems to be broken in this aspect.  

### Upgrade to Tasmota

So how do we fix this?!?  We upgrade it to [Tasmota](https://github.com/arendst/Tasmota) which also adds a ton of additional features!  It is simple!  All you need is your web browser.  I discussed the process in this [video](https://youtu.be/_oRr8FZyyQ0) and it is documented in this [Github](https://github.com/yaourdt/mgos-to-tasmota) with the link to use for the ShellyPlug US upgrade.

  

<iframe allowfullscreen height="266" src="https://www.youtube.com/embed/_oRr8FZyyQ0" width="320" youtube-src-=""></iframe>

  

If you followed the video or did it based off the Github link, please make sure you use the firmware upgrade menu to upgrade Tasmota via the web to the latest and greatest release.  This will enable all the features necessary such as PowerDelta and many others.  

  

Go to the Console page and paste in the following on one line and hit enter:

  

_backlog module 0 ; template {"NAME":"ShellyPlugUS","GPIO":\[52,255,57,255,21,134,0,0,131,17,132,157,0\],"FLAG":0,"BASE":45}_ 

Give it a few seconds and it will reboot and the console will refresh.  Paste the following in on one line:

  

_rule1 on power1#state do backlog ledpower1 %value%; ledpower2 %value% endon on power1#boot do backlog ledpower1 %value%; ledpower2 %value% endon_

  

Then you need to enable the rule that sets the red/blue status lights with one last command:

  

_rule1 1_

Hit the Main Menu button and you should be greeted with something like this:

  

[![](images/shellyplug_tasmota_bulb.PNG)](https://1.bp.blogspot.com/-bHLStflvMU0/Xz3ahPMndII/AAAAAAAEd7U/wVyfnC9bAiQlknlAciF4mGvqfcnxYJ63QCLcBGAsYHQ/s482/shellyplug_tasmota_bulb.PNG)

  

  

I did notice the energy calibrations were some what close right out of the gate.  I typically use an incandescent 60w light bulb to set the 3 calibrations.  If you have Kill-a-Watt meter or other devices with known loads you can use that to tweak your calibrations.  

  

In order to easily calibrate your device with a 60 watt bulb I first check my house voltage with another plug/device or a volt meter.  Then I issue the following commands separately on console:

  

_powerset 60_

_currentset 500_

_voltageset 122_

"powerset 60" for 60 watts, currentset 500 for 0.500 amps and voltageset 122 for the 122 volts found during this test.  As I mentioned before my bulb was showing 57 watts, using a voltage/amps/watts calculator to get it exact I would use 122V, 57W, and 0.467 amps.

### Add it to Home Assistant

Go to Configuration, Configure MQTT. 

  

[![](images/mqtt_config.PNG)](https://1.bp.blogspot.com/-l1eKj0YadFQ/Xz3buDp3knI/AAAAAAAEd7k/89qEXq8quhA4zSYYTwf3nEKz2v7tjJvHQCLcBGAsYHQ/s639/mqtt_config.PNG)

  

Enter in your MQTT IP, User and Password.  Change the Topic to a unique name that resembles the device.  Save it.  Go to Configuration, Configuration Other and set the Device Name and Friendlyname to something user friendly such as "Living Room Lamp".  Save it.  Return to the Tasmota Console enter in the following command:

  

_setoption19 1_

This will enable Auto Discovery and pull right into HomeAssistant **without** any YAML editing.  All you need to do is go to your HomeAssistant MQTT integration to use the device.  Enjoy!  

  

[![](images/shellyplug_inHA.PNG)](https://1.bp.blogspot.com/-1cl4MoRSxGM/Xz3hwmA1YoI/AAAAAAAEd7w/YItBgLDwzjccBYEe3vtuG0BWjbv1pJRwgCLcBGAsYHQ/s759/shellyplug_inHA.PNG)

  

  

Stay tuned for my upcoming video on a few comparisons of this device... if you think you've seen this plug before you might not be wrong.  Hmmm.....

  

Purchase from the [ShellyUS Store](https://bit.ly/2QlEGWx) - [2 Pack US Plugs](https://bit.ly/2YcSVRC) (use the 10% off coupon of travis10)

  

Be sure to check us out on [YouTube](https://www.youtube.com/digiblurDIY) and [Discord](https://discord.gg/bNtTF2v) if you have any questions.  

  

**Products We Use/Recommend**

Amazon US - [https://amzn.to/2YZNDeO](https://amzn.to/2YZNDeO)

Amazon UK - [https://amzn.to/3gVLiFZ](https://amzn.to/3gVLiFZ)

Amazon CA - [https://amzn.to/2HchPZe](https://amzn.to/2HchPZe)

  

Discord Chat - [https://discord.gg/bNtTF2v](https://discord.gg/bNtTF2v) 

Patreon -  [https://www.patreon.com/digiblurDIY](https://www.patreon.com/digiblurDIY)

  

Links to products provided by the ShellyUS Store and Amazon Affiliate program.
