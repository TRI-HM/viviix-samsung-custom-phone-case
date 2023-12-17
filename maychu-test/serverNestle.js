const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());

// app.use(cors({
//     origin: 'http://localhost:3000' // only allow requests from this origin
// }));

// Middleware to parse JSON bodies
app.use(bodyParser.json({limit: '50mb'}));

app.post('/insertuser', (req, res) => {
    console.log(req.body);
    res.status(200).send('Received your request!');
});

app.listen(30000, () => {
    console.log('Server is running on port 30000');
});
