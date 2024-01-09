import { User, Room, Message } from './db';

// Asociación entre User y Room
User.belongsToMany(Room, { through: 'UserRooms' });
Room.belongsToMany(User, { through: 'UserRooms' });

// Asociación entre User y Message
User.hasMany(Message, { foreignKey: 'userId' });
Message.belongsTo(User, { foreignKey: 'userId' });

// Asociación entre Room y Message
Room.hasMany(Message, { foreignKey: 'roomId' });
Message.belongsTo(Room, { foreignKey: 'roomId' });