const searchInput = document.getElementById('code-search');
const searchButton = document.getElementById('search-button');
const codeResults = document.getElementById('code-results');

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.toLowerCase().trim();
  if (searchTerm === '') {
    codeResults.innerHTML = '';
    return;
  }
  
  // Assuming you have a JSON file named 'files.json' with the folder structure and file names
  fetch('codes.json')
    .then(response => response.json())
    .then(files => {
      let foundFile = null;
      files.forEach(folder => {
        folder.folders.forEach(subfolder => {
          subfolder.files.forEach(file => {
            if (file.name.toLowerCase().includes(searchTerm)) {
              foundFile = file;
            }
          });
        });
      });
      
      if (foundFile) {
        fetch(foundFile.url)
          .then(response => response.text())
          .then(code => {
            codeResults.innerHTML = `
              <pre><code class="cpp">${code}</code></pre>
            `;
          });
      } else {
        codeResults.innerHTML = 'No matching code snippet found';
      }
    });
  
  searchInput.value = ''; // Clear the search input field
});
