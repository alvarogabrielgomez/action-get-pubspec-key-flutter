import * as core from '@actions/core';


export interface Inputs {
    readonly pubspecFilePath: string
    readonly key: string
}

export class CoreInputs implements Inputs {

    get pubspecFilePath(): string {
        const path = core.getInput('path');
        core.debug(`path: ${path}`);
        return path;
    }

    get key(): string {
        const key = core.getInput('key', { required: true });
        core.debug(`key: ${key}`);
        return key;
    }
}