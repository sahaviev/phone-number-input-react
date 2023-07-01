import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { PhoneInput } from './PhoneInput.tsx';

describe("PhoneInput tests", () => {
  beforeEach(async () => {
    render(<PhoneInput />);
  });

  test("should correctly format entered phone number", async () => {
    const input = screen.queryByTestId('phone') as HTMLInputElement;
    await userEvent.type(input, '123');
    expect(input).toHaveValue('123');
    await userEvent.type(input, '456');
    expect(input).toHaveValue('(123) 456');
    await userEvent.type(input, '7890');
    expect(input).toHaveValue('(123) 456-7890');
  });

  test("should allow only digits", async () => {
    const input = screen.queryByTestId('phone') as HTMLInputElement;
    await userEvent.type(input, 'ignore me, 123 but dont ignore numbers');
    expect(input).toHaveValue('123');
  });

  test("should ignore input events on max phone length", async () => {
    const input = screen.queryByTestId('phone') as HTMLInputElement;
    await userEvent.type(input, '1234567890');
    await userEvent.type(input, '111');
    expect(input).toHaveValue('(123) 456-7890');
  });

  test("should save caret position", async () => {
    const input = screen.queryByTestId('phone') as HTMLInputElement;
    await userEvent.type(input, '1234567');
    await userEvent.type(input, '{arrowleft}'.repeat(5) + '1');
    expect(input).toHaveValue('(123) 145-67');
    expect(input.selectionStart).toBe(7);
    expect(input.selectionEnd).toBe(7);
  });

  test("should remove number on 'Backspace' event", async() => {
    const input = screen.queryByTestId('phone') as HTMLInputElement;
    await userEvent.type(input, '1234567890');
    await userEvent.type(input, '{backspace}'.repeat(4));
    expect(input).toHaveValue('(123) 456');
  });

  test("should remove number on 'Delete' event", async () => {
    const input = screen.queryByTestId('phone') as HTMLInputElement;
    await userEvent.type(input, '1234567890');
    await userEvent.type(input, '{delete}{delete}{delete}', {
      initialSelectionStart: 6,
      initialSelectionEnd: 6,
    });
    expect(input).toHaveValue('(123) 789-0');
  });

  test("should remove number '3' on 'Backspace' event and caret stay before number '4'", async () => {
    const input = screen.queryByTestId('phone') as HTMLInputElement;
    await userEvent.type(input, '1234567890');
    await userEvent.type(input, '{backspace}', {
      initialSelectionStart: 6,
      initialSelectionEnd: 6,
    });
    expect(input).toHaveValue('(124) 567-890');
  });


    test("should remove number '6' on 'Backspace' event and caret stay before number '7'", async () => {
      const input = screen.queryByTestId('phone') as HTMLInputElement;
      await userEvent.type(input, '1234567890');
      await userEvent.type(input, '{backspace}', {
        initialSelectionStart: 10,
        initialSelectionEnd: 10,
      });
      expect(input).toHaveValue('(123) 457-890');
    });

    test("should remove number '4' on 'Delete' event and caret stay after number '3'", async () => {
      const input = screen.queryByTestId('phone') as HTMLInputElement;
      await userEvent.type(input, '1234567890');
      await userEvent.type(input, '{delete}', {
        initialSelectionStart: 4,
        initialSelectionEnd: 4,
      });
      expect(input).toHaveValue('(123) 567-890');
    });

    test("should remove number '7' on 'Delete' event and caret stay after number '6'", async () => {
      const input = screen.queryByTestId('phone') as HTMLInputElement;
      await userEvent.type(input, '1234567890');
      await userEvent.type(input, '{delete}', {
        initialSelectionStart: 9,
        initialSelectionEnd: 9,
      });
      expect(input).toHaveValue('(123) 456-890');
    });
});
