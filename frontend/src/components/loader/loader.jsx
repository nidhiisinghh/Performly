import React, { use } from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const loader = () => {
  const navigate = useNavigate();
  const array = ["","","","Musicians", "DJ's","Dancers","Magicians","Comedians","Singers","Entertainers","Models","Actors","Actresses","Performers","Artists","Celebrities","Influencers","Impersonators","Voice Over Artists","Musical Artists","Vocalists","Rappers","Songwriters","Lyricists","Producers","Directors","Writers","DJs" ,"Dancers" ,"Magicians" ,"Comedians" ,"Singers" ,"Entertainers" ,"Models" ,"Actors" ,"Actresses" ,"Performers" ,"Artists" ,"Celebrities" ,"Influencers" ,"Impersonators" ,"Voice Over Artists" ,"Musical Artists" ,"Vocalists" ,"Rappers" ,"Songwriters" ,"Lyricists" ,"Producers" ,"Directors"];
  // const array =["welcome", "to","our","website","we","are","glad","to","see","you","here"];

  const [index, setIndex] = useState(0);
  const [showmask, setmask] = useState(false);


  useEffect(()=>{
    const interval =setInterval(()=>{
      setIndex((prevIndex)=>{

        for(let i = 0; i < array.length; i++) {
          if (prevIndex === array.length - 1) {
            return 0;
          } else {
            return prevIndex + 1;
          }
        
        }
       })
    },200)
    return () => clearInterval(interval)
  },[])
  useEffect(()=>{
    const timeout = setTimeout(()=>{
      navigate('/signup');
    },10000)
    return () => clearTimeout(timeout)
  },[navigate])

  


  return (

    <div className='loader-bg'>
      <div className='loader-numbers'>
        <h1>{array[index]}</h1>
      </div>
     
      
    </div>
  );
}

export default loader;