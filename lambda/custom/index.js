'use strict';
const Alexa = require('alexa-sdk');
var http = require('http');
const URL = 'http://alexaraspicam.ngrok.io/photo'; // unique tunneling url to raspberry pi server

const APP_ID = 'amzn1.ask.skill.41fd0b69-d293-4ab6-9292-3496b2a89f1c';

const SKILL_NAME = 'Raspberry Pie';
const HELP_MESSAGE = 'I can take a photo using your raspberry pie... Just tell me to take a picture';
const HELP_REPROMPT = 'If you want me to take a photo of you, just say take a picture. You can exit at anytime by saying stop.';
const STOP_MESSAGE = 'Goodbye!';

const handlers = {
    'LaunchRequest': function () {
        this.emit('AMAZON.HelpIntent');
    },
    'takePictureIntent': function () {
        const speechOutput = "you asked me to take a picture.";
        this.response.speak(speechOutput).listen(speechOutput);
        this.emit(':responseReady');
    },
    'takeVideoIntent': function () {
        const speechOutput = "you asked me to take a video.";
        this.response.speak(speechOutput).listen(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    console.log("EVENT: " + JSON.stringify(event));
    console.log("CONTEXT: " + JSON.stringify(context))
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
