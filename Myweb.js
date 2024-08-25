const searchInput = document.getElementById('code-search');
const searchButton = document.getElementById('search-button');
const codeResults = document.getElementById('code-results');

fetch('./codes.json')
  .then(response => response.json())
  .then(data => {
    const codeSnippets = data;
    searchButton.addEventListener('click', () => {
      const searchTerm = searchInput.value.toLowerCase().trim();
      if (searchTerm === '') {
        codeResults.innerHTML = '';
        return;
      }
      const foundSnippets = {};
      codeSnippets.forEach(snippet => {
        if (snippet.topic.toLowerCase().includes(searchTerm)) {
          foundSnippets[snippet.topic] = snippet;
        }
      });
      let resultHtml = "";
      for (const topic in foundSnippets) {
        resultHtml += `
          <div class="code-block">
            <h3>${foundSnippets[topic].topic}</h3>
            <p>${foundSnippets[topic].info}</p>
            <pre><code class="cpp">${foundSnippets[topic].code.join('\n\n')}</code></pre>
          </div>
        `;
      }
      codeResults.innerHTML = resultHtml;
      searchInput.value = ''; // Clear the search input field
    });
  });
