"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    constructor(name) {
        this.name = name.toUpperCase();
    }
    timestamp() {
        return new Date().toISOString().toUpperCase();
    }
    log(msg) {
        console.log(msg);
    }
    buildPrefix(type) {
        const logType = `[${type.toUpperCase()}]`;
        const date = `[${this.timestamp()}]`;
        const name = `[${this.name}]`;
        return logType + date + name;
    }
    error(msg) {
        const prefix = this.buildPrefix('error');
        this.log(prefix + ' ' + msg);
    }
    info(msg) {
        const prefix = this.buildPrefix('info');
        this.log(prefix + ' ' + msg);
    }
}
exports.default = Logger;
