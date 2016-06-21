const express = require('express');
const app = express();

var port = process.env.PORT || 5000;

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/node_modules/responsive-navbar'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.listen(port, () =>
  console.log('Example app listening on port ' + port));
