const card = (data, isPlayer = true) => {
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

  const props = Object.entries(data).map(([key, val]) => {
    const splittedKey = key.split(/(?=[A-Z])/).join(' ').toLowerCase();
    const prettyKey = splittedKey.substring(0, 1).toUpperCase() + splittedKey.substring(1)
    return `
      <li onclick="app.selectStat('${key}')">${prettyKey}<span>${val}</span></li>
    `;
  }).join('');

  return `
    <div class="card">
      <div class="card__container ${isPlayer ? 'card__container--player' : 'card__container--computer'}">
        <h3 class="card__title">${name}<span>v${version}</span></h3>
        <ul class="card__stats">
          ${props}
        </ul>
      </div>
    </div>`;
};

export default card;
