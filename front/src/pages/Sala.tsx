import { useContext, useEffect } from "react";
import Pannel from "../components/Pannel";
import DataContext from "../context/dataContext"; 
import ViewChat from "../components/ViewChat";
import { socket } from "../web/socket";

const Sala = ( ) => {
    const { userLogin,handleUpdateRooms } = useContext(DataContext);
    useEffect(() => {
        console.log("first")
        socket.on("roomUpdate", (message) => {
            handleUpdateRooms(message.MessageChannel);
        });
        return () => {
          socket.off("roomUpdate");
        };
      }, []);
    return(
        <div className="flex  items-center">
            <Pannel user={userLogin.user.user_name}></Pannel> 
            <ViewChat></ViewChat>
        </div>
    )
}
export default Sala;