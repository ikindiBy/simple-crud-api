const { persons } = require('../persons');

const { formResponse400, formResponse500 } = require('../utils/formResponse');
const { isIdValid } = require('../utils/validateId');

const del = (req, res) => {
  const urlParts = req.url.split('/');
  const idFromRequest = urlParts[2];

  if (!idFromRequest) {
    res.statusCode = 400;
    res.write('ID should be provided.');
    res.end();
  }
  if (urlParts[1] === 'person' && urlParts.length === 3) {
    try {
      if (!isIdValid(idFromRequest)) {
        res.statusCode = 400;
        res.write(`Invalid ID.`);
        res.end();
      }

      const personById = persons.find(({ id }) => id === idFromRequest);
      if (!personById) {
        res.statusCode = 404;
        res.write(`No user with such ID.`);
        res.end();
      } else {
        persons.splice(idFromRequest, 1);
        res.statusCode = 204;
        res.setHeader('Content-Type', 'text/plain');
        res.end();
      }
    } catch (err) {
      formResponse500({
        res,
        writeContent: 'Cannot delete a person due to the error on server side.' + err,
      });
    }
  } else {
    formResponse400({
      res,
      writeContent: `Cannot delete data by ${req.url}`,
    });
  }
}

module.exports = { del };
