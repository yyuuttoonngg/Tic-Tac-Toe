console.log('tic-tac-toe');
document.querySelector('header audio').pause();


var boxes = document.querySelectorAll('.box');
var counter = 0;
var musicCounter = 0;
var winnerArray = ['123','147','456','258','789','369','357','159'];
var score ={
    player1:0,
    player2:0,
    totalRounds:0,
    highestScore:0
};
var timerID;
var timerbtn = document.querySelector('.timer');
var resultAndResetArea = document.querySelector(".result-and-reset");
var currentPlayerArea =  document.querySelector('.currentplayer');
var resultArea = document.querySelector('.result');


function onload(){
    getStorage();
    displayScore();
    boxes.forEach(function(box){
        box.addEventListener('click',clickedBox);
        displayCurrentPlayer();
    });
    document.querySelector('.reset').addEventListener('click',resetGame);
    document.querySelector('.newgame').addEventListener('click',newGame);
    document.querySelector('.music').addEventListener('click',controlMusic);
    document.querySelector('footer img').addEventListener('click',meow); 
}
onload();


function getStorage(){
    score.player1 = Number(localStorage.getItem('player1'));
    score.player2 = Number(localStorage.getItem('player2'));
    score.totalRounds = Number(localStorage.getItem('totalRounds'));
    score.highestScore = Number(localStorage.getItem('highestScore'));
}

function displayScore(){
    document.querySelector('#player1').textContent = score.player1;
    document.querySelector('#player2').textContent = score.player2;
    document.querySelector('.highest-score').textContent = 'Record Score: '+score.highestScore;
}

function clickedBox(event){
    clearTimeout( timerID );
    timerbtn.classList.remove('hidden');
    timer(10);
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
        resultArea.textContent = 'nobody won this round'
        resultAndResetArea.classList.remove('hidden');
        currentPlayerArea.classList.add('hidden');
        clearTimeout( timerID );
        timerbtn.classList.add('hidden');
    }
    localStorage.setItem('player1',score.player1);
    localStorage.setItem('player2',score.player2);
    localStorage.setItem('totalRounds',score.totalRounds);
    localStorage.setItem('highestScore', score.highestScore);

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
            resultArea.textContent = 'winner is ' + player;
            boxes.forEach(function(a){
                a.removeEventListener('click',clickedBox);
            })
            resultAndResetArea.classList.remove('hidden');
            currentPlayerArea.classList.add('hidden');
            score.highestScore = Math.max(score.player1,score.player2,score.highestScore);
            displayScore();
            clearTimeout( timerID );
            timerbtn.classList.add('hidden');
            return true;
        }
    }
}

function resetGame(){
    clearTimeout( timerID );
    boxes.forEach(function(box){
        box.className = 'box';
        box.addEventListener('click',clickedBox);
    });
    resultAndResetArea.classList.add('hidden');
    currentPlayerArea.classList.remove('hidden');

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
    displayScore();
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

function timer(a){
    if (a>0){
        
        timerbtn.textContent = 'time left: '+ a;
        console.log(a)
        timerID =setTimeout(()=>{
        timer(a-1);
        },1000);
    }
    if (a===0){
            console.log('times up');
            timerbtn.textContent = 'times up, lost 0.5 score';       
        if (counter%2===0){
            score.player1-=0.5;
        } else{
            score.player2-=0.5;
        }
        displayScore();
        localStorage.player1 =score.player1;
        localStorage.player2 =score.player2;
    }
}