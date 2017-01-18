import validator from 'validator';

const validate = (values) => {
    const errors = {};
    if (!validator.isAlpha(values.name)) {
        errors.name = 'Required';
    }
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //     errors.email = 'Invalid email address';
    // }
    // if (!values.sex) {
    //     errors.sex = 'Required';
    // }
    // if (!values.favoriteColor) {
    //     errors.favoriteColor = 'Required';
    // }
    return errors;
};

export default validate;
