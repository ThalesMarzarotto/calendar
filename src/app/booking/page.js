"use client"
import { useSearchParams } from 'next/navigation'
import React from 'react' 


export default function Page () {

 let params = useSearchParams()


 console.log(params.get("hour"));
 
  
 return(
 <section > 

 </section>
)
}