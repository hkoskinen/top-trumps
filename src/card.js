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

  return `
    <div class="card">
      <div class="card__container ${isPlayer ? 'card__container--player' : 'card__container--computer'}">
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

export default card;
