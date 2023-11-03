"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = null; // モジュールモードを強制します
// 1. クラスとインターフェースの違いは何でしょうか？
/* クラスは、実装、初期化されたクラスフィールド、アクセス修飾子を持つことができます。また、クラスはJavaScriptコードを生成するので、実行時のinstanceofのチェックもサポートしています。クラスは、型と値の両方を定義します。インターフェースは型だけを定義し、JavaScriptコードはいっさい生成せず、型レベルのメンバーだけを含むことができ、アクセス修飾子を含むことはできません。 */
// 2. クラスのコンストラクターをprivateと指定すると、そのクラスをインスタンス化したり拡張したりできないという意味になります。代わりにprotectedと指定すると、何が起こるでしょうか？ コードエディターでいろいろと試してみてください。
class A {
    constructor() { }
}
class B extends A {
} // OK
new A(); // エラー
new B(); // エラー
class BalletFlat {
    constructor() {
        this.purpose = 'dancing';
    }
}
class Boot {
    constructor() {
        this.purpose = 'woodcutting';
    }
}
class Sneaker {
    constructor() {
        this.purpose = 'walking';
    }
}
let Shoe = {
    create(type) {
        switch (type) {
            case 'balletFlat':
                return new BalletFlat();
            case 'boot':
                return new Boot();
            case 'sneaker':
                return new Sneaker();
        }
    }
};
Shoe.create('balletFlat'); // BalletFlat
Shoe.create('boot'); // Boot
Shoe.create('sneaker'); // Sneaker
// 4. ［難問］練習として、型安全なビルダーパターンをどうしたら設計できるか考えてみてください。次のことを実現できるように、「5.11.2 ビルダーパターン」のビルダーパターンを拡張します。
// 4a. 少なくともURLとメソッドの設定が終わるまでは.sendを呼び出せないことをコンパイル時に保証します。メソッドを特定の順序で呼び出すことをユーザーに強制したら、これを保証することは容易になるでしょうか？（ヒント：thisの代わりに何を返せるでしょうか？）
class RequestBuilder {
    constructor() {
        this.data = null;
        this.method = null;
        this.url = null;
    }
    setMethod(method) {
        return new RequestBuilderWithMethod().setMethod(method).setData(this.data);
    }
    setData(data) {
        this.data = data;
        return this;
    }
}
class RequestBuilderWithMethod extends RequestBuilder {
    setMethod(method) {
        this.method = method;
        return this;
    }
    setURL(url) {
        return new RequestBuilderWithMethodAndURL()
            .setMethod(this.method)
            .setURL(url)
            .setData(this.data);
    }
}
class RequestBuilderWithMethodAndURL extends RequestBuilderWithMethod {
    setURL(url) {
        this.url = url;
        return this;
    }
    send() {
        // ...
    }
}
new RequestBuilder()
    .setMethod('get')
    .setData({})
    .setURL('foo.com')
    .send();
class RequestBuilder2 {
    setData(data) {
        return Object.assign(this, { data });
    }
    setMethod(method) {
        return Object.assign(this, { method });
    }
    setURL(url) {
        return Object.assign(this, { url });
    }
    build() {
        return this;
    }
}
new RequestBuilder2()
    .setData({})
    .setMethod('post') // これを削除してみてください！
    .setURL('bar') // これを削除してみてください！
    .build();
