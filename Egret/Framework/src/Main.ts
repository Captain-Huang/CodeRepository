//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.initGame();
    }

    private async loadResource() {
        try {
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload");
        }
        catch (e) {
            console.error(e);
        }
    }

    /**
     * 初始化游戏
     */
    private initGame(): void {
        console.log("Game Start!");
        this.fooTest();

        // 初始化管理器
        // this.initEngine();
        // GamePreProcessor.init();

        // // demo入口
        // var demoMenu = new DemoMenu();
        // demoMenu.init();
    }

    private initEngine(): void {
        App.inst.startUp(this.stage);
        App.inst.initManagers();

        LayerManager.inst.init(this);

        App.tableManager.txtStructFolder = "";
        App.logManager.enabled = true;
        App.logManager.isPrint = true;
        egret.ImageLoader.crossOrigin = "anonymous";
    }

    // ---------------------------------- 分割线 ---------------------------------- 
    private testArr1:Array<number>;
    private testObj1:Object;
    private testObj2:Object;
    private fooTest(): void {
        // 获取类名
        // console.log("根据类获取类名：" + egret.getQualifiedClassName(PoolTest));
        // console.log("根据类对象获取类名：" + egret.getQualifiedClassName(new PoolTest()));
        // console.log("根据函数获取函数：" + egret.getQualifiedClassName(this.initGame));
        // 空数组pop
        // var arrTest: Array<any> = [];
        // console.log("空数组pop: " + arrTest.pop());
        // 条件执行语句
        // var flag1: boolean = (1 + 1 == 2) ? true : false;
        // flag1 === true && this.printHelloWorld();
        // 引用类型
        // var testDict: Object = {};
        // var obj1 = testDict["testObj1"];
        // var obj2;
        // if (obj1 == null) {
        //     testDict["testObj1"] = obj2 = new LoadItem();
        // }
        // console.log("引用类型， obj1:" + obj1 + "  testDict[testObj1]:" + testDict["testObj1"]);
        // obj2 = null;
        // console.log("引用类型,testDict:" + testDict);
        this.testArr1 = [];
        this.testArr1.push(2);
        this.testArr2();
        // this.testRefrenceArr(this.testArr1);
        // console.log(this.testArr1);
        // this.testObj1 = {};
        // this.testObj1[0] = 1;
        // this.testObj2 = {};
        // this.testRefrenceObj(this.testObj1);
        // console.log(this.testObj1);


        // 数学帮助函数
        // var testFloat: number = 2342.123;
        // console.log("math floor，传入一个非整数，返回值是 " + Math.floor(testFloat));

        // 日志
        // var arr2: number[] = [2, 22, 2222];
        // console.log("数组打印：" + arr2.toString());

        // 类型转换
        // var arrObj111: Array<ObjectBase> = [];
        // for (var obj111Index = 0; obj111Index < 10; ++obj111Index) {
        //     var obj111: ObjectBase = new ObjectBase();
        //     obj111.id = "obj1111_" + obj111Index;
        //     arrObj111.push(obj111);
        // }

        // var arr3: Array<Obj111> = arrObj111 as Array<Obj111>;
        // for (var obj of arr3) {
        //     // obj.print();
        // }

        // js测试
        // var a = globalFuncTest1();
        // console.log(a);
        // var b = globalFuncTest2();
        // console.log(b);
        // var time:number = egret.getTimer();
        // var c = globalFuncTest3();
        // console.log("globalFuncTest3 cost time:" + (egret.getTimer() - time) + "\n" +  c);
        // console.log(globalFuncTest4());
        // setTimeout(()=> {
        //     console.log("settimeout is called:" + testFloat);
        // }, 1000);
        // setInterval(()=>{
        //     console.log("setInterval is called:" + testFloat);
        // }, 1000);

        // this.addfguiView();   

        // this.runTemplateDemo();

        // this.testQuadTree();
    }

    private testRefrenceArr(arr:any):void {
        var arr1:Array<number> = [];
        arr1.push(3);
        // arr.length = 0;
        arr = arr1;
        arr = null;
    }

    private testRefrenceObj(arr:any):void {
        // var arr1:Object = {};
        // arr1[1] = 3;
        // arr = arr1;
        arr[3] = 5;  

        // this.testObj2[4] = 5;
        // arr = this.testObj2;      
    }

    private testArr2():void {
        var tempArr = [];
        for (var a of this.testArr1) {
            tempArr.push(a);
        }
        // tempArr = this.testArr1.reverse();
        tempArr.push(3);
        var tempArr2 = tempArr.concat();
        tempArr2.reverse();
        this.testArr1 = this.testArr1.concat(tempArr);

        console.log(this.testArr1.length);
    }

    private runTemplateDemo(): void {
        var main = new TemplateMain();
        this.addChild(main);
    }

    private printHelloWorld(): void {
        console.log("Hello world!");
    }

    private addfguiView(): void {
        fgui.UIPackage.addPackage("UILib");

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupResourceLoadComplete, this);
        RES.loadGroup("DemoMenu");
    }

    private onGroupResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "DemoMenu") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupResourceLoadError, this);
            this.initFgui();
        }
    }

    private onGroupResourceLoadError(event: RES.ResourceEvent): void {
        if (event.groupName == "DemoMenu") {
            console.error("资源加载失败：" + event.groupName);
        }
    }

    protected initFgui(): void {
        fgui.UIPackage.addPackage("DemoMenu");
        var view = fgui.UIPackage.createObject("DemoMenu", "Main").asCom;
        this.addChild(fgui.GRoot.inst.displayObject);
        fgui.GRoot.inst.addChild(view);
    }

    public objects: Array<QuadNode1>;
    public tree: BoundsQuadTree<QuadNode1>;
    private currentTime: number = 0;
    protected testQuadTree(): void {
        this.objects = new Array<QuadNode1>();
        this.tree = new BoundsQuadTree<QuadNode1>(new QuadTreeRect(0, 0, 2000, 1000), 4, 10);

        for (var i = 0; i < 100; i++) {
            var obj: QuadNode1 = new QuadNode1();
            obj.init(Math.random() * 2000, Math.random() * 1000, MathUtil.randomRange(2, 10), MathUtil.randomRange(2, 10));
            obj.drawColor(0xffffff);
            this.objects.push(obj);
            obj.speedX = MathUtil.randomRange(-200, 200);
            obj.speedY = MathUtil.randomRange(-200, 200);
            this.tree.insert(obj);
            this.addChild(obj);
        }

        egret.startTick(this.update, this);
    }

    private update(time: number): boolean {
        if (this.currentTime == 0) {
            this.currentTime = time;
            return false;
        }
        var deltaTime: number = (time - this.currentTime) / 1000;
        this.currentTime = time;

        for (var obj of this.objects) {
            obj.update(deltaTime);
            obj.drawColor(0xffffff);
        }

        for (var obj of this.objects) {
            if (obj.x < 0 || obj.x > 2000 || obj.y < 0 || obj.y > 1000) {
                obj.speedX = MathUtil.randomRange(-200, 200);
                obj.speedY = MathUtil.randomRange(-200, 200);
            }

            this.tree.relocate(obj);
            var objs: Array<QuadNode1> = this.tree.retrieve(obj.bounds);
            for (var o of objs) {
                if (obj != o && obj.intersect(o)) {
                    o.drawColor(0xff0000);
                    obj.drawColor(0xff0000);
                }
            }
        }

        return false;
    }
}