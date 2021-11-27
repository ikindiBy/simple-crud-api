const { persons } = require('../persons');
const { v4: uuid } = require('uuid');

const { formResponse400, formResponse500 } = require('../utils/formResponse');

const post = (req, res) => {
  const urlParts = req.url.split('/');
  if (urlParts[1] === 'person' && urlParts.length === 2) {
    try {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const data = JSON.parse(body);
        if (!data.name) {
          formResponse400({
            res,
            writeContent: 'Field \"name\" is mandatory!',
          });
        } else if (!data.age) {
          formResponse400({
            res,
            writeContent: 'Field \"age\" is mandatory!',
          });
        } else if (!data.hobbies) {
          formResponse400({
            res,
            writeContent: 'Field \"hobbies\" is mandatory!',
          });
        } else {
          const newPerson = {
            ...data,
            id: uuid(),
          };
          persons.push(newPerson);
          res.statusCode = 201;
          res.setHeader('Content-Type', 'text/plain');
          res.end(JSON.stringify(newPerson));
        }
      });
    } catch (err) {
      formResponse500({
        res,
        writeContent: 'Cannot post person due to the error on server side.' + err,
      });
    }
  } else {
    formResponse400({
      res,
      writeContent: `Cannot post data by ${req.url}`,
    });
  }
}

module.exports = { post };
