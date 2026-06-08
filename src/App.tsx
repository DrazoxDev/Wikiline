import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Page404 from "./pages/Page404";
import MyExpo from "./pages/MyExpo";
import PrepareExpo from "./pages/ExpoComposer";
import { BrowserRouter, Route, Routes} from "react-router";
import {useArtworkActions, useArtworkStatus } from "./stores/artwork/artwork.selectors";
import { useEffect } from "react";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import CommentJouer from "./pages/CommentJouer";
import ChoixMode from "./pages/ChoixMode";
import PersonTest from "./pages/PersonTest";
import Difficulte  from "./pages/Difficulte";
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
        <Route path="/connexion" element={<Connexion/>}></Route>
        <Route path="/inscription" element={<Inscription/>}></Route>
        <Route path="/choixmode" element={<ChoixMode/>}></Route>
        <Route path="/commentjouer" element={<CommentJouer/>}></Route>
        <Route path="/test-personnes" element={<PersonTest/>}></Route>
        <Route path="/choix_difficulte" element={<Difficulte/>}></Route>
        <Route path="*" element={<Page404/>}></Route>
    </Routes>
    </BrowserRouter>
  </>
  )
  }
  
};

export default App

