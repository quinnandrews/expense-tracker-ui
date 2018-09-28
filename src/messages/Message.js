
export const info = 'info';
export const warning = 'warning';
export const error = 'error';

class Message {

    type;
    message;

    constructor(type, message) {
        this.type = type;
        this.message = message;
    }

}

export default Message;