import validator from 'validator';

export default (vals) => {
  const errors = {};
  const values = vals.toJSON();

  if (!values.skills || !validator.isAlpha(values.skills)) {
    errors.skills = 'Required';
  }

  return errors;
};
