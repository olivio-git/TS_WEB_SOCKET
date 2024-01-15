import { createContext, useState } from "react";
import {
  DataContextType,
  Message,
  RoomInterface,
  UserLogged,
} from "../interfaces/Interfaces";
export const DataContext = createContext<DataContextType>({
  handleSetMessages: () => {},
  messages: [],
  userLogin: {
    token: "",
    user: {id_user:"", user_name: "", image_profile_url: "" },
    valid: false,
  },
  handleSaveLogin: () => {},
  rooms: [],
  handleUpdateRooms: () => {},
  selectedRoom: {createdAt: "",id_room: "",room_name: "",updatedAt: "",},
  handleSelectRoom: ()=> {}
});

export const DataContextProvider = ({ children }: any) => {
  //StateFormMessages v.1.0
  const [messages, setMessages] = useState<Message[]>([]);
  const [userLogin, setUserLogin] = useState<UserLogged>({
    token: "",
    user: {id_user:"", user_name: "", image_profile_url: "" },
    valid: false,
  });
  const [rooms, setRooms] = useState<RoomInterface[]>([]);
  const [selectedRoom,setSelectedRoom] = useState<RoomInterface>({createdAt: "",id_room: "",room_name: "",updatedAt: ""})
  //Stae
  const handleSetMessages = (messages: Message) => {
    setMessages((prevMessages) => [...prevMessages, messages]);
  };
  const handleSaveLogin = async (userProps: UserLogged) => {
    setUserLogin({
      ...userLogin,
      token: userProps.token,
      user: userProps.user,
      valid: userProps.valid,
    });
  };
  const handleUpdateRooms = async (propRooms: Array<RoomInterface>) => {
    setRooms(propRooms);
  };
  const handleSelectRoom = async (room:RoomInterface) => {
    setSelectedRoom(room);
  }
  const STATES_MODIFIC = {
    handleSetMessages,
    messages,
    userLogin,
    handleSaveLogin,
    rooms,
    handleUpdateRooms,
    selectedRoom,
    handleSelectRoom
  };
  return (
    <DataContext.Provider value={STATES_MODIFIC}>
      {children}
    </DataContext.Provider>
  );
};
export default DataContext;
