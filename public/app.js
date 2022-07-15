const API_URL = `https://api.github.com/users/gabrielcrackpro/repos?sort=created`;

const getLastRepos = async (limit) => {
  const url = `${API_URL}&per_page=${limit}`;
  const repos = await fetch(url, {
    headers: {
      accept: "application/vnd.github+json",
    },
  }).then((res) => res.json());
  return repos;
};

const formatTime = (time) => new Date(time).toLocaleDateString();

const projectsContainer = document.querySelector("#projects-container");

window.onload = async () => {
  const repositories = await getLastRepos(10);
  repositories.forEach((repo) => {
    projectsContainer.innerHTML += `
    <div class="card" style="width: 18rem;">
     <div class="card-body">
     <h5 class="card-title">${
       repo.fork
         ? `<img src="${repo.owner.avatar_url}" height="30" width="30"> <i class="bi bi-signpost-split-fill" title="Forked"></i>  ${repo.name}`
         : `<img src="${repo.owner.avatar_url}" height="30" width="30"> <i class="bi bi-unlock-fill" title="Public"></i> ${repo.name}`
     }</h5>
     <p class="card-text">${repo.description}</p>
     <p class="card-text"><i class="bi bi-code-slash"></i> ${
       repo.language ? repo.language : "Unkwon"
     }</p>
    <p class="card-text"><i class="bi bi-calendar-fill" title="Created At"></i> ${formatTime(
      repo.created_at
    )}</p>
       <p class="card-text"><i class="bi bi-clock-fill" title="Updated At"></i> ${formatTime(
         repo.updated_at
       )}</p>
     <a href="${
       repo.url
     }" target="_blank" class="btn btn-primary btn-sm"><i class="bi bi-github"></i> Visit Repo</a>
     <a href="${
       repo.homepage ? repo.homepage : "#"
     }" target="_blank" class="btn btn-primary btn-sm"><i class="bi bi-link-45deg"></i>${
      repo.homepage ? "Visit App" : ""
    }</a>
   </div>
 </div>
    `;
  });
};
