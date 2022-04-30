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
    console.log(card)
    return card
}
// Empty array that will store player cards 
let playerArr = []
let playerTotal = 0;
let player = document.getElementById("player")

let dealerArr = [];
let dealerTotal = 0;



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
    playerHand()
    console.log(playerArr)
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
        // total value of the cards in the dealers hand 
    dealerTotal += card[2]
        // pushing random card into dealer array 
    dealerArr.push(card)
    console.log("dealer card")

    $("#dealerCards").ready(function() {
            $("#dealerCards").hide()
        })
        // dealer card text will display dealerTotal 
    dealerCards.innerHTML = dealerTotal
}



let betBtn = document.getElementById("wager")

betBtn.addEventListener("click", function() {

})

function startGame() {
    playerHand()
    dealerHand()
    playerHand()
    hideDealerHand()
}

startGame()