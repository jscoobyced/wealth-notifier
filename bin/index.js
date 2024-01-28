"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const NODE_ENV = process.env.NODE_ENV || "development";
dotenv_1.default.config();
const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK;
console.log(SLACK_WEBHOOK, NODE_ENV);
