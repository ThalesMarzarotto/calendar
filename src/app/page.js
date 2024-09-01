import Image from "next/image";
import styles from "./page.module.css";
import Calendar from "../../components/Calendar";


import { cookies } from 'next/headers'

import helena from "../../public/helena.jpg"





export default function Home() {

  console.log(cookies());
  
  return (
    <main className={styles.main}>
    
    
     <Calendar data={helena} />
    </main>
  );
}