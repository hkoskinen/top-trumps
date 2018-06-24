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
  'playerWins': 'You win! Press "Play Again" to play again.',
  'computerWins': 'Computer wins! Press "Play Again" to play again.',
};

class App {
  constructor(root) {
    this.root = root;
    this.state = {
      deck: [],
      shuffledDeck: [],
      playerDeck: [],
      computerDeck: [],
      selectedStat: '',
      showComputerCard: false,
      currentStatus: statusMessages.start
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
          ${card(this.state.playerDeck[0], true, this.state.selectedStat)}
          ${`${this.state.showComputerCard ? card(this.state.computerDeck[0], false) : ''}`}
        </div>
        <div class="status">
          ${p(this.state.currentStatus)}
          ${p(`Player cards: ${this.state.playerDeck.length} Computer cards: ${this.state.computerDeck.length}`)}
        </div>
        <div class="buttons">
          ${button('app.continue()', 'Continue')}
          ${button('app.playAgain()', 'Start new game')}
        </div>
      </div>
    `;
  }

  continue () {
    this.setState({
      showComputerCard: false,
      selectedStat: ''
    });
  }

  playAgain() {
    const shuffledDeck = shuffle(this.state.deck);

    this.setState({
      shuffledDeck,
      playerDeck: shuffledDeck.slice(0, shuffledDeck.length / 2),
      computerDeck: shuffledDeck.slice(shuffledDeck.length / 2),
      currentStatus: statusMessages.start
    });
  }

  selectStat(selectedStat) {
    if (selectedStat === 'name' || selectedStat === 'version') return;
    this.setState({
      selectedStat
    });

    // test equality first...if not equal show both cards
    if (this.state.playerDeck[0][selectedStat] === this.state.computerDeck[0][selectedStat]) {
      this.setState({
        currentStatus: statusMessages.equalStat
      });
      return;
    }
    this.setState({
      showComputerCard: true
    });

    //this.compareCards(selectedStat);
  }

  playerWinsRound() {
    let newPlayerDeck = [...this.state.playerDeck];
    let newComputerDeck = [...this.state.computerDeck];
    newPlayerDeck.push(newPlayerDeck.shift(), newComputerDeck.shift());
    this.setState({
      playerDeck: newPlayerDeck,
      computerDeck: newComputerDeck
    });
  }

  computerWinsRound() {
    let newPlayerDeck = [...this.state.playerDeck];
    let newComputerDeck = [...this.state.computerDeck];
    newComputerDeck.push(newComputerDeck.shift(), newPlayerDeck.shift());
    this.setState({
      playerDeck: newPlayerDeck,
      computerDeck: newComputerDeck
    });
  }

  compareCards(stat) {
    const playerStat = this.state.playerDeck[0][stat];
    const computerStat = this.state.computerDeck[0][stat];

    // TEST EQUALITY
    if (playerStat === computerStat) {
      this.setState({
        currentStatus: statusMessages.equalStat
      });
      return;
    }

    // TEST IF STAT IS GREATER OR LOWER
    switch (stat) {
      case 'dependents':
      case 'downloadsLastMonth':
      case 'maintenance':
      case 'popularity':
      case 'quality':
      case 'releases':
        if (playerStat > computerStat) this.playerWinsRound();
        else this.computerWinsRound();
        break;

      case 'dependencies':
      case 'openIssues':
      case 'openPullRequests':
        if (playerStat < computerStat) this.playerWinsRound();
        else this.computerWinsRound();
        break;
    }

    // CHECK IF OTHER PLAYER'S DECK IS EMPTY
    if (this.state.playerDeck.length === 12) {
      this.setState({
        currentStatus: statusMessages.playerWins
      });
    } else if (this.state.computerDeck.length === 12) {
      this.setState({
        currentStatus: statusMessages.computerWins
      });
    }
  }
}

global.app = new App(document.getElementById('root'));
