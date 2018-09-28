class Validator {

    validate(value) {
        throw new Error('Cannot call validate(value) on Validator. Must extend and override.');
    }

    getMessage(label) {
        throw new Error('Cannot call getMessage(label) on Validator. Must extend and override.');
    }

}

export default Validator;