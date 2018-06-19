import {
  shuffle
} from 'lodash';

import card from './card';
import button from './button';

import './styles.css';

const h1 = children => `<h1 class="game__title">${children}</h1>`;
const p = children => `<p>${children}</p>`;

const messages = {
  'start': 'Choose property from your card that you think is better',
  'equalStat': '',
  'playerHasBetterStat': '',
  'computerHasBetterStat': '',
  'playerWins': '',
  'computerWins': '',
};

class App {
  constructor(root) {
    this.root = root;
    this.state = {
      deck: [],
      playerDeck: [],
      computerDeck: [],
      selectedStat: ''
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
        const deck = shuffle(data);
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
          ${card(this.state.computerDeck[0], false)}
        </div>

        <div class="status" onClick="app.playAgain()">
          ${p('Guess a property from your card and see if it wins computer\'s!')}
        </div>
        <div class="buttons">
          ${button('app.continue()', 'Continue')}
          ${button('app.playAgain()', 'Play Again')}
        </div>
      </div>
    `;
  }

  continue () {
    console.log('Continue playing');
  }

  playAgain() {
    console.log('Play again');
  }

  selectStat(selectedStat) {
    if (selectedStat === 'name' || selectedStat === 'version') return;
    this.setState({
      selectedStat
    });
    this.compareCards(selectedStat);
  }

  compareCards(stat) {
    const playerCard = this.state.playerDeck[0];
    const computerCard = this.state.computerDeck[0];

    console.log(`Selected stat: ${stat} Player: ${playerCard[stat]} Computer: ${computerCard[stat]}`);

    if (playerCard[stat] === computerCard[stat]) {
      console.log('Found equal stats!');
    }

    switch (stat) {
      case 'dependents':
      case 'downloadsLastMonth':
      case 'maintenance':
      case 'popularity':
      case 'quality':
      case 'releases':
        console.log('GREATER value is better!');
        break;

      case 'dependencies':
      case 'openIssues':
      case 'openPullRequests':
        console.log('LOWER value is better!');
        break;
    }
  }
}

global.app = new App(document.getElementById('root'));
