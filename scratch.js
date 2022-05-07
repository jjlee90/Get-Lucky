// Card deck blueprint
class cardDeck {
    // pass suit of the cards to be made
    constructor(suit, ) {
            this.suit = suit
        }
        // method to make 13 cards
    makeDeck(suit) {
        return [
            ["ace", this.suit = suit, 11],
            ["king", this.suit = suit, 10],
            ["queen", this.suit = suit, 10],
            ["jack", this.suit = suit, 10],
            ["ten", this.suit = suit, 10],
            ["nine", this.suit = suit, 9],
            ["eight", this.suit = suit, 8],
            ["seven", this.suit = suit, 7],
            ["six", this.suit = suit, 6],
            ["five", this.suit = suit, 5],
            ["four", this.suit = suit, 4],
            ["three", this.suit = suit, 3],
            ["two", this.suit = suit, 2],
        ]
    }
}
// updated
export { cardDeck }