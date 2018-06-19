const button = (onClick, children) =>
  `<button onClick="${onClick.replace(/"/g, '&quot;')}" class="button">
    ${children}
  </button>`;

export default button;
