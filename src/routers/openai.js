const express = require('express')
require("dotenv").config()
const { OpenAI} = require("openai")

const router = new express.Router()

const openai = new OpenAI({apiKey: process.env.OPEN_AI_KEY})

router.post('/openai', async (req, res) => {
    try {
        const {prompt} = req.body
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{"role": "user", "content": prompt}]
        })
        res.status(201).send({data: response.choices[0].message.content})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/openaiImg', async(req, res)=>{
    try {
        const {prompt} = req.body
        const response = await openai.images.generate({
             prompt })
        res.status(201).send({data: response.data[0].url})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/openaiImgDescription', async(req, res)=>{
    try {
        const {prompt} = req.body
        const response = await openai.chat.completions.create({
            model: "gpt-4-vision-preview",
            messages: [
              {
                role: "user",
                content: [
                  { type: "text", text: prompt.text },
                  {
                    type: "image_url",
                    image_url: {
                      "url": prompt.url,
                    },
                  },
                ],
              },
            ],
          });
        res.status(201).send({data: response.choices[0].message.content})
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router