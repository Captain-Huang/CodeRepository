interface IUIWindowSubView {
    /**
     * 视图
     */
    view: fairygui.GComponent;

    /**
     * 是否已加载
     */
    isLoaded: boolean;

    /**
     * 是否已初始化
     */
    isInited: boolean;

    /**
     * 资源列表
     */
    resList: Array<string>;

    /**
     * 初始化
     */
    init(): void;

    /**
     * 显示
     */
    show(args?: Array<any>): void;

    /**
     * 关闭
     */
    close(): void;

    /**
     * 销毁
     */
    dispose(): void;

    /**
     * 判断是否加载
     */
    getLoaded(): boolean;

    /**
     * 加载窗体资源
     */
    loadRes(callback?: Handler): void;
}