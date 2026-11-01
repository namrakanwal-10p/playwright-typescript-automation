
export const loginTestCases = [
  {
    testId: 'SD-UI-004',
    description: 'Invalid username',
    username: 'wrong_user',
    password: 'secret_sauce',
    expectedMessage: 'Username and password do not match'
  },
  {
    testId: 'SD-UI-005',
    description: 'Invalid password',
    username: 'standard_user',
    password: 'wrong_password',
    expectedMessage: 'Username and password do not match'
  },
  {
    testId: 'SD-UI-006',
    description: 'Empty username',
    username: '',
    password: 'secret_sauce',
    expectedMessage: 'Username is required'
  },
  {
    testId: 'SD-UI-007',
    description: 'Empty password',
    username: 'standard_user',
    password: '',
    expectedMessage: 'Password is required'
  }
];
