// Paramètres personnels
const dateNaissance = new Date('1995-11-21');
const esperanceVie = 80; // en années
const poids = 60; // en kg
const taille = 1.72; // en m (172 cm)
const chargeCognitive = 40; // en pourcentage, valeur fixe
const sexe = 'homme'; // ou 'femme'
const niveauActivite = 1.55; // Facteur d'activité physique : Sédentaire = 1.2, Légèrement actif = 1.375, Modérément actif = 1.55, Très actif = 1.725, Extrêmement actif = 1.9

// Fonction pour calculer l'âge actuel
function calculerAge(dateNaissance) {
    const aujourdhui = new Date();
    let age = aujourdhui.getFullYear() - dateNaissance.getFullYear();
    const mois = aujourdhui.getMonth() - dateNaissance.getMonth();
    if (mois < 0 || (mois === 0 && aujourdhui.getDate() < dateNaissance.getDate())) {
        age--;
    }
    return age;
}

// Fonction pour calculer le pourcentage de vie restante
function calculerVieRestante(dateNaissance, esperanceVie) {
    const age = calculerAge(dateNaissance);
    const vieRestante = esperanceVie - age;
    return Math.max(0, (vieRestante / esperanceVie) * 100); // pourcentage de vie restante
}

// Calcul de l'IMC (Indice de Masse Corporelle)
function calculerIMC(poids, taille) {
    return poids / (taille * taille);
}

// Fonction pour calculer le Métabolisme de Base (MB)
function calculerMB(sexe, poids, taille, age) {
    if (sexe === 'homme') {
        return 88.362 + (13.397 * poids) + (4.799 * (taille * 100)) - (5.677 * age);
    } else {
        return 447.593 + (9.247 * poids) + (3.098 * (taille * 100)) - (4.330 * age);
    }
}

// Fonction pour calculer la Dépense Énergétique Journalière (DEJ)
function calculerDEJ(sexe, poids, taille, age, niveauActivite) {
    const MB = calculerMB(sexe, poids, taille, age);
    return MB * niveauActivite;
}

// Mise à jour des barres de progression et des autres éléments de santé
function mettreAJourEtatDeSante() {
    const age = calculerAge(dateNaissance);
    const vieRestantePourcentage = calculerVieRestante(dateNaissance, esperanceVie);
    const imc = calculerIMC(poids, taille);
    const dej = calculerDEJ(sexe, poids, taille, age, niveauActivite);

    // Mise à jour de la barre de vie restante
    const vieRestanteElement = document.getElementById('vieRestanteBar');
    vieRestanteElement.style.width = vieRestantePourcentage + '%';
    vieRestanteElement.setAttribute('aria-valuenow', vieRestantePourcentage);
    vieRestanteElement.textContent = vieRestantePourcentage.toFixed(0) + '%';
    document.getElementById('vieRestantePourcentage').textContent = vieRestantePourcentage.toFixed(0) + '%';

    // Mise à jour de la charge cognitive (valeur fixe 40%)
    const chargeCognitiveElement = document.getElementById('chargeCognitiveBar');
    chargeCognitiveElement.style.width = chargeCognitive + '%';
    chargeCognitiveElement.setAttribute('aria-valuenow', chargeCognitive);
    chargeCognitiveElement.textContent = chargeCognitive + '%';
    document.getElementById('chargeCognitivePourcentage').textContent = chargeCognitive + '%';

    // Mise à jour de l'indice IMC
    document.getElementById('imcValue').textContent = `IMC: ${imc.toFixed(2)} (Indice de Masse Corporelle)`;

    // Mise à jour de la DEJ
    document.getElementById('dejValue').textContent = dej.toFixed(0) + ' kcal';
}

// Exécuter la fonction après le chargement de la page
document.addEventListener('DOMContentLoaded', mettreAJourEtatDeSante);
