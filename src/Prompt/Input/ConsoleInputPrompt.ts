import { MessageValueType, AbstractConsolePrompt } from '../mod.ts';
import { ConsoleInputPromptQuestionType, IConsoleInputPrompt } from './mod.ts';

/**
 * Input console prompt.
 */
export class ConsoleInputPrompt extends AbstractConsolePrompt implements IConsoleInputPrompt {

  /**
   * Question type for input prompt.
   */
  protected question: ConsoleInputPromptQuestionType;

  /**
   * Constructor.
   *
   * @param message - Message to display when the prompt is rendered in the terminal.
   */
  constructor(message: MessageValueType) {
    super();
    this.question = {
      ...this.getQuestion(),
      message: message,
      // minLength: 5,
      // maxLength: null,
      suggestions: ['un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept'],
      list: true,
      info: true,
      maxRows: 3,
      listPointer: '>',
    };
  }

}
