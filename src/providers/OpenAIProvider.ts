import OpenAI from 'openai';
import { BaseProvider, CompletionOptions } from './BaseProvider';

export class OpenAIProvider implements BaseProvider {
  private client: OpenAI;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('OpenAI API key missing');
    }
    this.client = new OpenAI({ apiKey });
  }

  async complete(prompt: string, options: CompletionOptions = {}): Promise<string> {
    const res = await this.client.chat.completions.create({
      model: options.model || 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 512
    });
    return res.choices[0].message?.content || '';
  }
}
