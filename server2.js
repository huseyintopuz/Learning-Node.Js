import { createServer } from "http";
const PORT = process.env.PORT;

const players = [
  {
    id: 1,
    name: "Cr7 Ronaldo",
    age: 38,
  },
  {
    id: 2,
    name: "Lionel Messi",
    age: 37,
  },
  {
    id: 3,
    name: "Erling Haaland",
    age: 24,
  },
  {
    id: 4,
    name: "Edin Džeko",
    age: 39,
  },
  {
    id: 5,
    name: "Kylian Mbappe",
    age: 26,
  },
  {
    id: 6,
    name: "Dusan Tadic",
    age: 36,
  },
  {
    id: 6,
    name: "Fred",
    age: 30,
  },
];

// logger middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// JSON middleware
const jsonMiddleware = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
};

// ROUTE handler for GET /api/players
const getPlayersHandler = (req, res) => {
  res.write(JSON.stringify(players));
  res.end();
};

// ROUTE handler for POST /api/players
const createPlayerHandler = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const newPlayer = JSON.parse(body);
    players.push(newPlayer);
    res.statusCode = 201;
    res.write(JSON.stringify(newPlayer));
    res.end();
  });
};

// ROUTE handler for GET /api/players/:id
const getPlayersByIdHandler = (req, res) => {
  const id = req.url.split("/")[3];
  const player = players.find((player) => player.id === parseInt(id));
  if (player) {
    res.write(JSON.stringify(player));
  } else {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: "User not found" }));
  }
  res.end();
};

// not found handler
const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.write(JSON.stringify({ message: "Route not found" }));
  res.end();
};

const server = createServer((req, res) => {
  logger(req, res, () => {
    jsonMiddleware(req, res, () => {
      if (req.url === "/api/players" && req.method === "GET") {
        getPlayersHandler(req, res);
      } else if (
        req.url.match(/\/api\/players\/([0-9]+)/) &&
        req.method === "GET"
      ) {
        getPlayersByIdHandler(req, res);
      } else if (req.url === "/api/players" && req.method === "POST") {
        createPlayerHandler(req, res);
      } else {
        notFoundHandler(req, res);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
