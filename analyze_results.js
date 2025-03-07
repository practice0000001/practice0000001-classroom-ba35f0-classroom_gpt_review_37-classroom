import { ChatGPTAPI } from 'chatgpt';
import fs from 'fs';

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('API key not found');
}

const api = new ChatGPTAPI({ apiKey });

async function analyzeTestResults() {
  const testResults = fs.readFileSync('build/result.log', 'utf8');
  const prompt = `테스트 결과를 분석하고 피드백을 제공합니다: ${testResults}`;

  const response = await api.sendMessage(prompt);

  const feedback = response.text.trim();
  fs.writeFileSync('feedback.log', feedback);
}

analyzeTestResults().catch(error => {
  console.error(error);
  process.exit(1);
});
