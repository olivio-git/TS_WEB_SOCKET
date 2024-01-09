import { DataTypes, UUIDV4, Sequelize } from "sequelize";

const Room = (sequelize:Sequelize) => {
    return sequelize.define('Room',{
        id_room:{
            type:DataTypes.UUID,
            primaryKey:true,
            allowNull:false,
            defaultValue:UUIDV4
        },
        room_name:{
            type:DataTypes.STRING,
            allowNull:false
        }
    })
}
export = Room;