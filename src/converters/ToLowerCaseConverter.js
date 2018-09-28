import Converter from './Converter';

class ToLowerCaseConverter extends Converter {

    convert(value) {
        if (value !== null && value !== undefined) {
            return value.toLowerCase();
        }
    }

}

export default ToLowerCaseConverter;

