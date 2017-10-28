var questions = [
    'mango',
    'aeroplane',
    'orange',
    'kite',
    'difficult',
    'extraordinary',
    'relentless',
    'elephantiasis',
    'intelligence',
    'artificial',
    'abbreviate',
    'spreadsheet',
    'cryogenics',
    'paraphrase',
    'twaddle',
    'universe'
];




var paraQuestion = document.getElementById('paraQUestion')
var paraOutcome = document.getElementById('paraOutcome')
var paraLifeCount = document.getElementById('paraLifeCount')
var btnTest = document.getElementById('btnTest')
var btnNewGame = document.getElementById('btnNewGame')
var matchedGuesses = []
var lifeCount = 10

function generateNewQuestion() {

    var nextQuestion = parseInt(Math.random() * questions.length)
    pickedQuestion = questions[nextQuestion] // mango
    matchedGuesses = []
    paraLifeCount.innerText = lifeCount + " tries left"

    // generate hint for the question
    hintText = ''
    for (var i = 0; i < pickedQuestion.length; i++) {
        hintText = hintText + "___   "
    }

    paraQuestion.innerText = hintText
    lifeCount = 10
    paraOutcome.innerText = ''
    paraLifeCount.innerText = lifeCount + ' tries left'
}

generateNewQuestion()

btnTest.addEventListener('click', function () {
    var inputVal = document.getElementById('txtInput').value.toLowerCase()

    if (pickedQuestion.indexOf(inputVal) == -1) {
        // not matched
        paraOutcome.innerText = 'Sorry, your guess was wrong!!!'
        lifeCount = lifeCount - 1;
        paraLifeCount.innerText = lifeCount + " tries left"
        if (lifeCount == 0) {
            paraOutcome.innerText = 'Sorry, game over. Please try again.'
        }
    } else {
        // matched
        paraOutcome.innerText = "Good guess!!!"

        matchedGuesses.push(inputVal)

        // regenerate hintText
        // generate hint for the question
        var hintText = ''
        for (var i = 0; i < pickedQuestion.length; i++) {
            if (matchedGuesses.indexOf(pickedQuestion[i]) != -1) {
                // already guessed
                hintText = hintText + pickedQuestion[i] + "   "
            } else {
                hintText = hintText + "___   "
            }
            paraQuestion.innerText = hintText
        }

        // loop through each characters and check if all of them has already been guessed
        var allMatched = true
        for (var i = 0; i < pickedQuestion.length; i++) {
            var curChar = pickedQuestion[i]
            if (matchedGuesses.indexOf(curChar) == -1) {
                // not found
                allMatched = false
                break
            }
        }
        if (allMatched == true) {
            // full word matched
            paraOutcome.innerText = "Congratulations, you've successfully completed this level."
        }
    }
})

btnNewGame.addEventListener('click', function () {
    // reset question
    // reset UI
    generateNewQuestion()
})
