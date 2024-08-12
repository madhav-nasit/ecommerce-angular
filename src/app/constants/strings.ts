export const strings = {
  common: {
    appName: 'E-commerce Angular',
    oops: 'Oops!',
    notFound: 'Error 404: Page not found',
    goBack: 'Go back',
    genericErrorMessage: 'An unexpected error occurred.',
  },
  validation: {
    required: '{label} is required',
    notValid: '{label} is not valid',
    password:
      'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
    confirmPassword: 'Please confirm your password',
    doNotMatch: 'Passwords do not match',
    acceptTerms: 'Please accept terms of use and privacy policy.',
  },
  auth: {
    common: {
      userName: 'User Name',
      email: 'Email',
      emailAddress: 'Email Address',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      fName: 'First Name',
      lName: 'Last Name',
      and: 'and',
      iAccept: 'I accept the',
      termsOfUse: 'terms of use',
      privacyPolicy: 'privacy policy',
    },
    signIn: {
      title: 'Sign In',
      dontHaveAccount: `Don’t have an accout yet?`,
      signInSuccess: 'Sign In successful!',
    },
    signUp: {
      title: 'Sign Up',
      alreadyHaveAccount: 'Already have an account?',
      signUpSuccess: 'Sign Up successful!',
    },
  },
  primary: {
    common: {
      signOut: 'Sign Out',
      termsOfUse: 'Terms of Use',
      privacyPolicy: 'Privacy Policy',
    },
    dashboard: {
      title: 'Dashboard',
      next: 'Next',
      previous: 'Previous',
      noProduct: 'No product available.',
    },
  },
  apiErrors: {
    networkError: 'Unable to connect to the server. Please try again.',
    unauthorizedAccess: 'Unauthorized access. Please log in again.',
    forbiddenAccess: 'Forbidden. You do not have permission to access this resource.',
    resourceNotFound: 'Resource not found.',
    internalServerError: 'Internal server error. Please try again later or contact support.',
    unexpectedError: 'Unexpected error occurred. Please try again.',
  },
};
