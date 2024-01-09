import { DataTypes, UUIDV4, Sequelize } from 'sequelize';

const User = (sequelize: Sequelize) => {
   return sequelize.define('User', {
       id_usuario: {
           type: DataTypes.UUID,
           primaryKey: true,
           allowNull: false,
           defaultValue: UUIDV4
       },
       image_profile_url:{
           type:DataTypes.TEXT,
           allowNull:true
       },
       user_name: {
           type: DataTypes.STRING,
           allowNull: false
       },
       user_password:{
           type:DataTypes.STRING,
           allowNull:false
       },
   });
}

export = User;