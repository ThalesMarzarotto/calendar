'use client'
import React, { useEffect } from "react";
import styles from './pages.module.css'
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";


let availableDates = new Map ()

import helena from "../../../../public/helena.jpg"

availableDates.set("4/8/2024", ["13:00-14:00", "14:00", "15:00", "16:00", "17:00"])

let today = new Date()
today.setHours(23)
today.setMinutes(58)


let dte = ""
let tgtMonth = new Date()
let tgtYear = new Date()

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

export default function Calendar({data}) {



const [Calendar, setCalendar] = useState([]) 
const [Schedule, setSchedule] = useState([]) 
const [date, setdate] = useState([]) 


function getCalendar(tgtMonth, tgtYear ) {


    
    let arr = new Array(42).fill(0)
    
    let prev_dte = new Date()
    let next_dte = new Date()
    
    
    
    
    prev_dte.setMonth(tgtMonth)
    prev_dte.setFullYear(tgtYear)
    prev_dte.setDate(0)
    next_dte.setMonth(tgtMonth+1)
    next_dte.setFullYear(tgtYear)
    next_dte.setDate(0)
    
    
    
    
    let p_day = prev_dte.getDay()
    let p_date = prev_dte.getDate()
    
    
    for (let i = p_day; i >-1; i--) {
      let available = availableDates.get(  p_date + "/" + (tgtMonth-1) +"/" + tgtYear )
       
      
        arr[i] = {day: i, date: p_date, month:tgtMonth-1, year:tgtYear, available: available? available.length:0}
        p_date-=1   
    }  
    
    
    if (p_day==6){
      p_day = 0 
      
    } else {
        p_day+=1
    }
    
    
    let c_date = 1
    for (let j = 0; j < next_dte.getDate(); j++) {    
       let available = availableDates.get( c_date + "/" + tgtMonth+ "/" + tgtYear)      
        arr[(j+p_day)] = {day: (j+p_day)%7, date: c_date, month:tgtMonth, year:tgtYear, available: available? available.length:0 }
        c_date+=1
        
    }
    
    let n_date = 1
    for (let k = p_day+c_date-1; k < arr.length; k++) {
      let available = availableDates.get( n_date + "/" + (tgtMonth+1) +"/" + tgtYear)
      
        arr[k] = {
          day: k%7, 
          date: n_date, 
          month:tgtMonth+1, 
          year:tgtYear,
          available: available? available.length:0
        }
        n_date+=1
    }
    
    
    return arr
}

function changeMonth(direction){
    if(direction === "forward") {
            if(tgtMonth.getMonth() ===11) {
                tgtMonth.setMonth(0)
                tgtYear.setFullYear(tgtYear.getFullYear()+1)    
            }else {
               tgtMonth.setMonth(tgtMonth.getMonth()+1)
            }
    
    }else {
        if(tgtMonth.getMonth() ===0) {
            tgtMonth.setMonth(11)
            tgtYear.setFullYear(tgtYear.getFullYear()-1)     

            
        }else {
           tgtMonth.setMonth(tgtMonth.getMonth()-1)
        }
    }
    
    displayCalendar(tgtMonth.getMonth(), tgtYear.getFullYear())


}
function changeYear(direction){
    
    if(direction === "forward") {
       tgtYear.setFullYear(tgtYear.getFullYear()+1)          

    }else {
        tgtYear.setFullYear(tgtYear.getFullYear()-1)        
    }
    displayCalendar(tgtMonth.getMonth(), tgtYear.getFullYear())

}


function displaySchedule(obj) {


  

  dte = obj.date + "/" + obj.month + "/" + obj.year

  let dsp_schedule = [ ]
    if(availableDates.has(dte)){
      let schedule = availableDates.get(dte)
      for (let i = 0; i < schedule.length; i++) {
        if( schedule[i] ){
          dsp_schedule.push(
          <Link href={`http://localhost:3000/booking?worker=helena&date=${obj.date+""+obj.month+""+obj.year}&hour=${schedule[i]}`} className={styles.avaib}>
            <div className={styles.avaibInner}>
            {schedule[i]} <LinkArrow/>
            </div>
          </Link>
        )
        }
        
      }
      
    } 
 window.history.replaceState({date: [obj.date , obj.month , obj.year]},"")
 setdate(obj.date + " " + months[obj.month] + " de " + obj.year )
 setSchedule([...dsp_schedule])
}


function displayCalendar(tgtMonth, tgtYear) {

    
    let arr = getCalendar(tgtMonth, tgtYear)
    
    
    let displayArr = []


for (let i = 0; i <6 ; i++) {

    let days = [ ]    
        for (let j = 0; j < 7; j++) {    
          let date = arr[j+(i*7)]
          let comparisonDate = new Date((date.month+1)+"/"+date.date+"/"+date.year)
          comparisonDate.setHours(23)
          comparisonDate.setMinutes(59)
          
          if ( comparisonDate< today) {
            days.push(
              <div className={styles.prevDay} onClick={()=>{displaySchedule(date);
              }}> 
                            
              <s>{date.date} </s>
              </div>
              )
          } else {
            days.push(
              <div className={date.available? styles.avaibDay : styles.day} onClick={()=>{displaySchedule(date);
              }}> 
              {date.date}
              </div>
              )
          }
            
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



    let his = window.history.state.date
    
  
    if (his){
      displaySchedule({
        date: his[0], 
        month: his [1],
        year: his [2]
      })
    }
      

  //   document.addEventListener("beforeunload", (e)=>{
  //     return "Do you really want to close?";
  //   })
    document.addEventListener("pagehide", (e)=>{


      let msg = fetch("http://localhost:3001", {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin" : "*"
        }
      })
      msg.then((data)=>console.log(data))

      if (document.visibilityState == "visible") {
        console.log("tab is active")
      } else {
        console.log("tab is inactive")
      }
     
    })
  //   window.onbeforeunload = function () {
  //     return "Do you really want to close?";
  // };
}, [])







return (
    <div className={styles.main}>


     <div className={styles.calendar_main}>



            <div className={styles.workerInfo}>

                 
                 <div className={styles.workerPhoto}>
                  
                  <Image src={helena} style={{width:"74px", height:"74px", borderRadius:"100%", zIndex:1, position:"relative", filter: "brightness(1.2)"}}
                  priority/> 
                 </div>
                        
                  
                  <div className={styles.workerName}>
                   Helena
                  </div>
               
          
            </div>



            <div className={styles.calendarInfo}>
             Horários de Brasília -3 GMT
            </div>

            <div className={styles.calendarWrapper}> 
                <div className={styles.controler}> 
                    <div className={styles.currentMonth}>
                       
                        <div className={styles.day} >
                          {months[tgtMonth.getMonth()]} 
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
                          {tgtYear.getFullYear()}
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
      

            

          
              <div className={styles.scheduleWrapper}>  
                
                <div className={styles.scheduleDate}> 
                    {date}
                </div> 
                {Schedule.length>0?
                <div className={styles.noSchedules}>
                   😄
                </div>      
                :
                ""
                  }
                
                    {Schedule}
              </div>

    </div>

    <div className={styles.mainScheduler}>
            <div className={styles.timeSlots}>  
                1 
            </div>
            <div className={styles.times}>
                1
            </div>
    </div>

    </div>
  
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




export const CloseIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth={0}
    viewBox="0 0 512 512"
    {...props}
  >
    <path
      stroke="none"
      d="M405 136.798 375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"
    />
  </svg>
)



const LinkArrow = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth={0}
    viewBox="0 0 448 512"
    {...props}
  >
    <path
      stroke="none"
      d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8S32.7 256 48 256h176v176c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z"
    />
  </svg>
)