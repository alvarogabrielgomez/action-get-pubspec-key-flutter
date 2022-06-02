import { Inputs } from "./inputs";
import { Outputs, OutputData } from "./outputs";
import * as fs from 'fs'
import * as path from 'path'
import { parse } from 'yaml';
import * as core from '@actions/core';

export class Action {
    private inputs: Inputs
    private outputs: Outputs

    constructor(inputs: Inputs, outputs: Outputs) {
        this.inputs = inputs;
        this.outputs = outputs;
    }

    async perform() {
        const content = await this.getYamlContent();
        const outputData: OutputData = {
            key: this.inputs.key,
            content: content,
        };

        this.outputs.saveOutput(outputData);
    }

    private async getYamlContent(): Promise<string> {
        const pubspecFilePath = this.inputs.pubspecFilePath;
        const workspacePath = path.join(process.env.GITHUB_WORKSPACE || '', pubspecFilePath);


        const fileContents = await fs.promises.readFile(workspacePath, { encoding: 'utf8' });
        const yamlContents = parse(fileContents);
        const key = this.inputs.key;

        const content = yamlContents[key];
        const flutter = yamlContents['flutter'];

        if (flutter === undefined || flutter === null) {
            throw Error(`The ${pubspecFilePath} are not belong to a Flutter project.`);
        }

        if (content === undefined || content === null) {
            throw Error(`The ${pubspecFilePath} does not contain an "${key}" key.`);
        }

        return Promise.resolve(content);
    }
}