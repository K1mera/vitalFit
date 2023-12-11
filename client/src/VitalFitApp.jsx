import { MainRouter } from "./routes";
import { Route,Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'


export const VitalFitApp = () => {


    const [items,setItems] = useState([])
    const [allItems,setAllItems] = useState([
        {
          name: "ISO WHEY PROTEIN 1",
          price: 10000,
          image: 'http://drive.google.com/uc?export=view&id=1e5K09pxyEJjxOpmurWuP7V5quvuQ2Pjw',
          type: "PROTEINAS",
          offer: true,
        },
        {
          name: "ISO WHEY PROTEIN 2",
          price: 20000,
          image: 'http://drive.google.com/uc?export=view&id=1e5K09pxyEJjxOpmurWuP7V5quvuQ2Pjw',
          type: "CREATINAS",
          offer: true,
        },
        {
          name: "ISO WHEY PROTEIN 3",
          price: 30000,
          image: 'http://drive.google.com/uc?export=view&id=1e5K09pxyEJjxOpmurWuP7V5quvuQ2Pjw',
          type: "ENERGIA",
          offer: false,
        },
        {
          name: "ISO WHEY PROTEIN 4",
          price: 40000,
          image: 'http://drive.google.com/uc?export=view&id=1e5K09pxyEJjxOpmurWuP7V5quvuQ2Pjw',
          type: "CONTROL DE PESO",
          offer: false,
        },
        {
          name: "ISO WHEY PROTEIN 5",
          price: 50000,
          image: 'http://drive.google.com/uc?export=view&id=1e5K09pxyEJjxOpmurWuP7V5quvuQ2Pjw',
          type: "ACCESORIOS",
          offer: true,
        },
    ])
  
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
