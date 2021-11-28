const { persons } = require('../persons');
const { isIdValid } = require('../utils/validateId');
const { URL_PARTS_WITH_ID, URL_PARTS_WITHOUT_ID } = require('../constants/urlParams');

const get = (req, res) => {
  const urlParts = req.url.split('/');
  if (urlParts.length === URL_PARTS_WITHOUT_ID) {
    try {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(JSON.stringify(persons));
    } catch (err) {
      res.statusCode = 500;
      res.write(`Cannot get persons due to the errors on server side.`)
      res.end()
    }
  } else if (urlParts[2] && urlParts.length === URL_PARTS_WITH_ID) {
    const idFromRequest = urlParts[2];
    try {
      if (!isIdValid(idFromRequest)) {
        res.statusCode = 400;
        res.write(`Invalid ID.`)
        res.end();
      } else {
        const personById = persons.find(({ id }) => id === urlParts[2]);
        if (personById) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end(JSON.stringify(personById));
        } else {
          res.statusCode = 404;
          res.write(`No user with such ID.`)
          res.end();
        }  
      }
    } catch (err) {
      res.statusCode = 500;
      res.write(`Cannot get a person with id = ${idFromRequest} due to the errors on server side.`);
      res.end();
    }
  } else {
    res.statusCode = 400
    res.write(`Cannot get data by ${req.url}`)
    res.end()
  }
}

module.exports = { get };
