import { cardDeck } from '/scratch.js'

// creating blueprint to make a full deck of cards 
let cardBlueprint = new cardDeck

// creating card of every suit
let spades = cardBlueprint.makeDeck("spades")
let clubs = cardBlueprint.makeDeck("Clubs")
let diamond = cardBlueprint.makeDeck("Diamond")
let hearts = cardBlueprint.makeDeck("Hearts")

let fullDeck = [...spades, ...clubs, ...diamond, ...hearts]
    //let fullDeck2 = [...spades, ...clubs, ...diamond, ...hearts]

// [0] = first card e.g. Ace [2] = card value 
console.log(fullDeck[1][2])

let body = document.body
    // appending a card to the body 

// generating a random number between 1 and length of card deck
function getRandomCard(card) {
    // random number generated based on the card length + 1. 
    let randomNum = Math.floor(Math.random() * fullDeck.length + 1)
        // cardValue is going to be randomNum generated - 1
    let cardValue = randomNum - 1;
    //card will be chosen and returned 
    card = fullDeck[cardValue]
    card.shown = false

    console.log(card)
    return card
}
// Empty array that will store player cards 
let playerArr = []
let playerTotal = 0;
let player = document.getElementById("player")

let dealerArr = [];
let dealerTotal = 0;

// let cashMoney = 1000;
let bankRoll = document.getElementById("wallet")
bankRoll.innerHTML = 1000


let wagerArea = document.getElementById("wager-area")
let yourBet = 0;
let yourBetArr = []
wagerArea.innerHTML;

let twentyFive = document.getElementById("25")
let hundredBtn = document.getElementById("100")
let fiveHundredBtn = document.getElementById("500")


hundredBtn.addEventListener('click', function() {
    if (bankRoll.innerHTML - 100 >= 0) {
        bankRoll.innerHTML -= 100
        yourBetArr.push(wagerArea.innerHTML = yourBet += 100)
        console.log(yourBetArr)
            // console.log(cashMoney)
    } else {
        alert('You dont have enough cash money')
    }
})

let bet500 = () => {

    if (bankRoll.innerHTML - 500 >= 0) {
        wagerArea.innerHTML = yourBet += 500
        bankRoll.innerHTML -= 500
            // console.log(cashMoney)
    } else {
        alert('You dont have enough cash money')
    }
}
fiveHundredBtn.addEventListener('click', function() {
    bet500()

})

twentyFive.addEventListener('click', function() {
    if (bankRoll.innerHTML - 25 >= 0) {
        wagerArea.innerHTML = yourBet += 25
        bankRoll.innerHTML -= 25
            // console.log(cashMoney)
    } else {
        alert('You dont have enough cash money')
    }
})


//grabbing player cards container and displaying text to your hand 
let playerCards = document.getElementById("player-cards")
playerCards.innerHTML = "Your Hand"

function playerHand(card) {
    // card = random card 
    card = getRandomCard()
        // playertotal will add each card value to its total 
    playerTotal += card[2]
        // pushing random card into player array
    playerArr.push(card)
    console.log("player card")
        // playerCards will display player total
    playerCards.innerHTML = playerTotal
}

// grab button then append it 
let hitButton = document.getElementById('hit')

// adding event listener to get random number when button is clicked 
hitButton.addEventListener('click', function() {
    // when button is clicked playerHand in be invoked
    if (playerTotal < 21) {
        playerHand()
        console.log(playerArr)
        if (playerTotal > 21) {
            setTimeout(function() {
                resultId.innerHTML = "You Bust! Dealer Wins"

                console.log(yourBetArr)
                reset()
            }, 100)

        }
    } else {
        alert("You have 21! You should stand!")
    }
})

// getting dealerCards section and setting value 
let dealerCards = document.getElementById("dealerCards")
dealerCards.innerHTML = "Dealer's Hand"

function dealerHand(card) {
    // card = random card 
    card = getRandomCard()

    // total value of the cards in the dealers hand 
    dealerTotal += card[2]
        // pushing random card into dealer array 
    dealerArr.push(card)
    console.log("dealer card")
        // dealer card text will display dealerTotal 
    dealerCards.innerHTML = dealerTotal
}

function hideDealerHand(card) {
    // card = random card 
    card = getRandomCard()
    if (card.shown === false) {
        // total value of the cards in the dealers hand 
        dealerTotal = dealerTotal
    } else {
        dealerTotal += card[2]
    }

    // pushing random card into dealer array 
    dealerArr.push(card)
    console.log("dealer card")
    console.log(dealerArr)

    // dealer card text will display dealerTotal 
    dealerCards.innerHTML = dealerTotal
}

let betBtn = document.getElementById("bet")

betBtn.addEventListener("click", function() {

    setTimeout(function() {
        startGame()
    }, 300)
})

// starting game by giving two cards to player and dealer 
function startGame() {
    playerHand()
    dealerHand()
    playerHand()
    setTimeout(function() {
        hideDealerHand()
    }, 100)

}

// reveal the dealer hole card and add the total
function dealerDraw() {

    dealerTotal = dealerArr[0][2] + dealerArr[1][2]
    dealerCards.innerHTML = dealerTotal

}
// when player stands the dealer will draw up to a total of 17 and winner will be determined
let standButton = document.getElementById('stand')
standButton.addEventListener('click', function() {
    dealerDraw()
    while (dealerTotal < 17) {
        dealerHand()
        result()

    }
    setTimeout(function() {
        result()

    }, 250)

})

let resultId = document.getElementById('result')
resultId.innerHTML = null

// logic to determine the winner of the hand
let result = () => {
    if (dealerTotal > 21) {
        resultId.innerHTML = "Player wins!"
        console.log(bankRoll.innerHTML = bankRoll.innerHTML + yourBet)

    } else if (playerTotal === dealerTotal) {
        resultId.innerHTML = "Push!"
    } else if (playerTotal > dealerTotal) {
        resultId.innerHTML = "Player wins!"
        console.log(bankRoll.innerHTML = bankRoll.innerHTML + yourBet)
    } else {
        resultId.innerHTML = "Dealer Wins"
    }
    setTimeout(function() {
        reset()
    }, 1500)

}

// reset player and dealer hands to 0 
let reset = () => {
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
}