'use client'
import React, { useEffect } from "react";
import styles from './calendar.module.css'
import { useState } from "react";



let tgtMonth = new Date()
let tgtYear = new Date()


export default function Calendar() {
let months = {
    0: "Jan", 
    1: "Fev", 
    2: "Mar", 
    3: "Abr", 
    4: "Mai", 
    5: "Jun", 
    6: "Jul", 
    7: "Ago", 
    8: "Set", 
    9: "Out", 
    10: "Nov", 
    11: "Dez", 
}
const [Month, setMonth] = useState(tgtMonth.getMonth())
const [Year, setYear] = useState(tgtYear.getFullYear())
const [Calendar, setCalendar] = useState([])


function getCalendar(tgtMonth, tgtYear ) {


    
    let arr = new Array(42).fill(0)
    
    let prev_dte = new Date()
    let next_dte = new Date()
    
    console.log(tgtMonth, tgtYear);
    
    
    
    prev_dte.setMonth(tgtMonth)
    prev_dte.setFullYear(tgtYear)
    prev_dte.setDate(0)
    next_dte.setMonth(tgtMonth+1)
    next_dte.setFullYear(tgtYear)
    next_dte.setDate(0)
    
    
    
    
    let p_day = prev_dte.getDay()
    let p_date = prev_dte.getDate()
    
    
    for (let i = p_day; i >-1; i--) {
        arr[i] = {day: i, date: p_date, month:tgtMonth-1, year:tgtYear}
        p_date-=1   
    }  
    
    
    if (p_day==6){
      p_day = 0 
      
    } else {
        p_day+=1
    }
    
    
    let c_date = 1
    for (let j = 0; j < next_dte.getDate(); j++) {    
            
        arr[(j+p_day)] = {day: (j+p_day)%7, date: c_date, month:tgtMonth, year:tgtYear }
        c_date+=1
        
    }
    
    let n_date = 1
    for (let k = p_day+c_date-1; k < arr.length; k++) {
        arr[k] = {day: k%7, date: n_date, month:tgtMonth+1, year:tgtYear}
        n_date+=1
    }
    
    
    return arr
}

function changeMonth(direction){
    if(direction === "forward") {
            if(tgtMonth.getMonth() ===11) {
                tgtMonth.setMonth(0)
                tgtYear.setFullYear(tgtYear.getFullYear()+1)    
                setYear(tgtYear.getFullYear())
            }else {
               tgtMonth.setMonth(tgtMonth.getMonth()+1)
            }
    
    }else {
        if(tgtMonth.getMonth() ===0) {
            tgtMonth.setMonth(11)
            tgtYear.setFullYear(tgtYear.getFullYear()-1)     
            setYear(tgtYear.getFullYear())

            
        }else {
           tgtMonth.setMonth(tgtMonth.getMonth()-1)
        }
    }
    
    setMonth(tgtMonth.getMonth())


}
function changeYear(direction){
    console.log(direction);
    
    if(direction === "forward") {
       tgtYear.setFullYear(tgtYear.getFullYear()+1)          

    }else {
        tgtYear.setFullYear(tgtYear.getFullYear()-1)        
    }
    setYear(tgtYear.getFullYear())
}



function displayCalendar(tgtMonth, tgtYear) {

    console.log(tgtMonth, tgtYear, "Calendar Function");
    
    let arr = getCalendar(tgtMonth, tgtYear)
    
    let displayArr = []


for (let i = 0; i <6 ; i++) {

    let days = [ ]    
        for (let j = 0; j < 7; j++) {        
            days.push(
            <div className={styles.day} onClick={()=>{console.log(arr[j+(i*7)]);
            }}>
            {arr[j+(i*7)].date}
            </div>
            )
        }


        let week = (
            <div className={styles.weekWrapper}>
              {days}
            </div>
            )

            displayArr.push(week)
            
    
}

setCalendar([...displayArr])

}


useEffect(()=>{

    displayCalendar(tgtMonth.getMonth(),tgtYear.getFullYear())

}, [Year, Month])



return (
    <>


            <div className={styles.calendarWrapper}> 
                <div className={styles.controler}> 
                    <div className={styles.currentMonth}>
                       
                        <div className={styles.day} >
                          {months[Month]} 
                        </div>
                        <div onClick={()=>changeMonth("")}>
                          <ArrowLeft></ArrowLeft>
                        </div>
                         <div onClick={()=>changeMonth("forward")}>
                          <ArrowRight></ArrowRight>

                         </div>

                    </div>
                    <div className={styles.currentMonth}>
                        <div className={styles}>
                          {Year}
                        </div>
                        <div onClick={()=>changeYear("")}>
                          <ArrowLeft></ArrowLeft>
                        </div>
                         <div onClick={()=>changeYear("forward")}>
                          <ArrowRight></ArrowRight>

                         </div>
                         
                       
                    </div>
                </div>

                <div className={styles.monthWrapper}>
                <div className={styles.weekWrapper}> 
                    <div className={styles.day}>D</div>
                    <div  className={styles.day}>S</div>
                    <div  className={styles.day}>T</div>
                    <div  className={styles.day}>Q</div>
                    <div  className={styles.day}>Q</div>
                    <div  className={styles.day}>S</div>
                    <div  className={styles.day}> S</div>
                </div>

                {
                Calendar
                }
                
               
            </div>
            </div>

          


    </>
)

}






const ArrowLeft = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth={0}
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill="none" stroke="none" d="M0 0h24v24H0V0z" />
    <path
      stroke="none"
      d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
    />
  </svg>
)


const ArrowRight = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={0}
      viewBox="0 0 24 24"
      {...props}
    >
      <path fill="none" stroke="none" d="M0 0h24v24H0V0z" />
      <path
        stroke="none"
        d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
      />
    </svg>
  )
