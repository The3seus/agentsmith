
# AgentSmith

**MrSmith** (aka AgentSmith) is a modular, extensible AI agent framework built in Node.js and TypeScript.  
It streamlines the creation and orchestration of AI agents that integrate with LLMs like OpenAI or Ollama.

---

## Features

- **Routing Agent**: Classifies inputs and routes them through configurable pipelines of specialized agents.  
- **Provider Abstraction**: Swap between OpenAI, Ollama, or custom LLM providers via a unified interface.  
- **Pluggable Agents**: Drop new agents into `src/agents`, register in code, and reference in `src/config/agents.json`.  
- **Type-Safe**: Written in strict TypeScript with generics for input/output typing.  
- **Config-Driven**: Define intent-to-pipeline mappings and provider settings in JSON, no hard-coding.  
- **Zero-Friction Dev**: `npm run dev` (ts-node), filled `.env.example`, and clear build scripts.

---

## Quick Start

```bash
git clone agentsmith.git
cd agentsmith
cp .env.example .env       # add your OPENAI_API_KEY and/or OLLAMA_BASE_URL
npm install
npm run dev                # runs the sample prompt from CLI
````

---

## Project Layout

```
src/
  agents/       # Individual agent modules (e.g. IntentClassifierAgent.ts)
  providers/    # LLM provider wrappers (OpenAI, Ollama)
  router/       # RouterAgent implementation
  config/       # JSON configs (agents.json, providers.json)
  utils/        # Logger, helpers
index.ts        # CLI/HTTP entrypoint
context.ts      # Shared AgentContext interface
```

---

## Adding a New Agent

1. Create `src/agents/MyAgent.ts` extending `BaseAgent<I, O>` and implement `run(input, context)`.
2. Export your class in `src/agents/index.ts`.
3. Reference the agent name in `src/config/agents.json` under the desired intent pipeline.

```ts
// src/agents/MyAgent.ts
import { BaseAgent } from './BaseAgent';
import { AgentContext } from '../context';

export class MyAgent extends BaseAgent<string, string> {
  async run(input: string, _context?: AgentContext): Promise<string> {
    const prompt = `Do something special: ${input}`;
    return this.provider.complete(prompt);
  }
}
```

Then add `"MyAgent"` to the intent pipeline in `config/agents.json`.

---

## Environment Variables

Copy `.env.example` to `.env` and fill in:

```bash
OPENAI_API_KEY=sk-...
OLLAMA_BASE_URL=http://localhost:11434
LOG_LEVEL=info
```

---

## Scripts

* `npm run dev` – Start in development mode with ts-node.
* `npm run build` – Compile TypeScript to `dist/`.
* `npm start` – Run the compiled JavaScript.

---

## License

MIT

````

---

## 3. **.env.example**  

```env
# Copy to .env and fill in
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
OLLAMA_BASE_URL=http://localhost:11434
LOG_LEVEL=info
````

---

### Packaging

Once you’ve applied the above changes, from the project root:

```bash
# Install & verify everything works
npm install
npm run dev

# Build and zip
npm run build
zip -r AgentSmith.zip . \
  -x "node_modules/*" "dist/*" ".env" "*.log"
```

