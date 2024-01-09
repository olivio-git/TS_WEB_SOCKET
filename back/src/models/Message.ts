import {DataTypes, UUIDV4 ,Sequelize } from 'sequelize';

const Message = (sequelize:Sequelize) => {
    return sequelize.define('Message',{
        id_message:{
            type:DataTypes.UUID,
            primaryKey:true,
            allowNull:false,
            defaultValue:UUIDV4
        },
        text_content:{
            type:DataTypes.STRING,
            allowNull:true
        },
        state_message:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        }
    })
}
export = Message;