const fs = require("fs");
const http = require("http");
const url = require("url");

const replaceTemplate = (temp, product) => {
  let output = temp.replaceAll("{%PRODUCTNAME%}", product.productName);
  output = output.replaceAll("{%IMAGE%}", product.image);
  output = output.replaceAll("{%PRICE%}", product.price);
  output = output.replaceAll("{%FROM%}", product.image);
  output = output.replaceAll("{%NUTRIENTS%}", product.image);
  output = output.replaceAll("{%QUANTITY%}", product.image);
  output = output.replaceAll("{%DESCRIPTION%}", product.image);
  output = output.replaceAll("{%ID%}", product.image);

  if (!product.organic)
    output = output.replaceAll("{%NOT_ORGANIC%}", "not-organic");

  return output;
};

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
console.log(tempCard);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  // Overview Page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    // console.log(cardsHtml);
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    console.log(output);
    res.end(output);

    // Product Page
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");

    // API
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    // NOT Found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
