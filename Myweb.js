const searchInput = document.getElementById('code-search');
const searchButton = document.getElementById('search-button');
const codeResults = document.getElementById('code-results');

const githubToken = 'g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'; // Your GitHub token
const repoOwner = 'gouravghosh24'; // Your GitHub username
const repoName = 'DsaAlgo'; // Your C++ repository name

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.toLowerCase().trim();
  if (searchTerm === '') {
    codeResults.innerHTML = '';
    return;
  }

  fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/`, {
    headers: {
      'Authorization': `token ${githubToken}`
    }
  })
  .then(response => response.json())
  .then(files => {
    console.log(files); // Log the response to see what we get
    if (!Array.isArray(files)) {
      throw new Error('Expected an array of files');
    }
    const foundSnippets = files.filter(file => file.name.toLowerCase().includes(searchTerm));
    if (foundSnippets.length === 0) {
      codeResults.innerHTML = '<p>No code snippets found.</p>';
      return;
    }
    let resultHtml = "";
    foundSnippets.forEach(file => {
      fetch(file.download_url)
        .then(response => response.text())
        .then(code => {
          resultHtml += `
            <div class="code-block">
              <h3>${file.name}</h3>
              <pre><code class="cpp">${code}</code></pre>
            </div>
          `;
          codeResults.innerHTML = resultHtml;
        });
    });
  })
  .catch(error => {
    codeResults.innerHTML = `<p>Error: ${error.message}</p>`;
  });

  searchInput.value = ''; // Clear the search input field
});
