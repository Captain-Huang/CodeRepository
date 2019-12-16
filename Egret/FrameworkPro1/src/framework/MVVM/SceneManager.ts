/**
 * 场景管理器
 */
class SceneManager {
    private static _inst: SceneManager;

    public static get inst(): SceneManager {
        if (!this._inst) {
            this._inst = new SceneManager();
        }
        return this._inst;
    }

    public registerScene(scene: IScene): void {

    }

    public unRegisterScene(scene: IScene): void {

    }

    public enterScene(scene: IScene): void {

    }

    private onSceneEntered(scene: IScene): void {

    }

    private onSceneExited(scene: IScene): void {

    }

    private exitCurrentScene(): void {

    }

    private enterNextScene(): void {

    }
}