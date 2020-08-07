const express = require('express');

const app = express();

const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('projectcodedb', 'andrea', 'password1234', {
  dialect: 'postgres',
  host: 'localhost',
});

class User extends Model {}
User.init(
  {
    username: DataTypes.STRING,
    birthday: DataTypes.DATE,
  },
  { sequelize, modelName: 'user' }
);

(async () => {
  await sequelize.sync();
  const jane = await User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20),
  });
  console.log(jane.toJSON());
})();

app.get('/', (req, res) => {
  console.log('received request');
  res.send('<h1>Route reached!</h1>');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('server is running');
});
