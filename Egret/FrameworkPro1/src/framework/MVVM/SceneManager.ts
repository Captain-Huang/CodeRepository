/**
 * 场景管理器
 */
class SceneManager {
    private static _inst: SceneManager;
    private _scenes: Object;
    private _curScene: IScene;
    private _nextScene: IScene;

    public constructor() {
        this.init();
    }

    public static get inst(): SceneManager {
        if (!this._inst) {
            this._inst = new SceneManager();
        }
        return this._inst;
    }

    public registerScene(scene: IScene): void {
        if (!this._scenes[scene.sceneName]) {
            scene.enterCallback = () => {
                this.onSceneEntered(scene);
            }
            scene.exitCallback = () => {
                this.onSceneExited(scene);
            }
            this._scenes[scene.sceneName] = scene;
        }
    }

    public unRegisterScene(scene: IScene): void {
        delete this._scenes[scene.sceneName];
    }

    public enterScene(scene: IScene): void {
        if (this._curScene && this._curScene.sceneName == scene.sceneName) {
            return;
        }
        if (this._nextScene && this._nextScene.state == SceneState.ENTERING) {
            return;
        }
        this._nextScene = scene;

        if (this._curScene == null) {
            this.enterNextScene();
        } else {
            this.exitCurrentScene();
        }
    }

    private init(): void {
        this._scenes = {};
    }

    private onSceneEntered(scene: IScene): void {
        if (this._nextScene == scene) {
            this._nextScene.state = SceneState.RUNNING;
            this._curScene = this._nextScene;
            this._nextScene = null;
        }
    }

    private onSceneExited(scene: IScene): void {
        if (this._curScene == scene) {
            this._curScene.state = SceneState.IDIE;
            this.enterNextScene();
        }
    }

    private exitCurrentScene(): void {
        if (this._curScene.state == SceneState.RUNNING) {
            this._curScene.state = SceneState.EXITTING;
            this._curScene.exitScene();
        }
    }

    private enterNextScene(): void {
        if (this._nextScene == null) {
            return;
        }
        // 退出当前场景
        if (this._curScene) {
            for (let module of this._curScene.modules) {
                if (module.scene != this._nextScene) {
                    if (!this._nextScene.hasModule(module)) {
                        module.exit();
                    }
                }
            }
        }
        // 进入下一个场景
        for (let module of this._nextScene.modules) {
            if (module.scene != this._nextScene) {
                module.changeScene(this._nextScene);
            }
            if (this._curScene == null || this._curScene.hasModule(module) == false) {
                module.enter();
            }
        }
        this._nextScene.state = SceneState.ENTERING;
        this._nextScene.enterScene();
    }
}