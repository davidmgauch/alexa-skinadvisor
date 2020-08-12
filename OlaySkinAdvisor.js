var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);

    // alexa.dynamoDBTableName = 'YourTableName'; // creates new table for userid:session.attributes

    alexa.registerHandlers(handlers);
    alexa.execute();
};

var welcomeMessage = 'Welcome to Olay Skin Advisor, your personal skincare assistant! Would you like a personal skin assessment, daily skin tip, or do you want help with a specific skincare need?';

var dailySkinTip = 'Keep a note of what you put on your plate. Eat fresh fruits, greens, sufficient protein and vitamins. A diet rich in vitamin C and low in fats and sugar promotes radiant skin. Consider a low-sugar diet, which can keep insulin levels down, allowing cells to maintain a healthy balance.';

var specificSkinQuestion = 'What question do you have about your skin?';
var questionAcne = 'For acne, Olay Skin Advisor recommends Spot Zinger Acne Spot Treatment. It’s seven dollars and ninety nine cents for point five ounces and battles acne with salicylic acid.';

var welcomeSpeechQuestionConcerns = 'Lets begin your skin assessment. Do you have skin concerns about your eyes, aging, or pores?';
//QUESTIONS
var QuestionTopConcern = 'Good news, we can help with those concerns. Which of these is your top concern?';
var QuestionSkinType = 'What is your skin type?';
var QuestionWeeklyProducts = 'What products do you use at least twice per week?';
var QuestionHowManyMorning = 'In the morning, approximately how many products do you use?';
var QuestionHowManyEvening = 'And in the evening, approximately how many products do you use?';
var QuestionSkinMoisture = 'Do you like your skin to feel lightly hydrated or richly moisturized?';
var QuestionSpf = 'Do you use skincare products with S P F?';
var QuestionScentedProducts = 'Last question, do you like scented products?';

//RESULTS
var ResultsWelcome = 'Skin care analysis complete! Your top recommended product is Olay Regeneris Micro-Sculpting Eye Swirl to help with your top concern of Lines and Wrinkles. Say My Skin Regimen for a 5 step skin regimen I have prepared that I think will really be beneficial to you. Or say My Focus Areas for information about the 5 areas of your face.';
var resultsReprompt = 'Again, Skin care analysis complete!'
var ResultsCardTitle = 'Assesment Complete! Your Top Recommended Product';
var ResultsCardContent = 'Your top recommended product is Olay Regeneris Micro-Sculpting Eye Swirl to help with your top concern of Lines and Wrinkles.';
var ResultsCardImage = {
    "smallImageUrl": "https://images-na.ssl-images-amazon.com/images/I/81NMDZE4BxL._SY355_.jpg",
    "largeImageUrl": "https://images-na.ssl-images-amazon.com/images/I/81NMDZE4BxL._SY355_.jpg"
};


//MY SKIN REGIMEN
var MySkinRegimen = 'This regimen best suits your unique skin needs. Step 1: Cleansing Wipes. I recommend using Regenerist Micro-Exfoliating Wet Cleansig Cloths. Step 2: Cleanser. I recommend using ProX by Olay Advanced Cleansing System. Step 3: Eye. We recommend using Olay Regenerist Micro-Sculpting Eye Swirl. Step 4: Morning Moisturizer. We recommend using Olay Total Effects Feather Weight Moisturizer with SPF 15. Step 5: Evening Moisturizer. We recommend using Olay Regenerist Regenerating Serum Fragrance-Free. This regimen is scientifically proven to assist with your skin care needs. You can say add regimen to cart to save your recommended products to your amazon cart. You can then say purchase products to order these products through amazon. Or say Focus Areas for detailed information about your 5 areas of the face with helpful information and tips.';

//MY FOCUS AREAS
var MyFocusAreas = '';

//AMAZON PURCHASE
var AddToCart = 'Regimen Added to cart. Say purchase regimen to order now.';
var PurchaseProduct = 'Your personal regimen has been ordered. Would you like to hear about your Focus Areas?';

//END
var EndSpeech = 'Alright, Good luck with your skin care journey!';

var handlers = {
    'LaunchRequest': function () {
        this.emit('MyIntent');
    },

    'MyIntent': function () {
        this.emit(':ask', welcomeMessage);
    },
    
    
    'DailySkinTip': function () {
        this.emit(':tell', dailySkinTip);
    },
    
    'SpecificSkinQuestion': function () {
        this.emit(':ask', specificSkinQuestion);
    },
    'QuestionAcne': function () {
        this.emit(':tell', questionAcne);
    },
    
    'BeginAssessment': function () {
        this.emit(':ask', welcomeSpeechQuestionConcerns);
    },
    
    'TopConcern': function () {
        this.emit(':ask', QuestionTopConcern);
    },
    
    'QuestionSkinType': function () {
        this.emit(':ask', QuestionSkinType);
    },
    
    'QuestionWeeklyProducts': function () {
        this.emit(':ask', QuestionWeeklyProducts);
    },
    
    'QuestionHowManyMorning': function () {
        this.emit(':ask', QuestionHowManyMorning);
    },
    
    'QuestionHowManyEvening': function () {
        this.emit(':ask', QuestionHowManyEvening);
    },
    
    'QuestionSkinMoisture': function () {
        this.emit(':ask', QuestionSkinMoisture);
    },
    
    'QuestionSpf': function () {
        this.emit(':ask', QuestionSpf);
    },
    
    'QuestionScentedProducts': function () {
        this.emit(':ask', QuestionScentedProducts);
    },
    
    'ResultsWelcome': function () {
        this.emit(':askWithCard', ResultsWelcome, resultsReprompt, ResultsCardTitle, ResultsCardContent, ResultsCardImage);
    },
    
    'MySkinRegimen': function () {
        this.emit(':ask', MySkinRegimen);
    },
    
    'AddToCart': function () {
        this.emit(':ask', AddToCart);
    },
    
    'PurchaseProduct': function () {
        this.emit(':ask', PurchaseProduct);
    },
    // 'AMAZON.StopIntent': function () {
    //     this.emit(':tell', EndSpeech);
    // }
    
};