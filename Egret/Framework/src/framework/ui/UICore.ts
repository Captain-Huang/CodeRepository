/**
 * UI核心类
 */
class UICore {
    private static _root: fairygui.GRoot;
    private static _rootContainer: egret.DisplayObjectContainer;

    private static _necessaryResDict: Object = {};
    private static _usedResDict: Object = {};

    public static packMode: boolean = false;
    public static compressMode: boolean = false;
    public static compressIgnoreList: Array<string> = [];
    public static packData: Object;


    public static init(rootContainer: egret.DisplayObjectContainer): void {
        this._root = fairygui.GRoot.inst;
        this._rootContainer = rootContainer;
        this._rootContainer.addChild(this._root.displayObject);


        this.extendFgui();
    }

    /**
     * fairygui root
     */
    public static get root(): fairygui.GRoot {
        return this._root;
    }

    /**
     * 根容器
     */
    public static get rootContainer(): egret.DisplayObjectContainer {
        return this._rootContainer;
    }
    /**
     * 处理loadConfig
     */
    public static initConfig(): void {
        var config = RES["config"];
        var groups: Object = config.config.groups;
        var resData: Object = config.config.fileSystem.fsData;

        // 过滤fui
        if (UICore.packMode) {
            for (var name in groups) {
                var resList: Array<string> = groups[name];
                for (var i = resList.length - 1; i >= 0; i--) {
                    var resName = resList[i];
                    var res = resData[resName];
                    if (res != null && res.url.indexOf(".fui") == res.url.length - 4) {
                        resList.splice(resList.indexOf(resName), 1);
                        if (resList.length == 0) {
                            delete groups[resName];
                            delete resData[resName];
                        }
                    }
                }
            }
            // 添加ui.byte
            resData["ui_byte"] = { name: "ui.byte", root: "assets/", type: "bin", url: "config/ui.byte" };
            groups["Preload"].unshift("ui_byte");
        }
        // 压缩ui
        if (UICore.compressMode) {
            var hasIgnoreList = UICore.compressIgnoreList != null && UICore.compressIgnoreList.length > 0;
            for (var name in groups) {
                var resList: Array<string> = groups[name];
                for (var i = resList.length - 1; i >= 0; i--) {
                    var resName = resList[i];
                    var res = resData[resName];
                    if (res != null && res.url.indexOf("ui/") == 0 && res.type == "image") {
                        if (hasIgnoreList && UICore.compressIgnoreList.indexOf(res.name) == -1) {
                            res.url = "uic/" + (res.url as string).substring(3);
                        }
                    }
                }
            }
            ResHelper.uiPath = ResHelper.assetsPath + "uic/";
        }
    }

    private static extendFgui(): void {
        // 设置加载器扩展
        // fairygui.UIObjectFactory.setLoaderExtension(ExternalGLoader);
        // Web模式扩展
        /**
         if (AppSetting.isWeb) {
                // 扩展文本输入
                const textInputFocusIn = fairygui.GTextInput.prototype["__focusIn"];
                fairygui.GTextInput.prototype["__focusIn"] = function (evt) {
                    App.keyboardManager.enabled = false;
                    textInputFocusIn.call(this, evt);
                };
                const textInputFocusOut = fairygui.GTextInput.prototype["__focusOut"];
                fairygui.GTextInput.prototype["__focusOut"] = function (evt) {
                    App.keyboardManager.enabled = true;
                    textInputFocusOut.call(this, evt);
                };
                fairygui.GTextInput.prototype["setFocus"] = function() {
                    var tf = this._textField;
                    var stageText = this._textField.inputUtils.stageText;
                    tf.setFocus();
                    stageText._onClickHandler(new MouseEvent("click"));
                    stageText.htmlInput.show();
                }
            }
         */

    }


    // ---------------------------------- 资源管理函数 ----------------------------
    /**
	 * 添加必要资源
	 */
    public static addNecessaryRes(name: string): void {
        this._necessaryResDict[name] = 1;
    }

	/**
	 * 移除必要资源
	 */
    public static removeNecessaryRes(name: string): void {
        delete this._necessaryResDict[name];
    }

    /**
     * 是否为必要资源
     */
    public static isNecessaryRes(name: string): boolean {
        return this._necessaryResDict.hasOwnProperty(name);
    }

    /**
	 * 添加使用资源
	 */
    public static addUsedRes(name: string): void {
        if (this.isNecessaryRes(name)) {
            return;
        }
        if (!this._usedResDict.hasOwnProperty(name)) {
            this._usedResDict[name] = 1;
        } else {
            this._usedResDict[name] += 1;
        }
    }

	/**
	 * 移除使用资源
	 */
    public static removeUsedRes(name: string): void {
        if (this.isNecessaryRes(name)) {
            return;
        }
        if (!this._usedResDict.hasOwnProperty(name)) {
            this._usedResDict[name] = 0;
        } else {
            this._usedResDict[name] -= 1;
        }
    }

    /**
     * 添加使用资源列表
     */
    public static addUsedResList(list: Array<string>): void {
        if (list != null && list.length > 0) {
            for (var name of list) {
                this.addUsedRes(name);
            }
        }
    }

    /**
     * 移除使用资源列表
     */
    public static removeUsedResList(list: Array<string>): void {
        if (list != null && list.length > 0) {
            for (var name of list) {
                this.removeUsedRes(name);
            }
        }
    }

    /**
     * 是否为使用资源
     */
    public static isUsedRes(name: string): boolean {
        return +this._usedResDict[name] > 0;
    }

    /**
     * 销毁未使用资源
     */
    public static destroyUnUsedRes(): void {
        for (var name in this._usedResDict) {
            if (this._usedResDict[name] <= 0) {
                delete this._usedResDict[name];
                this.removePackage(name);
            }
        }
    }

    /**
     * 添加fgui包资源
     */
    public static addPackage(name: string): void {
        if (UICore.packMode) {
            fgui.UIPackage.addPackage(name, UICore.packData[name]);
        } else {
            fgui.UIPackage.addPackage(name);
        }
    }

    /**
     * 添加fgui包资源列表
     */
    public static addPackageList(resList: string[]): void {
        for (var name of resList) {
            this.addPackage(name);
        }
    }

    /**
     * 移除fgui包资源
     */
    public static removePackage(name: string): void {
        if (fairygui.UIPackage.getByName(name) != null) {
            fairygui.UIPackage.removePackage(name);
        }
        if (RES.hasRes(name)) {
            RES.destroyRes(name);
        }
    }

    /**
     * 移除fgui包资源列表
     */
    public static removePackageList(resList: Array<string>): void {
        for (var name of resList) {
            this.removePackage(name);
        }
    }

    /**
     * 是否有资源
     */
    public static hasPackage(name: string): boolean {
        return fairygui.UIPackage.getByName(name) != null;
    }

    /**
     * 是否有资源列表
     */
    public static hasPackageList(resList: Array<string>): boolean {
        for (var name of resList) {
            if (!this.hasPackage(name)) {
                return false;
            }
        }
        return true;
    }

    /**
     * 加载资源
     */
    public static loadPackage(name: string, callback?: Handler): void {
        if (this.getGroupIsEmpty(name) || RES.isGroupLoaded(name)) {
            this.addPackage(name);
            if (callback != null) {
                callback.run();
            }
            return;
        }

        RES.loadGroup(name).then(() => {
            this.addPackage(name);
            if (callback != null) {
                callback.run();
            }
        });
    }

    /**
     * 加载资源列表
     */
    public static loadPackageList(resList: string[], callback?: Handler): void {
        var promiseList: Promise<void>[] = [];
        for (var name of resList) {
            if (!this.getGroupIsEmpty(name) && !RES.isGroupLoaded(name)) {
                promiseList.push(RES.loadGroup(name));
            }
        }
        Promise.all(promiseList).then(() => {
            this.addPackageList(resList);
            if (callback != null) {
                callback.run();
            }
        });
    }

    /**
     * 获取加载组是否为空
     */
    public static getGroupIsEmpty(name: string): boolean {
        return RES.getGroupByName(name).length == 0;
    }

    /*
     * 注册拓展
     */
    public static registerExtension(pkgName: string, resName: string, type: any): void {
        fairygui.UIObjectFactory.setPackageItemExtension(fairygui.UIPackage.getItemURL(pkgName, resName), type);
    }

    /**
     * 创建对象
     */
    public static createObject(pkgName: string, resName: string, userClass?: any): fairygui.GObject {
        return fairygui.UIPackage.createObject(pkgName, resName, userClass);
    }

    /**
     * 获取资源URL
     */
    public static getItemURL(pkgName: string, resName: string): string {
        return fairygui.UIPackage.getItemURL(pkgName, resName);
    }

}