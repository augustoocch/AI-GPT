const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const configuration = new Configuration({
    organization: "xxxxxxxxxxxxxxxxxxxxxxxx",
    apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
});
const openai = new OpenAIApi(configuration);
const bodyParser = require('body-parser');
const cors = require('cors')


//Agregando body parser y cors a express
const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3080;


//Creacion de la funcion de llamado al API
app.post('/',  async(req, resp) => {
    const {message, currentModel, temperature} = req.body;
    let tempFloat = parseFloat(temperature); 
    const response = await openai.createCompletion({
        model: `${currentModel}`,
        prompt: `${message}`,
        max_tokens: 1000,
        temperature: tempFloat,
    });
    resp.json({
        message: response.data.choices[0].text,
    })
});

app.get('/models',  async(req, resp) => {
    const response = await openai.listEngines();
    resp.json({
        models: response.data.data
    })
});

app.listen(port, ()=>{
    console.log(`Listening at: localhost ${port}`)
})
