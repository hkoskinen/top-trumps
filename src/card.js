const generateMarkupFromData = (data, selectedStat) => {
  return Object.entries(data).map(([key, val]) => {
    if (key === 'name' || key === 'version') return; // don't add name and version again

    const splittedKey = key.split(/(?=[A-Z])/).join(' ').toLowerCase();
    const prettyKey = splittedKey.substring(0, 1).toUpperCase() + splittedKey.substring(1)
    return `
      <li onclick="app.selectStat('${key}')" class="${key === selectedStat ? 'selected' : ''}">${prettyKey}<span>${val}</span></li>
    `;
  }).join('');
};

const card = (data, isPlayer = true, selectedStat) => {
  if (!data) return '<div class="card">Card data is missing</div>';

  const stats = generateMarkupFromData(data, selectedStat);

  return `
    <div class="card">
      <div class="card__container ${isPlayer ? 'card__container--player' : 'card__container--computer'}">
        <h3 class="card__title">${data.name}<span>v${data.version}</span></h3>
        <ul class="card__stats">
          ${stats}
        </ul>
      </div>
    </div>`;
};

export default card;
