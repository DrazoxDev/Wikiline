import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Page404 from "./pages/Page404";
import MyExpo from "./pages/MyExpo";
import PrepareExpo from "./pages/ExpoComposer";
import { BrowserRouter, Route, Routes} from "react-router";
import {useArtworkActions, useArtworkStatus } from "./stores/artwork/artwork.selectors";
import { useEffect } from "react";
const App = () => {

  const statuts = useArtworkStatus();
  // const {loadArtworks}= useArtworkActions();
  // useEffect (() => {
  //    loadArtworks();
  // },[loadArtworks])

  // if (statuts === "loading" || statuts === "idle") {
  //   return(
  //     <div className="flex items-center justify-center h-screen">
  //       <p className="text-xl">Chargement...</p>
  //     </div>

  //   )
  // }
    if (statuts === "error") {
    return(
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Erreur lors du chargement des œuvres. Recommencez ultérieurement </p>
      </div>

    )
  }
    if (statuts === "success" || statuts === "idle" || statuts === "loading") {
      return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/admin" element={<Admin/>}></Route>
        <Route path="/connexion" element={<PrepareExpo/>}></Route>
        <Route path="/inscription" element={<MyExpo/>}></Route>
        <Route path="*" element={<Page404/>}></Route>
    </Routes>
    </BrowserRouter>
  </>
  )
  }
  
};

export default App

