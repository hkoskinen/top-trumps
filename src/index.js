import card from './card';
import button from './button';
import './styles.css';

const h1 = children => `<h1 class="game__title">${children}</h1>`;
const p = children => `<p>${children}</p>`;

class App {
  constructor(root) {
    this.root = root;
    this.state = {
      deck: [],
      playerDeck: [],
      computerDeck: []
    };
    this.setState();
    this.componentDidMount();
  }
  setState(nextState) {
    this.state = { ...this.state,
      ...nextState
    };
    this.root.innerHTML = this.render();
  }
  componentDidMount() {
    fetch('/api/top-packages.json')
      .then(response => response.json())
      .then(data => {
        const deck = this.shuffleDeck(data);
        console.log('Shuffled deck', deck);
        this.setState({
          deck,
          playerDeck: deck.slice(0, deck.length / 2),
          computerDeck: deck.slice(deck.length / 2)
        });
      });
  }
  render() {
    if (!this.state.deck) return 'Loading...';
    return `
      <div class="game">
        ${h1('npm Package Expert')}
        <div class="cards">
          ${card(this.state.playerDeck[0])}
        </div>
        <div class="buttons">
          ${button('app.continue()', 'Continue')}
          ${button('app.playAgain()', 'Play Again')}
        </div>
        <div class="status" onClick="app.playAgain()">
          ${p('Guess a property from your card and see if it wins computer\'s!')}
        </div>
      </div>
    `;
  }
  shuffleDeck(array) {
    const copy = [...array];
    for (let i = 0; i < copy.length; i++) {
      const temp = copy[i];
      const r = Math.floor(Math.random() * copy.length);
      copy[i] = copy[r];
      copy[r] = temp;
    }
    return copy;
  }

  continue () {
    console.log('Continue playing');
  }

  playAgain() {
    console.log('Play again');
  }

  compareCards(stat) {

    const playerStat = this.state.playerDeck[0][stat];
    const computerStat = this.state.computerDeck[0][stat];

    if (playerStat === computerStat) {
      // if stas are equal

    }

    // stat == the stat to compare
    // compare both decks top cards this.state.computerDeck[0]
    // and this.state.playerDeck[0].

    // If values are equal:
    // * show notification
    // * let the player guess again

    // if values are not equal:
    // * show both cards
    // * show which one won
    // * show continue / play again buttons

    // if player clicks continue button
    // * both cards go to the bottom of the winners deck

    // if both players have cards in their deck
    // * play again

    // when one of the players cards run out
    // * game over
  }
}

global.app = new App(document.getElementById('root'));
