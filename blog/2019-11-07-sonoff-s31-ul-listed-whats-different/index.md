---
title: "Sonoff S31 - UL Listed - What's different?"
date: "2019-11-07"
categories: 
  - "sonoff-certification"
  - "sonoff-s31"
  - "sonoff-s31-lite"
  - "sonoff-s31-ul"
  - "sonoff-ul-listed"
---

  
I recently picked up the [Sonoff S31](https://amzn.to/2p1jU4o) and [Sonoff S31 Lite](https://amzn.to/32qnnqT) smart plugs that are UL Listed.   They new S31's bear the UL listed logo on the box and the back of the unit itself.  Let's crack them open and see what makes them tick.  
  

[![](images/IMG_20191103_123838.jpg)](https://1.bp.blogspot.com/-XF6PprOiCXA/XcQsnpWAiPI/AAAAAAAEOQ0/zsEd1w-j64EVenwMoU1RsCAIaGXpst8PQCLcBGAsYHQ/s1600/IMG_20191103_123838.jpg)

  
  
The Lite version is the same plug except it does not bring any power monitoring capabilities to the table.  With all new hardware revisions of various products I was worried that my favorite smart plug was going to go the way of the Sonoff Mini and not have any easy access headers for flashing the open source firmware of your choice.  The Sonoff S31 line of plugs easily fit two plugs on the same wall socket with ease, utilizes screws in case you want to open the device, and has easy to solder RX/TX pin headers; which is why the S31 is still my favorite smart plug!  
  
Of course I took the device apart and compared it to the previous non-UL S31 model (pics below).  I was excited to see they kept the same PCB that handles the ESP8266 side of things which meant the header is still there!  Remove the three screws and flash away with no worries of ever bricking the device since you can always recover it.  We aren't so lucky with many other plugs on the market that have to destroyed and/or cut up to get to the RX/TX pads.   
  
I'm not going to go into the deep rabbit hole debate of ETL, UL listings, CE, etc, but if you require your smart plugs to be UL Listed then these are definitely the way to go!  
  
Amazon Link to [Sonoff S31](https://amzn.to/2WQ6ioS)  
  
 **Sonoff S31 UL**  
  

[![](images/IMG_20191103_202223.jpg)](https://1.bp.blogspot.com/-kRPp5xL_27k/XcQtNLOYGvI/AAAAAAAEORE/GJWZ4URDJmYpbZ9WppKhC0xCDIb1Cf4agCLcBGAsYHQ/s1600/IMG_20191103_202223.jpg)

**Sonoff S31 Non-UL**

 [![](images/IMG_20191103_202253.jpg)](https://1.bp.blogspot.com/-iSLVX8m6cHs/XcQtbm3LbjI/AAAAAAAEORM/8uoZRUCh8qAI31gv3oL5AboKXaDbKGxQQCLcBGAsYHQ/s1600/IMG_20191103_202253.jpg)

**Sonoff S31 UL**   

[![](images/IMG_20191103_202232.jpg)](https://1.bp.blogspot.com/-P3nFDp9NptQ/XcQtNEwYfrI/AAAAAAAEORU/SRriMMHYejI2FCIKf3vKM1_tT8fDVK95ACEwYBhgL/s1600/IMG_20191103_202232.jpg)

  

**Sonoff S31 Non-UL**

[![](images/IMG_20191103_202308.jpg)](https://1.bp.blogspot.com/-cdiViiZYt78/XcQtbkrLTdI/AAAAAAAEORc/iAPzukCVUqQg3SvfFSe6H-rSKKBIOci_ACEwYBhgL/s1600/IMG_20191103_202308.jpg)

  
**Sonoff S31 UL**  

[![](images/IMG_20191103_202241.jpg)](https://1.bp.blogspot.com/-ZoewR4b4cvI/XcQtNB9XA0I/AAAAAAAEORY/wuAZ_YtNzo05j3Zez9bOrNX_jBKj5nG3wCEwYBhgL/s1600/IMG_20191103_202241.jpg)

**Sonoff S31 Non-UL**

[![](images/IMG_20191103_203809.jpg)](https://1.bp.blogspot.com/-_BCw3aLcRaI/XcQtbhoE0VI/AAAAAAAEORg/UuGy6nYdi88y_BkzXJwdH7u35s3_r3--gCEwYBhgL/s1600/IMG_20191103_203809.jpg)

  
And of course we soldered RX/TX leads to them and flashed it with Tasmota.  The GPIO pinout is the same and the Sonoff S31 Module option in Tasmota worked great.  
  

[![](images/IMG_20191107_190417.jpg)](https://1.bp.blogspot.com/-ApE3jDYwxPU/XcTbkDeJK-I/AAAAAAAEOVA/d1lpXlCgf94uGPjmCgCuPOiFIDt9zvRRwCLcBGAsYHQ/s1600/IMG_20191107_190417.jpg)

  
The Sonoff S31 Lite is the same PCB but without the power monitoring chip.  
  

[![](images/IMG_20191107_194807.jpg)](https://1.bp.blogspot.com/-2Xa2r2OERlQ/XcTcClN_cDI/AAAAAAAEOVM/eOHOOSSS72cb14RuhmznVk3UQhkcFIIaACLcBGAsYHQ/s1600/IMG_20191107_194807.jpg)

  
And as always, both plugs fit with a small air gap in between when you plug them into the same socket.  

[![](images/IMG_20191107_195145%2B%25281%2529.jpg)](https://1.bp.blogspot.com/-eNXVPD-s4cU/XcTbkD6UyBI/AAAAAAAEOU4/DCJEiGkS2AIVMeuF6M1aorw0HysoOUlfgCLcBGAsYHQ/s1600/IMG_20191107_195145%2B%25281%2529.jpg)
