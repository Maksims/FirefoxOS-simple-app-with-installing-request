FirefoxOS-simple-app-with-installing-request
============================================

Simple example of application that can use FirefoxOS features to install WebApp. It is compatible with desktop Firefox as well.


Demo
====

In your FirefoxOS using browser go to http://fos-example.moka.co/  
You can use app already, but it offers you to install it as well.  
After installing, if you run it from apps it wont offer installation again.  

Functionality is simple: it has one button, that does ajax request to server, that increments internal counter and will response with json with number and line of text.  
You can open in normal browser this app as well, and check that counter is shared.


Dependencies
============

For server it uses node.js, that use two extra modules express.js and mmmagic.  
To install them, please navigate in command line to srv/ folder and type:

    npm install express
    npm install mmmagic
