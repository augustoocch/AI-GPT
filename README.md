# AI-GPT
Build your own gpt chat, based on the openAI API.
 
# First steps

In order to apply properly the current code, you MUST register in openAI
and then, get a apiKey and organization name.

After that, when you have your apikey and org. you must edit /AI-GPT/index.js, in the following section:

```
const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const configuration = new Configuration({
    organization: "<your-organization>",
    apiKey: "<your-API-KEY>"
});
```

Your keys go inside the => " "

To get more info, refer to => https://platform.openai.com/docs/api-reference 

# Running backend with node

In order to run node, you must log in the command prompt (or in the IDE terminal) and 
set your path inside AI-GPT folder. Then, you must run the node backend with:

```
node index.js
```

#  Running frontend with npm

To run the following app, is not enough to run the back, 
of course you must run the app with npm. To do so, yo must go to clients folder and then execute the commands:

```
cd clients
```

```
npm start
```

This runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


# Train your own bot

Dear developer:

I left you in /client/training, a file called training.jsonl.
Whit this file, you can train a model on your own, to get a maximum performance of the openAI technology.



# Aditional commands  

```
npm test`
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```
npm run build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.