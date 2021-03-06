jest.mock('./kernel');
import './';
import { run, terminate } from './kernel';

describe('Altdx CLI entry point', () => {
  it('should run run function', () => {
    expect(run).toHaveBeenCalledTimes(1);
  });

  it('should run terminate function', () => {
    expect(terminate).toHaveBeenCalledTimes(1);
  });
});
