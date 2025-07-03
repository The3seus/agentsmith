import { OpenAIProvider } from './OpenAIProvider';
import { OllamaProvider } from './OllamaProvider';
import { BaseProvider } from './BaseProvider';

export function loadProviders(config: any): Record<string, BaseProvider> {
  const map: Record<string, BaseProvider> = {};
  if (config.providers.openai) {
    map.openai = new OpenAIProvider(process.env.OPENAI_API_KEY || config.providers.openai.apiKey);
  }
  if (config.providers.ollama) {
    map.ollama = new OllamaProvider(process.env.OLLAMA_BASE_URL || config.providers.ollama.baseUrl);
  }
  return map;
}

export { BaseProvider };
