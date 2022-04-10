class Logger {
    name: string;

    constructor(name: string) {
        this.name = name.toUpperCase();
    }

    timestamp() {
        return new Date().toISOString().toUpperCase();
    }

    log(msg: string) {
        console.log(msg);
    }

    buildPrefix(type: string) {
        const logType = `[${type.toUpperCase()}]`;
        const date = `[${this.timestamp()}]`;
        const name = `[${this.name}]`;
        return logType + date + name;
    }

    error(msg: string) {
        const prefix = this.buildPrefix('error');
        this.log(prefix + ' ' + msg);
    }

    info(msg: string) {
        const prefix = this.buildPrefix('info');
        this.log(prefix + ' ' + msg);
    }
}

export default Logger;
