// Card deck blueprint
class cardDeck {
    // pass suit of the cards to be made
    constructor(suit, ) {
            this.suit = suit
            this.blackjack = false
            this.bet = false
        }
        // method to make 13 cards
    makeDeck(suit) {
        return [
            ["ace", this.suit = suit, 1],
            ["ace", this.suit = suit, 1],
            ["ace", this.suit = suit, 1],
            ["ace", this.suit = suit, 1],
            ["ace", this.suit = suit, 1],
            ["ace", this.suit = suit, 1],
            ["king", this.suit = suit, 10],
            ["queen", this.suit = suit, 10],
            ["jack", this.suit = suit, 10],
            ["ten", this.suit = suit, 10],
            ["queen", this.suit = suit, 10],
            ["jack", this.suit = suit, 10],
            ["ten", this.suit = suit, 10],
        ]
    }
    blackjack(card) {
        if (card[0][2] + card[1][2] === 21) {
            this.blackjack = true
            result()
        }
    }
}


// let cardBlueprint = new cardDeck
// let spades = cardBlueprint.makeDeck("spades")
// let clubs = cardBlueprint.makeDeck("Clubs")
// let diamond = cardBlueprint.makeDeck("Diamond")
// let hearts = cardBlueprint.makeDeck("Hearts")

// let fullDeck = [...spades, ...clubs, ...diamond, ...hearts]

// console.log(fullDeck.length)

export { cardDeck }


// $("#dealerCards").ready(function() {
//     $("#dealerCards").hide()
// })

// test array 
// [
// ["ace", this.suit = suit, 1],
// ["three", this.suit = suit, 3],
// ["two", this.suit = suit, 2],
// ["three", this.suit = suit, 3],
// ["two", this.suit = suit, 2],
// ["three", this.suit = suit, 3],
// ["two", this.suit = suit, 2],
// ["three", this.suit = suit, 3],
// ["two", this.suit = suit, 2],
// ["three", this.suit = suit, 3],
// ["two", this.suit = suit, 2],
// ["three", this.suit = suit, 3],
// ["two", this.suit = suit, 2],
// ]


// test array 2
// 

// return [
//     ["ace", this.suit = suit, 1],
//     ["king", this.suit = suit, 10],
//     ["queen", this.suit = suit, 10],
//     ["jack", this.suit = suit, 10],
//     ["ten", this.suit = suit, 10],
//     ["nine", this.suit = suit, 9],
//     ["eight", this.suit = suit, 8],
//     ["seven", this.suit = suit, 7],
//     ["six", this.suit = suit, 6],
//     ["five", this.suit = suit, 5],
//     ["four", this.suit = suit, 4],
//     ["three", this.suit = suit, 3],
//     ["two", this.suit = suit, 2],
// ]