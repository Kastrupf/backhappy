import express from 'express';


const app = express();

app.get('/test', (request, response) => {
    return response.json ({ message: 'Hello Word' });
});

// localhost:3333
app.listen(3333);