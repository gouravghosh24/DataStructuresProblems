const searchInput = document.getElementById('code-search');
const searchButton = document.getElementById('search-button');
const codeResults = document.getElementById('code-results');

const codeSnippets = [ 
  // your code snippets array
];

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.toLowerCase().trim();
  if (searchTerm === '') {
    codeResults.innerHTML = '';
    return;
  }
  let foundSnippet = null;
  codeSnippets.forEach(snippet => {
    if (snippet.topic.toLowerCase().includes(searchTerm)) {
      foundSnippet = snippet;
    }
  });
  if (foundSnippet) {
    let resultHtml = `
      <div class="code-block">
        <h3>${foundSnippet.topic}</h3>
        <p>${foundSnippet.info}</p>
        <pre><code class="cpp">${foundSnippet.code.join('\n')}</code></pre>
      </div>
    `;
    codeResults.innerHTML = resultHtml;
  } else {
    codeResults.innerHTML = 'No matching code snippet found';
  }
  searchInput.value = ''; // Clear the search input field
});
