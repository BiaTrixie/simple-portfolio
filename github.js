async function fetchGithubContributions(username) {
    const response = await fetch(`https://api.github.com/users/${username}/events/public`);
    const data = await response.json();
    return data;
}

// Função para processar e exibir as contribuições do GitHub
async function displayGithubContributions(username, elementId) {
    const events = await fetchGithubContributions(username);

    // Filtrar os eventos relacionados a contribuições
    const contributions = events.filter(event => event.type === "PushEvent");

    // Construir uma lista HTML com as contribuições
    const contributionsList = contributions.map(event => {
        const date = new Date(event.created_at).toLocaleDateString();
        const repoName = event.repo.name;
        const commitCount = event.payload.commits.length;
        return `<li>${date}: ${commitCount} commits no repositório ${repoName}</li>`;
    }).join('');

    // Exibir a lista de contribuições no elemento HTML especificado
    document.getElementById(elementId).innerHTML = `<ul>${contributionsList}</ul>`;
}

// Chamar a função para exibir as contribuições do GitHub (substitua 'seu-nome-de-usuario' pelo seu nome de usuário do GitHub)
displayGithubContributions('BiaTrixie', 'github-contributions');