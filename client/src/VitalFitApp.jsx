import { MainRouter } from "./routes";
import { Route,Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import data from './Data.js';


export const VitalFitApp = () => {
    
    const allItems = data;
    
    const [items,setItems] = useState([])
 
  
    useEffect(() => {
      if(allItems.length>0){
        setItems([...allItems]);
      }    
    }, [allItems]);
  
    const filter = (filtered) => {
      setItems(allItems.filter((item) => filtered.includes(item.type) || (item.offer === true && filtered.includes("OFERTA"))));
    }
    
    return (
        <div>
            <MainRouter items={items} filter={filter} allItems={allItems} />
        </div>
    );
};
