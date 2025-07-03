import { BaseAgent } from './BaseAgent';
import { AgentContext } from '../context';

export class SummarizerAgent extends BaseAgent<string, string> {
  async run(input: string, _context?: AgentContext): Promise<string> {
    const prompt = \`Summarize the following text in 3 concise sentences:\n\n\${input}\n\nSummary:\`;
    return this.provider.complete(prompt, { temperature: 0.3, maxTokens: 150 });
  }
}
