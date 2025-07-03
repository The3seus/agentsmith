import { AgentContext } from '../context';
import { BaseProvider } from '../providers';
import { agentRegistry as defaultRegistry } from '../agents';
import { logger } from '../utils/logger';

interface RouterConfig {
  intents: Record<string, string[]>;
}

interface RouterOptions {
  provider: BaseProvider;
  config: RouterConfig;
  registry?: Record<string, any>;
}

export class RouterAgent {
  private registry: Record<string, any>;

  constructor(private options: RouterOptions) {
    this.registry = { ...defaultRegistry, ...(options.registry || {}) };
  }

  async run(input: any, context: AgentContext = {}): Promise<any> {
    const { provider, config } = this.options;

    // If we have an IntentClassifierAgent, use it
    let intent = 'default';
    if (this.registry.IntentClassifierAgent) {
      const IntentCls = this.registry.IntentClassifierAgent;
      const ic = new IntentCls(provider);
      intent = await ic.run(String(input), context);
      logger.info('Intent detected →', intent);
    }

    const pipeline = config.intents[intent] || config.intents.default;
    if (!pipeline) {
      throw new Error(\`No pipeline configured for intent "\${intent}"\`);
    }

    let data: any = input;
    for (const agentName of pipeline) {
      const AgentCls = this.registry[agentName];
      if (!AgentCls) {
        throw new Error(\`Agent "\${agentName}" not found in registry\`);
      }
      const agent = new AgentCls(provider);
      data = await agent.run(data, context);
      logger.info(\`\${agentName} output →\`, data);
    }

    return data;
  }
}
