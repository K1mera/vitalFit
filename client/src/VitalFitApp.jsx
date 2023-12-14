import { Provider, useDispatch } from "react-redux";
import { MainRouter } from "./routes";

import {getProducts, store} from "./store";
import {useEffect} from "react";

import data from './Data.js';


export const VitalFitApp = () => {

    
    const allItems = data;
    

    return (
        <Provider store={ store }>
            <MainRouter   allItems={allItems}/>
        </Provider>
    );  
};
