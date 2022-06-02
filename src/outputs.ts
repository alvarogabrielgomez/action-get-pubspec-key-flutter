import * as core from '@actions/core';

export interface Outputs {
    saveOutput(outputData: OutputData): void
}

export class CoreOutputs implements Outputs {
    saveOutput(outputData: OutputData) {
        core.setOutput('key', outputData.key);
        core.setOutput('content', outputData.content);
    }
}

export type OutputData = {
    key: string,
    content: Object
}