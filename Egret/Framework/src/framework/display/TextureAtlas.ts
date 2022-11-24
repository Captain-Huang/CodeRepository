/**
 * 图集
 */
class TextureAtlas implements IPoolObject {

    public name: string;
    public spriteSheet: egret.SpriteSheet;
    public textureParamList: Array<TextureAtlasParam>;
    public textureParamDict: Object;

    public constructor() {
        this.textureParamList = [];
        this.textureParamDict = {};
    }

    public initFromText(texture: egret.Texture, txt: string): void {
        this.spriteSheet = new egret.SpriteSheet(texture);

        this.textureParamList.length = 0;
        ObjectUtil.clear(this.textureParamDict);

        var lines: Array<string> = txt.split("\r\n");
        for (let i = 0; i < lines.length; ++i) {
            var line:string = lines[i];
            if (line == "") {
                continue;
            }
            var params: Array<string> = line.split(";");
            var param: TextureAtlasParam = ObjectPoolManager.inst.getObject(TextureAtlasParam) as TextureAtlasParam;
            param.index = i;
            param.name = params[0];
            param.x = +params[1];
            param.y = +params[2];
            param.width = +params[3];
            param.height = +params[4];
            param.offsetX = +params[5];
            param.offsetY = +params[6];
            param.texture = this.spriteSheet.createTexture(param.name, param.x, param.y, param.width, param.height);
            this.textureParamList.push(param);
            this.textureParamDict[param.name] = param;
        }
    }

    public initFromLines(texture:egret.Texture, lines:Array<string>): void {
        this.spriteSheet = new egret.SpriteSheet(texture);

        this.textureParamList.length = 0;
        ObjectUtil.clear(this.textureParamDict);

        for (var i = 0; i < lines.length; i++) {
            var line:string = lines[i];
            if (line == "") {
                continue;
            }
            var params:Array<string> = line.split(";");
            var param:TextureAtlasParam = ObjectPoolManager.inst.getObject(TextureAtlasParam) as TextureAtlasParam;
            param.index = i;
            param.name = params[0];
            param.x = +params[1];
            param.y = +params[2];
            param.width = +params[3];
            param.height = +params[4];
            param.offsetX = +params[5];
            param.offsetY = +params[6];
            param.texture = this.spriteSheet.createTexture(param.name, param.x, param.y, param.width, param.height);
            this.textureParamList.push(param);
            this.textureParamDict[param.name] = param;
        }
    }

    public initFromBytes(texture:egret.Texture, bytes: egret.ByteArray): void {
        this.spriteSheet = new egret.SpriteSheet(texture);
        
        this.textureParamList.length = 0;
        ObjectUtil.clear(this.textureParamDict);

        var count:number = bytes.readByte();
        for (var i = 0; i < count; i++) {
            var param:TextureAtlasParam = ObjectPoolManager.inst.getObject(TextureAtlasParam) as TextureAtlasParam;
            param.index = i;
            param.name = bytes.readUTF();
            param.x = bytes.readShort();
            param.y = bytes.readShort();
            param.width = bytes.readShort();
            param.height = bytes.readShort();
            param.offsetX = bytes.readFloat();
            param.offsetY = bytes.readFloat();
            param.texture = this.spriteSheet.createTexture(param.name, param.x, param.y, param.width, param.height);
            this.textureParamList.push(param);
            this.textureParamDict[param.name] = param;
        }
    }

    public getTextureParamByName(name: string): TextureAtlasParam {
        return this.textureParamDict[name];
    }

    public getTextureParamByIndex(index: number): TextureAtlasParam {
        return this.textureParamList[index];
    }

    public getTextureByName(name: string): egret.Texture {
        var param: TextureAtlasParam = this.getTextureParamByName(name);
        if (param != null) {
            return param.texture
        }
        return null;
    }

    public getTextureByIndex(index: number): egret.Texture {
        var param: TextureAtlasParam = this.getTextureParamByIndex(index);
        if (param != null) {
            return param.texture
        }
        return null;
    }

    /**
     * 取出
     */
    onPoolGet(): void {

    }

    /**
     * 放入池时重置
     */
    onPoolReset(): void {
        for (var i = 0; i < this.textureParamList.length; i++) {
            ObjectPoolManager.inst.releaseObject(this.textureParamList[i]);
        }
        this.textureParamList.length = 0;
        ObjectUtil.clear(this.textureParamDict);
        this.spriteSheet.dispose();
        this.spriteSheet = null;
    }

    /**
     * 销毁
     */
    onPoolDispose(): void {
        for (var i = 0; i < this.textureParamList.length; i++) {
            ObjectPoolManager.inst.releaseObject(this.textureParamList[i]);
        }
        this.textureParamList.length = 0;
        ObjectUtil.clear(this.textureParamDict);
        this.spriteSheet.dispose();
        this.spriteSheet = null;
    }
}