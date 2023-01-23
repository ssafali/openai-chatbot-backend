const express = require("express");
const router = express.Router();

const { Configuration, OpenAIApi } = require("openai");

// Require the User model in order to interact with the database
const User = require("../models/User.model");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);
 

// Api to call the completion function

router.post('/api', async (req, res) => {
    const {model, prompt, token, temp } = req.body;
    console.log(req.body)
    const response = await openai.createCompletion({
        model: model,
        prompt: prompt,
        max_tokens: token, 
        temperature: temp,  
      });
      res.json({
        message: response.data.choices[0].text,
      })
});

// Api to get model info
router.get('/api/engines', async (req, res) => {
    const response = await openai.listEngines();
    res.json(response.data)
}) 

// Api to create image
router.post('/api/dall-e', async (req, res) => {
  const {prompt, n, size} = req.body;
  console.log(req.body);
try{  const response = await openai.createImage({
      prompt: prompt,
      n: n,
      size: size
  });
  res.json({
      urlList: response.data
  })} catch (err) {
    console.log('Error', err)
  }
})

module.exports = router;