const button = (onClick, children) =>
  `<button onClick="${onClick.replace(/"/g, '&quot;')}">
    ${children}
  </button>`;

const h1 = children => `<h1>${children}</h1>`;

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
        deck: data
      });
  }
  render() {
    return `
      ${h1('npm Package Expert')}
    `;
  }
}

const app = new App(document.getElementById('root'));
