require('dotenv').config();
import { Sequelize, json } from "sequelize"; 
import fs  from 'fs';
import path from 'path';
const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    logging: false,
    native: false,
});
const basename = path.basename(__filename);
const modelDefiniers: Array<(sequelize: Sequelize) => void> = [];


fs.readdirSync(path.join(__dirname, './models'))
    .filter((file:string) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts'))
    .forEach((file:string) => {
        modelDefiniers.push(require(path.join(__dirname, '/models', file)));
    });
modelDefiniers.forEach(model => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);

let capsModels = Object.fromEntries(capsEntries); 

const {
    User ,
    Room ,
    Message 
} = capsModels;

// Asociación entre User y Room
User.belongsToMany(Room, { through: 'UserRooms' });
Room.belongsToMany(User, { through: 'UserRooms' });

// Asociación entre User y Message
User.hasMany(Message, { foreignKey: 'userId' });
Message.belongsTo(User, { foreignKey: 'userId' });

// Asociación entre Room y Message
Room.hasMany(Message, { foreignKey: 'roomId' });
Message.belongsTo(Room, { foreignKey: 'roomId' });

export const conn = sequelize;
export default capsModels;
 