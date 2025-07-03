import 'dotenv/config';
import { RouterAgent } from './router/RouterAgent';
import { loadProviders } from './providers';
import { agentRegistry } from './agents';
import agentsConfig from './config/agents.json';
import providerConfig from './config/providers.json';

(async () => {
  const providers = loadProviders(providerConfig);
  const provider = providers[providerConfig.default];

  const router = new RouterAgent({
    provider,
    config: agentsConfig,
    registry: agentRegistry
  });

  // Simple CLI prompt
  const input = process.argv.slice(2).join(' ') || 'Please summarize: TypeScript is a typed superset of JavaScript.';
  const result = await router.run(input, { userId: 'cli-user' });
  console.log('\n🧠 Result →', result);
})();
