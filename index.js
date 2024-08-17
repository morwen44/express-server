const express = require("express");

let koders = [
  {
    id: 1,
    name: "Mauro",
  },
  {
    id: 2,
    name: "Ale",
  },
  {
    id: 3,
    name: "Alex",
  },
  {
    id: 4,
    name: "Daniel",
  },
];

const server = express();

server.use(express.json());

server.get("/", (request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.write("Hello World");
  response.end();
});

//list koders
server.get("/koders", (request, response) => {
  response.status(200).json(koders);
});

//add koder
server.post("/koders", (request, response) => {
  const { id, name } = request.body;

  if (!id) {
    response.status(400).json({ message: "id is required" });
    return;
  }
  if (!name) {
    response.status(400).json({ message: "name is required" });
    return;
  }
  koders.push({ id, name });
  response.status(201).json({ message: "Koder added" });
});

//delete koder
server.delete("/koders/:name", (request, response) => {
  console.log(request.params);

  const { name } = request.params;

  console.log(name);
  const newKoders = koders.filter(
    (koder) => koder.name.toLowerCase() != name.toLowerCase()
  );
  console.log(newKoders);
  koders = newKoders;
  
  if (!koders.includes(name)) {
    response.status(404).json({ message: "Koder not found" });
    return;
  }
  
  response.status(200).json({ message: "Koder deleted" });
});

//reset list
server.delete("/koders", (request, response) => {
  koders = [];
  response.status(200).json({ message: "List reset" });
});

server.listen(8080, () => {
  console.log("Server is running on port 8080");
});
