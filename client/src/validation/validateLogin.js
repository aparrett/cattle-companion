export default function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = 'Please enter an email.';
  }

  if (values.email && values.email.length < 5) {
    errors.email = 'Email must be longer than 4 characters.';
  }

  if (values.email && values.email.length > 255) {
    errors.email = 'Email cannot be longer than 255 characters.';
  }

  if (!values.password) {
    errors.password = 'Please enter a password.';
  }

  if (values.password && values.password.length < 5) {
    errors.password = 'Password must be longer than 4 characters.';
  }

  if (values.password && values.password.length > 255) {
    errors.password = 'Password cannot be longer than 255 characters.';
  }

  return errors;
}
