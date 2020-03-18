interface IManager {
    needUpdate: boolean;

    update(deltaTime: number): void;
}