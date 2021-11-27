const formResponse400 = ({ res, writeContent }) => {
  res.statusCode = 400;
  res.write(writeContent);
  res.end();
};

const formResponse500 = ({ res, writeContent }) => {
  res.statusCode = 500;
  res.write(writeContent);
  res.end();
};

module.exports = { formResponse400, formResponse500 };
