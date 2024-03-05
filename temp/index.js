const http = require("http");
const utils = require("./modules");

const arrayNumber = [1, 4, 9, 16, 25];

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html",
  });
  const result3 = utils.checkNumberExist(arrayNumber, 25);
  const result2 = utils.findNegativeMax(arrayNumber);
  const result1 = utils.calcNumber(arrayNumber);

  res.end(`<ul><li>${result1}</li><li>${result2}</li><li>${result3}</li></ul>`);
});

server.listen(4000, () => console.log(`Server is listening on port 4000`));
