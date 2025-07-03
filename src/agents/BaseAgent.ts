import { AgentContext } from '../context';
import { BaseProvider } from '../providers';

export abstract class BaseAgent<I = any, O = any> {
  constructor(protected readonly provider: BaseProvider) {}

  abstract run(input: I, context?: AgentContext): Promise<O>;
}
