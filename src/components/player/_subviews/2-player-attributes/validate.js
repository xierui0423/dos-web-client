export default (vals, props) => {
    const errors = {};
    const values = vals.toJSON();

    const currentTotal = ['speed',
        'agility',
        'strength',
        'pass',
        'control',
        'tackle',
        'head',
        'shoot',
        'flair'].reduce((pre, next) => (pre + values[next]), 0);

    const diff = currentTotal - (55 + (props.experience || 0));

    if (diff > 0) {
        errors._error = `Need another ${diff} attribute points!`; // eslint-disable-line
    } else if (diff < 0) {
        errors._error = `You have ${-diff} unassigned points!`; // eslint-disable-line
    }

    return errors;
};

export const getAttributeUpperLimit = (height, weight) => ({
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
