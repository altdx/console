/**
 * Altdx Console Figure interface.
 * This interface allows you to display figures in the terminal.
 */
export interface IConsoleFigure {
  /**
   * Write tick: ✔
   */
  tick: () => string;

  /**
   * Write cross: ✖
   */
  cross: () => string;

  /**
   * Write star: ★
   */
  star: () => string;

  /**
   * Write squareFilled: ◼
   */
  squareFilled: () => string;

  /**
   * Write square: ◻
   */
  square: () => string;

  /**
   * Write play: ▶
   */
  play: () => string;

  /**
   * Write circle: ◯
   */
  circle: () => string;

  /**
   * Write circleFilled: ◉
   */
  circleFilled: () => string;

  /**
   * Write bullet: ●
   */
  bullet: () => string;

  /**
   * Write ellipsis: …
   */
  ellipsis: () => string;

  /**
   * Write info: ℹ
   */
  info: () => string;

  /**
   * Write warning: ⚠
   */
  warning: () => string;

  /**
   * Write hamburger: ☰
   */
  hamburger: () => string;

  /**
   * Write heart: ♥
   */
  heart: () => string;

  /**
   * Write arrowUp: ↑
   */
  arrowUp: () => string;

  /**
   * Write arrowDown: ↓
   */
  arrowDown: () => string;

  /**
   * Write arrowLeft: ←
   */
  arrowLeft: () => string;

  /**
   * Write arrowRight: →
   */
  arrowRight: () => string;

  /**
   * Write radioOn: ◉
   */
  radioOn: () => string;

  /**
   * Write radioOff: ◯
   */
  radioOff: () => string;

  /**
   * Write checkboxOn: ☒
   */
  checkboxOn: () => string;

  /**
   * Write checkboxOff: ☐
   */
  checkboxOff: () => string;
}
