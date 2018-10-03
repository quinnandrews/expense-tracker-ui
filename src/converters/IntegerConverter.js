import Converter from './Converter';

class IntegerConverter extends Converter {

    convert(value) {
        if (value !== null && value !== undefined) {
            return Number.parseInt(value, 10);
        }
    }

}

export default IntegerConverter;

