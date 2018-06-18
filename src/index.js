const button = (onClick, children) =>
  `<button onClick="${onClick.replace(/"/g, '&quot;')}">
    ${children}
  </button>`;

const h1 = children => `<h1>${children}</h1>`;

class App {
  constructor(root) {
    this.root = root;
    this.state = {
      counter: 0
    };
    this.setState();
  }
  setState(nextState) {
    this.state = { ...this.state,
      ...nextState
    };
    this.root.innerHTML = this.render();
  }
  increase() {
    this.setState({
      counter: this.state.counter + 1
    });
  }
  decrease() {
    this.setState({
      counter: this.state.counter - 1
    });
  }
  render() {
    return `
      ${h1('Counter')}
      <div>${this.state.counter}</div>
      ${button('app.decrease()', '-')}
      ${button('app.increase()', '+')}
    `;
  }
}

const app = new App(document.getElementById('root'));
