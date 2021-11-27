const { persons } = require('../persons');

const get = (req, res) => {
  const urlParts = req.url.split('/');
  if (urlParts[1] === 'person' && urlParts.length === 2) {
    try {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(JSON.stringify(persons));
    } catch (err) {
      res.statusCode = 500;
      res.write(`Cannot get persons due to the errors on server side.`)
      res.end()
    }
  } else if (urlParts[1] === 'person' && urlParts[2] && urlParts.length === 3) {
    try {
      const personById = persons.find(({ id }) => id === urlParts[2]);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      personById ? res.end(JSON.stringify(personById)) : res.end(JSON.stringify({}));
    } catch (err) {
      res.statusCode = 500;
      res.write(`Cannot get a person due to the errors on server side.`)
      res.end()
    }
  } else {
    res.statusCode = 400
    res.write(`Cannot get data by ${req.url}`)
    res.end()
  }
}

module.exports = { get };
