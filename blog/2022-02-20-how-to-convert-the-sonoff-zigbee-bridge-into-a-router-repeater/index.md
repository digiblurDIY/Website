---
title: "How to Convert the Sonoff Zigbee Bridge into a Router / Repeater"
date: "2022-02-20"
categories: 
  - "zigbee"
  - "zigbee-bridge"
---

[![](https://blogger.googleusercontent.com/img/a/AVvXsEgqf6xsdplj4mb5TCZeGOJN3I3kb1DRcGq1E3hpWwHutCFCHH8hLuDjBMC9Crt3E070ZsaQsQXFf_ybZIudF8zGfHKS5uFy7ikxMHLunUbXNHbeYlQDxnLCK3eZKKb1ADJusVCrw6I6IZkEkw_HBGYSALdy7OH0EIXvo9Gky0hI-t0G7cCKSLEM0cVUOQ=w513-h417)](https://blogger.googleusercontent.com/img/a/AVvXsEgqf6xsdplj4mb5TCZeGOJN3I3kb1DRcGq1E3hpWwHutCFCHH8hLuDjBMC9Crt3E070ZsaQsQXFf_ybZIudF8zGfHKS5uFy7ikxMHLunUbXNHbeYlQDxnLCK3eZKKb1ADJusVCrw6I6IZkEkw_HBGYSALdy7OH0EIXvo9Gky0hI-t0G7cCKSLEM0cVUOQ=s883)

  

Do you have a [Sonoff Zigbee Bridge](https://amzn.to/3s16nqX) sitting in the drawer after switching over to the [CC2652 series coordinator](https://amzn.to/3h0h9HL)?  Don't toss it out!  Let's use it as a router/repeater to extend your Zigbee network!  If you haven't already converted it to open source with Tasmota check out [this article](/?p=48) first.  Already have Tasmota on it?  Let's go!

<!--truncate-->

Open a web browser to the Zigbee Bridge IP address once it is connected to your WiFi network. First, it's not a bad idea to upgrade the firmware on it to the latest stable build of Tasmota.  Verify your OTA URL is using the _tasmota-zbridge.bin_ file as it is **required** to upload the Zigbee Router firmware.  Use the Firmware Upgrade button on the GUI of the device. 

[![](https://blogger.googleusercontent.com/img/a/AVvXsEjyhJkVnX_c0hFujSOgggJvB2sJMjBxkEI5N_L3a7HJxhuJcG6IWzENRJ3ZyhiM75Ksrkx00UnV1aBRE_LltFMAvOLT319MkfrzKwnZYPHYtpgbjWySpzmcsGbAIdzxVJ9h5YSQSLh3RFTskkwnSV0i5ToOHtElDa3x6KfMMYtpzYbJzGr7M4ddI371Tw=w400-h260)](https://blogger.googleusercontent.com/img/a/AVvXsEjyhJkVnX_c0hFujSOgggJvB2sJMjBxkEI5N_L3a7HJxhuJcG6IWzENRJ3ZyhiM75Ksrkx00UnV1aBRE_LltFMAvOLT319MkfrzKwnZYPHYtpgbjWySpzmcsGbAIdzxVJ9h5YSQSLh3RFTskkwnSV0i5ToOHtElDa3x6KfMMYtpzYbJzGr7M4ddI371Tw=s381)

  

  

After it reboots into the latest version; click Configuration then Configure Module.  Select Sonoff ZbBridge (75) and **Click Save**.  If you do not see this module you need to upgrade to the tasmota-zbbridge.bin file version of Tasmota.

  

[![](https://blogger.googleusercontent.com/img/a/AVvXsEgp7sx4XTaUHqDNyDotpd-BrXQGZt0rb1hGOgs4NftsGiH5aa_n4Mr3n3yKnjEMSBSdPvaJNqRhl1QA_SOiIaKFaglDFRGNzgFX18YJ_HLU4WIUudGXcHGMimgiWxONt0HYPGG2hhsUCtO5popqzPMlJ-JTwUNjq8g4kqRPwtJfizPkn3au7AFId5WCVA=w406-h340)](https://blogger.googleusercontent.com/img/a/AVvXsEgp7sx4XTaUHqDNyDotpd-BrXQGZt0rb1hGOgs4NftsGiH5aa_n4Mr3n3yKnjEMSBSdPvaJNqRhl1QA_SOiIaKFaglDFRGNzgFX18YJ_HLU4WIUudGXcHGMimgiWxONt0HYPGG2hhsUCtO5popqzPMlJ-JTwUNjq8g4kqRPwtJfizPkn3au7AFId5WCVA=s399)

  

Download the [efr32mg21\_zigbee\_router\_signed-6.7.10.gbl.ota](https://github.com/digiblur/Tasmota/raw/development/zigbee_router/efr32mg21_zigbee_router_signed-6.7.10.gbl.ota) from Github (thanks xsp1989).  DO NOT right click and save as Github sends HTML files instead at times. 

  

Once the device reboots from Module selection above, click Firmware Upgrade; under "Upgrade by file upload" click Choose File and select the ota file downloaded from Github.  Click Start upgrade.

  

[![](https://blogger.googleusercontent.com/img/a/AVvXsEiwapIUxpBuuNbsfIPXccT1LjHxY1r08q4SLdMuFsWOTBvEUbnr0ooCe7fQ5XQxCO1SJv96OHtmHPx-CORkeGgxx1EtdI5NhZWGjkdcCX-3EtwV6RyIVX4djZPGboKJFQeqxKe4Zo4CgkLfP5NmI8BWORdhf2GwE622HJJx2pQMnjubFOChDSjFNtZO2w=s320)](https://blogger.googleusercontent.com/img/a/AVvXsEiwapIUxpBuuNbsfIPXccT1LjHxY1r08q4SLdMuFsWOTBvEUbnr0ooCe7fQ5XQxCO1SJv96OHtmHPx-CORkeGgxx1EtdI5NhZWGjkdcCX-3EtwV6RyIVX4djZPGboKJFQeqxKe4Zo4CgkLfP5NmI8BWORdhf2GwE622HJJx2pQMnjubFOChDSjFNtZO2w=s385)

  

Be patient, it can take a minute or two to finish before saying Successful.

  

[![](https://blogger.googleusercontent.com/img/a/AVvXsEiLOMvVwb0th7lhGAtBa64QzN28fKQvyRMbjlZYeYF4rDt99ABydUL4sz_eYZPfVgf_VxGjJaTPFotAXFlC1fh4OSz42DD2fxVQlyBdA0SYw3AtHUZPkhx2_bi1II4A-Urmws1G8xt8oNtmzTQWY8iGPRmdcIiUj5iQfbuZyPvy8oFuC2n_blIuxNmSNw=s320)](https://blogger.googleusercontent.com/img/a/AVvXsEiLOMvVwb0th7lhGAtBa64QzN28fKQvyRMbjlZYeYF4rDt99ABydUL4sz_eYZPfVgf_VxGjJaTPFotAXFlC1fh4OSz42DD2fxVQlyBdA0SYw3AtHUZPkhx2_bi1II4A-Urmws1G8xt8oNtmzTQWY8iGPRmdcIiUj5iQfbuZyPvy8oFuC2n_blIuxNmSNw=s401)

  

Once the Tasmota GUI is up again, click Consoles then Console.  Do not worry if you see an error about Zbstate something aborted.  This is good!  The router firmware is working!  

  

[![](https://blogger.googleusercontent.com/img/a/AVvXsEjEVl56XFcenUEvRQ45D0iHIDiL8Xz3iaCVTcqUkdJKqAa_5kqg3bAUH3iYZgMzII3zt4ezjZYrysZ20JGAdgCh3WFMPf3qCOQi3bhUijVIHH6lFonY4SvNIqm2aG3B4QauSKOb4sZizVHShHaDaToNR4V25RoW03ifZAokq3ciAzo-qLoeYJ8LnYpi-A=w443-h186)](https://blogger.googleusercontent.com/img/a/AVvXsEjEVl56XFcenUEvRQ45D0iHIDiL8Xz3iaCVTcqUkdJKqAa_5kqg3bAUH3iYZgMzII3zt4ezjZYrysZ20JGAdgCh3WFMPf3qCOQi3bhUijVIHH6lFonY4SvNIqm2aG3B4QauSKOb4sZizVHShHaDaToNR4V25RoW03ifZAokq3ciAzo-qLoeYJ8LnYpi-A=s595)

  

Next we need to enable the ability for the GUI and reset button to be used as the device pairing procedure.  Paste the following command into the console all on one line:

  
```
backlog template {"NAME":"Sonoff ZigRouter","GPIO":[320,5088,0,5120,257,256,0,0,0,576,0,0,32,0],"FLAG":0,"BASE":18} ; delay1 ; module 0
```
  

The bridge should reboot and come back up on the console.  The device is ready to be paired with your Zigbee network.  Go ahead and place it in the desired location of the home and power it up.  Enable pairing on your Zigbee Network as you would normally pair a regular sensor, switch, etc.  **NOTE:** Zigbee2MQTT users as of this time will need to add a custom file to support this router before pairing (see last section of this guide)

  

To place the device into pairing mode, simply use a paper clip to briefly push the reset button next to the USB power plug. 

  

[![](https://blogger.googleusercontent.com/img/a/AVvXsEjkJZeAfsG0xZOW8nnUpdlMfovbVP8saWRXPsKSAg_Tab1CESjX71Gy8ZMXaghVy24aLSveGqM02NyPsxIo1PlfQLt0f3vaPW7SFyydwJxpLDAyH8t2owhoEYUQx9A7DWK3CEsMBSrD0z5pnKaPCR6gG3B7-alwJUGqzFx9B97XWyS8-rEHKlCqBC3MOQ=w400-h344)](https://blogger.googleusercontent.com/img/a/AVvXsEjkJZeAfsG0xZOW8nnUpdlMfovbVP8saWRXPsKSAg_Tab1CESjX71Gy8ZMXaghVy24aLSveGqM02NyPsxIo1PlfQLt0f3vaPW7SFyydwJxpLDAyH8t2owhoEYUQx9A7DWK3CEsMBSrD0z5pnKaPCR6gG3B7-alwJUGqzFx9B97XWyS8-rEHKlCqBC3MOQ=s3573)

  

The green LED will light up.  Allow 5-6 seconds to pass and press the button again, this will turn off the green LED and the device will be in pairing mode.

  

[![](https://blogger.googleusercontent.com/img/a/AVvXsEhvsdOlHYBgQO1flOEal0ZnDX8BSA3v3IolM7pmvhsfi4qDzAxvVix3ACALFjIF-_xnue1VGirBmEoVFfsqRknp3qWqh84wxYDS4v7ciYoA3-Waf492s8iZuGiIdhQ0o3vOa3iddmwhNnJrT6LSK8XqG5oC_XcsCAyQsZipPTCHYWE91VZgxecBj2gOMw=s320)](https://blogger.googleusercontent.com/img/a/AVvXsEhvsdOlHYBgQO1flOEal0ZnDX8BSA3v3IolM7pmvhsfi4qDzAxvVix3ACALFjIF-_xnue1VGirBmEoVFfsqRknp3qWqh84wxYDS4v7ciYoA3-Waf492s8iZuGiIdhQ0o3vOa3iddmwhNnJrT6LSK8XqG5oC_XcsCAyQsZipPTCHYWE91VZgxecBj2gOMw=s3492)

  

ZHA Users should see something like this

  

  

[![](https://blogger.googleusercontent.com/img/a/AVvXsEikMUlOufvdjD0XcygdmSp-C0umT6CVNLxr-9l8y8nHdKPwGsGBmQ8FxsDK_hvZmYOEt6Fbdv1v_v778WJ0a7enDjMTer6KuLuoPEXuy2b01LvZ7AFT444E2NLnsmx32jePg56OiEczlGFVSU7lw6XVJIyIKgE7V07cvnb9LtjqU11HbXq66kw5ks_7Mg=s320)](https://blogger.googleusercontent.com/img/a/AVvXsEikMUlOufvdjD0XcygdmSp-C0umT6CVNLxr-9l8y8nHdKPwGsGBmQ8FxsDK_hvZmYOEt6Fbdv1v_v778WJ0a7enDjMTer6KuLuoPEXuy2b01LvZ7AFT444E2NLnsmx32jePg56OiEczlGFVSU7lw6XVJIyIKgE7V07cvnb9LtjqU11HbXq66kw5ks_7Mg=s745)

  

Another method of pairing is to press the "Toggle 1" button on the Tasmota GUI and leave it set to ON for 5-6 seconds then turn it back off.  This is the same as the reset button paper clip push method above. Toggle 2 is the Zigbee chipset reboot button, toggling it will reset the Zigbee chipset, do not leave it set to ON.

  

[![](https://blogger.googleusercontent.com/img/a/AVvXsEhu2GWSNZBaGvRRStpVgtg9sDB53PrPz_Su_-QoFjCuOZ8ra7s8lqA0tlL77J5MpegnDg8C-M5q-oDDgpcmEw_9yV7uSFqqtP_UWSizTXRkzE99XCpcBsrsHYwNHF9dQId8aQT65P3id7MSX1yIUoipyUCloUE9WQYrZNWbf925I8HfOAmNzSnZwFhSog=s320)](https://blogger.googleusercontent.com/img/a/AVvXsEhu2GWSNZBaGvRRStpVgtg9sDB53PrPz_Su_-QoFjCuOZ8ra7s8lqA0tlL77J5MpegnDg8C-M5q-oDDgpcmEw_9yV7uSFqqtP_UWSizTXRkzE99XCpcBsrsHYwNHF9dQId8aQT65P3id7MSX1yIUoipyUCloUE9WQYrZNWbf925I8HfOAmNzSnZwFhSog=s366)

  

  

**That's it! You now have another router on your network!  Congrats!  Check out our latest Zigbee Tips Video if you are bored enough....  [https://youtu.be/1dcAXkJxzcY](https://youtu.be/1dcAXkJxzcY)**

  

**Zigbee2MQTT Users** will need to download this [silabs.js](https://github.com/digiblur/Tasmota/blob/development/zigbee_router/silabs.js) file from Github, add it to their Z2M config folder, and add the custom converter to the configuration either via the GUI or YAML file.  This will not be necessary after the device is added into Z2M builds.  

  

[![](https://blogger.googleusercontent.com/img/a/AVvXsEi_LyBd8YCKK0bFmdPOTngQzd3QDg4ZTCzb0dGlZIlbsJyS3aPDbCs2-5oiJ0mgSdl0WdmojIoqfiDYIFELyZ0nf73HF-1PCVTYblIckvFQ1yAHSOCjHvYaxiflqpl-tblbsLAsN0rLg6IfnH-tpd94b36bHJGCkJAkgQRGkrHjS8I8sxvjPgo-_dopqQ=w460-h369)](https://blogger.googleusercontent.com/img/a/AVvXsEi_LyBd8YCKK0bFmdPOTngQzd3QDg4ZTCzb0dGlZIlbsJyS3aPDbCs2-5oiJ0mgSdl0WdmojIoqfiDYIFELyZ0nf73HF-1PCVTYblIckvFQ1yAHSOCjHvYaxiflqpl-tblbsLAsN0rLg6IfnH-tpd94b36bHJGCkJAkgQRGkrHjS8I8sxvjPgo-_dopqQ=s611)

  

  

[![](https://blogger.googleusercontent.com/img/a/AVvXsEgiDkN75oYS99gYf_pkNg7VG9VRAnE8KrFHf7gMm9gbjKnOxZCI-NFlf-XVakzXmM1hy27R9wDmSkhR1zGcXr2VEpUT1V9GcG6GkQ_-NCcBBK6_nkaj5oPxI1Z_qAY0-neT7IWNPQ1Ju9KSQZw4v-K1zX9h02li8fHbe-DGGSRaVrY1SBvRaC1ipwH5fg=w540-h429)](https://blogger.googleusercontent.com/img/a/AVvXsEgiDkN75oYS99gYf_pkNg7VG9VRAnE8KrFHf7gMm9gbjKnOxZCI-NFlf-XVakzXmM1hy27R9wDmSkhR1zGcXr2VEpUT1V9GcG6GkQ_-NCcBBK6_nkaj5oPxI1Z_qAY0-neT7IWNPQ1Ju9KSQZw4v-K1zX9h02li8fHbe-DGGSRaVrY1SBvRaC1ipwH5fg=s732)

  

Thanks to xsp1989 for building the firmware and Hedda's friendly nudging!

  

⚡Products We Use/Recommend

Amazon US - [https://amzn.to/2YZNDeO](https://amzn.to/2YZNDeO)  
Amazon UK - [https://amzn.to/2TnG2R4](https://amzn.to/2TnG2R4)  
Amazon CA - [https://amzn.to/2JWsNq5](https://amzn.to/2JWsNq5)  
  

⚡Be Social!⚡

Main Website: 🌐 https://digiblur.com/ 
Discord Chat: https://discord.com/invite/dgRZSw6 
Patreon: https://www.patreon.com/digiblurdiy 
Join YouTube: https://www.youtube.com/@digiblurDIY/videos  
Facebook: https://www.facebook.com/groups/digiblurdiy 
Instagram: https://www.instagram.com/digiblurdiy  
_Please note, the product links above could be affiliate links, using them could earn digiblurDIY a small commission of most purchases and helps with future video projects. Thank you!  As an Amazon Associate I earn from qualifying purchases._
