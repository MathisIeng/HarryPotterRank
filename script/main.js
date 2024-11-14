const btnGry = document.querySelector('#btnGry');
const btnSerp = document.querySelector('#btnSerp');
const btnPouf = document.querySelector('#btnPouf');
const btnSerd = document.querySelector('#btnSerd');

const pointsGry = document.querySelector('#totalGry');
const pointsSerp = document.querySelector('#totalSerp');
const pointsPouf = document.querySelector('#totalPouf');
const pointsSerd = document.querySelector('#totalSerd');

let totalPoints = {
    totalGry: 0,
    totalSerp: 0,
    totalPouf: 0,
    totalSerd: 0,
}

// Fonction pour enregistrer les points dans localStorage
function savePointsToLocalStorage() {
    localStorage.setItem('totalPoints', JSON.stringify(totalPoints)); // Sauvegarde dans le localStorage
}

// Fonction pour charger les points depuis localStorage
function loadPointsFromLocalStorage() {
    const savedPoints = localStorage.getItem('totalPoints');
    if (savedPoints) {
        totalPoints = JSON.parse(savedPoints); // Récupère les points et les affecte
        // Met à jour l'affichage
        pointsGry.textContent = `${totalPoints.totalGry} points pour Gryffondor`;
        pointsSerp.textContent = `${totalPoints.totalSerp} points pour Serpentard`;
        pointsPouf.textContent = `${totalPoints.totalPouf} points pour Poufsouffle`;
        pointsSerd.textContent = `${totalPoints.totalSerd} points pour Serdaigle`;
    }
}

// Appelez la fonction pour charger les points au chargement de la page
loadPointsFromLocalStorage();

// Fonction qui prend 4 paramètres, le bouton, le nom de chaque input, les points qui s'affichent
// après avoir été ajoutés et le total
function addPoints(button, inputName, pointsElement, totalHouse) {
    button.addEventListener('click', (event) => {
        event.preventDefault(); // Empêche le rechargement du formulaire
        const input = document.querySelector(`input[name="${inputName}"]`);
        const pointsAjoutes = parseInt(input.value) // Récupère la valeur de l'input (0 par défaut si vide)
        totalPoints[totalHouse] += pointsAjoutes; // Ajoute les points au total de la maison
        pointsElement.textContent = `${totalPoints[totalHouse]} point${totalPoints[totalHouse] > 1 ? 's' : ''} pour ${inputName}`; // Affiche "point" ou "points"

        savePointsToLocalStorage();
        rankHouse(); // Met à jour le classement
    });
}

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

addPoints(btnGry, 'Gryffondor', pointsGry, 'totalGry');
addPoints(btnSerp, 'Serpentard', pointsSerp, 'totalSerp');
addPoints(btnPouf, 'Poufsouffle', pointsPouf, 'totalPouf');
addPoints(btnSerd, 'Serdaigle', pointsSerd, 'totalSerd');
