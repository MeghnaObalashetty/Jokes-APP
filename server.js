const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { joke: null });
});

app.post('/getJoke', async (req, res) => {
    try {
        const response = await axios.get('https://v2.jokeapi.dev/joke/Any');
        const { error, setup, delivery, joke, message, type } = response.data;
        if (!error) {
            res.json({ setup, delivery, joke, message, type });
            console.log({ setup, delivery, joke, message, type });
        } else {
            console.error('Error fetching joke:', message);
            res.status(500).json({ message: 'Error fetching joke. Please try again.' });
        }
    } catch (error) {
        console.error('Error fetching joke:', error.message);
        res.status(500).json({ message: 'Error fetching joke. Please try again.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
