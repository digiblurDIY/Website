---
title: Geekom Mini IT12 Teardown and Review - i7-1260P - Time to learn Proxmox?
date: "2023-12-27"
description: Complete Teardown and Review of the Geekom IT12 Mini PC - i7-1260P 
image: images/geekom_it12_thumb.jpg
categories: 
  - "mini pc"
keywords: [mini pc, intel nuc, i7-1260p review, geekom review, geekom mini pc]
authors: digiblur
---
![alt text](images/geekom_it12_thumb.jpg)

I have used a Geekom Mini PC, or as some people call them NUCs but that's term that seems have caught on like everyone calls tissues, Kleenex.  So back to it, my previous model i5 8th Gen runs my various ADSB and video transcoding docker containers on a Debian OS for a couple years now without issue.  This newer model packs a bigger punch bringing an i7 12th Gen to the table, more than doubling the performance.  

Geekom did send this product for review but no funds were exchanged for this review and the opinions and thoughts are purely mine without any editorial review.  I mean how many things I did spell wrong?

Specs wise in the model I received are as follows:

* i7-1260P CPU/iGPU  
* 2x8GB DDR (16GB total)  
* 512GB NVME  
* Intel Wi-Fi 6E AX211 with Bluetooth 5.2  
* Intel i255-V 2.5 gigabit Ethernet  
* Windows 11 Pro Pre-Installed  

Purchase yours from [Geekom Directly](https://shrsl.com/4cx02) or on [Amazon](https://amzn.to/47ewo7I) (affiliate links)

During my testing I used Windows 11, but I did re-install it fresh from a legit copy from Microsoft's site.  Nothing against Geekom, as even if I had a brand-new mainstream Dell computer, I would still load my own fresh copy of Windows.  Being the powerhouse this thing is, it is stupid fast to boot up Windows in seconds and handle all your regular desktop PC tasks with ease.  I did have one issue with the CPU throttling during testing. This might be due to the processor model itself but I do not have another exact model to test it against for comparison.  More about this in the screenshots towards the end of the article.

Would I use this with [Home Assistant OS](https://www.home-assistant.io/)?  LOL  Probably not as it would be a major waste of CPU, it sure would compile an ESP32 bin on ESPHome crazy fast though!  What would I use this for if I was not going to do the typical Windows desktop thing?  One killer use would be a media player and mount it behind a TV and use a wireless pointer mouse, but many might argue that Roku or other [Google TV](https://amzn.to/3GXdyqP) options are much cheaper.  The real usage that I believe several of us would agree on, use it with a Linux build of some sort!  Proxmox to do all the things or even just running Debian on it with Docker Compose to handle all of your self-hosting needs.

My use case for this?  I believe it is time to dive into Proxmox again, it has a been a few years since I have dabbled in it and I feel this would be perfect to learn more about Proxmox.  Where's [tteckster](https://tteck.github.io/Proxmox/) when I need him?!

### Power Usage

Being a mobile style processor I was pretty impressed with the power usage.  Inside Windows Measured with a [Kill A Watt Meter](https://amzn.to/3tnsDz6)

| State | Watts |
|------ |-------------|    
| Off/Sleeping | 1.6 watts |
| Idle at Windows Desktop | 7 watts |
| Processing Video via iGPU | 35 watts | 
| Crunching Video via CPU | 73 watts |
| Crunching Video via CPU After Throttling | 43 watts |

Let's look at some teardown/guts pics and then some more words and stuff... because it's Cool & Stuff

Read more  👉👇
<!--truncate-->

## Teardown Pics

![alt text](images/P1000386.webp)

![alt text](images/P1000390.webp)

![alt text](images/P1000391.webp)

![alt text](images/P1000392.webp)

I do like the power supply specs being listed on the bottom!  Prevents me from being an idiot again and mixing up power supplies

![alt text](images/P1000394.webp) 
![alt text](images/P1000394a.webp)


![alt text](images/P1000394b.webp)

Intel AX211 for 6hz(6E)/5ghz/2.4ghz Wi-Fi and Bluetooth

![alt text](images/P1000400.webp)
![alt text](images/P1000396.webp)

3.5 inch SATA storage in the lid

![alt text](images/P1000398.webp)

Nice to see some decent name brands of memory and NVME instead of some brand you never heard of.

![alt text](images/P1000405.webp)

Top of the case with the top popper off

![alt text](images/P1000407.webp)

CPU Cooler

![alt text](images/P1000412.webp)

Fan pulled over to expose the CPU heat pipe and CMOS battery

![alt text](images/P1000413.webp)
![alt text](images/P1000414.webp)
![alt text](images/PXL_20231214_040054547.webp)
![alt text](images/PXL_20231214_040126601.webp)

Fan put back in the original resting place, the heat exhausts out of the rear

![alt text](images/PXL_20231214_040205985.webp)
![alt text](images/PXL_20231214_040217032.webp)
![alt text](images/PXL_20231214_041829991.webp)

External Power Supply

![alt text](images/PXL_20231214_041851045.webp)

Mounting plate for use on a screen/TV

## BIOS & Windows

![alt text](images/windows.png)

![alt text](images/cpuz.png)

![alt text](images/PXL_20231219_035655803.webp)

BIOS Screenshot - Do not expect the normal BIOS advanced options, they seem to have removed all of that except for your normal boot priority type settings.

## Benchmarks

![alt text](images/passmark.png)

![alt text](images/geekbench.png)

![alt text](images/geekbench_gpu.png)

## Throttling

I did notice after running some tests they would start out fast but after 5-10 seconds the CPU would overheat and start to throttle itself.  Starting the CPUZ test you can see it would be higher

### Not Throttled

![alt text](images/not_throttled.png)
![alt text](images/not_throttled_hw.png)

### Throttled

![alt text](images/throttled.png)
![alt text](images/throttled_hw.png)

## Handbrake

The throttling was really evident with Handbrake converting some 4K60 video into H265 via CPU only.  It would start out at 18FPS then drop to 10 FPS or so.  

### Not Throttled

![alt text](images/handbrake_not_throttled.png)

### Throttled

![alt text](images/handbrake_throttled.png)

### via iGPU

Of course processing the video via iGPU is the better choice at 85 FPS and also dropping the power usage down to 35 watts instead of 45 watts(throttled)

![alt text](images/handbrake_igpu.png)

Thanks to Geekom for sending this unit for review!  








