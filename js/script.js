// Q1. a
document.write('<h3>Q1. a</h3>');

var arr = ['dog', 'cat', 'deer'];
var result = arr[0] + arr[2];

document.write(result);
document.write('<br>');

// Q1. b
document.write('<h3>Q1. b</h3>');

var girls = ["Cecille", "Lone"];
var boys = ["Emil", "Tobias", "Linus"];
var children = girls.concat(boys);

document.write('<p id="demo"></p>');
document.getElementById('demo').innerHTML = children;
document.write('<br>');

// Q1. c
document.write('<h3>Q1. c</h3>');

var arr = [20, 30];
for(var i = arr.length; i < 5; i += 1){
    arr[i] = Math.pow(i, 2);
}

document.write(arr);
document.write('<br>');

// Q1. d
document.write('<h3>Q1. d</h3>');

var arr = [10, 20, 30, 40, 50, 60, 70, 90];
var sum = 0;

for(var i = 1; i < 7; i += 1){
    sum = sum + arr[i];
}

document.write(sum);
document.write('<br>');

//fixed loop
var arr = [10, 20, 30, 40, 50, 60, 70, 90];
var sum = 0;

for(var i = 0; i < 8; i += 1){
    sum = sum + arr[i];
}

document.write(sum);
document.write('<br>');

// Q1. e
document.write('<h3>Q1. e</h3>');

var DL = 5;
var d = [25.0, 9.0, 10.0, 25.0, 15.0];
var mi = 0;
var m = d[mi];
for(var i = 1; i < DL; i++){
    if(d[i] < m){
        mi = i;
        m = d[mi];
        console.log(m);
    }
}

console.log("mi=",mi,"m=",m);
document.write("mi=",mi,"m=",m);
document.write('<br>');

// Q2.
document.write('<h3>Q2.</h3>');
function sumArray(arr,num){
    var sum = 0;
    for(var i = 0; i < arr.length; i++){
        for(var a = 0; a < arr[i].length; a++){
            sum += arr[i][a];
        }
    }
    return sum;
}

document.write(sumArray([[1,2,3,4,5],[2,3,4,5,6],[3,4,5,6,7],[4,5,6,7,8],[5,6,7,8,9]],5));



// Q3.
var tiles = [];
var num = 0; // click count
var arr = ['1','2','3','4','5','6','7','8','']; //shuffle array
var checkarr = ['1','2','3','4','5','6','7','8','']; //check array
var done = 1; // game result check val

window.onload = function(){
    startGame();
}

//set div in #panel
function startGame(){
    shuffle(arr);
    
    var panel = document.getElementById('panel');
    
    //make div
    for(var i = 0; i < 9; i++){
        var div = document.createElement('div');
        div.className = 'tile';
        div.index = i;
        div.textContent = arr[i];
        div.onclick = click;
        div.onmouseover = hover;
        div.onmouseout = out;
        panel.appendChild(div);
        tiles.push(div);
    }
}

// restart
function restart(){
    //reset all contents
    tiles = [];
    document.getElementById('panel').innerHTML = '';
    startGame();
    num = 0;
    document.getElementById('done').innerHTML = '';
    document.getElementById('move').innerHTML = '';
    document.getElementById('Start').innerHTML = 'Start Time:';
    document.getElementById('End').style.display = 'none';
    //clearInterval( myInterval );
}

//shuffle
function shuffle(arr){
    var n = arr.length;
    var temp, i;
     while(n){
         i = Math.floor(Math.random() * n--);
         temp = arr[n];
         arr[n] = arr[i];
         arr[i] = temp;
    }
    return arr;
}

// geme result check
function resultCheck(){
    done = 1;
    for(var i = 0; i < tiles.length; i++){
        if(tiles[i].textContent !== checkarr[i]) done = 0;
    }
}

//swap textContent
function swapContent(i, k){
    var temp = tiles[i].textContent;
    tiles[i].textContent = tiles[k].textContent;
    tiles[k].textContent = temp;
    
    resultCheck();
}

//hover event
function hover(e){
    var i = e.target.index;
    if(i <= 5 && tiles[i + 3].textContent == ''){
        e.target.style.backgroundColor = 'lightgreen';
    }else if(i >= 3 && tiles[i - 3].textContent == ''){
        e.target.style.backgroundColor = 'lightgreen';
    }else if(i % 3 !== 2 && tiles[i + 1].textContent == ''){
        e.target.style.backgroundColor = 'lightgreen';
    }else if(i % 3 !== 0 && tiles[i - 1].textContent == ''){
        e.target.style.backgroundColor = 'lightgreen';
    }else{
        e.target.style.backgroundColor = 'red';
    }
}

//mouseout event
function out(e){
    e.target.style.background = '';
}


// click event
function click(e){
    var i = e.target.index;
    if(i <= 5 && tiles[i + 3].textContent == ''){
        swapContent(i, i + 3);
        num++;
    }else if(i >= 3 && tiles[i - 3].textContent == ''){
        swapContent(i, i - 3);
        num++;
    }else if(i % 3 !== 2 && tiles[i + 1].textContent == ''){
        swapContent(i, i + 1);
        num++;
    }else if(i % 3 !== 0 && tiles[i - 1].textContent == ''){
        swapContent(i, i - 1);
        num++;
    }
    // start Time
    if(num == 1){
        checkTime(0);
    }
    
    //check game result
    if(done == 1){
        checkTime(1);
        document.getElementById('done').innerHTML = ' --Done!!!';
    }
    
    //show move count
    document.getElementById('move').innerHTML = num;
}

function checkTime(e){
    if(e == 0){
        myStart = new Date();
        hours = myStart.getHours();
        min = myStart.getMinutes();
        sec = myStart.getSeconds();
        document.getElementById('Start').innerHTML = "Start Time: " + hours + ":" + min + ":" + sec;
    }else{
        myEnd = new Date();
        hours = myEnd.getHours();
        min = myEnd.getMinutes();
        sec = myEnd.getSeconds();
        document.getElementById('End').innerHTML = "End Time: " + hours + ":" + min + ":" + sec;	
        document.getElementById('End').style.display = 'block';
    }
}