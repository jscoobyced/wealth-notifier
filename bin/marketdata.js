"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MarketDataService {
    MARKETDATA_API_URL = process.env.MARKETDATA_API_URL || false;
    MARKETDATA_API_KEY = process.env.MARKETDATA_API_KEY || false;
    fetchCurrentPrice = async (request) => {
        if (!this.MARKETDATA_API_KEY || !this.MARKETDATA_API_URL)
            return -1;
        const url = `${this.MARKETDATA_API_URL.toString()}/live?api_key=${this.MARKETDATA_API_KEY.toString()}&currency=${request.currency}`;
        const response = await fetch(url);
        const data = await response.json();
        data.quotes.map(quote => {
            quote.ask = +(quote.ask / request.ratio).toFixed(2);
            quote.bid = +(quote.bid / request.ratio).toFixed(2);
            quote.mid = +(quote.mid / request.ratio).toFixed(2);
        });
        return data.quotes[0].mid;
    };
}
exports.default = MarketDataService;
