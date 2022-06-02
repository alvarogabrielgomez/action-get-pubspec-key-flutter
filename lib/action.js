"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const yaml_1 = require("yaml");
const core = __importStar(require("@actions/core"));
class Action {
    constructor(inputs, outputs) {
        this.inputs = inputs;
        this.outputs = outputs;
    }
    perform() {
        return __awaiter(this, void 0, void 0, function* () {
            const content = yield this.getYamlContent();
            const outputData = {
                key: this.inputs.key,
                content: content,
            };
            this.outputs.saveOutput(outputData);
        });
    }
    getYamlContent() {
        return __awaiter(this, void 0, void 0, function* () {
            const pubspecFilePath = this.inputs.pubspecFilePath;
            const workspacePath = path.join(process.env.GITHUB_WORKSPACE || '', pubspecFilePath);
            core.debug(`workspacePath: ${workspacePath}`);
            const fileContents = yield fs.promises.readFile(workspacePath, { encoding: 'utf8' });
            const yamlContents = (0, yaml_1.parse)(fileContents);
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
        });
    }
}
exports.Action = Action;
