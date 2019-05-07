function startGame() {
    location.assign('maumau.html');
}

var players = [];

/* funkcija dodaje igraca u tabelu */
function addPlayer() {
    var playersName = document.getElementById('name').value;
    
    if ( playersName.length == 0 ) {
        alert( `Unesite ime igrača!`);
        return;
    }
    
    if (players.find(player => player.name.toLowerCase() === playersName.toLowerCase())) {
        alert( `Igrac sa imenom ${playersName} vec postoji!`);
        return;
    }
    
    players.push({
        name: playersName,
        score: 0,
    });

    var tableHtml = '<table class="table table-striped"><tr><th>Ime</th><th>Rezultat</th><th></th><th></th><th></th></tr>';

    for ( var i = 0; i < players.length; i++) {
        var idName = players[i].name.replace(/ /g, '').toLowerCase();
        tableHtml += '<tr><td class="player-name">' + players[i].name + '</td>'
                       + '<td id = "final_score_'+idName+'" class = "player-score">' + players[i].score + '</td>'
                       + '<td><input type = "text" id = "curent_score_'+idName+'"></td>'
                       + '<td><button id = "btn_'+idName+'"  class = "buttons" onclick = "addScore(this)">Dodaj</button></td>'
                       + '<td><button id = "del_btn_'+idName+'"  class = "buttons del_btn" onclick = "deletePlayer(this)">Izbriši</button></td>';
    }
    tableHtml += '</table>';
    document.getElementById('players').innerHTML = tableHtml;
    document.getElementById('name').value = '';
      
};

/* funkcija za sabiranje rezultata */
function addScore(btn) {
    
    var id = btn.id.split('btn_')[1];
    var scoreElement = document.getElementById('curent_score_' + id);
    
    if (scoreElement.value === '') {
        alert(`Unesite rezultat!`);
        return;
    }
    
    var score = parseInt(scoreElement.value);
    if (isNaN(score)) {
        alert(`Morate uneti broj!`);
        return;
    }
    
    var playerForUpdate = players.find(player => player.name.replace(/ /g, '').toLowerCase() === id);
    
    playerForUpdate.score += score;

    if (playerForUpdate.score < 0) {
        document.getElementById('final_score_'+id).style.color = '#33cc33';
    } else if (playerForUpdate.score >= 0 && playerForUpdate.score <= 250){
        document.getElementById('final_score_'+id).style.color = '#fff';
    } else if (playerForUpdate.score > 250 && playerForUpdate.score <= 380) {
        document.getElementById('final_score_'+id).style.color = '#ffe400';
    } else if (playerForUpdate.score > 380 && playerForUpdate.score <= 500) {
        document.getElementById('final_score_'+id).style.color = '#f87811';
    } else {
        document.getElementById('final_score_'+id).style.color = '#9c0b06';
    }

    document.getElementById('final_score_'+id).innerText = playerForUpdate.score;
    

    if (playerForUpdate.score > 500) {
        document.getElementById('final_score_'+id).innerText = playerForUpdate.score + ' Izgubio/la si!!!! :P';
    }

    document.getElementById('curent_score_'+id).value = '';

}

/* funkcija za brisanje igraca */
function deletePlayer(btn) {
    
    var id = btn.id.split('del_btn_')[1];
    var indexOfPlayerForDelete = players.findIndex(player => player.name.replace(/ /g, '').toLowerCase() === id);

    players.splice(indexOfPlayerForDelete, 1);
    
    //ponovni ispis igraca
    var tableHtml = '<table class="table table-striped"><tr><th>Ime</th><th>Rezultat</th><th></th><th></th><th></th></tr>';

    for ( var i = 0; i < players.length; i++) {
        var idName = players[i].name.replace(/ /g, '').toLowerCase();
        tableHtml += '<tr><td class="player-name">' + players[i].name + '</td>'
                       + '<td id = "final_score_'+idName+'" class = "player-score">' + players[i].score + '</td>'
                       + '<td><input type = "text" id = "curent_score_'+idName+'"></td>'
                       + '<td><button id = "btn_'+idName+'"  class = "buttons" onclick = "addScore(this)">Dodaj</button></td>'
                       + '<td><button id = "del_btn_'+idName+'"  class = "buttons del_btn" onclick = "deletePlayer(this)">Izbriši</button></td>';
    }
    tableHtml += '</table>';
    document.getElementById('players').innerHTML = tableHtml;
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* LISTA POBEDNIKA */ 

/* funkcija za ispisivanje pobednika*/
function addWinner(event) {
    event.preventDefault();
    const winnersName = document.getElementById('winners-name').value;
    const date = document.getElementById('date').value;

    if (winnersName === '') {
        alert(`Morate uneti ime pobednika!`);
        return;
    } else if (date === '') {
        alert(`Morate uneti datum pobede!`);
        return;
    }

    save(winnersName, date);
    showWinners();

    document.getElementById('winners-name').value = '';
    document.getElementById('date').value = '';
}

/* funkcija za cuvanje pobednika u local storage */
function save(winnersName, date) {
    let listOfWinners = [];
    const newWinner = {
        winnersName: winnersName,
        date: date
    }

    if (localStorage.getItem('listOfWinners')) {

        listOfWinners = JSON.parse(localStorage.getItem('listOfWinners'));

        listOfWinners.push(newWinner);
        localStorage.setItem('listOfWinners', JSON.stringify(listOfWinners));
    } else {
        listOfWinners.push(newWinner);
        localStorage.setItem('listOfWinners', JSON.stringify(listOfWinners));
    }
}

/* funkcija za prikazivanje pobednika */ 
function showWinners() {
    const listOfWinners = JSON.parse(localStorage.getItem('listOfWinners'));
    
    let winnersTableHtml = "<table class='table table-striped winner-table'>";
    listOfWinners.forEach(winner => {
        winnersTableHtml += `<tr><td>${winner.winnersName}</td><td>${winner.date}</td></tr>`
    });
    winnersTableHtml += "</table>";
    document.getElementById('content').innerHTML = winnersTableHtml;
}



















