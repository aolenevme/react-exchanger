const {exec} = require("child_process");

const port = 3000;

exec(`serve -s -l ${port} ./public`, {encoding: "utf-8"});

console.log(`Serving: http://localhost:${port}`);
