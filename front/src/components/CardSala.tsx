import React, { useContext } from "react";
import DataContext from "../context/dataContext";
interface CardProps {
  key: string;
  room_name: string;
  room: any;
}
export default function CardSala(props: CardProps) {
  const { handleSelectRoom } = useContext(DataContext);
  return (
    <div
      onClick={() => handleSelectRoom(props.room)}
      className="max-w-full h-20 pl-4 bg-white hover:cursor-pointer">
      <h5 className=" text-xl font-bold tracking-tight text-gray-600">
        {props.room_name}
      </h5>
    </div>
  );
}
