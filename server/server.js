const bodyParse = require('body-parser');
const express = require('express');
const path = require('path');

const publicPath = path.join(__dirname,'../public');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParse.json());

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};