import express from 'express';

import './database/connection';


const app = express();

app.use(express.json());

app.get('/test', (request, response) => {
    return response.json ({ message: 'Hello Word' });
});

// localhost:3333
app.listen(3333);