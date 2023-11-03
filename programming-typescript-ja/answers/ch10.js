"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = null; // モジュールモードを強制します
var Currency;
(function (Currency) {
    Currency.DEFAULT = 'USD';
    function from(value, unit = Currency.DEFAULT) {
        return { unit, value };
    }
    Currency.from = from;
})(Currency || (Currency = {}));
let amountDue = {
    unit: 'JPY',
    value: 83733.1
};
let otherAmountDue = Currency.from(330, 'EUR');
// 1b. 列挙型に静的メソッドを追加してください。
var Color;
(function (Color) {
    Color["RED"] = "#ff0000";
    Color["GREEN"] = "#00ff00";
    Color["BLUE"] = "#0000ff";
})(Color || (Color = {}));
(function (Color) {
    function getClosest(to) {
        // ...
    }
    Color.getClosest = getClosest;
})(Color || (Color = {}));
Color.getClosest('#ffa500');
