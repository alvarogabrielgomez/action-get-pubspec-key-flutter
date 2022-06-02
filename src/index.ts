import * as core from '@actions/core';
import { CoreInputs } from './inputs';
import { CoreOutputs } from './outputs';
import { Action } from './action';

async function run() {
    try {
        core.info(`Starting.`);
        const action = createAction()
        await action.perform();
    } catch (error: any) {
        core.setFailed(error);
    }

}
function createAction(): Action {
    const inputs = new CoreInputs();
    const outputs = new CoreOutputs();

    return new Action(inputs, outputs);
}

run();