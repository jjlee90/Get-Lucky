import { cardSuit } from "/scratch.js"

// creating blueprint to make a card suits using constructor function in scratch.js
let cardSuitBlueprint = new cardSuit()

function createDeck() {
  let cards = []

  // creating every card for every suit
  let spades = cardSuitBlueprint.makeSuit("spades")
  let clubs = cardSuitBlueprint.makeSuit("clubs")
  let diamonds = cardSuitBlueprint.makeSuit("diamonds")
  let hearts = cardSuitBlueprint.makeSuit("hearts")

  cards.push(...spades, ...clubs, ...diamonds, ...hearts)
  console.log(cards)
  return cards
}

let fullDeck = createDeck()

// generating a random number between 1 and length of card deck
function randomCard(card) {
  // random number generated based on the card length + 1.
  let randomNum = Math.floor(Math.random() * fullDeck.length + 1)
  // cardValue is going to be randomNum generated - 1
  let cardValue = randomNum - 1

  //card will be chosen and returned
  card = fullDeck[cardValue]

  // returns random card from fullDeck
  return card
}

// function to create new image elements using DOM
function createImg(imgName, imgName2) {
  let image = document.createElement("img")
  image.src = `images/${imgName}-${imgName2}.png`
  return image
}

// getting dealer id and appending image
const dealerImg = document
  .getElementById("dealer")
  .append(createImg("bj", "dealer"))

// getting player id and appending image
const playerImg = document
  .getElementById("player")
  .append(createImg("bj", "player"))

// grabbing player and dealer section where card image and total will be appended
const dealerCardSection = document.getElementById("dealerCardSection")
const dealerCardTotal = document.getElementById("dealerCards")
const playerCardSection = document.getElementById("playerCardSection")
const playerCardTotal = document.getElementById("player-cards")

// wager area will show the players current bet amount
const wagerArea = document.getElementById("wager-area")

// constructor function to create player
class player {
  constructor(player) {
    this.player = player
    //empty array to store cards
    this.cardArr = []
    //total of cards
    this.total = 0
    this.aceCount = 0
    this.yourBet = 0
    this.doubleDownBet = 0
    this.startAmount = 1000
    this.start = false
    this.bet = false
    this.hide = false
    this.show = false
    this.double = false
  }

  // player will be either dealer, or player
  drawCard(playerSection, playerTotal, card) {
    //get random card
    card = randomCard()
    // set ace count if ace
    if (card[0] == "ace") {
      this.aceCount += 1
    }
    // hide dealer card
    if (this.hide === true) {
      this.cardArr.push(card)
      let cardImg = createImg(card[0], card[1])

      // if player doubles down, they will receive only one card and it will be rotated.
    } else if (this.double === true) {
      this.cardArr.push(card)
      let cardImg = createImg(card[0], card[1])
      cardImg.style.transform = "rotate(90deg)"
      playerSection.append(cardImg)
      this.total += card[2]
      playerTotal.innerHTML = this.total

      // card is addedd to hand
    } else {
      this.cardArr.push(card)
      let cardImg = createImg(card[0], card[1])
      playerSection.append(cardImg)
      this.total += card[2]
      playerTotal.innerHTML = this.total
    }
  }
  // dealer will show hidden card, card will be appended and total will be updated
  dealerShowCard(playerSection, playerTotal, card) {
    if (this.show === true) {
      this.total += this.cardArr[1][2]
      playerTotal.innerHTML = this.total

      let cardImg = createImg(this.cardArr[1][0], this.cardArr[1][1])
      playerSection.append(cardImg)
    }
  }
  // if all conditions are true aceCount will -1 and total will -10
  checkAce(playerTotal) {
    if (
      this.cardArr[1].includes("ace") &&
      this.aceCount > 0 &&
      this.total > 21
    ) {
      this.aceCount -= 1
      this.total -= 10
      playerTotal.innerHTML = this.total
    }

    if (this.total > 21) {
      for (var i = 0; i < this.cardArr.length; i++) {
        if (
          this.cardArr[i].includes("ace") &&
          this.aceCount > 0 &&
          this.total > 21
        ) {
          this.aceCount -= 1
          this.total -= 10
          playerTotal.innerHTML = this.total
        }
      }
    }
  }
}

// creating player and dealer
let player1 = new player()
let dealer = new player()

// reset player and dealer hands to 0
function reset() {
  resetBank()

  player1.yourBet = 0
  player1.doubleDownBet = 0
  player1.total = 0
  player1.double = false
  player1.bet = false
  player1.start = false
  player1.aceCount = 0
  player1.cardArr.length = 0
  player1.cardArr = []
  playerCardTotal.innerHTML = "Dealer's Hand"
  playerCardSection.textContent = ""

  dealer.total = 0
  dealer.cardArr.length = 0
  dealer.cardArr = []
  dealerCardTotal.innerHTML = "Your Hand"
  dealerCardSection.textContent = ""
  dealer.show = false
  dealer.hide = false
  dealer.aceCount = 0

  result.innerHTML = null
  document.body.style.opacity = 1
  wagerArea.innerHTML = "Place your Bet"
  doubleDownBetArea.innerHTML = null
}
// opacity will reduce by 50%, click to reset
function addReset() {
  document.body.style.opacity = 0.5
  document.body.addEventListener("click", reset)
}

// removes event listener for reset.
function removeReset() {
  document.body.removeEventListener("click", reset)
}

function checkForBlackJack() {
  //if both playerTotal and dealerArr = 21, its a push. (tie)
  if (
    player1.total == 21 &&
    dealer.cardArr[0][2] + dealer.cardArr[1][2] == 21
  ) {
    result.innerHTML = "You both have blackjack! It's a push!"
    dealer.show = true
    dealer.dealerShowCard(dealerCardSection, dealerCardTotal)

    setTimeout(() => {
      addReset()
    }, 25)

    //if player has 21 and dealer doesn't have 21, player wins.
  } else if (
    player1.total == 21 &&
    dealer.cardArr[0][2] + dealer.cardArr[1][2] != 21
  ) {
    result.innerHTML = "BLACKJACK! Player wins!"
    dealer.show = true
    dealer.dealerShowCard(dealerCardSection, dealerCardTotal)

    //player will win their bet x 1.5
    bankRoll.innerHTML =
      parseInt(bankRoll.innerHTML) +
      (parseInt(wagerArea.innerHTML) * 1.5 + parseInt(wagerArea.innerHTML))
    setTimeout(() => {
      addReset()
    }, 25)

    //if dealerArr = 21 and player doesn't have 21, dealer wins.
  } else if (
    dealer.cardArr[0][2] + dealer.cardArr[1][2] == 21 &&
    player1.total != 21
  ) {
    result.innerHTML = "Dealer wins with blackjack!"
    dealer.show = true
    dealer.dealerShowCard(dealerCardSection, dealerCardTotal)

    setTimeout(() => {
      addReset()
    }, 25)
  }
}

// check results
function handResult() {
  if (player1.total > 21) {
    result.innerHTML = "You Bust! Dealer Wins"
    setTimeout(() => {
      addReset()
    }, 25)
  } else if (dealer.total > 21) {
    result.innerHTML = "Dealer Busts! Player wins!"

    //if player wins, pay out is 1 to 1 and it will be added into bankroll
    bankRoll.innerHTML =
      parseInt(bankRoll.innerHTML) +
      (parseInt(wagerArea.innerHTML) + parseInt(player1.doubleDownBet)) * 2
  } else if (player1.total == dealer.total) {
    result.innerHTML = `${player1.total} to ${dealer.total} Push!`
    // players original bet will be added back to the bank roll
    bankRoll.innerHTML =
      parseInt(bankRoll.innerHTML) +
      (parseInt(wagerArea.innerHTML) + parseInt(player1.doubleDownBet))
  } else if (player1.total > dealer.total) {
    result.innerHTML = `Player has ${player1.total}. Dealer has ${dealer.total}. Player wins!`

    //if player wins, pay out is 1 to 1 and it will be added into bankroll
    bankRoll.innerHTML =
      parseInt(bankRoll.innerHTML) +
      (parseInt(wagerArea.innerHTML) + parseInt(player1.doubleDownBet)) * 2
  } else {
    result.innerHTML = `Dealer has ${dealer.total}. Player has ${player1.total}. Dealer Wins.`
  }

  setTimeout(() => {
    addReset()
  }, 50)
}

function startGame() {
  player1.drawCard(playerCardSection, playerCardTotal)

  dealer.drawCard(dealerCardSection, dealerCardTotal)

  player1.drawCard(playerCardSection, playerCardTotal)

  dealer.hide = true

  dealer.drawCard(dealerCardSection, dealerCardTotal)

  if (dealer.total > 21) {
    dealer.checkAce(dealerCardSection)
  }
  if (player1.total > 21) {
    player1.checkAce(playerCardTotal)
  }

  checkForBlackJack()
}
const result = document.getElementById("result")

// getting buttons
let twentyFiveBtn = document.getElementById("25")
let hundredBtn = document.getElementById("100")
let fiveHundredBtn = document.getElementById("500")

// appending card image to buttons
twentyFiveBtn.append(createImg("25", "chip"))
hundredBtn.append(createImg("100", "chip"))
fiveHundredBtn.append(createImg("500", "chip"))

let bankRoll = document.getElementById("wallet")
bankRoll.innerHTML = player1.startAmount

function betAmount(amount) {
  // bankroll can not go below zero. If you have enough money you can increase your bet by amount.
  if (player1.start === true) {
    alert("You can't add to your bet after the cards have been dealt!")

    // player can double down if he has enough money
  } else if (bankRoll.innerHTML - amount >= 0 && player1.double === true) {
    if (player1.doubleDownBet <= player1.yourBet === true) {
      if (amount + player1.doubleDownBet > player1.yourBet) {
        alert("You can't double down for more.")
      } else {
        doubleDownBetArea.innerHTML = player1.doubleDownBet += amount

        bankRoll.innerHTML -= amount
      }
    }

    //bankroll will reduce by amount
  } else if (bankRoll.innerHTML - amount >= 0) {
    // bankroll will reduce by amount
    wagerArea.innerHTML = player1.yourBet += amount
    // wager area will increase by amount
    bankRoll.innerHTML -= amount
  } else {
    alert("You dont have enough cash money")
  }
}

// reset bank if player ends at 0
const resetBank = () => {
  if (bankRoll.innerHTML == 0) {
    alert("You ran out of money. Here's a gift of 1000 to continue playing!")
    bankRoll.innerHTML = player1.startAmount
  }
}
// adding listener to button and invoking betAmount on click
twentyFiveBtn.addEventListener("click", () => {
  removeReset(), (player1.bet = true), betAmount(25)
})
hundredBtn.addEventListener("click", () => {
  removeReset(), (player1.bet = true), betAmount(100)
})
fiveHundredBtn.addEventListener("click", () => {
  removeReset(), (player1.bet = true), betAmount(500)
})

// grabbing bet button
let betBtn = document.getElementById("bet")

// start game
function bet() {
  // game won't start if bet === false
  if (player1.bet === false) {
    alert("You need to place a bet first!")

    // when bet is placed, bet = true then game will start
  } else if (player1.start === true) {
    alert("You've already placed your bet ")
  } else if (player1.double === true) {
    player1.bet = true
    player1.start = true
    hit()
    stand()

    //if bet is placed game can start
  } else if (wagerArea.innerHTML > 0) {
    setTimeout(() => {
      startGame(), (player1.start = true)
    }, 25)
  }
}

betBtn.addEventListener("click", bet)

// get hit button id
let hitButton = document.getElementById("hit")

function hit() {
  // bet must be placed in order to hit
  if (player1.bet === false) {
    alert("You need to place a bet first!")
  }
  if (player1.start === false) {
    alert("You need to start game before you can hit!")
  }
  if (player1.total == 21) {
    alert("You have 21! You should stand!")
  }
  setTimeout(() => {
    if (player1.total > 21) {
      player1.checkAce(playerCardTotal)
    }
  }, 25)

  if (player1.total < 21 && player1.bet === true && player1.start === true) {
    // must place a bet and start game in order to hit
    player1.drawCard(playerCardSection, playerCardTotal)
  }

  setTimeout(() => {
    if (player1.total > 21) {
      // if playerTotal > 21 you will bust and game will reset

      handResult()
    }
  }, 100)
}
hitButton.addEventListener("click", hit)

let doubleBtn = document.getElementById("double")
let doubleDownBetArea = document.getElementById("doubleDown")
doubleDownBetArea.innerHTML = null
doubleBtn.addEventListener("click", function () {
  // start sets to false so bet buttons can be clicked
  player1.start = false
  // double = true which allows the player to double
  player1.double = true
})
// when player stands the dealer will draw up to a total of 17 and winner will be determined
let standButton = document.getElementById("stand")

function stand() {
  // dealer will reveal hole card and while dealerTotal is < 17 dealer will draw cards
  dealer.show = true
  dealer.dealerShowCard(dealerCardSection, dealerCardTotal)
  dealer.hide = false

  if (dealer.total > 21) {
    dealer.checkAce(dealerCardTotal)
  }

  setTimeout(() => {
    while (dealer.total < 17) {
      // if dealerTotal > 21 and aceCount > 0. Then dealer total will reduce by 10  and aceCount will reduce by 1 to prevent dealer from busting.
      dealer.drawCard(dealerCardSection, dealerCardTotal)
      if (dealer.total > 21) {
        dealer.checkAce(dealerCardTotal)
      }
    }
  }, 25)

  // result displayed after dealer finishes drawing phase

  setTimeout(() => {
    handResult()
  }, 100)
}
standButton.addEventListener("click", stand)
