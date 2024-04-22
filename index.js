const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.use(express.static(path.join(__dirname, './public')));
const apiKey = 'live_XNmqhZkE6yVVNOjqDqvz51Tzve3G0feVchLF38BuyBPUH9W6rIKrcDO3sSxOpebQ';
app.get('/breeds', async (req, res) => {
    try {
        const { q } = req.query;
        const response = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${q}`, {
            headers: {
                'x-api-key': apiKey
            }
        });
        const breeds = response.data;
        res.json(breeds);
    } catch (error) {
        console.error('Error fetching dog breeds:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/images', async (req, res) => {
    try {
        const { breed } = req.query;
        const response = await axios.get(`https://api.thedogapi.com/v1/images/search?limit=10&breed_ids=${breed}`, {
            headers: {
                'x-api-key': apiKey
            }
        });
        const images = response.data;
        res.json(images);
    } catch (error) {
        console.error('Error fetching images:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
