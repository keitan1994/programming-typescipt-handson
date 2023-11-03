"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = null; // モジュールモードを強制します
// 1. 汎用的なpromisify関数を実装してください。promisifyは、1つの引数と1つのコールバックを取る任意の関数をパラメーターとして取り、それを、プロミスを返す関数の中にラップします。
function promisify(f) {
    return (arg) => new Promise((resolve, reject) => f(arg, (error, result) => {
        if (error) {
            return reject(error);
        }
        if (result === null) {
            return reject(null);
        }
        resolve(result);
    }));
}
const fs_1 = require("fs");
let readFilePromise = promisify(fs_1.readFile);
readFilePromise(__dirname + '/exercises.js')
    .then(result => console.log('done!', result.toString()));
function createProtocol(script) {
    return (command) => (...args) => new Promise((resolve, reject) => {
        let worker = new Worker(script);
        worker.onerror = reject;
        worker.onmessage = event => resolve(event.data);
        worker.postMessage({ command, args });
    });
}
let runWithMatrixProtocol = createProtocol('MatrixWorkerScript.js');
let parallelDeterminant = runWithMatrixProtocol('determinant');
parallelDeterminant([[1, 2], [3, 4]]).then(determinant => console.log(determinant) // -2
);
function handle(data) {
    switch (data.command) {
        case 'determinant':
            return determinant(...data.args);
        case 'dot-product':
            return dotProduct(...data.args);
        case 'invert':
            return invert(...data.args);
    }
}
onmessage = ({ data }) => postMessage(handle(data));
// 3. （「8.6.1 Web Worker（ブラウザー）」のように）マップ型を使って、Node.jsの`child_process`用の型安全なメッセージパッシングプロトコルを実装してください。
// MainThread.ts
const child_process_1 = require("child_process");
function createProtocolCP(script) {
    return (command) => (...args) => new Promise((resolve, reject) => {
        let child = (0, child_process_1.fork)(script);
        child.on('error', reject);
        child.on('message', resolve);
        child.send({ command, args });
    });
}
let runWithMatrixProtocolCP = createProtocolCP('./ChildThread.js');
let parallelDeterminantCP = runWithMatrixProtocolCP('determinant');
parallelDeterminantCP([[1, 2], [3, 4]]).then(determinant => console.log(determinant) // -2
);
// ChildThread.ts
// type Data ... （2のWorkerScript.tsと同様）
// function handle ... （2のWorkerScript.tsと同様）
process.on('message', data => process.send(handle(data)));
