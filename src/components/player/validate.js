import validator from 'validator';

const validate = (values) => {
    const errors = {};
    const name = values.get('name');
    if (!name || !validator.isAlpha(name)) {
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

const attributesValidation = (height, weight) => ({
    speed: 20,
    agility: 20 - (Math.ceil((weight - 44) / 10)),
    strength: 14 + (Math.ceil(weight / 20)),
    pass: 20,
    control: 20 - (Math.ceil((height - 155) / 10)),
    tackle: 20,
    head: 6 + (Math.ceil(height / 15)),
    shoot: 20,
    flair: 20,
});


export default validate;
