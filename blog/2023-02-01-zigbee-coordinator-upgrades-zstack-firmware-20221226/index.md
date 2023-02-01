---
title: "Zigbee Coordinator Upgrade - ZStack 20221226 Released"
date: "2023-02-01"
categories: 
  - "zigbee"
description: ZStack Firmware 2022-12-26 has been released as stable.  Improving peformance and reliability on large networks and more.
image: /img/thumbs/zigbee-zstack-upgrade.jpg
keywords: [zstack, cc2652 upgrade, zigbee2mqtt upgrade, koenkk zigbee]
authors: digiblur
---

Koenkk, the great mastermind behind Zigbee2MQTT and the Z-Stack firmware that runs on the various Zigbee Coordinators, has released a new updated firmware for the CC2652/CC1352 series chipsets.  This firmware is for both Zigbee2MQTT and Home Assistant ZHA users.  The changelog is as follows:
* Improve performance/reliability for larger network (100+ devices)
* Increase request retry attempts
* Increase routing table sizes
* SimpleLink SDK 6.10.01.01 [changelog](https://software-dl.ti.com/simplelink/esd/simplelink_cc13xx_cc26xx_sdk/6.10.01.01/exports/changelog.html)  
(https://github.com/Koenkk/Z-Stack-firmware/tree/Z-Stack_3.x.0_coordinator_20221226/coordinator/Z-Stack_3.x.0/bin)

This update includes the various Ti based coordinators such as the [Sonoff Dongle-P](https://amzn.to/3Dveu4E), [Athom USB/Ethernet](https://s.click.aliexpress.com/e/_DCRNAJh), [Tubes USB/Ethernet](https://tubeszb.com/collections/coordinators), [Zigstar](https://zig-star.com/), [Electrolama](https://shop.electrolama.com/collections/usb-rf-sticks/products/zzh-multiprotocol-rf-stick), and [others](https://www.zigbee2mqtt.io/guide/adapters/).  

## Should I upgrade?

The old saying of if isn't broke then don't fix it definitely applies here for the average Zigbee network sizes.  I have a mixture of various Zigbee devices of around 50 devices and I've been running this firmware in beta for a few weeks without any issues.  I'm using a CC2652P2 based Sonoff Dongle-P USB coordinator with Zigbee2MQTT.  Several Home Assistant ZHA users on the Github testing thread have also reported no issues during the beta period.  Give it a whirl if you want to, you can always downgrade if you think it is causing issues.  

## How do I upgrade?

Would you like a video to help walkthrough the processes?  If not, skip the video and Jump to the - digiblurDIY [How to Upgrade Zigbee Coordinators Page](/wiki/zigbee/how-to-upgrade-zigbee-coordinator)

<iframe allowfullscreen height="353" src="https://www.youtube.com/embed/4S_c_m6z-RY" width="625" youtube-src-=""></iframe>   




