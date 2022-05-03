import { cardDeck } from '/scratch.js'

function cardImg(name, suit) {
    let image = document.createElement('img')
    image.src = `images/${name}-${suit}.png`

    return image
}
let dealerImg = document.getElementById('dealer')
dealerImg.append(cardImg("bj", "dealer"))

let playerImg = document.getElementById("player")
playerImg.append(cardImg("bj", "player"))


let test = document.getElementById("test")
let test2 = document.getElementById("test2")
let cardImages = null;

let cardBlueprint = new cardDeck

// creating card of every suit
let spades = cardBlueprint.makeDeck("spades")
let clubs = cardBlueprint.makeDeck("clubs")
let diamond = cardBlueprint.makeDeck("diamonds")
let hearts = cardBlueprint.makeDeck("hearts")

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

twentyFive.append(cardImg("25", "chip"))
hundredBtn.append(cardImg("100", "chip"))
fiveHundredBtn.append(cardImg("500", "chip"))

hundredBtn.addEventListener('click', function() {
    if (bankRoll.innerHTML - 100 >= 0) {
        bankRoll.innerHTML -= 100
        wagerArea.innerHTML = yourBet += 100
        console.log(yourBetArr)

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
    if (card[0] === "ace" && playerTotal <= 10) {
        card[2] = 11
    }
    playerTotal += card[2]
        // pushing random card into player array
    playerArr.push(card)
    console.log("player card")
    cardImages = cardImg(card[0], card[1])
        // playerCards will display player total
    playerCards.innerHTML = playerTotal
    test.append(cardImages)
    console.log(test)
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
            resultId.innerHTML = "You Bust! Dealer Wins"
            setTimeout(function() {
                reset()
            }, 2500)

        }
    } else {
        alert("You have 21! You should stand!")
    }
})

// getting dealerCards section and setting value 
let dealerCards = document.getElementById("dealerCards")
dealerCards.innerHTML = "Dealer's Hand"

function dealerHand(card) {
    card = getRandomCard()

    if (card[0] === "ace" && dealerTotal <= 10) {
        card[2] = 11
    }
    // card = random card 


    // total value of the cards in the dealers hand 
    dealerTotal += card[2]
        // pushing random card into dealer array 
    dealerArr.push(card)
    console.log("dealer card")
    cardImages = cardImg(card[0], card[1])
    test2.append(cardImages)
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
function dealerDraw(card) {
    card = getRandomCard()

    dealerTotal = dealerArr[0][2] + dealerArr[1][2]
    dealerCards.innerHTML = dealerTotal
    cardImages = cardImg(card[0], card[1])
    test2.append(cardImages)

}
// when player stands the dealer will draw up to a total of 17 and winner will be determined
let standButton = document.getElementById('stand')
standButton.addEventListener('click', function() {
    dealerDraw()
    while (dealerTotal < 17) {
        dealerHand()

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

    } else if (playerTotal === dealerTotal) {
        resultId.innerHTML = "Push!"
        bankRoll.innerHTML = parseInt(bankRoll.innerHTML) + parseInt(wagerArea.innerHTML)
    } else if (playerTotal > dealerTotal) {
        resultId.innerHTML = "Player wins!"

    } else {
        resultId.innerHTML = "Dealer Wins"
    }
    if (resultId.innerHTML === "Player wins!") {
        bankRoll.innerHTML = parseInt(bankRoll.innerHTML) + (parseInt(wagerArea.innerHTML)) * 2
    }
    setTimeout(function() {
        reset()
    }, 2500)

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
    resultId.innerHTML = null
    cardImages = null
    test.textContent = ""
    test2.textContent = ""
}