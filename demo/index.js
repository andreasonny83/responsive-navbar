const express = require('express');
const app = express();

const port = process.argv[2] || 8888;

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/node_modules/responsive-navbar'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.listen(port, () =>
  console.log('Example app listening on port ' + port));
