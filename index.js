// npm init -y
// npm install express dotenv multer @google/genai
// create a .env file and fill it with GEMINI_API_KEY={your-gemini-api-key}

const express = require('express');
const dotenv = require('dotenv');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { GoogleGenAI } = require('@google/genai')

dotenv.config();
const app = express();
app.use(express.json());

const genAI = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY})
const model = async (contents) => await genAI.models.generateContent({
    model: 'models/gemini-2.0-flash',
    contents
})

const upload = multer({ dest: 'uploads/'})

app.post('/generate-text', async (req, res) => {
    const { prompt } = req.body

    try {
        const result = await model(prompt)
        res.json({output: result.text})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

const imageToGenerativePart = (filePath) => ({
    inlineData: {
      data: fs.readFileSync(filePath).toString('base64'),
      mimeType: 'image/png',
    },
})

app.post('/generate-from-image', upload.single('image'), async (req, res) => {
    const prompt = req.body.prompt || 'Describe this image'
    const image = imageToGenerativePart(req.file.path)

    try {
        const result = await model([prompt, image])
        res.json({ output: result.text })
    } catch (error) {
        res.status(500).json({ error: error.message })
    } finally {
        fs.unlinkSync(filePath)
    }

})

app.post('/generate-from-audio', upload.single('audio'), async (req, res) => {
    const audioBuffer = fs.readFileSync(req.file.path)
    const base64Audio = audioBuffer.toString('base64')
    const audioPart = {
        inlineData: {
            data: base64Audio,
            mimeType: req.file.mimetype
        }
    }

    try {
        const result = await model([
            'Transcribe or analyze the following audio:',
            audioPart
        ])
        res.json({ output: result.text })
    } catch (error) {
        res.status(500).json({ error: error.message })
    } finally {
        fs.unlinkSync(filePath)
    }

})

app.post('/generate-from-document', upload.single('document'), async(req,res) => {
    const filePath = req.file.path
    const buffer = fs.readFileSync(filePath)
    const base64Doc = buffer.toString('base64')
    const mimeType = req.file.mimetype

    try {
        const documentPart = {
            inlineData: {
                data: base64Doc,
                mimeType
            }
        }

        const result = await model([
            'Analyse this document:',
            documentPart
        ])
        res.json({ output: result.text })
    } catch (error) {
        res.status(500).json({ error: error.message })
    } finally {
        fs.unlinkSync(filePath)
    }
    
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Gemini app is running on port: ${PORT}`)
})
