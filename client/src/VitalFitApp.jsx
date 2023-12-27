import { Provider } from "react-redux";
import { store } from "./store";

import { MainRouter } from "./routes";


export const VitalFitApp = () => {
  

  return (
    <Provider store={store}>
      <MainRouter />
    </Provider>
  );
};
