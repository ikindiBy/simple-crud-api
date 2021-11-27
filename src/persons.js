const { v4: uuid } = require('uuid');

const persons = [
  {
    id: '42',
    name: 'Sam',
    age: 35,
    hobbies: [],
  },
  {
    id: uuid(),
    name: 'Bob',
    age: 55,
    hobbies: [],
  },
  {
    id: uuid(),
    name: 'Lora',
    age: 56,
    hobbies: ['books', 'ML', 'flowers'],
  },
  {
    id: uuid(),
    name: 'Sergio',
    age: 25,
    hobbies: ['AI', 'AR', 'pizza'],
  },
];

module.exports = { persons };