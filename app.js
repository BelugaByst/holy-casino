const tg = window.Telegram.WebApp
tg.expand()

let balance = 0
let multiplier = 1
let playing = false
let bet = 0

function updateBalance(){

document.getElementById("balance").innerText = balance

}

function play(){

if(playing) return

bet = parseInt(document.getElementById("bet").value)

if(!bet){
show("Введите ставку")
return
}

if(bet < 1000000){
show("Минимум 1кк")
return
}

if(bet > 100000000){
show("Максимум 100кк")
return
}

if(bet > balance){
show("Недостаточно средств")
return
}

tg.sendData(JSON.stringify({
action:"start_crash",
bet:bet
}))

playing = true
multiplier = 1

animate()

}

function animate(){

if(!playing) return

multiplier += 0.02

document.getElementById("multiplier").innerText = multiplier.toFixed(2)+"x"

requestAnimationFrame(animate)

}

function cashout(){

if(!playing) return

playing = false

let win = Math.floor(bet * multiplier)

tg.sendData(JSON.stringify({

action:"cashout_crash",
win:win

}))

}

function show(text){

document.getElementById("msg").innerText = text

}

Telegram.WebApp.onEvent("message",function(event){

let data = JSON.parse(event.data)

if(data.type=="balance"){

balance=data.balance
updateBalance()

}

if(data.type=="lose"){

show("Вы проиграли")

}

if(data.type=="win"){

balance=data.balance
updateBalance()
show("Вы выиграли "+data.win)

}

})

window.onload=function(){

tg.sendData(JSON.stringify({

action:"get_balance"

}))

}
