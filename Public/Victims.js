// Initialisation des données de victimes dans localStorage
const victimesKey = "victimes";
if (!localStorage.getItem(victimesKey)) {
    localStorage.setItem(victimesKey, JSON.stringify([])); // Initialise un tableau vide
}

document.getElementById('form-victime').addEventListener('submit', function (e) {
    e.preventDefault();

    // Récupérer les données du formulaire
    const nom = document.getElementById('nom').value;
    const age = document.getElementById('age').value;
    const genre = document.getElementById('genre').value;
    const victimeId = Math.floor(Math.random() * 10000);

    // Créer une nouvelle victime
    const nouvelleVictime = {
        id: victimeId,
        nom: nom,
        age: age,
        genre: genre,
    };

    // Ajouter la victime à l'archive
    const victimes = JSON.parse(localStorage.getItem(victimesKey));
    victimes.push(nouvelleVictime);
    localStorage.setItem(victimesKey, JSON.stringify(victimes));

    // Confirmation
    alert(`Victime ajoutée avec succès :\nNom: ${nom}\nÂge: ${age}\nGenre: ${genre}\nID: ${victimeId}`);

    // Réinitialiser le formulaire
    this.reset();

    // Mettre à jour le menu déroulant pour les victimes dans les interventions
    updateVictimesDropdown();
});

// Fonction pour mettre à jour le menu déroulant des victimes
function updateVictimesDropdown() {
    const victimeSelect = document.getElementById('victime-id');
    const victimes = JSON.parse(localStorage.getItem(victimesKey));

    // Réinitialise le contenu du menu déroulant
    victimeSelect.innerHTML = '<option value="" disabled selected>-- Sélectionnez une victime --</option>';

    victimes.forEach(victime => {
        const option = document.createElement('option');
        option.value = victime.id;
        option.textContent = `${victime.nom} (ID: ${victime.id})`;
        victimeSelect.appendChild(option);
    });
}

// Appel initial pour charger le menu déroulant
updateVictimesDropdown();
