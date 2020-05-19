const fs = require("fs");
const http = require("http");

const user = "Wadeea";

fs.writeFile("user-data.txt", "Name " + user, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("WROTE FILE");
});

const server = http.createServer((req, res) => {
  console.log("INCOMING REQUEST");
  console.log(req.method, req.url);

  if (req.method === "POST") {
    let body = "";
    req.on("end", () => {
      // console.log(body);
      const userName = body.split("=")[1];
      // res.end("<h1>Got the POST request.</h1>");
      res.end(`<h1>${userName}</h1>`);
    });

    req.on("data", (chunk) => {
      body += chunk;
    });
  } else {
    res.setHeader("Content-Type", "text/html");
    res.end(
      "<form method='POST'><input type='text' name='username'><button type='submit'>Create User</button></form>"
    );
  }

  // res.setHeader("Content-Type", "text/plain");
  // res.setHeader("Content-Type", "text/html");
  // res.end("<h1>Success!</h1>");
  // res.end(
  //   "<form method='POST'><input type='text' name='username'><button type='submit'>Create User</button></form>"
  // );
});

server.listen(5000);
