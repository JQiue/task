const http = require('http');
const PORT = 8001;
const serverHandler = require("../app");

http.createServer(serverHandler).listen(PORT, () => {
  console.log(`server run at http://localhost:${PORT}`);
})
