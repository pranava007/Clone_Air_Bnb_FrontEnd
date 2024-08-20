import React from 'react'
import { useSelector } from 'react-redux'
import Cart from './Cart'
import Filterpage from './Filterpage'



export const Datalistout = () => {

   const data =  useSelector((state)=>state.filters)

   console.log("data final result :",data);
  
   const result = data.filters

   console.log("data final result :",result);
   
   

  return (
    <>
      <Filterpage />
      <div className="container">
        <div className="row justify-content-center">
          {/* Using map to render each property as a card */}
          {result.map((element, index) => {
            return <Cart element={element} index={index} />;
          })}
        </div>
      </div>
    

    </>
    
  )
}
