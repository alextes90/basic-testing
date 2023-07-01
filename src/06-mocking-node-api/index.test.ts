// // Uncomment the code below and write your tests
import path from 'path';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';

const pathToFile = './index.ts';
const fakePath = 'foo';

jest.mock('fs/promises');
jest.mock('fs');

const existsSyncMock = jest.mocked(existsSync);
const readFileMock = jest.mocked(readFile);

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    // Write your test here
    const helperFunc = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(helperFunc, 400);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(helperFunc, 400);
  });

  test('should call callback only after timeout', () => {
    // Write your test here
    const helperFunc = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(helperFunc, 400);

    expect(helperFunc).not.toBeCalled();

    jest.runAllTimers();

    expect(helperFunc).toBeCalled();
    expect(helperFunc).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    // Write your test here
    const helperFunc = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(helperFunc, 100);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(helperFunc, 100);
  });

  test('should call callback multiple times after multiple intervals', () => {
    // Write your test here
    const helperFunc = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(helperFunc, 100);

    expect(helperFunc).not.toBeCalled();

    jest.advanceTimersByTime(1000);

    expect(helperFunc).toBeCalled();
    expect(helperFunc).toHaveBeenCalledTimes(10);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // Write your test here
    const joinSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(joinSpy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
    const result = await readFileAsynchronously(fakePath);
    expect(result).toBe(null);
  });

  test('should return file content if file exists', async () => {
    // Write your test here

    const testContent = 'foo';

    existsSyncMock.mockReturnValue(true);
    readFileMock.mockReturnValue(Promise.resolve('foo'));

    const realContent = await readFileAsynchronously(fakePath);

    expect(realContent).toBe(testContent);
  });
});
