# GMusicR Server

GMusicR is a Chrome Extension that allows you to remotely control the Google
Music Player. Communication works by relaying messages through WebSockets using
this server. It is open so everybody can run their own.

# Chrome Extension
For the extension, see <a href="https://github.com/jouz/gmusicr">here</a>.

## Disclaimer
This software is not tested. Further, the only security measurement to prevent
others to skip *your* songs is the use of a *secret*. Everybody using the same
secret can control each other's music.

## Installation
Simply clone this repository and run it using:
<pre>node server.js</pre>
The default port is 4321. Or use heroku, or something similar.

## License
<a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-sa/3.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/InteractiveResource" property="dct:title" rel="dct:type">gmusicr-server</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="https://github.com/jouz/gmusicr-server" property="cc:attributionName" rel="cc:attributionURL">Jan Kolkmeier</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>.
