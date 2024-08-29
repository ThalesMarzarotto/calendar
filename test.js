





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





function getCalendar(tgtMonth, tgtYear ) {


    
let arr = new Array(42).fill(0)

let prev_dte = new Date()
let next_dte = new Date()




prev_dte.setMonth(tgtMonth)
prev_dte.setDate(0)
next_dte.setMonth(tgtMonth+1)
next_dte.setDate(0)




let p_day = prev_dte.getDay()
let p_date = prev_dte.getDate()


for (let i = p_day; i >-1; i--) {
    arr[i] = {day: i, date: p_date }
    p_date-=1   
}  


if (p_day==6){
  p_day = 0 
  
} else {
    p_day+=1
}


let c_date = 1
for (let j = 0; j < next_dte.getDate(); j++) {    
        
    arr[(j+p_day)] = {day: (j+p_day)%7, date: c_date }
    c_date+=1
    
}

let n_date = 1
for (let k = p_day+c_date-1; k < arr.length; k++) {
    arr[k] = {day: k%7, date: n_date}
    n_date+=1
}


return (arr)
}



