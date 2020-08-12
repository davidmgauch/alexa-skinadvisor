'use strict';

const Alexa = require('alexa-sdk');

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    // alexa.appId = appId;
    alexa.registerHandlers(newSessionHandlers, startTipHandlers, startAssessmentHandlers, NumberTwoHandler, NumberOneHandler, secondYesNoHandler, assessmentResultsHandlers);
    alexa.execute();
};

var states = {
    ASSESSMENTMODE: '_ASSESSMENTMODE',
    TIPMODE: '_TIPMODE',
    NUMBERMODEONE: '_NUMBERMODEONE',
    SECONDPRODUCT: '_SECONDPRODUCT',
    SECONDYESNO: '_SECONDYESNO',
    RESULTSMODE: '_RESULTSMODE'
};

//Intro Message
var welcomeMessage = 'Welcome to Olay Skin Advisor, choose?';

// Daily Skin Tip
var tipIntro = 'Here is your daily skin tip: ';
var dailySkinTip = [
    'Diet is crucial: Keep a note of what you put on your plate. Eat fresh fruits, greens, sufficient protein and vitamins. A diet rich in vitamin C and low in fats and sugar promotes radiant skin.',
    'Consider a low-sugar diet: this can keep insulin levels down, allowing cells to maintain a healthy balance.',
    'Pay special attention to fragile areas: Some parts of your face such as eye contours and lips have particularly fine, fragile skin. They need specific care. These areas of your face are more sensitive and deserve special attention.',
    'Eyes can be a risk area: The eye contour skin is ten times finer than the skin on the rest of the face. Choose a specific routine for make-up removal in this area.',
    'Exfoliation is indispensable: Use a suitable exfoliation treatment once or twice a week. It must be effective yet gentle and respectful. Choose a pH-neutral exfoliation product, which is perfect for smoothing and purifying the skin while respecting its natural balance.',
    'Preferably use hypoallergenic make-up: To avoid the risk of allergies linked to the use of products that are not suited to your skin, choose hypoallergenic make-up specially formulated to meet the needs of all skin and eye types, even sensitive skin.',
    'Sun protection: Whatever the season, choose daily skincare products that include solar filters. They reduce the harmful effects of the sun, which accelerates skin ageing.'
];

//Skin Question

//Skin Assesment
var questionConcerns = 'First question. Do you have skin concerns about your eyes, aging, or pores?';
var questionSkinType = 'What is your skin type?';
var questionWeeklyProducts = 'What type of skin care products do you currently use for your face?';

var questionMorningProducts = 'In the morning how many products do you use?';
var questionEveningProducts = 'In the evening how many products do you use?';
var questionSPF = 'Do you use skincare products with S.P.F?';
var questionSkinMoisture = 'Do you like your skin to feel lightly hydrated or richly moisturized?';
var questionScentedProducts = 'Last question, do you prefer scented or unscented products?';

//Assessment Results
var introResults = 'Skin care analysis complete!';

var newSessionHandlers = {
    'LaunchRequest': function () {
        this.emit('MyIntent');
    },

    'MyIntent': function (req, res) {
        this.emit(':ask', welcomeMessage);
    },
    'SwitchStartAssessment': function (req, res) {
        this.handler.state = states.SECONDPRODUCT;
        this.emitWithState('NumberTwo');
    },
    'SwitchStartTip': function (req, res) {
        this.handler.state = states.TIPMODE;
        this.emitWithState('DailySkinTip');
    }
};

var startTipHandlers = Alexa.CreateStateHandler(states.TIPMODE, {
    'DailySkinTip': function (req, res) {
        var tipArr = dailySkinTip;
        var tipIndex = Math.floor(Math.random() * tipArr.length);
        var randomTip = tipArr[tipIndex];
        var speechOutput = tipIntro + randomTip;
        this.emit(':tell', speechOutput);
    } 
});

var startAssessmentHandlers = Alexa.CreateStateHandler(states.ASSESSMENTMODE, {
    'FirstConcern': function (req, res) {
        this.emit(':ask', questionConcerns);
    },
    'SecondTopConcern': function (req, res) {
        var saveConcern = this.event.request.intent.slots.SkinConcerns.value;
        if (saveConcern === 'aging'){
            this.emit(':ask', 'Good news! we can help with your concerns about ' + saveConcern + '. Which of these is your top concern: Wrinkles and Fine Lines, Sagging Skin, Uneven Skin Tone, or Dullness?');
        } else if (saveConcern === 'eyes'){
            this.emit(':ask', 'Good news! we can help with your concerns about ' + saveConcern + '. Which of these is your top concern: Puffy Eyes, Dark Circles, or Crows Feet?');
        } else if (saveConcern === 'pores'){
            this.emit(':ask', 'Good news! we can help with your concerns about ' + saveConcern + '. Which of these is your top concern: Acne, or visible pores?');
        } 
    },
    'ThirdSkinType': function (req, res) {
        this.emit(':ask', questionSkinType);
    },
    'FourWeeklyProducts': function (req, res) {
        this.emit(':ask', questionWeeklyProducts);
    },
    'FiveMorningNumber': function (req, res) {
        this.emit(':ask', questionMorningProducts);
    },
    'SwtitchAnswerNumberOne': function (req, res) {
        this.handler.state = states.NUMBERMODEONE;
        this.emitWithState('AnswerNumberOne');
    }
});

var NumberOneHandler = Alexa.CreateStateHandler(states.NUMBERMODEONE, {
    'AnswerNumberOne': function (req, res) {
        this.emit(':ask', questionEveningProducts);
    },
    'SwtitchNumberTwo': function (req, res) {
        this.handler.state = states.SECONDPRODUCT;
        this.emitWithState('NumberTwo');
    }

});


var NumberTwoHandler = Alexa.CreateStateHandler(states.SECONDPRODUCT, {
    'NumberTwo': function (req, res) {
        this.emit(':ask', questionSPF);
    },
    'SwitchSkinMoisture': function () {
        this.handler.state = states.SECONDYESNO;
        this.emitWithState('SkinMoisture');
    }


});

var secondYesNoHandler = Alexa.CreateStateHandler(states.SECONDYESNO, {
    'SkinMoisture': function () {
        this.emit(':ask', questionSkinMoisture);
    },
    'ScentedProducts': function () {
        this.emit(':ask', questionScentedProducts);
    },
    'SwitchResultsWelcome': function () {
        this.handler.state = states.RESULTSMODE;
        this.emitWithState('ResultsWelcome');
    }

});

var assessmentResultsHandlers = Alexa.CreateStateHandler(states.RESULTSMODE, {
    'ResultsWelcome': function () {
        this.emit(':tell', introResults);
    }
});







