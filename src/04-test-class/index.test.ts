// Uncomment the code below and write your tests
import lodash from 'lodash';
import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

const sum = 100;
const bankAccount = getBankAccount(sum);

// afterEach(() => {
//   jest.restoreAllMocks();
// });

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    // Write your test here
    expect(bankAccount).toBeInstanceOf(BankAccount);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    const withdraw = () => {
      bankAccount.withdraw(sum + 1);
    };
    expect(withdraw).toThrow(InsufficientFundsError);
    expect(withdraw).toThrow(
      `Insufficient funds: cannot withdraw more than ${bankAccount.getBalance()}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
    const secondBankAccount = getBankAccount(0);
    const transfer = () => {
      bankAccount.transfer(sum + 1, secondBankAccount);
    };
    expect(transfer).toThrow(InsufficientFundsError);
    expect(transfer).toThrow(
      `Insufficient funds: cannot withdraw more than ${bankAccount.getBalance()}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
    const transfer = () => {
      bankAccount.transfer(sum + 1, bankAccount);
    };
    expect(transfer).toThrow(TransferFailedError);
    expect(transfer).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    // Write your test here
    const depBankAcc = getBankAccount(100);
    depBankAcc.deposit(50);
    expect(depBankAcc.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    // Write your test here
    const withdrawBankAcc = getBankAccount(100);
    withdrawBankAcc.withdraw(50);
    expect(withdrawBankAcc.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    // Write your test here
    const mainBankAcc = getBankAccount(100);
    const secondaryBankAcc = getBankAccount(0);
    mainBankAcc.transfer(50, secondaryBankAcc);
    expect(mainBankAcc.getBalance()).toBe(50);
    expect(secondaryBankAcc.getBalance()).toBe(50);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
    const acc = getBankAccount(100);
    const foo = jest.spyOn(lodash, 'random').mockReturnValue(1);
    const balance = await acc.fetchBalance();
    expect(typeof balance).toBe('number');
    foo.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
    const acc = getBankAccount(100);
    jest.spyOn(acc, 'fetchBalance').mockResolvedValueOnce(1000);
    await acc.synchronizeBalance();
    expect(acc.getBalance()).toEqual(1000);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
    expect.assertions(1);
    const acc = getBankAccount(100);
    jest.spyOn(acc, 'fetchBalance').mockResolvedValueOnce(null);
    try {
      await acc.synchronizeBalance();
    } catch (err) {
      expect(err).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
