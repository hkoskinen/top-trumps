import {
  shuffle
} from 'lodash';

import card from './card';
import button from './button';

import './styles.css';

const h1 = children => `<h1 class="game__title">${children}</h1>`;
const p = children => `<p>${children}</p>`;

const statusMessages = {
  'start': 'Select property from your card!',
  'equalStat': 'Properties are equal. Select another one!',
  'playerHasBetterStat': 'You have better property! You got computer\'s card.',
  'computerHasBetterStat': 'Computer has better property! Computer got your card.',
  'playerWins': 'You win!',
  'computerWins': 'Computer wins!',
};

class App {
  constructor(root) {
    this.root = root;
    this.state = {
      deck: [],
      shuffledDeck: [],
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
        const deck = data;
        const shuffledDeck = shuffle(data);
        this.setState({
          deck,
          shuffledDeck,
          playerDeck: shuffledDeck.slice(0, shuffledDeck.length / 2),
          computerDeck: shuffledDeck.slice(shuffledDeck.length / 2)
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
        <div class="status">
          ${p(statusMessages.start)}
        </div>
        <div class="buttons">
          ${button('app.continue()', 'Continue')}
          ${button('app.playAgain()', 'Play Again')}
        </div>
      </div>
    `;
  }

  continue () {}

  playAgain() {
    const shuffledDeck = shuffle(this.state.deck);

    this.setState({
      shuffledDeck,
      playerDeck: shuffledDeck.slice(0, shuffledDeck.length / 2),
      computerDeck: shuffledDeck.slice(shuffledDeck.length / 2)
    });
  }

  selectStat(selectedStat) {
    if (selectedStat === 'name' || selectedStat === 'version') return;
    this.setState({
      selectedStat
    });
    this.compareCards(selectedStat);
  }

  compareCards(stat) {
    const playerStat = this.state.playerDeck[0][stat];
    const computerStat = this.state.computerDeck[0][stat];

    // TEST EQUALITY
    if (playerStat === computerStat) {
      return;
    }

    // TEST IF STAT IS GREATER OR LOWER
    let newPlayerDeck = [...this.state.playerDeck];
    let newComputerDeck = [...this.state.computerDeck];

    switch (stat) {
      case 'dependents':
      case 'downloadsLastMonth':
      case 'maintenance':
      case 'popularity':
      case 'quality':
      case 'releases':
        if (playerStat > computerStat) {
          newPlayerDeck.push(newPlayerDeck.shift(), newComputerDeck.shift());
        } else {
          newComputerDeck.push(newComputerDeck.shift(), newPlayerDeck.shift());
        }
        this.setState({
          playerDeck: newPlayerDeck,
          computerDeck: newComputerDeck
        });
        break;

      case 'dependencies':
      case 'openIssues':
      case 'openPullRequests':
        if (playerStat < computerStat) {
          newPlayerDeck.push(newPlayerDeck.shift(), newComputerDeck.shift());
        } else {
          newComputerDeck.push(newComputerDeck.shift(), newPlayerDeck.shift());
        }
        this.setState({
          playerDeck: newPlayerDeck,
          computerDeck: newComputerDeck
        });
        break;
    }

    // CHECK IF OTHER PLAYER'S DECK IS EMPTY
    if (this.state.playerDeck.length === 0) {

    } else if (this.state.computerDeck.length === 0) {

    }
  }
}

global.app = new App(document.getElementById('root'));
