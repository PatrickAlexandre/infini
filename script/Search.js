function performSearch(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value;
    if (query.startsWith('http://') || query.startsWith('https://')) {
        window.open(query, '_blank');
    } else {
        window.open('https://www.google.com/search?q=' + encodeURIComponent(query), '_blank');
    }
}

function searchMemory(event) {
    event.preventDefault();
    const memoryQuery = document.getElementById('memoryInput').value;
    alert('Recherche dans la mémoire de Patrick pour : ' + memoryQuery);
    // Ici, tu pourrais ajouter une vraie logique pour rechercher dans la "mémoire de Patrick"
}
