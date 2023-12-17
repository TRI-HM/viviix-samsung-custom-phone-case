import { createContext } from "react";
//PAGES
import RegisterPage from "@pages/register";
import ModelPage from "@pages/model";
import StickerPage from "@pages/sticker";
import ResultPage from "@pages/result";
import ThanksPage from "@pages/thanks";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import BackgroundPage from "@pages/background";


import titleYourName from "@text/YourName.png";
import titleYourIcon from "@text/YourIcon.png";
import titleYourModel from "@text/YourModel.png";
import titleYourPattern from "@text/YourPattern.png";
import titleYourResult from "@text/YourResult.png";


const initialRoutes = [
  { path: "/", component: RegisterPage, titleUrl: titleYourName   },
  { path: "/model", component: ModelPage, titleUrl: titleYourModel  },
  { path: "/background", component: BackgroundPage, titleUrl: titleYourPattern  },
  { path: "/sticker", component: StickerPage, titleUrl: titleYourIcon  },
  { path: "/result", component: ResultPage, titleUrl: titleYourResult  },
  { path: "/thanks", component: ThanksPage }
];

export const RoutersContext = createContext({
  routes: initialRoutes,
  setRoutes: () => { },
});

export const CustomRoutersProvider = ({ children }) => {
  const [routes, setRoutes] = useState(initialRoutes);
  return <RoutersContext.Provider value={{ routes, setRoutes }}>
    <Routes className="App">
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={
          <Layout title = { route.titleUrl }>
            <route.component />
          </Layout>
        } />
      ))}
      {children}
    </Routes>
  </RoutersContext.Provider>
}

