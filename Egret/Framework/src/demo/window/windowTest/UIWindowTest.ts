/**
 * 资源加载测试
 */
class UIWindowTest implements IDemoTest {

    begin(): void {
        this.onInit();
    }

    stop(): void {

    }

    private onInit(): void {
        GameModules.init();
        GameScene.init();

        SceneManager.inst.enterScene(GameScene.emptyScene);

        GameModules.window.showWindowByType(WindowType.RoleWindow);
    }
}