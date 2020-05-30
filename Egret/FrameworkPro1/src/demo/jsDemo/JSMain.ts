
// js代码
class JSMain {
    public count: number;
    public isFlag: boolean;
    public name: string;
    public names: Array<string>;
    public obj1: Object;

    public constructor() {
        this.count = 1;
        this.isFlag = true;
        this.name = "JSMain";
        this.names = [];
        this.names.push(this.name);
        this.obj1 = {
            a: "aaa",
            b: 2,
            c: {
                d: "ddd",
            }
        }
    }

    // 函数调用
    public countAdd(num: number): number {
        return this.count + num;
    }

    // 函数参数
    public funcParamTest(): string {
        var str: string = "";
        str += this.changeName1("hello");
        str += this.changeName1("hello", ".txt");
        str += this.changeName2("hello", "js");
        str += this.changeName2("hello");
        str += this.changeName3("hello", "a", "b");
        return str;
    }

    // 函数参数
    public changeName1(newName: string, suffix?: string): string {
        return this.name + newName + suffix;
    }

    // 函数参数
    public changeName2(newName: string, appendName: string = "default_name"): string {
        return this.name + newName + appendName;
    }

    // 函数参数
    public changeName3(newName: string, ...appendName: string[]): string {
        return this.name + newName + "  " + appendName.join("  ");
    }

    // es6特性：箭头函数、Promises、默认和剩余参数、for...of 与 for ... in
    // 箭头函数
    public lambdaFunc(num: number): number {
        var b: number = 0;
        var func1 = () => {
            b = this.count + b + num;
        };
        func1();
        return b;
    }

    // 闭包函数
    public functionTest2(num: number): number {
        var b: number = 0;
        var tempNum = this.count;
        var func1 = function () {
            b = tempNum + b + num;
        }
        func1();
        return b;
    }

    // promise 测试
    public promiseTest(): void {
        var promiseList: Promise<void>[] = [];

        var num: number = 6;
        Promise.all(promiseList).then(() => {
            console.log("promiseTest:" + (num * 6));
        });
    }

    // for循环
    public forCircTest(): number {
        var arr: Array<ChildObj1> = [];
        for (let i = 0; i < 100; ++i) {
            var obj: ChildObj1 = new ChildObj1();
            obj.width = i;
            arr.push(obj);
        }
        var totalCount: number = 0;
        for (let obj of arr) {
            totalCount += obj.width;
        }
        return totalCount;
    }

    // 对象
    public testOOP(): number {
        var obj1: IObj = new ChildObj1();
        var obj2: BaseObj = new ChildObj2();
        return (obj1 as ChildObj1).width + (obj2 as ChildObj2).height;
    }

    public async testAwait(speaker) {
        // setTimeout(()=> {
        //     speaker.Print("timeout is called!");
        // }, 1000);
        // setInterval(()=>{
        //     speaker.Print("setInterval is called:");
        // }, 1000);
        speaker.Print("testAwait in");
        await globalFuncTest3();
        await this.changeObj1();
        var typeSpeaker = typeof speaker;
        speaker.Print("typeSpeaker " + typeSpeaker + "  obj1.b:" + this.obj1["b"]);
    }

    private changeObj1(): void {
        this.obj1["b"] = 66;
    }

    // 特殊用法：弹窗、计时器、浏览器对象
    // 浏览器弹窗
    public alertTest(): void {
        alert("测试弹窗");
    }

    // 浏览器计时器
    public timerTest(): void {
        setInterval(() => {
            console.log("setInterval is called!");
        }, 1000);
        setTimeout(function () {
            console.log("setTimeout is called!");
        }, 1000);
    }

    // 打开网页
    public domTest(): void {
        window.open("www.baidu.com");
    }

    // JS调用C#
    public callDotNet(speaker): void {
        speaker.Print("output from js");
    }
}

// 全局函数
function globalFuncTest1() {
    var count = 1 + 1;
    return count;
}

function globalFuncTest2() {
    var obj1: ChildObj1 = new ChildObj1();
    var func = function () {
        return obj1.width += 1;
    }
    return func();
}

function globalFuncTest3() {
    var main: JSMain = new JSMain();
    var str: string = "";
    for (var i = 0; i < 10000; ++i) {
        str = "";
        str += ("  ") + main.funcParamTest();
        str += ("  ") + main.countAdd(22);
        str += ("  ") + main.lambdaFunc(33);
        str += ("  ") + main.functionTest2(36);
        str += ("  ") + main.forCircTest();
        str += ("  ") + main.testOOP();
    }
    return str;
}

function globalFuncTest4() {
    var main: JSMain = new JSMain();
    main.alertTest();
    main.promiseTest();
    main.timerTest();
}

function globalFuncTest5(speaker) {
    var main: JSMain = new JSMain();
    main.testAwait(speaker);
    speaker.Print("testAwait out");

}

function globalFuncTest6(speaker) {
    for (var i = 0; i < 100; ++i) {
        speaker.JSCallCSTest1();
    }
}

function globalFuncTest7(speaker) {
    for (var i = 0; i < 1000; ++i) {
        speaker.JSCallCSTest1();
    }
}

function globalFuncTest8(speaker) {
    for (var i = 0; i < 100000; ++i) {
        speaker.JSCallCSTest1();
    }
}

function globalFuncTest9(speaker) {
    for (var i = 0; i < 1; ++i) {
        speaker.JSCallCSTest1();
    }
}


function update(speaker) {
    speaker.Print("update is called");
}

// 封装、继承、多态
// 接口
interface IObj {
    name: string;
    print(): void;
}

// 基类
class BaseObj implements IObj {
    public name: string = "BaseObj";

    public print(): void {
        console.log("BaseObj is called! name:" + this.name);
    }
}


// 子类1
class ChildObj1 extends BaseObj {
    public width: number;
    public constructor() {
        super();
        this.width = 111;
        this.name = "ChildObj1";
    }
}

// 子类2
class ChildObj2 extends BaseObj {
    public height: number;
    public constructor() {
        super();
        this.height = 222;
        this.name = "ChildObj2";
    }
}