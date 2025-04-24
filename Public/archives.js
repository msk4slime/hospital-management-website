document.getElementById('view-tab').addEventListener('click', afficherArchives);
function testerLocalStorage() {
    console.log("Victims : ", JSON.parse(localStorage.getItem("victims")));
    console.log("Intervention : ", JSON.parse(localStorage.getItem("intervention")));
}
testerLocalStorage();

function afficherArchives() {
    const archiveList = document.getElementById('archive-list');
    archiveList.innerHTML = ''; // Réinitialise la liste

    // Récupération des données
    const victimes = JSON.parse(localStorage.getItem("victims")) || [];
    const interventions = JSON.parse(localStorage.getItem("intervention")) || [];

    // Création des fiches patients
    victimes.forEach(victime => {
        const section = document.createElement('div');
        section.className = 'card mb-3';
        section.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">Victime : ${victime.nom} (ID: ${victime.id})</h5>
                <p><b>Âge :</b> ${victime.age}</p>
                <p><b>Genre :</b> ${victime.genre}</p>
            </div>
        `;

        // Lier les interventions associées
        const interventionsAssociees = interventions.filter(i => i.victimeId == victime.id);
        if (interventionsAssociees.length > 0) {
            const interventionDetails = document.createElement('div');
            interventionDetails.innerHTML = '<h6 class="mt-3">Interventions Associées :</h6>';
            interventionsAssociees.forEach(intervention => {
                const interventionInfo = document.createElement('p');
                interventionInfo.innerHTML = `
                    <b>Date :</b> ${intervention.date}<br>
                    <b>Bilan Circonstanciel :</b> ${intervention.bilanCirconstanciel}<br>
                    <b>Bilan Respiratoire :</b> ${intervention.bilanRespiratoire}%<br>
                    <b>Bilan Circulatoire :</b> ${intervention.bilanCirculatoire}<br>
                    <b>Observations :</b> ${intervention.observations}
                `;
                interventionDetails.appendChild(interventionInfo);
            });
            section.appendChild(interventionDetails);
        } else {
            section.innerHTML += '<p class="text-muted">Aucune intervention associée.</p>';
        }
        archiveList.appendChild(section);
    });
}

