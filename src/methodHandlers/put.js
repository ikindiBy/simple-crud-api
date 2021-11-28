const { persons } = require('../persons');

const { formResponse400, formResponse500 } = require('../utils/formResponse');
const { isIdValid } = require('../utils/validateId');

const put = (req, res) => {
  const urlParts = req.url.split('/');
  if (urlParts[1] === 'person' && urlParts[2] && urlParts.length === 3) {
    try {
      const idFromRequest = urlParts[2];

      if (!isIdValid(idFromRequest)) {
        res.statusCode = 400;
        res.write(`Invalid ID.`)
        res.end();
      }

      const personById = persons.find(({ id }) => id === idFromRequest);
      if (!personById) {
        res.statusCode = 404;
        res.write(`No user with such ID.`)
        res.end();
      } else {
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
              id: idFromRequest,
            };
            persons.splice(idFromRequest, 1, newPerson);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(JSON.stringify(newPerson));
          }
        });
      }
    } catch (err) {
      formResponse500({
        res,
        writeContent: 'Cannot put person due to the error on server side.' + err,
      });
    }
  } else {
    formResponse400({
      res,
      writeContent: `Cannot put data by ${req.url}`,
    });
  }
}

module.exports = { put };
