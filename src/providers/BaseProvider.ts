export interface CompletionOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  [key: string]: any;
}

export interface BaseProvider {
  /**
   * Returns the completion text for a given prompt.
   */
  complete(prompt: string, options?: CompletionOptions): Promise<string>;
}
