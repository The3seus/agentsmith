import axios from 'axios';
import { BaseProvider, CompletionOptions } from './BaseProvider';

interface OllamaGenerateBody {
  model: string;
  prompt: string;
  options?: Record<string, unknown>;
}

export class OllamaProvider implements BaseProvider {
  constructor(private baseUrl: string) {
    if (!baseUrl) {
      throw new Error('Ollama base URL missing');
    }
  }

  async complete(prompt: string, options: CompletionOptions = {}): Promise<string> {
    const body: OllamaGenerateBody = {
      model: options.model || 'llama3',
      prompt,
      options: {
        temperature: options.temperature ?? 0.7,
        num_predict: options.maxTokens ?? 512
      }
    };
    const res = await axios.post(\`\${this.baseUrl}/api/generate\`, body);
    return res.data?.response || '';
  }
}
