import { ReactNode } from "react";

export interface Message {
  user: string;
  message: string;
}
export interface Room {
  room_name: string;
}
export interface StateModal {
  estado: boolean;
}
export interface UserLoginProps {
  user_name: string;
  image_profile_url: string;
}
export interface UserLogged {
  token: string | undefined;
  user: UserLoginProps;
  valid: boolean;
}
export interface DataContextType {
  //Tipamos nuestro estado global o contexto global
  handleSetMessages: (message: Message) => void;
  messages: Message[];
  userLogin: UserLogged;
  handleSaveLogin: (userProps: UserLogged) => void;
  rooms:RoomInterface[];
  handleUpdateRooms:(propsRooms:Array<RoomInterface>) => void;
  selectedRoom:RoomInterface;
  handleSelectRoom:(room:RoomInterface) => void;
}
export interface HandleChangeModalLogin {
  handleChangeModalLogin: (estado: boolean) => void;
}
export interface HandleChangeRoom {
  handleChangeRoom: (estado: boolean) => void;
}
export interface LoginInterface {
  user_name: string;
  user_password: string;
}
export interface ErrorProps {
  strong: string;
  span: string;
}
export interface RedirRouter {
  auth: boolean;
  children: ReactNode;
}
export interface RoomInterface {
  createdAt: string;
  id_room:string;
  room_name: string;
  updatedAt: string;
} 
