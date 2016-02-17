=================
ExercisePulseBall
=================

Developed with NodeJs, Express, AngularJs & Bootstrap by Daniel Contreras Aladro

To run, launch gulp from the root folder of the project.

=====================================================================================

Run locally
===========

To run locally needs :

NodeJs	3.5.3
Bower		1.7.7
Gulp		3.9.1 (CLI 3.9.0)

Checkout or clone this repository into a folder and run from this folder

'npm install && npm start' or 'gulp'

=====================================================================================

Live DEMO
=========

You can see a live demo of this example here

https://pulseliverankings.herokuapp.com/

=====================================================================================

pulseBall.init
==============

Function to initialize the App with the initial rankings

This function it´s called initRanking and it's located on dataCtrl.js, it is executed from a button on the screen; that button launch a modal view where yo can select a json file or drag&drop into the view.

=====================================================================================

pulseBall.addMatch
==================

Function to add matches to update the ranking

This function it´s called addMatch and it's located on dataCtrl.js, it is executed from a button on the screen; that button launch a modal view where yo can select a json file or drag&drop into the view.

Other way to add a match, through the same function, is with a form on a modal view, this is launched from a button on the screen in a modal view.

=====================================================================================

Persistence
===========

The application persist data on localStorage, HTML5 feature.

=====================================================================================

Matching team and position
==========================

Selecting a position from ranking table, highlights the matches of that team.

=====================================================================================
