import { Provider } from "react-redux";
import { store } from "./store";

import { MainRouter } from "./routes";
import UserContext from "./context/auth-context";

export const VitalFitApp = () => {
  return (
    <Provider store={store}>
      <UserContext>
        <MainRouter />
      </UserContext>
    </Provider>
  );
};
