const express = require('express');
const app = express();
const config = require('./config.json');

app.use(express.static(__dirname + '/dist'));
app.get('/', (req, res) => res.sendFile(__dirname + '/dist/index.html'));

app.get('/api', (req, res) => res.json({ message: 'helloworld' }));

app.listen(config.port, () => console.log(`Express Server listen at port ${config.port}...`));