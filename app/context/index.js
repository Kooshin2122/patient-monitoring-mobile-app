//
import { createContext, useContext, useEffect, useState } from "react";
//
const AppContxt = createContext();
//
const AppContext = ({ children }) => {
    const [isUserLogin, setIsUserLogin] = useState(false);
    return (
        <AppContxt.Provider value={{
            isUserLogin, setIsUserLogin,
        }}>
            {children}
        </AppContxt.Provider>
    );
};
//
export const useAppContext = () => {
    return useContext(AppContxt);
};
//
export default AppContext;
//