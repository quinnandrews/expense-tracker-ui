class Converter {

    convert(value) {
        throw new Error('Cannot call convert(value) on Converter. Must extend and override.');
    }

}

export default Converter;