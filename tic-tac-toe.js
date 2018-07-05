console.log('tic-tac-toe');



var boxes = document.querySelectorAll('.box');
var counter = 0;
var winnerArray = ['123','147','456','258','789','369','357','159'];
var score ={
    player1:0,
    player2:0,
    totalRounds:0
}

score.player1 = Number(localStorage.getItem('player1'));
score.player2 = Number(localStorage.getItem('player2'));
score.totalRounds = Number(localStorage.getItem('totalRounds'));
var counter = score.totalRounds%2;
var musicCounter = 0;

document.querySelector('#player1').textContent = score.player1;
document.querySelector('#player2').textContent = score.player2;

boxes.forEach(function(box){
    box.addEventListener('click',clickedBox);
    displayCurrentPlayer();
});

document.querySelector('.button').addEventListener('click',resetGame);
document.querySelector('.newgame').addEventListener('click',newGame);
document.querySelector('.music').addEventListener('click',controlMusic);
document.querySelector('footer img').addEventListener('click',meow);

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
        score.totalRounds +=1;
        document.querySelector('.result').textContent = 'nobody won this round'
        document.querySelector(".result-and-reset").classList.remove('hidden');
        document.querySelector('.currentplayer').classList.add('hidden');
    }

    localStorage.setItem('player1',score.player1);
    localStorage.setItem('player2',score.player2);
    localStorage.setItem('totalRounds',score.totalRounds);

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
            score.totalRounds +=1;
            document.querySelector('.result').textContent = 'winner is ' + player;
            document.querySelector('#'+player).textContent = score[player];
            document.querySelectorAll('.box').forEach(function(a){
                a.removeEventListener('click',clickedBox);
            })
            document.querySelector(".result-and-reset").classList.remove('hidden');
            document.querySelector('.currentplayer').classList.add('hidden');
            return true;
        }
    }
}

function resetGame(){
    boxes.forEach(function(box){
        box.className = 'box';
        box.addEventListener('click',clickedBox);
    });
    document.querySelector(".result-and-reset").classList.add('hidden');
    document.querySelector('.currentplayer').classList.remove('hidden');
    counter = score.totalRounds%2;
    displayCurrentPlayer();
}

function displayCurrentPlayer(){
    if(counter%2===0){
        document.querySelector('.currentplayer span').innerHTML = '<img src="images/player1.png" alt="current player logo" class ="small-logo">'
    } else {
        document.querySelector('.currentplayer span').innerHTML ='<img src="images/player2.png" alt="current player logo" class ="small-logo">'
    }
}

function newGame(){
    localStorage.player1 = '0';
    localStorage.player2 = '0';
    localStorage.totalRounds = '0';
    score.player1=0;
    score.player2=0;
    score.totalRounds=0;
    resetGame();
    document.querySelector('#player1').textContent = score.player1;
    document.querySelector('#player2').textContent = score.player2;
}

function controlMusic(){
    musicCounter +=1;
    if(musicCounter%2===1){
        document.querySelector('header audio').play();
        document.querySelector('.music').textContent = 'music on'

    } else{
        document.querySelector('header audio').pause();
        document.querySelector('.music').textContent = 'no music'
    }
}

function meow(){
    document.querySelector('footer audio').play();
}