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
        // this.addfguiView();

        // 初始化管理器
        // App.inst.startUp(this.stage);
        // App.inst.initManagers();
        // LayerManager.inst.init(this);                
        // egret.ImageLoader.crossOrigin = "anonymous";

        // // demo入口
        // var demoMenu = new DemoMenu();
        // demoMenu.init();
    }

    private fooTest(): void {
        // 获取类名
        console.log("根据类获取类名：" + egret.getQualifiedClassName(PoolTest));
        console.log("根据类对象获取类名：" + egret.getQualifiedClassName(new PoolTest()));
        console.log("根据函数获取函数：" + egret.getQualifiedClassName(this.initGame));
        // 空数组pop
        var arrTest: Array<any> = [];
        console.log("空数组pop: " + arrTest.pop());
        // 条件执行语句
        var flag1: boolean = (1 + 1 == 2) ? true : false;
        flag1 === true && this.printHelloWorld();
        // 引用类型
        var testDict: Object = {};
        var obj1 = testDict["testObj1"];
        var obj2;
        if (obj1 == null) {
            testDict["testObj1"] = obj2 = new LoadItem();
        }
        console.log("引用类型， obj1:" + obj1 + "  testDict[testObj1]:" + testDict["testObj1"]);
        obj2 = null;
        console.log("引用类型,testDict:" + testDict);

        // 数学帮助函数
        var testFloat: number = 2342.123;
        console.log("math floor，传入一个非整数，返回值是 " + Math.floor(testFloat));

        // 日志
        var arr2: number[] = [2, 22, 2222];
        console.log("数组打印：" + arr2.toString());

        // 类型转换
        var arrObj111:Array<ObjectBase> = [];
        for (var obj111Index = 0; obj111Index < 10; ++obj111Index){
            var obj111:ObjectBase  = new ObjectBase();
            obj111.id = "obj1111_" + obj111Index;
            arrObj111.push(obj111);
        }

        var arr3:Array<Obj111> = arrObj111 as Array<Obj111>;
        for (var obj of arr3) {
            obj.print();
        }
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
            this.onInit();
        }
    }

    private onGroupResourceLoadError(event: RES.ResourceEvent): void {
        if (event.groupName == "DemoMenu") {
            console.error("资源加载失败：" + event.groupName);
        }
    }

    protected onInit(): void {
        fgui.UIPackage.addPackage("DemoMenu");
        var view = fgui.UIPackage.createObject("DemoMenu", "Main").asCom;
        this.addChild(fgui.GRoot.inst.displayObject);
        fgui.GRoot.inst.addChild(view);
    }
}