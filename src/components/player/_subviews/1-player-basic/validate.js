import validator from 'validator';

export default (vals) => {
    const errors = {};
    const values = vals.toJSON();

    if (!values.name || !validator.isAlpha(values.name)) {
        errors.name = 'Required';
    }

    return errors;
};
