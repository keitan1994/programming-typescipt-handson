"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = null; // モジュールモードを強制します
class Some {
    constructor(value) {
        this.value = value;
    }
    flatMap(f) {
        return f(this.value);
    }
    getOrElse() {
        return this.value;
    }
}
class None {
    flatMap() {
        return this;
    }
    getOrElse(value) {
        return value;
    }
}
function listOfOptionsToOptionOfList(list) {
    let empty = {};
    let result = list.map(_ => _.getOrElse(empty)).filter(_ => _ !== empty);
    if (result.length) {
        return new Some(result);
    }
    return new None();
}
let api = new API();
let friendsUserNames = api
    .getLoggedInUserID()
    .flatMap(api.getFriendIDs)
    .flatMap(_ => listOfOptionsToOptionOfList(_.map(api.getUserName)));
