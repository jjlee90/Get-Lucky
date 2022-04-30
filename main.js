// object containing a deck of cards
// cardDeck = [
//     "Ace of Spades",
//     "King of Spades",
//     "Queen of Spades",
//     "Jack of Spades",
//     "10 of Spades",
//     "9 of Spades",
//     "8 of Spades",
//     "7 of Spades",
//     "6 of Spades",
//     "5 of Spades",
//     "4 of Spades",
//     "3 of Spades",
//     "2 of Spades",
//     "Ace of Clubs",
//     "King of Clubs",
//     "Queen of Clubs",
//     "Jack of Clubs",
//     "10 of Clubs",
//     "9 of Clubs",
//     "8 of Clubs",
//     "7 of Clubs",
//     "6 of Clubs",
//     "5 of Clubs",
//     "4 of Clubs",
//     "3 of Clubs",
//     "2 of Clubs",
//     "Ace of Hearts",
//     "King of Hearts",
//     "Queen of Hearts",
//     "Jack of Hearts",
//     "10 of Hearts",
//     "9 of Hearts",
//     "8 of Hearts",
//     "7 of Hearts",
//     "6 of Hearts",
//     "5 of Hearts",
//     "4 of Hearts",
//     "3 of Hearts",
//     "2 of Hearts",
//     "Ace of Diamonds",
//     "King of Diamonds",
//     "Queen of Diamonds",
//     "Jack of Diamonds",
//     "10 of Diamonds",
//     "9 of Diamonds",
//     "8 of Diamonds",
//     "7 of Diamonds",
//     "6 of Diamonds",
//     "5 of Diamonds",
//     "4 of Diamonds",
//     "3 of Diamonds",
//     "2 of Diamonds",
// ]
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

// console.log(typeof(cardDeck))
// console.log(cardDeck.length)

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
        // call card.shown = false 

    console.log(card)
    return card
}
// Empty array that will store player cards 
let playerArr = []
let playerTotal = 0;
let player = document.getElementById("player")

let dealerArr = [];
let dealerTotal = 0;

let cashMoney = 1000;
let bankRoll = document.getElementById("wallet")
bankRoll.innerHTML = cashMoney

let wagerArea = document.getElementById("wager-area")
let yourBet = 0;
wagerArea.innerHTML;


let hundredBtn = document.getElementById("100")
let fiveHundredBtn = document.getElementById("500")
let OneThousandBtn = document.getElementById("1000")

hundredBtn.addEventListener('click', function() {
    wagerArea.innerHTML = yourBet += 100
    bankRoll.innerHTML -= 100

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
                alert('bust!')
            }, 100)

        }
    } else {
        alert("You have 21! You should stand!")
    }

    // console.log(playerArr)
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
    startGame()
})

function startGame() {
    playerHand()
    dealerHand()
    playerHand()
    setTimeout(function() {
        hideDealerHand()
    }, 200)

}



function dealerDraw() {

    dealerTotal = dealerArr[0][2] + dealerArr[1][2]
    dealerCards.innerHTML = dealerTotal

}
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

let result = () => {
    if (dealerTotal > 21) {
        resultId.innerHTML = "Player wins!"

    } else if (playerTotal === dealerTotal) {
        resultId.innerHTML = "Push!"
    } else if (playerTotal > dealerTotal) {
        resultId.innerHTML = "Player wins!"
    } else {
        resultId.innerHTML = "Dealer stops at " + dealerTotal
    }
}