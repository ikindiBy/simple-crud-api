const { formResponse400 } = require('../utils/formResponse');

const validatePersonFields = (data, res) => {
  if (!data) {
    formResponse400({
      res,
      writeContent: 'Data for person is mandatory!',
    });
  } else if (!data.name) {
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
  }
};

module.exports = { validatePersonFields };
