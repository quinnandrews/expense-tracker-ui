import Validator from "./Validator";
import validator from 'validator';

class DoesNotInclude0Validator extends Validator {

    validate(value) {
        return !validator.contains(value, '0');
    }

    getMessage(label) {
        return label + ' must not contain the number 0.';
    }

}

export default DoesNotInclude0Validator;