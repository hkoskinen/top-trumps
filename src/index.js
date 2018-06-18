const button = (onClick, children) =>
  `<button onClick="${onClick.replace(/"/g, '&quot;')}">
    ${children}
  </button>`;

const h1 = children => `<h1>${children}</h1>`;

const card = data => {
  if (!data) return '<div class="card">Card data is missing</div>';
  const {
    name,
    version,
    releases,
    dependencies,
    dependents,
    downloadsLastMonth,
    openIssues,
    openPullRequests,
    quality,
    popularity,
    maintenance
  } = data;

  return `
    <div class="card">
      <div class="card__container">
        <h3 class="card__title">${name}<span>v${version}</span></h3>
        <ul class="card__stats">
          <li>Releases<span>${releases}</span></li>
          <li>Dependencies<span>${dependencies}</span></li>
          <li>Dependents<span>${dependents}</span></li>
          <li>Downloads last month<span>${downloadsLastMonth}</span></li>
          <li>Open issues<span>${openIssues}</span></li>
          <li>Open pull requests<span>${openPullRequests}</span></li>
          <li>Quality<span>${quality}</span></li>
          <li>Popularity<span>${popularity}</span></li>
          <li>Maintenance<span>${maintenance}</span></li>
        </ul>
      </div>
    </div>`;
};

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
        this.setState({
          deck,
          playerDeck: deck.slice(0, deck.length / 2),
          computerDeck: deck.slice(deck.length / 2)
        });
      });
  }
  render() {
    return `
      ${h1('npm Package Expert')}
      <div class="cards">
        ${card(this.state.playerDeck[0])}
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

const app = new App(document.getElementById('root'));
