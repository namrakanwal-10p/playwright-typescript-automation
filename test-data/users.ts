
export const users = {
  standardUser: {
    username: 'standard_user',
    password: 'secret_sauce',
    expectedResult: 'success'
  },

  invalidUser: {
    username: 'invalid_user',
    password: 'wrong_password',
    expectedResult: 'Username and password do not match'
  },

  lockedOutUser: {
    username: 'locked_out_user',
    password: 'secret_sauce',
    expectedResult: 'locked out'
  },

  checkoutUser: {
    firstName: 'Namra',
    lastName: 'Kanwal',
    postalCode: '75300'
  }
};
