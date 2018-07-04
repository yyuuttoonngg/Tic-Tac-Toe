console.log('tic-tac-toe');

var boxes = document.querySelectorAll('.box');
var counter = 0;
var winnerArray = ['123','147','456','258','789','369','357','159'];
var score ={
    player1:0,
    player2:0,
    totalRounds:0
}


boxes.forEach(function(box){
    box.addEventListener('click',clickedBox);
    displayCurrentPlayer();
});

document.querySelector('.button').addEventListener('click',resetGame);

function clickedBox(event){
    event.target.removeEventListener('click',clickedBox);
    if (counter%2===0){
        event.target.classList.add('player1');
    } else {
        event.target.classList.add('player2');
    }
    counter +=1; 
    checkWiner("player1");
    checkWiner("player2");

    if (((score.totalRounds%2===0&&counter===9)||(score.totalRounds%2===1&&counter===10))&&!checkWiner("player1")&&!checkWiner("player2")){
        document.querySelector('.result').textContent = 'nobody won'
        document.querySelector('.hidden').classList.add('display');
    }

    displayCurrentPlayer();
 
}

function checkWiner(player){
    var playerArray =[];
    document.querySelectorAll("."+player).forEach(function(a){
        playerArray.push(a.textContent);
    })
    var string =playerArray.join('');
    for (i=0; i<winnerArray.length; i++){
        if (string.slice(0,3) === winnerArray[i] || 
        string.slice(1)===winnerArray[i] || 
        (string.slice(0,1)+string.slice(2))===winnerArray[i] || 
        (string.slice(0,2)+string.slice(3))===winnerArray[i] ||
        string ==='12569'|| string==='23457' || string==='35678'||string ==='14589'){
            score[player] += 1;
            document.querySelector('.result').textContent = 'winner is ' + player;
            document.querySelector('#'+player).textContent = score[player];
            document.querySelectorAll('.box').forEach(function(a){
                a.removeEventListener('click',clickedBox);
            })
            document.querySelector('.hidden').classList.add('display');
            return true;
        }
    }
}

function resetGame(){
    score.totalRounds +=1;
    
    boxes.forEach(function(box){
        box.className = 'box';
        box.addEventListener('click',clickedBox);
    });
    document.querySelector('.hidden').classList.remove('display');
    counter = score.totalRounds%2;
    displayCurrentPlayer();
}

function displayCurrentPlayer(){
    if(counter%2===0){
        document.querySelector('.currentplayer').textContent = 'playing: player1'
    } else {
        document.querySelector('.currentplayer').textContent = 'playing: player2'
        
    }
}