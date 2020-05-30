/**
 * 简单UI接口
 */
interface IUIView {
    /**
     * UI视图
     */
    view:fairygui.GComponent;

    /**
     * 界面显示
     */
    show();

    /**
     * 界面关闭
     */
    close();

    /**
     * 界面销毁
     */
    dispose();
}