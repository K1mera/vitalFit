const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const PORT = 3001;

conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log("server listening at 3001");
  });
});
