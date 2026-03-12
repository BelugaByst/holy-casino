const tg = window.Telegram.WebApp

tg.expand()

let balance = 0

function updateBalance(){

let el = document.getElementById("balance")

if(el) el.innerText = balance

}

function getBalance(){

Telegram.WebApp.sendData(JSON.stringify({

action:"get_balance"

}))

}

Telegram.WebApp.onEvent("message", function(event){

let data = JSON.parse(event.data)

if(data.type === "balance"){

balance = data.balance
updateBalance()

}

if(data.type === "bet_accepted"){

balance = data.balance
updateBalance()

}

if(data.type === "win"){

balance = data.balance
updateBalance()

}

})

window.onload = function(){

getBalance()

}
