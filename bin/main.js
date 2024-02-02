"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const marketdata_1 = __importDefault(require("./marketdata"));
const model_1 = require("./model");
const slack_1 = __importDefault(require("./slack"));
const ylsbullion_1 = __importDefault(require("./ylsbullion"));
const run = async () => {
    const mdMessage = await checkMarketData();
    const ylgMessage = await checkYlgBullion();
    const slackContent = mdMessage.concat(ylgMessage);
    const slackService = new slack_1.default();
    const message = {
        header: {
            icon: model_1.UpwardsTrend,
            messsage: `Price update`,
        },
        content: slackContent,
    };
    await slackService.sendMessage(message);
};
exports.run = run;
const checkYlgBullion = async () => {
    const ylgBullion = new ylsbullion_1.default();
    const message = [];
    const gold96 = await ylgBullion.fetchCurrentPrice('96');
    if (gold96)
        message.push(gold96);
    const gold99 = await ylgBullion.fetchCurrentPrice('99');
    if (gold99)
        message.push(gold99);
    return message;
};
const checkMarketData = async () => {
    const ratio = model_1.OUNCE_TO_GRAM / model_1.GRAM_PER_BAHT;
    const request = {
        ratio,
        currency: 'XAUTHB',
    };
    const message = [];
    const goldPrice = await checkMarketDataPrice(request);
    message.push(goldPrice);
    request.ratio = 1;
    request.currency = 'EURTHB';
    const euroPrice = await checkMarketDataPrice(request);
    message.push(euroPrice);
    request.currency = 'USDTHB';
    const usdPrice = await checkMarketDataPrice(request);
    message.push(usdPrice);
    request.currency = 'JPYTHB';
    const jpyPrice = await checkMarketDataPrice(request);
    message.push(jpyPrice);
    request.currency = 'CNYTHB';
    const cnyPrice = await checkMarketDataPrice(request);
    message.push(cnyPrice);
    return message;
};
const checkMarketDataPrice = async (request) => {
    const marketDataService = new marketdata_1.default();
    const thaiBaht = Intl.NumberFormat('en-TH', {
        style: 'currency',
        currency: 'THB',
    });
    const result = await marketDataService.fetchCurrentPrice(request);
    const formattedResult = thaiBaht.format(result);
    const slackContent = {
        icon: 'coin',
        text: `The MarquetData price of ${request.currency} is now: ${formattedResult}.`,
    };
    return slackContent;
};
