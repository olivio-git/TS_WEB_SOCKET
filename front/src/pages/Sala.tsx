import { useContext, useEffect } from "react";
import Pannel from "../components/Pannel";
import DataContext from "../context/dataContext"; 
import ViewChat from "../components/ViewChat";

const Sala = ( ) => {
    const { userLogin } = useContext(DataContext);
    useEffect(() => {
        // socket.on("message", (message) => {
        //   handleSetMessages(message);
        // });
        // return () => {
        //   socket.off("validConnection");
        // };
      }, []);
    return(
        <div className="flex  items-center">
            <Pannel user={userLogin.user.user_name}></Pannel> 
            <ViewChat></ViewChat>
        </div>
    )
}
export default Sala;