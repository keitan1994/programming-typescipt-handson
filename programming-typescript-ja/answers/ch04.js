"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = null; // モジュールモードを強制します
let reserve = (fromOrDestination, toOrDestination, destination) => {
    if (fromOrDestination instanceof Date &&
        toOrDestination instanceof Date &&
        destination !== undefined) {
        // 宿泊旅行を予約する
    }
    else if (fromOrDestination instanceof Date &&
        typeof toOrDestination === 'string') {
        // 日帰り旅行を予約する
    }
    else if (typeof fromOrDestination === 'string') {
        // すぐに出発する旅行を予約する
    }
};
// 4. ［難問］callの実装（「4.2.5.2 制限付きポリモーフィズムを使って、可変長引数をモデル化する」を参照）を、2番目の引数がstringである関数についてだけ機能するように書き換えてください。そうではない関数を渡すと、コンパイル時にエラーとなるようにします。
function call(f, ...args) {
    return f(...args);
}
function fill(length, value) {
    return Array.from({ length }, () => value);
}
call(fill, 10, 'a'); // string[]
// 5. 型安全なアサーション関数、`is`を実装してください。型で概略を記述することから始めます。これは、完成したら、次のように使えるものです。
// stringとstringを比較します
is('string', 'otherstring'); // false
// booleanとbooleanを比較します
is(true, false); // false
// numberとnumberを比較します
is(42, 42); // true
// 異なる型同士を比較すると、コンパイル時エラーになります
is(10, 'foo'); // エラー TS2345: 型 '"foo"' の引数を型 'number' の
// パラメーターに割り当てることはできません。
// ［難問］任意の数の引数を渡せるようにします
is(1, 1, 1); // true
is(1, 2, 3); // false
function is(a, ...b) {
    return b.every(_ => _ === a);
}
