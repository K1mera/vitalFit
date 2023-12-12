import { Provider } from "react-redux";
import { MainRouter } from "./routes";

import {store} from "./store";


export const VitalFitApp = () => {

    
    const allItems = [
        {
          name: "ISO WHEY PROTEIN 1",
          price: 10000,
          image: 'http://drive.google.com/uc?export=view&id=1e5K09pxyEJjxOpmurWuP7V5quvuQ2Pjw',
          type: "PROTEINAS",
          offer: true,
        },
        {
          name: "ISO WHEY CREATINE 2",
          price: 20000,
          image: 'http://drive.google.com/uc?export=view&id=1e5K09pxyEJjxOpmurWuP7V5quvuQ2Pjw',
          type: "CREATINAS",
          offer: true,
        },
        {
            name: "ISO WHEY ENERGY 3",
            price: 30000,
            image: 'http://drive.google.com/uc?export=view&id=1e5K09pxyEJjxOpmurWuP7V5quvuQ2Pjw',
            type: "ENERGIA",
            offer: false,
        },
        {
            name: "ISO WHEY WEIGHT CONTROL 4",
            price: 40000,
            image: 'http://drive.google.com/uc?export=view&id=1e5K09pxyEJjxOpmurWuP7V5quvuQ2Pjw',
            type: "CONTROL DE PESO",
            offer: false,
        },
        {
          name: "ISO WHEY ACCESSORY 5",
          price: 50000,
          image: 'http://drive.google.com/uc?export=view&id=1e5K09pxyEJjxOpmurWuP7V5quvuQ2Pjw',
          type: "ACCESORIOS",
          offer: true,
        },
    ]
    // const [items,setItems] = useState(allItems)
  
    // useEffect(() => {
    //   if(allItems.length>0){
        //     setItems([...allItems]);
    //   }    
    // }, [allItems]);
  
    

    return (
        <Provider store={ store }>
            <MainRouter   allItems={allItems}/>
        </Provider>
    );
};
