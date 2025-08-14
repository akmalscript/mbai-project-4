# Gemini AI Content Generator API

A Node.js Express API for generating text, analyzing images, transcribing audio, and processing documents using the **Google Gemini API**.

## Features
- **Generate text** from a prompt
- **Generate text from image** (e.g., description, analysis)
- **Generate text from audio** (e.g., transcription, summary)
- **Generate text from document** (e.g., content analysis)

## Requirements
- Node.js v16+  
- NPM  
- Google Gemini API key  

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/akmalscript/mbai-project-4.git
   cd mbai-project-4
2. Install dependencies:
   ```bash
    npm init -y
    npm install express dotenv multer @google/genai
3. Create a .env file in the root directory:
   ```bash
    GEMINI_API_KEY=your-gemini-api-key
4. Start the server:
   ```bash
    node index.js
    ```

## API Endpoints
1. **Generate Text**  
    POST: ```/generate-text```  
    Request body (JSON):
    ```bash
    {
    "prompt": "Write a short poem about the ocean."
    }
    ```
    Response:  
    ```bash
    {
    "output": "The ocean sings..."
    }
    ```  
2. Generate from Image  
    POST: ```/generate-from-image```  
    Form-data:  
    - image (file: PNG)
    - prompt (optional text)

3. Generate from Audio  
    POST: ```/generate-from-audio```   
    Form-data:  
    - audio (file: MP3/WAV)

4. Generate from Document  
    POST ```/generate-from-document```  
    Form-data:  
    - document (file: PDF/DOCX/TXT)

## Notes
- This server runs on port 3000 by default.
- Ensure your .env file contains a valid GEMINI_API_KEY.
- Uploaded files are temporarily stored in uploads/ and deleted after processing.