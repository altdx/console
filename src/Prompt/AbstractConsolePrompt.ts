// deno-lint-ignore-file ban-ts-comment
import {
  ConsolePromptQuestionType,
  IConsolePrompt,
  MessageValueType,
  NameValueType,
  TypeValueType,
} from "./mod.ts";

import { Input, prompt } from "../deps.ts";

/**
 * Prompt base class.
 */
export abstract class AbstractConsolePrompt implements IConsolePrompt {
  /**
   * Question type for base prompt.
   */
  protected question: ConsolePromptQuestionType;

  /**
   * Constructor.
   */
  protected constructor() {
    this.question = {
      type: Input,
      name: "answer",
      message: "",
    };
  }

  /**
   * @inheritDoc IConsolePrompt.getType
   */
  public getType(): TypeValueType {
    return this.question.type;
  }

  /**
   * @inheritDoc IConsolePrompt.setType
   */
  public setType(type: TypeValueType): this {
    this.question.type = type;

    return this;
  }

  /**
   * @inheritDoc IConsolePrompt.getName
   */
  public getName(): NameValueType {
    return this.question.name;
  }

  /**
   * @inheritDoc IConsolePrompt.setName
   */
  public setName(name: NameValueType): this {
    this.question.name = name;

    return this;
  }

  /**
   * @inheritDoc IConsolePrompt.getMessage
   */
  public getMessage(): MessageValueType {
    return this.question.message;
  }

  /**
   * @inheritDoc IConsolePrompt.setMessage
   */
  public setMessage(message: MessageValueType): this {
    this.question.message = message;

    return this;
  }

  /**
   * @inheritDoc IConsolePrompt.getQuestion
   */
  public getQuestion(): ConsolePromptQuestionType {
    return this.question;
  }

  /**
   * @inheritDoc IConsolePrompt.getParseQuestion
   */
  public getParseQuestion(): unknown {
    return {
      name: this.question.name,
      type: this.question.type,
      message: this.question.message ?? "",
    };
  }

  /**
   * @inheritDoc IConsolePrompt.prompt
   */
  public async prompt<T>(): Promise<T> {
    // @ts-ignore
    return await prompt([this.getParseQuestion()]);
  }
}
