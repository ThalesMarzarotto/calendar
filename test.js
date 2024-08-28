





let months = {
    0: "Janeiro",
    1: "Fevereiro",
    2: "Março",
    3: "Abril",
    4: "Maio",
    5: "Junho",
    6: "Julho",
    7: "Agosto",
    8: "Setembro",
    9: "Outubro",
    10: "Novembro",
    11: "Dezembro",
}


let arr = new Array(42).fill(0)






let prev_dte = new Date()
let cur_dte = new Date()
let next_dte = new Date()




let tgtMonth = 5 
let tgtYear = 2024 

prev_dte.setMonth(tgtMonth)
prev_dte.setDate(-1)
next_dte.setMonth(tgtMonth+1)
next_dte.setDate(0)
console.log(next_dte.getDate(), 'next');


console.log(prev_dte.getDate(), prev_dte.getMonth(), prev_dte.getFullYear(), prev_dte.getDay());

let p_date = prev_dte.getDate()
for (let i = prev_dte.getDay(); i >-1; i--) {
   arr[i] = {day: i, date: p_date }
    p_date-=1   
}

let c_date = 1
for (let j = 0; j < next_dte.getDate(); j++) {
    
    arr[(j+prev_dte.getDay()+1)] = {day: j%7, date: c_date }
    c_date+=1
    
}


console.log(arr)
