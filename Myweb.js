const searchInput = document.getElementById('code-search');
const searchButton = document.getElementById('search-button');
const codeResults = document.getElementById('code-results');

fetch('./codes.json')
  .then(response => response.json())
  .then(data => {
    const codeSnippets = data;
    console.log('Code snippets:', codeSnippets);

    searchButton.addEventListener('click', () => {
      const searchTerm = searchInput.value.toLowerCase().trim();
      console.log('Search term:', searchTerm);

      if (searchTerm === '') {
        codeResults.innerHTML = '';
        return;
      }

      let foundSnippet = codeSnippets.find(snippet =>
        snippet.name.toLowerCase().includes(searchTerm) ||
        snippet.folders.some(folder =>
          folder.name.toLowerCase().includes(searchTerm) ||
          folder.files.some(file =>
            file.name.toLowerCase().includes(searchTerm) ||
            file.url.toLowerCase().includes(searchTerm)
          )
        )
      );

      console.log('Found snippet:', foundSnippet);

      if (foundSnippet && foundSnippet.folders[0].files[0].url) {
        fetch(foundSnippet.folders[0].files[0].url)
          .then(response => response.text())
          .then(code => {
            codeResults.innerHTML = `
              <pre><code class="cpp">${code}</code></pre>
            `;
          })
          .catch(error => {
            console.error('Error fetching code:', error);
            codeResults.innerHTML = 'Error fetching code snippet';
          });
      } else {
        codeResults.innerHTML = 'No matching code snippet found';
      }

      searchInput.value = ''; // Clear the search input field
    });
  })
  .catch(error => {
    console.error('Error loading codes.json:', error);
    codeResults.innerHTML = 'Error loading code snippets';
  });
