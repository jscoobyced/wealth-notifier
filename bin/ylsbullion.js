"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_html_parser_1 = require("node-html-parser");
class YlgBullion {
    YLGBULLION_URL = process.env.YLGBULLION_URL || false;
    fetchCurrentPrice = async (gold) => {
        if (!this.YLGBULLION_URL)
            return false;
        const url = this.YLGBULLION_URL;
        const response = await fetch(url);
        if (response.status !== 200)
            return false;
        const html = await response.text();
        const root = (0, node_html_parser_1.parse)(html);
        const value = root.querySelector(`[data-value="bar${gold}_tout"]`)?.text;
        console.log(value);
        const slackContent = {
            icon: 'part_alternation_mark',
            text: `The YLG Bullion ${gold}% gold price is THB ${value}.`
        };
        return slackContent;
    };
}
exports.default = YlgBullion;
