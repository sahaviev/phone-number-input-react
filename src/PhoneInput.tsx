import { KeyboardEventHandler, useRef } from 'react';

const MAX_LENGTH = 14;

export const PhoneInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeydown: KeyboardEventHandler<HTMLInputElement> = (evt) => {
    const input = inputRef.current;
    if (!input) {
      return;
    }
    const key = evt.key;

    if (key === "Backspace") {
      if (input.selectionStart === 10) {
        input.selectionStart = input.selectionEnd = 9;
      }
      if (input.selectionStart === 5 || input.selectionStart === 6) {
        input.selectionStart = input.selectionEnd = 4;
      }
      return;
    }

    if (key === "Delete") {
      if (input.selectionStart === 9) {
        input.selectionStart = input.selectionEnd = 10;
      }
      if (input.selectionStart === 4 || input.selectionStart === 5) {
        input.selectionStart = input.selectionEnd = 6;
      }
      return;
    }

    const hasSelection = (input.selectionEnd || 0) - (input.selectionStart || 0) > 0;
    if (input.value.length === MAX_LENGTH && !(key === "ArrowLeft" || key === "ArrowRight") && !hasSelection) {
      evt.preventDefault();
    }
  };

  const handleChange = () => {
    const input = inputRef.current;
    if (!input) {
      return;
    }

    const phone = input.value.replace(/\D/g, '')
      .replace(/^(\d{3})(\d)/, '($1) $2')
      .replace(/(\d{3})(\d{1,4})/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');

    const caretPosition = input.selectionStart ? input.selectionStart : 0;
    const newCaretPosition = (phone.length > input.value.length) ? phone.length - input.value.length + caretPosition : caretPosition;
    input.value = phone;
    input.selectionStart = input.selectionEnd = newCaretPosition;
  };

  return (
    <div>
      <input
        type="tel"
        id="phone"
        maxLength={16}
        placeholder="mobile number"
        autoComplete="off"
        ref={inputRef}
        data-testid="phone"
        onKeyDown={handleKeydown}
        onChange={handleChange}
      />
      <div><label htmlFor="phone">(123) 456-7890</label></div>
    </div>
  )
};
