import "./App.css";
import { Routes, Route } from "react-router-dom";
import Sala from "./pages/Sala";
import { useContext, useEffect } from "react";
import { socket } from "./web/socket";
import LandingPage from "./pages/LandingPage";
import { Toaster } from "react-hot-toast";
import DataContext from "./context/dataContext";
import { RedirRouter } from "./interfaces/Interfaces";
import axios from "axios";

function App() {
  const { userLogin,handleUpdateRooms } = useContext(DataContext);
  const ValidateRedir = ({ auth, children }:RedirRouter) => {  //Redirección de rutas
    if (!auth) {
      return <LandingPage/>;
    }
    if (auth) return children;
  };
  const updateRooms = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/room/');
      handleUpdateRooms(response.data.data.room); 
      console.log("first")
    } catch (error) {
      console.log(error) 
    }
  } 
  useEffect(() => {
    updateRooms();
    // socket.on("validConnection", (message) => {
    //   if (message) {
    //     console.log("Conexion exitosa");
    //   }
    // });
    // return () => {
    //   socket.off("validConnection");
    // };
  }, []);
  return (
    <>
      <Routes> 
        <Route path="/" element={<ValidateRedir auth={userLogin.valid} ><Sala></Sala></ValidateRedir>}></Route>
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
