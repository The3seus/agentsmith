/**
 * Arbitrary data that flows through the agent pipeline.
 * Extend this interface in your application to include more fields.
 */
export interface AgentContext {
  userId?: string;
  metadata?: Record<string, unknown>;
  [key: string]: unknown;
}
