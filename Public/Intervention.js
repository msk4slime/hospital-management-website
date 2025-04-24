// Initialisation des données d'interventions dans localStorage
const interventionsKey = "interventions";
if (!localStorage.getItem(interventionsKey)) {
    localStorage.setItem(interventionsKey, JSON.stringify([])); // Initialise un tableau vide
}

document.getElementById('form-intervention').addEventListener('submit', function (e) {
    e.preventDefault();

    // Récupérer les données du formulaire
    const victimeId = document.getElementById('victime-id').value;
    const bilanCirconstanciel = document.getElementById('bilan-circonstanciel').value;
    const bilanRespiratoire = parseFloat(document.getElementById('bilan-respiratoire').value);
    const bilanCirculatoire = document.getElementById('bilan-circulatoire').value;
    const observations = document.getElementById('observations').value;
    const alertDanger = document.getElementById('alert-danger');

    // Vérification des mesures critiques
    if (bilanRespiratoire < 90) {
        alertDanger.classList.remove('visually-hidden');
        alertDanger.textContent = `⚠️ Attention : Taux d'oxygène critique (${bilanRespiratoire}%) ! Patient en danger de mort !`;
    } else {
        alertDanger.classList.add('visually-hidden');
    }

    // Créer une nouvelle intervention
    const nouvelleIntervention = {
        victimeId: victimeId,
        bilanCirconstanciel: bilanCirconstanciel,
        bilanRespiratoire: bilanRespiratoire,
        bilanCirculatoire: bilanCirculatoire,
        observations: observations,
        date: new Date().toLocaleString(),
    };

    // Ajouter l'intervention à l'archive
    const interventions = JSON.parse(localStorage.getItem(interventionsKey));
    interventions.push(nouvelleIntervention);
    localStorage.setItem(interventionsKey, JSON.stringify(interventions));

    // Confirmation
    alert("Intervention ajoutée avec succès !");
    this.reset();
});
