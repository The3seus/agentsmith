import { BaseAgent } from './BaseAgent';
import { AgentContext } from '../context';

export class IntentClassifierAgent extends BaseAgent<string, string> {
  async run(input: string, _context?: AgentContext): Promise<string> {
    const prompt = \`Classify the intent of the user's request in one word (e.g. "summarize", "sql", "chat"): \n\nUser: \${input}\nIntent:\`;
    const intent = (await this.provider.complete(prompt)).trim().toLowerCase();
    return intent || 'default';
  }
}
