import Validator from "./Validator";
import validator from 'validator';

class RequiredValidator extends Validator {

    validate(value) {
        return !validator.isEmpty(value);
    }

    getMessage(label) {
        return label + ' is a required field.';
    }

}

export default RequiredValidator;