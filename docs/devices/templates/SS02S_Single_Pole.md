# TreatLife SS02S (Single Pole)
![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) `1/9/2022 - This device no longer ships with an ESP8266 and one must be installed in order to continue.`

TEMPLATE
```json
{"NAME":"Treatlife Single Pole","GPIO":[0,0,0,0,288,576,0,0,224,32,0,0,0,0],"FLAG":0,"BASE":18, "CMND": "powerretain 1 | setoption13 1 | setoption30 1"}
```



<details><summary>NOTES</summary>     
<p>

```
The template is all that is needed to set this device up correctly.
```
</p></details>




<details><summary>COMPONENTS</summary>     
<p>

| GPIO |    Component | Description |
|------ |-------------|-------------|         
|GPIO00	| None
|GPIO01	| None
|GPIO02	| None
|GPIO03	| None
|GPIO04	| Led | White LED under button
|GPIO05	| LedLinki | Red Status LED
|GPIO09	| None
|GPIO10	| None
|GPIO12	| Relay1 | Actual relay to toggle on/off
|GPIO13	| Button1 | Button
|GPIO14	| None
|GPIO15	| None
|GPIO16	| None
</p></details>



<details><summary>SETTINGS</summary>     
<p>

| Setting | Description
|---------------|-------------
| powerretain 1 | Enable MQTT power retain on status update
| setoption13 1 | Set On/Off switch to respond instantly
| setoption30 1 | Sets domain to a light
</p></details>



<details><summary>RULES</summary>     
<p>

```
None
```
</p></details>
