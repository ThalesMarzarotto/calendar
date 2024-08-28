'use client'
import React from "react";
import styles from './calendar.module.css'
import { useState } from "react";


export default function Calendar() {

const [state, setState] = useState([])
    

return (
    <>


            <div className={styles.calendarWrapper}> 
                <div className={styles.controler}> 
                    <div className={styles.currentMonth}>
                        Agosto 2024 
                    </div>
                </div>

                <div className={styles.monthWrapper}>
                <div className={styles.weekWrapper}> 
                    <div>D</div>
                    <div>S</div>
                    <div>T</div>
                    <div>Q</div>
                    <div>Q</div>
                    <div>S</div>
                    <div>S</div>
                </div>
                {

                }
                
               
            </div>
            </div>

          


    </>
)

}