import { useContext, useEffect, useState } from "react";
import DataContext from "../context/dataContext";
import axios from "axios";

export default function ViewChat() {
  const { selectedRoom } = useContext(DataContext);
  const [message, setMessage] = useState("");
  const updateChatsRoomSelected = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/room/messages/${selectedRoom.id_room}`)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    if(selectedRoom.id_room){
      updateChatsRoomSelected();
    }
  },[]);
  const BodyChat = () => {
    return (
      <>
        <header className="w-full h-24 bg-[#233142] p-8 text-white">
          {selectedRoom.room_name}
        </header>
        <main className="w-full flex flex-col p-8 flex-grow bg-red-200 gap-2 bg-[#407088]">
          <div
            className="max-w-96 p-2 bg-[#ffff] rounded-lg shadow 
                  hover:cursor-pointer self-start">
            <h5 className=" text-xl font-bold tracking-tight text-gray-600">
              Hola mundo
            </h5>
          </div>
          <div
            className="max-w-96 p-2 bg-[#ffe9e3] rounded-lg shadow
                  hover:cursor-pointer self-end">
            <h5 className=" text-xl font-bold tracking-tight text-gray-600">
              Hola mundox2
            </h5>
          </div>
          <div
            className="max-w-96 p-2 bg-[#ffff] rounded-lg shadow 
                  hover:cursor-pointer self-start">
            <h5 className=" text-xl font-bold tracking-tight text-gray-600">
              Hola mundo
            </h5>
          </div>
        </main>
        <footer className="flex items-center p-2">
       <input
         type="text"
         value={message}
         onChange={(e) => setMessage(e.target.value)}
         className="w-full border-gray-300 rounded-full p-2"
         placeholder="Escribe tu mensaje..."
       />
       <button className="bg-blue-500 text-white rounded-full px-4 py-2 ml-2">
         Enviar
       </button>
     </footer>
      </>
    );
  };
  return (
    <div className="flex flex-col  items-center w-9/12 h-screen bg-[#e3e3e3]">
      {selectedRoom ? <BodyChat></BodyChat> : null}
    </div>
  );
}
