import { IConsolePrompt } from './mod.ts';

/**
 * Input Console Prompt.
 */
export class ConsolePrompt {
  /**
   * List of prompts.
   */
  private prompts: IConsolePrompt[] = [];

  /**
   * Set prompts.
   *
   * @param prompts - List of prompts to set.
   */
  public setPrompts(prompts: IConsolePrompt[]): this {
    this.prompts = prompts;

    return this;
  }

  /**
   * Add prompt.
   *
   * @param prompt - Prompt to add.
   */
  public addPrompt(prompt: IConsolePrompt): this {
    this.prompts.push(prompt);

    return this;
  }

  /**
   * Get prompts.
   */
  public getPrompts(): IConsolePrompt[] {
    return this.prompts;
  }

}
