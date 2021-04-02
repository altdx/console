import figures from "https://cdn.skypack.dev/figures@3.2.0?dts";
import { IConsoleFigure } from "./mod.ts";

/**
 * Altdx Console Figure.
 * This class allows you to display figures in the terminal.
 *
 * @example
 *
 *  ```ts
 *  const figure = new ConsoleFigure();
 *  console.log(figure.cross());
 *  console.log(figure.arrowRight());
 *  ```
 *
 * @remarks
 *
 * It is based on {@link https://cdn.skypack.dev/figures}.
 */
export class ConsoleFigure implements IConsoleFigure {
  /**
   * @inheritDoc IConsoleFigure.tick
   */
  public tick(): string {
    return figures.tick;
  }

  /**
   * @inheritDoc IConsoleFigure.arrowDown
   */
  public arrowDown(): string {
    return figures.arrowDown;
  }

  /**
   * @inheritDoc IConsoleFigure.arrowLeft
   */
  public arrowLeft(): string {
    return figures.arrowLeft;
  }

  /**
   * @inheritDoc IConsoleFigure.arrowRight
   */
  public arrowRight(): string {
    return figures.arrowRight;
  }

  /**
   * @inheritDoc IConsoleFigure.arrowUp
   */
  public arrowUp(): string {
    return figures.arrowUp;
  }

  /**
   * @inheritDoc IConsoleFigure.bullet
   */
  public bullet(): string {
    return figures.bullet;
  }

  /**
   * @inheritDoc IConsoleFigure.checkboxOff
   */
  public checkboxOff(): string {
    return figures.checkboxOff;
  }

  /**
   * @inheritDoc IConsoleFigure.checkboxOn
   */
  public checkboxOn(): string {
    return figures.checkboxOn;
  }

  /**
   * @inheritDoc IConsoleFigure.circle
   */
  public circle(): string {
    return figures.circle;
  }

  /**
   * @inheritDoc IConsoleFigure.circleFilled
   */
  public circleFilled(): string {
    return figures.circleFilled;
  }

  /**
   * @inheritDoc IConsoleFigure.cross
   */
  public cross(): string {
    return figures.cross;
  }

  /**
   * @inheritDoc IConsoleFigure.ellipsis
   */
  public ellipsis(): string {
    return figures.ellipsis;
  }

  /**
   * @inheritDoc IConsoleFigure.hamburger
   */
  public hamburger(): string {
    return figures.hamburger;
  }

  /**
   * @inheritDoc IConsoleFigure.heart
   */
  public heart(): string {
    return figures.heart;
  }

  /**
   * @inheritDoc IConsoleFigure.info
   */
  public info(): string {
    return figures.info;
  }

  /**
   * @inheritDoc IConsoleFigure.play
   */
  public play(): string {
    return figures.play;
  }

  /**
   * @inheritDoc IConsoleFigure.radioOff
   */
  public radioOff(): string {
    return figures.radioOff;
  }

  /**
   * @inheritDoc IConsoleFigure.radioOn
   */
  public radioOn(): string {
    return figures.radioOn;
  }

  /**
   * @inheritDoc IConsoleFigure.square
   */
  public square(): string {
    return figures.squareSmall;
  }

  /**
   * @inheritDoc IConsoleFigure.squareFilled
   */
  public squareFilled(): string {
    return figures.squareSmallFilled;
  }

  /**
   * @inheritDoc IConsoleFigure.star
   */
  public star(): string {
    return figures.star;
  }

  /**
   * @inheritDoc IConsoleFigure.warning
   */
  public warning(): string {
    return figures.warning;
  }
}
