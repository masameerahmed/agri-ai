# AgriSmart AI

AgriSmart AI is an intelligent assistant designed to empower farmers with real-time data, AI-driven diagnosis, and financial guidance.

## Features
- **AI Crop Advisory**: Diagnoses plant diseases and suggests treatments using Gemini 3.
- **Smart Weather Alerts**: Local weather forecasting with farm-specific actionable logic.
- **Mandi Live**: Real-time commodity price tracking and market strategy analysis using Google Search Grounding.
- **Scheme Guidance**: Simplified explanation of government agricultural schemes.

## Tech Stack
- **Frontend**: React (ES Modules), Tailwind CSS
- **AI**: Google Gemini API (@google/genai)
- **Data**: Open-Meteo API (Weather), Google Search Grounding (Market Data)

## Setup for VS Code

1. **Prerequisites**: Ensure you have [VS Code](https://code.visualstudio.com/) installed.
2. **Extensions**: Open this folder in VS Code. It will recommend installing:
   - **Tailwind CSS IntelliSense**: For CSS autocomplete.
   - **ESLint/Prettier**: For code formatting.
3. **Running Locally**:
   - Since this app uses ES modules directly, you can run it using a simple live server.
   - Install the **Live Server** extension in VS Code.
   - Right-click `index.html` and select **Open with Live Server**.

## Environment Variables
The app requires an API key for the Google Gemini API.
- Ensure `process.env.API_KEY` is configured in your deployment environment.
- For local development with Live Server, you may need a local proxy or build tool to inject variables, or use the interactive key selector if integrated with AI Studio.
