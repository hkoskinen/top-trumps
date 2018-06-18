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
        <h3 class="card__title">${name} - v${version}</h3>
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
        this.setState({
          deck: data
        });
      });
  }
  render() {
    return `
      ${h1('npm Package Expert')}
      <div class="cards">
        ${card(this.state.deck[0])}
      </div>
    `;
  }
}

const app = new App(document.getElementById('root'));
