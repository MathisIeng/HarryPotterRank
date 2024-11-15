// Je récupère tout mes boutons via leurs ID
const btnGry = document.querySelector('#btnGry');
const btnSerp = document.querySelector('#btnSerp');
const btnPouf = document.querySelector('#btnPouf');
const btnSerd = document.querySelector('#btnSerd');

// Je récupère tout mes <p> de mon html qui ont chacun un ID
// Et ce <p> affichera le total des points pour chaque maison
const pointsGry = document.querySelector('#totalGry');
const pointsSerp = document.querySelector('#totalSerp');
const pointsPouf = document.querySelector('#totalPouf');
const pointsSerd = document.querySelector('#totalSerd');

// J'initialise les points de chaque maison à 0
let totalPoints = {
    totalGry: 0,
    totalSerp: 0,
    totalPouf: 0,
    totalSerd: 0,
}

// Fonction qui permet de récupérer le total des points de mes maisons
// Et le stock dans le local storage
function loadPointsFromLocalStoragePerHouse() {
    totalPoints.totalGry = parseInt(localStorage.getItem('totalPointsGry'));
    totalPoints.totalSerp = parseInt(localStorage.getItem('totalPointsSerp'));
    totalPoints.totalPouf = parseInt(localStorage.getItem('totalPointsPouf'));
    totalPoints.totalSerd = parseInt(localStorage.getItem('totalPointsSerd'));

    // Met à jour l'affichage
    pointsGry.textContent = `${totalPoints.totalGry} points pour Gryffondor`;
    pointsSerp.textContent = `${totalPoints.totalSerp} points pour Serpentard`;
    pointsPouf.textContent = `${totalPoints.totalPouf} points pour Poufsouffle`;
    pointsSerd.textContent = `${totalPoints.totalSerd} points pour Serdaigle`;

    // On pense bien à rappeler notre fonction de rank afin que le classement
    // Ne change pas même après refresh de la page
    rankHouse();
}

loadPointsFromLocalStoragePerHouse();

// Fonction pour trier et réorganiser les maisons en fonction des points
function rankHouse() {
     // Récupère la section parent où les maisons sont affichées
     const rankingSection = document.querySelector('#housesRanking');
    // Crée un tableau des maisons avec leurs scores et leurs éléments HTML
    const houses = [
        { name: 'Gryffondor', total: totalPoints.totalGry, element: pointsGry },
        { name: 'Serpentard', total: totalPoints.totalSerp, element: pointsSerp },
        { name: 'Poufsouffle', total: totalPoints.totalPouf, element: pointsPouf },
        { name: 'Serdaigle', total: totalPoints.totalSerd, element: pointsSerd }
    ];

    // Trie les maisons par nombre de points, du plus élevé au plus bas
    houses.sort((a, b) => b.total - a.total);

    // Réorganise les éléments HTML des maisons dans l'ordre trié
    houses.forEach(house => {
        rankingSection.appendChild(house.element.parentElement);
    });
}

btnGry.addEventListener('click', () => {
    const input = document.querySelector('input[name="Gryffondor"]');
    const pointsAjoutes = parseInt(input.value) || 0;
    totalPoints.totalGry += pointsAjoutes;
    pointsGry.textContent = `${totalPoints.totalGry} points pour Gryffondor`;

    // Sauvegarder uniquement les points de Gryffondor
    localStorage.setItem('totalPointsGry', totalPoints.totalGry);

    rankHouse();
});

// Ci dessous on va répéter 4 fois addEventListener pour chaque bouton qui correspond à la maison
btnSerp.addEventListener('click', () => {
    const input = document.querySelector('input[name="Serpentard"]'); // On récupère le name de mon input
    const pointsAjoutes = parseInt(input.value); // Converti la valeur de l'input en nombre
    totalPoints.totalSerp += pointsAjoutes; // On ajoute au points de Serpentard les nouveaux points entrés
    pointsSerp.textContent = `${totalPoints.totalSerp} points pour Serpentard`; // On affiche le total dans notre <p>

    // Mettre à jour les points totaux de Serpentard dans le localStorage
    localStorage.setItem('totalPointsSerp', totalPoints.totalSerp);
    // On appelle la fonction de classement pour mettre à jour le rank de nos maisons
    rankHouse();
});

btnPouf.addEventListener('click', () => {
    const input = document.querySelector('input[name="Poufsouffle"]');
    const pointsAjoutes = parseInt(input.value);
    totalPoints.totalPouf += pointsAjoutes;
    pointsPouf.textContent = `${totalPoints.totalPouf} points pour Poufsouffle`;

    localStorage.setItem('totalPointsPouf', totalPoints.totalPouf);

    rankHouse();
});

btnSerd.addEventListener('click', () => {
    const input = document.querySelector('input[name="Serdaigle"]');
    const pointsAjoutes = parseInt(input.value);
    totalPoints.totalSerd += pointsAjoutes;
    pointsSerd.textContent = `${totalPoints.totalSerd} points pour Serdaigle`;

    localStorage.setItem('totalPointsSerd', totalPoints.totalSerd);

    rankHouse();
});