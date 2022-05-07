import { cardDeck } from '/scratch.js'

// function to create new image elements using DOM
function cardImg(name, suit) {
    let image = document.createElement('img')
    image.src = `images/${name}-${suit}.png`

    return image
}

// getting dealer id and appending image
let dealerImg = document.getElementById('dealer')
dealerImg.append(cardImg("bj", "dealer"))

// getting player id and appending image
let playerImg = document.getElementById("player")
playerImg.append(cardImg("bj", "player"))

// grabbing player and dealer section where card image will be appended
let dealerCardSection = document.getElementById("dealerCardSection")
let playerCardSection = document.getElementById("playerCardSection")

let cardImages = null;

// creating blueprint to make a car deck using constructor function in scratch.js
let cardBlueprint = new cardDeck

// creating card of every suit
let spades = cardBlueprint.makeDeck("spades")
let clubs = cardBlueprint.makeDeck("clubs")
let diamond = cardBlueprint.makeDeck("diamonds")
let hearts = cardBlueprint.makeDeck("hearts")

let fullDeck = [...spades, ...clubs, ...diamond, ...hearts]
    //let fullDeck2 = [...spades, ...clubs, ...diamond, ...hearts]

// generating a random number between 1 and length of card deck
function getRandomCard(card) {
    // random number generated based on the card length + 1.
    let randomNum = Math.floor(Math.random() * fullDeck.length + 1)
        // cardValue is going to be randomNum generated - 1
    let cardValue = randomNum - 1;
    //card will be chosen and returned
    card = fullDeck[cardValue]
    card.shown = false
        // returns random card from fullDeck 
    return card
}
// Empty array that will store player cards
let playerArr = []
    // player total will change based on the cards drawn
let playerTotal = 0;

// Empty array that will store dealer cards
let dealerArr = [];
// dealer total will change based on the cards drawn
let dealerTotal = 0;

//game hasn't started
let start = false

// start the game with 1000
const startAmount = 1000;
// bankroll will be the amount of money the player will start with
let bankRoll = document.getElementById("wallet")
bankRoll.innerHTML = startAmount

// wager area will show the players current bet amount
let wagerArea = document.getElementById("wager-area")
wagerArea.innerHTML;
// your bet will increase as you start to bet
let yourBet = 0;
let bet = false
    // array will store your bets and can be removed if you want to change your bet
let yourBetArr = []

// getting buttons
let twentyFiveBtn = document.getElementById("25")
let hundredBtn = document.getElementById("100")
let fiveHundredBtn = document.getElementById("500")

// appending card image to buttons
twentyFiveBtn.append(cardImg("25", "chip"))
hundredBtn.append(cardImg("100", "chip"))
fiveHundredBtn.append(cardImg("500", "chip"))

let betAmount = (amount) => {
    // bankroll can not go below zero. If you have enough money you can increase your bet by amount.
    if (start === true) {

        alert("You can't add to your bet after the cards have been dealt!")
    } else if (bankRoll.innerHTML - amount >= 0) {
        // bankroll will reduce by amount
        wagerArea.innerHTML = yourBet += amount
            // wager area will increase by amount
        bankRoll.innerHTML -= amount
        bet = true

    } else {
        alert('You dont have enough cash money')
    }
}

// adding listener to button and invoking betAmount on click
twentyFiveBtn.addEventListener('click', () => { betAmount(25) })
hundredBtn.addEventListener('click', () => { betAmount(100) })
fiveHundredBtn.addEventListener('click', () => { betAmount(500) })

//grabbing player cards container and displaying text to your hand
let playerCards = document.getElementById("player-cards")
playerCards.innerHTML = "Your Hand"

function playerHand(card) {

    // card = random card
    card = getRandomCard()

    // if card index 0 === "ace" and playerTotal is less than 10
    if (card[0] === "ace" && playerTotal <= 10) {
        // card index 2 will equal 11
        card[2] = 11

        // playertotal will add card value to its total
        playerTotal += card[2]

        // playerCards section will display playerTotal
        playerCards.innerHTML = playerTotal

    } else if (card[0] === "ace" && playerTotal > 10) {

        // ace will equal 1 if player total is > 10
        card[2] = 1
        playerTotal += card[2]
        playerCards.innerHTML = playerTotal

    } else {

        playerTotal += card[2]
        playerCards.innerHTML = playerTotal
    }

    // pushing random card into player array
    playerArr.push(card)

    // creating card images passing card index [0] as first param and card index[1] as second param
    cardImages = cardImg(card[0], card[1])

    // appending images to playerCardSection
    playerCardSection.append(cardImages)
}

// grab button then append it
let hitButton = document.getElementById('hit')

// adding event listener to get random number when button is clicked
hitButton.addEventListener('click', function() {
    // bet must be placed in order to hit
    if (bet === false) {
        alert('You need to place a bet first!')
    }

    if (playerTotal === 21) {
        alert("You have 21! You should stand!")

    } else if (playerTotal < 21 && bet === true) {
        // if playerTotal is less than 21, player will take another card on click
        playerHand()

        if (playerTotal > 21) {
            // looks through playerArr and if it includes ace[2] that equals 11, that 11 will be replaced with 1 and player total will be subtracted by 10
            for (var i = 0; i < playerArr.length; i++) {
                if (playerArr[i].includes("ace") && playerArr[i][2] === 11) {
                    playerArr[i][2] = 1
                    playerTotal -= 10
                    playerCards.innerHTML = playerTotal
                }
            }

        }
        // is playerTotal > 21 you will bust and game will reset
        if (playerTotal > 21) {
            resultId.innerHTML = "You Bust! Dealer Wins"
            setTimeout(function() {
                resetBank()
                reset()
            }, 2500)
        }

    }
})

// getting dealerCards section and setting value
let dealerCards = document.getElementById("dealerCards")
dealerCards.innerHTML = "Dealer's Hand"

function dealerHand(card) {
    // card = random card
    card = getRandomCard()

    // if card index 0 === "ace" and playerTotal is less than 10
    if (card[0] === "ace" && dealerTotal <= 10) {

        // card index 2 will equal 11
        card[2] = 11

        // dealertotal will add card value to its total
        dealerTotal += card[2]

        // dealer card text will display dealerTotal
        dealerCards.innerHTML = dealerTotal

    } else if (card[0] === "ace" && dealerTotal >= 11) {

        // ace will equal 1 if player total is > 10
        card[2] = 1
        dealerTotal += card[2]
        dealerCards.innerHTML = dealerTotal

    } else {

        // card value will equal card value
        dealerTotal += card[2]
        dealerCards.innerHTML = dealerTotal

    }
    // pushing random card into dealer array
    dealerArr.push(card)

    // creating card images passing card index [0] as first param and card index[1] as second param
    cardImages = cardImg(card[0], card[1])
    dealerCardSection.append(cardImages)

}

function hideDealerHand(card) {
    card = getRandomCard()

    if (card.shown === false) {
        // dealer card will only display first card total. second card is hidden until player end phase.
        // if card index 0 === "ace" and playerTotal is less than 10
        if (card[0] === "ace" && dealerTotal <= 10) {

            // card index 2 will equal 11
            card[2] = 11

        } else if (card[0] === "ace" && dealerTotal >= 11) {
            // ace will equal 1 if player total is > 10
            card[2] = 1
        }
        // pushing random card into dealer array
        dealerArr.push(card)
    }
}

// starting game by giving two cards to player and dealer
function startGame() {
    playerHand()
    dealerHand()
    playerHand()
    setTimeout(function() {
        hideDealerHand()
    }, 100)
    setTimeout(function() {

        // check for black jack

        //if both playerTotal and dealerArr = 21, its a push. (tie)
        if (playerTotal === 21 && dealerArr[0][2] + dealerArr[1][2] === 21) {
            resultId.innerHTML = "You both have blackjack! It's a push!"
            dealerDraw()
            setTimeout(() => { reset() }, 2500)

            //if player has 21 and dealer doesn't have 21, player wins.
        } else if (playerTotal === 21 && dealerArr[0][2] + dealerArr[1][2] != 21) {
            resultId.innerHTML = "BLACKJACK! Player wins!"
            dealerDraw()
            setTimeout(() => { reset() }, 2500)

            //player will win their bet x 1.5
            bankRoll.innerHTML = parseInt(bankRoll.innerHTML) + ((parseInt(wagerArea.innerHTML)) * 1.5 + (parseInt(wagerArea.innerHTML)))

            //if dealerArr = 21 and player doesn't have 21, dealer wins.
        } else if (dealerArr[0][2] + dealerArr[1][2] === 21 && playerTotal != 21) {
            resultId.innerHTML = "Dealer wins with blackjack!"
            dealerDraw()
            resetBank()
            setTimeout(() => { reset() }, 2500)
        }
    }, 500)
}

// grabbing bet button
let betBtn = document.getElementById("bet")

betBtn.addEventListener('click', () => {


    // game won't start if bet === false
    if (bet === false) {
        alert('You need to place a bet first!')

        // when bet is placed, bet = true then game will start
    } else if (wagerArea.innerHTML > 0) {
        bet = true
        setTimeout(() => { startGame(), start = true }, 300)
    }

})


// reveal the dealer hole card and add the total
function dealerDraw(card) {

    card = getRandomCard()

    // [0] represents the first card in the array and [2] is the numerical value of the card
    dealerTotal = dealerArr[0][2] + dealerArr[1][2]

    dealerCards.innerHTML = dealerTotal

    //dealerArr[1] is the second array in dealerArr and [0] is the first element (card name). CardImg is taking in the card name and suit and will then append the card image
    cardImages = cardImg(dealerArr[1][0], dealerArr[1][1])
    dealerCardSection.append(cardImages)
}

// when player stands the dealer will draw up to a total of 17 and winner will be determined
let standButton = document.getElementById('stand')
standButton.addEventListener('click', function() {

    // dealer will reveal hole card and while dealerTotal is < 17 dealer will draw cards 
    dealerDraw()

    while (dealerTotal < 17) {

        dealerHand()

        // if dealerTotal > 21 and dealerArr includes ace and ace === 11. Then ace will equal 1 and dealer total will reduce by 10 to prevent dealer from busting.
        if (dealerTotal > 21) {
            for (var i = 0; i < dealerArr.length; i++) {
                if (dealerArr[i].includes("ace") && dealerArr[i][2] === 11) {
                    dealerArr[i][2] = 1
                    dealerTotal -= 10
                    dealerCards.innerHTML = dealerTotal
                }
            }
        }
    }
    // when dealer finishes drawing result will display after time has elapsed 
    setTimeout(() => { result() }, 250)
})

// area where result will be displayed
let resultId = document.getElementById('result')
resultId.innerHTML = null

// logic to determine the winner of the hand
let result = () => {
    if (dealerTotal > 21) {

        resultId.innerHTML = "Dealer Busts! Player wins!"

        //if player wins, pay out is 1 to 1 and it will be added into bankroll
        bankRoll.innerHTML = parseInt(bankRoll.innerHTML) + (parseInt(wagerArea.innerHTML)) * 2


    } else if (playerTotal === dealerTotal) {

        resultId.innerHTML = "Push!"
            // players original bet will be added back to the bank roll
        bankRoll.innerHTML = parseInt(bankRoll.innerHTML) + parseInt(wagerArea.innerHTML)

    } else if (playerTotal > dealerTotal) {

        resultId.innerHTML = "Player wins!"

        //if player wins, pay out is 1 to 1 and it will be added into bankroll
        bankRoll.innerHTML = parseInt(bankRoll.innerHTML) + (parseInt(wagerArea.innerHTML)) * 2

    } else {

        resultId.innerHTML = "Dealer Wins"

    }


    //bankroll resets to start amount if you go bankrupt.
    setTimeout(() => {
        resetBank()
        reset()
    }, 1500)
}

function resetBank() {
    if (bankRoll.innerHTML == 0 && dealerTotal > playerTotal || playerTotal > 21) {
        alert("You ran out of money. Here's a gift of 1000 to continue playing!")
        bankRoll.innerHTML = startAmount
    }
}

// reset player and dealer hands to 0
let reset = () => {
    resetBank()
    wagerArea.innerHTML = "Place your Bet"
    yourBetArr.length = 0
    yourBet = 0
    playerTotal = 0
    dealerTotal = 0
    playerArr.length = 0
    dealerArr.length = 0
    console.log(dealerArr)
    dealerCards.innerHTML = "Dealer's Hand"
    playerCards.innerHTML = "Your Hand"
    resultId.innerHTML = null
    cardImages = null
    playerCardSection.textContent = ""
    dealerCardSection.textContent = ""
    bet = false
    start = false
}