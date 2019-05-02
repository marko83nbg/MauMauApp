function startGame() {
    location.assign('maumau.html');
}

var players = [];

function addPlayer() {
    var playersName = document.getElementById('name').value;
    if ( playersName.length == 0 ) {
        alert( 'Unesite ime igrača!' );
        return;
    }
    if (players.find(player => player.name.toLowerCase() === playersName)) {
        alert( `Igrac sa imenom ${playersName} vec postoji!`);
        return;
    }
    players.push({
        name: playersName,
        score: 0,
    });

    var tableHtml = '<table class="table table-striped"><tr><th>Ime</th><th>Rezultat</th><th></th><th></th></tr>';

    for ( var i = 0; i < players.length; i++) {
        var idName = players[i].name.replace(/ /g, '').toLowerCase();
        tableHtml += '<tr><td class="player-name">' + players[i].name + '</td>'
                       + '<td id = "final_score_'+idName+'" class = "player-score">' + players[i].score + '</td>'
                       + '<td><input type = "text" id = "curent_score_'+idName+'"></td>'
                       + '<td><button id = "btn_'+idName+'"  class = "buttons" onclick = "addScore(this)">Dodaj</button></td>';
    }
    tableHtml += '</table>';
    document.getElementById('players').innerHTML = tableHtml;
    document.getElementById('name').value = '';
      
};


function addScore(btn) {
    
    var id = btn.id.split('btn_')[1];
    var scoreElement = document.getElementById('curent_score_' + id);
    if (scoreElement.value === '') {
        alert('Unesite rezultat!');
        return;
    }
    var score = parseInt(scoreElement.value);
    
    var playerForUpdate = players.find(player => player.name.toLowerCase() === id);
    playerForUpdate.score += score;

    if (playerForUpdate.score < 0) {
        document.getElementById('final_score_'+id).style.color = '#33cc33';
    } else if (playerForUpdate.score >= 0 && playerForUpdate.score <= 250){
        document.getElementById('final_score_'+id).style.color = '#fff';
    } else if (playerForUpdate.score > 250 && playerForUpdate.score <= 380) {
        document.getElementById('final_score_'+id).style.color = '#ffcc00';
    } else if (playerForUpdate.score > 380 && playerForUpdate.score <= 500) {
        document.getElementById('final_score_'+id).style.color = '#ff9933';
    } else {
        document.getElementById('final_score_'+id).style.color = '#cc0000';
    }

    document.getElementById('final_score_'+id).innerText = playerForUpdate.score;
    

    if (playerForUpdate.score > 500) {
        document.getElementById('final_score_'+id).innerText = playerForUpdate.score + ' Izgubio/la si!!!! :P';
    }

    document.getElementById('curent_score_'+id).value = '';

}


/////////////////////////////////////////////////////////////////////////////////////////////////////////

/* LISTA POBEDNIKA */ 

//document.getElementById('winners').addEventListener('click', addWinner);

function addWinner(event) {
    event.preventDefault();
    const winnersName = document.getElementById('winners-name').value;
    const date = document.getElementById('date').value;

    save(winnersName, date);
    showWinners();

    document.getElementById('winners-name').value = '';
    document.getElementById('date').value = '';
}

function save(winnersName, date) {
    let listOfWinners = [];
    const newWinner = {
        winnersName: winnersName,
        date: date
    }

    if (localStorage.getItem('listOfWinners')) {
        
        listOfWinners = JSON.parse(localStorage.getItem('listOfWinners'));
        
        if (!listOfWinners.find(winner => winner.winnerName === newWinner.winnerName)) {
        listOfWinners.push(newWinner);
        localStorage.setItem('listOfWinners', JSON.stringify(listOfWinners));
         } 
    } else {
        listOfWinners.push(newWinner);
        localStorage.setItem('listOfWinners', JSON.stringify(listOfWinners));
    }
}

function showWinners() {
    const listOfWinners = JSON.parse(localStorage.getItem('listOfWinners'));
    document.getElementById('content').innerHTML = '<table></table>';
    
    let winnersTableHtml = "<table class='table table-striped'>";
    listOfWinners.forEach(winner => {
        winnersTableHtml += `<tr><td>${winner.winnersName}</td><td>${winner.date}</td></tr>`
    });
    winnersTableHtml += "</table>";
    document.getElementById('content').innerHTML += winnersTableHtml;
}

function deletePlayer() {}

















