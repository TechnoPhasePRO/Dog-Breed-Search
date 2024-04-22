const searchInput = document.getElementById('searchInput');
const suggestions = document.getElementById('suggestions');

searchInput.addEventListener('input', async (event) => {
    const query = event.target.value.trim();
    if (query.length >= 3) {
        try {
            const response = await fetch(`http://localhost:3000/breeds?q=${query}`);
            const data = await response.json();
            displaySuggestions(data, query);
        } catch (error) {
            console.error('Error fetching dog breeds:', error.message);
        }
    } else {
        suggestions.innerHTML = '';
    }
});

function displaySuggestions(breeds, query) {
    suggestions.innerHTML = '';
    breeds.forEach(breed => {
        const breedName = breed.name.toLowerCase();
        if (breedName.includes(query.toLowerCase())) {
            const breedImage = breed.image.url;
            const breedElement = document.createElement('div');
            breedElement.innerHTML = `
                <div class="breed">
                    <img src="${breedImage}" alt="${breedName}">
                    <p>${breedName}</p>
                </div>
            `;
            suggestions.appendChild(breedElement);
        }
    });
}
