
### Description

Phone number input developed with React + TypeScript.
Fully covered with unit-tests.

### Requirements

1. Node 18
2. yarn / npm

### Install

`yarn`

### Tests

`yarn test`

```console
 PASS  src/PhoneInput.test.tsx
  PhoneInput tests
    ✓ should correctly format entered phone number (81 ms)
    ✓ should allow only digits (76 ms)
    ✓ should ignore input events on max phone length (41 ms)
    ✓ should save caret position (38 ms)
    ✓ should remove number on 'Backspace' event (40 ms)
    ✓ should remove number on 'Delete' event (40 ms)
    ✓ should remove number '3' on 'Backspace' event and caret stay before number '4' (34 ms)
    ✓ should remove number '6' on 'Backspace' event and caret stay before number '7' (35 ms)
    ✓ should remove number '4' on 'Delete' event and caret stay after number '3' (35 ms)
    ✓ should remove number '7' on 'Delete' event and caret stay after number '6' (33 ms)

Test Suites: 1 passed, 1 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        2.355 s
Ran all test suites.
✨  Done in 3.80s.

```
