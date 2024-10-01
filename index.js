import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const dadJokesBase = "https://icanhazdadjoke.com/";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(`${dadJokesBase}slack`);
        
        const data = response.data;
        const joke = data.attachments[0].text;
        res.render("index.ejs", { joke: joke});
    } catch (error) {
        console.log(error);
        res.status(500);
    }
});

app.post("/", async (req, res) => {    
    try {
        const searchTerm = req.body.searchTerm;
        const endPoint = `${dadJokesBase}search?term=${searchTerm}`;
        const config = { headers:
            {
            "Accept": "application/json",
            }
        };
        const response = await axios.get(endPoint, config);
        const data = response.data;
        const jokes = data.results;
        const joke = jokes[ Math.floor(Math.random() * jokes.length)].joke
        res.render("index.ejs", { joke: joke});
    } catch (error) {
        console.log(error);
        res.status(500);
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})