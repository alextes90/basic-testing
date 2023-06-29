// Uncomment the code below and write your tests
import {
  throwError,
  resolveValue,
  throwCustomError,
  rejectCustomError,
  MyAwesomeError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    // Write your test here
    expect.assertions(1);
    const result = await resolveValue('hello world');
    expect(result).toBe('hello world');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    // Write your test here
    const result = () => throwError('Error');
    expect(result).toThrow(Error);
    expect(result).toThrow('Error');
  });

  test('should throw error with default message if message is not provided', () => {
    // Write your test here
    expect(throwError).toThrow(Error);
    expect(throwError).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    // Write your test here

    expect(throwCustomError).toThrow(MyAwesomeError);
    expect(throwCustomError).toThrow('This is my awesome custom error!');
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    // Write your test here
    // 1st variant
    expect.assertions(2);
    try {
      await rejectCustomError();
    } catch (err) {
      expect(err).toEqual(new MyAwesomeError());
    }
    // 2nd variant
    expect(rejectCustomError).rejects.toEqual(new MyAwesomeError());
  });
});
