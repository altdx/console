// @ts-ignore
import colors from "ansi-colors";
import { ColorType, IConsoleStyle, ModifierType } from "./mod.ts";

/**
 * Altdx Console Style.
 * This class allows you to style terminal output.
 *
 * @remarks
 *
 * This class is based on the {@link https://www.npmjs.com/package/ansi-colors | ansi-colors} package.
 *
 * @example
 *
 * ```ts
 *  import { consoleStyle as style } from '@altdx/console-style';
 *
 *  style.bold().underline().color('blue');
 *  console.log(style.render('hello'));
 *  style.reset();
 *  style.color('white', true).bgc('blue');
 *  console.log(style.render('hello'));
 * ```
 */
export class ConsoleStyle implements IConsoleStyle {
  private modifier: ModifierType | null = null;
  private fontColor: ColorType | null = null;
  private fontColorLight = false;
  private bgColor: ColorType | null = null;
  private bgColorLight = false;

  /**
   * @inheritDoc IConsoleStyle.render
   */
  public render(text: string): string {
    let style = "";

    if (this.modifier) {
      style += this.modifier;
    }

    if (this.fontColor) {
      style += "." + this.fontColor + (this.fontColorLight ? "Bright" : "");
    }

    if (this.bgColor) {
      const bgc = this.bgColor;
      style += ".bg" + (bgc.charAt(0).toUpperCase() + bgc.slice(1)) +
        (this.bgColorLight ? "Bright" : "");
    }

    style = style.replace(/^[. ]+/, "");

    if (style === "") {
      return text;
    }

    const styleFunc = new Function("colors", `return colors.${style}`)(colors);

    return styleFunc(text);
  }

  /**
   * @inheritDoc IConsoleStyle.reset
   */
  public reset(): this {
    this.modifier = null;
    this.fontColor = null;
    this.fontColorLight = false;
    this.bgColor = null;
    this.bgColorLight = false;

    return this;
  }

  /**
   * @inheritDoc IConsoleStyle.bgc
   */
  public bgc(color: ColorType | null, light = false): this {
    this.bgColor = color;
    this.bgColorLight = light;

    return this;
  }

  /**
   * @inheritDoc IConsoleStyle.color
   */
  public color(color: ColorType | null, light = false): this {
    this.fontColor = color;
    this.fontColorLight = light;

    return this;
  }

  /**
   * @inheritDoc IConsoleStyle.bold
   */
  public bold(): this {
    this.setModifier("bold");

    return this;
  }

  /**
   * @inheritDoc IConsoleStyle.dim
   */
  public dim(): this {
    this.setModifier("dim");

    return this;
  }

  /**
   * @inheritDoc IConsoleStyle.hidden
   */
  public hidden(): this {
    this.setModifier("hidden");

    return this;
  }

  /**
   * @inheritDoc IConsoleStyle.inverse
   */
  public inverse(): this {
    this.setModifier("inverse");

    return this;
  }

  /**
   * @inheritDoc IConsoleStyle.italic
   */
  public italic(): this {
    this.setModifier("italic");

    return this;
  }

  /**
   * @inheritDoc IConsoleStyle.underline
   */
  public underline(): this {
    this.setModifier("underline");

    return this;
  }

  /**
   * @inheritDoc IConsoleStyle.strikethrough
   */
  public strikethrough(): this {
    this.setModifier("strikethrough");

    return this;
  }

  private setModifier(modifier: ModifierType): this {
    if (!this.modifier) {
      this.modifier = modifier;

      return this;
    }

    this.modifier += "." + modifier;

    return this;
  }
}

export const consoleStyle = new ConsoleStyle();
