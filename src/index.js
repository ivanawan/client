import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "./page/css/index.css";

import App from "./page/App";
import DetailBook from "./page/DetailBook";
import Profil from "./page/Profil";
import ListTransaction from "./page/ListTransaction ";
import Cart from "./page/Cart";
import AddBook from "./page/AddBook";
import Complain from "./page/Complain";
import { Isadmin, Islogin,Logout,Admin } from "./component/privateRoute";
import EditProfile from "./page/EditProfile";

const container = document.getElementById("root");
const root = createRoot(container);
const queryClient = new QueryClient();


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Admin><App /></Admin> } />
              <Route path="/detail/:id" element={<Islogin> <DetailBook /></Islogin>} />
              <Route path="/profil" element={<Islogin><Profil /></Islogin>} />
              <Route path="/list-trasaction" element={<Isadmin><ListTransaction /></Isadmin>} />
              <Route path="/cart" element={<Islogin><Cart /></Islogin>} />
              <Route path="/add-book" element={<Isadmin><AddBook /></Isadmin>} />
              <Route path="/complain" element={<Islogin><Complain /></Islogin>} />
              <Route path="/edit-profil" element={<Islogin><EditProfile/></Islogin>} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
