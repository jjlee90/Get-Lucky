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

// function checking if player has blackjack
function checkbj() {

    if (playerTotal === 21 && playerArr.length === 2) {
        console.log('blackjack!')
        result()
        setTimeout(function() {
            reset()
        }, 1500)

    }
}
// grabbing player and dealer section where card image will be appended
let dealerCardSection = document.getElementById("dealerCardSection")
let playerCardSection = document.getElementById("playerCardSection")
let cardImages = null;

let soft = false

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
        // card.soft = false
    console.log(card)
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

// bankroll will be the amount of money the player will start with 
let bankRoll = document.getElementById("wallet")
bankRoll.innerHTML = 1000

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
    if (bankRoll.innerHTML - amount >= 0) {
        // bankroll will reduce by amount
        wagerArea.innerHTML = yourBet += amount
            // wager area will increase by amount 
        bankRoll.innerHTML -= amount
        bet = true
            // console.log(cashMoney)
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

    if (card.soft === true && playerTotal > 21) {
        playerCards.innerHTML = playerTotal - 10
        soft = false
    }
    // if card index 0 === "ace" and playerTotal is less than 10 
    if (card[0] === "ace" && playerTotal < 11) {
        // card index 2 will equal 11
        card[2] = 11
        soft = true
        console.log("soft is " + soft)
            // playertotal will add card value to its total 
        playerTotal += card[2]
            // playerCards section will display playerTotal 
        playerCards.innerHTML = playerTotal
    }
    // else if (card.soft === true && playerTotal < 21) {
    //     if (playerCards.innerHTML += card[2] > 21) {
    //         playerCards.innerHTML = playerCards.innerHTML - 10
    //     }
    // } 
    else if (card[0] === "ace" && playerTotal > 10) {
        // ace will equal 1 if player total is > 10
        card[2] = 1
        playerTotal += card[2]
        playerCards.innerHTML = playerTotal
    } else {
        // card value will equal card value 
        card[2] = card[2]
        playerTotal += card[2]
        playerCards.innerHTML = playerTotal
    }
    // check for black jack 

    console.log(card)


    // playerTotal += card[2]

    // pushing random card into player array
    playerArr.push(card)
    console.log(playerArr)
    console.log(playerArr.length)
    console.log("player card")

    // creating card images passing card index [0] as first param and card index[1] as second param
    cardImages = cardImg(card[0], card[1])

    // appending images to playerCardSection
    playerCardSection.append(cardImages)
    console.log(playerCardSection)
}

// function aceLogic(playerTotal, dealerTotal, which) {
//     let which = dealerTotal || playerTotal
//     if (card[0] === "ace" && which <= 10) {
//         card[2] = 11

//     } else if (card[0] === "ace" && which > 10) {
//         card[2] = 1

//     } else {

//         card[2] = card[2]
//     }
// }

// grab button then append it 
let hitButton = document.getElementById('hit')

// adding event listener to get random number when button is clicked 
hitButton.addEventListener('click', function() {
    if (bet === false) {
        alert('You need to place a bet first!')
    } else if (playerTotal < 21) {
        playerHand()
        console.log(playerArr)
    } else if (playerTotal > 21) {
        resultId.innerHTML = "You Bust! Dealer Wins"
        setTimeout(function() {
            reset()
        }, 2500)

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

    // if card index 0 === "ace" and playerTotal is less than 10 
    if (card[0] === "ace" && dealerTotal <= 10) {
        // card index 2 will equal 11
        card[2] = 11
            // dealertotal will add card value to its total 
        dealerTotal += card[2]

    } else if (card[0] === "ace" && dealerTotal > 10) {
        // ace will equal 1 if player total is > 10
        card[2] = 1
        dealerTotal += card[2]

    } else {
        // card value will equal card value 
        dealerTotal += card[2]
    }
    // total value of the cards in the dealers hand 


    console.log(card)

    // pushing random card into dealer array 
    dealerArr.push(card)
    console.log(dealerArr)
    console.log("dealer card")

    // creating card images passing card index [0] as first param and card index[1] as second param
    cardImages = cardImg(card[0], card[1])
    dealerCardSection.append(cardImages)

    // dealer card text will display dealerTotal 
    dealerCards.innerHTML = dealerTotal
}

function hideDealerHand(card) {
    card = getRandomCard()

    if (card.shown === false) {
        // dealer card will only display first card total. second card is hidden until player end phase.
        dealerCards.innerHTML = dealerTotal
    } else {
        dealerTotal += card[2]
    }

    // pushing random card into dealer array 
    dealerArr.push(card)
    console.log("dealer card")
    console.log(dealerArr)

    // dealer card text will display dealerTotal 

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
        checkbj()
    }, 500)
}

let betBtn = document.getElementById("bet")
betBtn.addEventListener('click', () => {
    if (bet === false) {
        alert('You need to place a bet first!')
    } else if (bet = true) {
        setTimeout(() => { startGame() }, 300)
    }

})


// reveal the dealer hole card and add the total
function dealerDraw(card) {
    console.log(dealerArr)
    card = getRandomCard()

    // [0] represents the first card in the array and [2] is the numerical value of the card 
    dealerTotal = dealerArr[0][2] + dealerArr[1][2]
    dealerCards.innerHTML = dealerTotal
    cardImages = cardImg(card[0], card[1])
    dealerCardSection.append(cardImages)

}
// when player stands the dealer will draw up to a total of 17 and winner will be determined
let standButton = document.getElementById('stand')
standButton.addEventListener('click', function() {
    // dealer will reveal hole card and while dealerTotal is < 17 dealer will draw cards 
    dealerDraw()
    while (dealerTotal < 17) {
        dealerHand()
        console.log(dealerArr)

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
    playerCardSection.textContent = ""
    dealerCardSection.textContent = ""
    bet = false
}