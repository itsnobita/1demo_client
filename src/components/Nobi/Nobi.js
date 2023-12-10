import React, { useEffect, useState } from 'react'
import { myF } from '../../services/tryService'

export default function Nobi() {

    const [myname, setMyname] = useState(0)
    
    useEffect(() => {
        
        setInterval(() => {
            
            setMyname(r=>r+1)
            
           
        }, 1000);
        
    }, [])
    console.log(myname)
  return (
    <div style={{left:"500px",position:"absolute"}}>{myname}</div>
  )
}


