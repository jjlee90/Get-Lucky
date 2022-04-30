// Card deck blueprint
class cardDeck {
    // pass suit of the cards to be made
    constructor(suit) {
            this.suit = suit
        }
        // method to make 13 cards
    makeDeck(suit) {
        return [
            ["Ace", this.suit = suit, 1],
            ["King", this.suit = suit, 10],
            ["Queen", this.suit = suit, 10],
            ["Jack", this.suit = suit, 10],
            ["10", this.suit = suit, 10],
            ["9", this.suit = suit, 9],
            ["8", this.suit = suit, 8],
            ["7", this.suit = suit, 7],
            ["6", this.suit = suit, 6],
            ["5", this.suit = suit, 5],
            ["4", this.suit = suit, 4],
            ["3", this.suit = suit, 3],
            ["2", this.suit = suit, 2],
        ]
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