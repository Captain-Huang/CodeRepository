var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
* File is automatically generated, Please do not modify
* 物品表
*/
var game_config;
(function (game_config) {
    var $ItemCFG = (function () {
        function $ItemCFG() {
        }
        /**
         * 初始化数据
         */
        $ItemCFG.prototype.initData = function () {
        };
        /**
         * 读取txt文件填充数据, 返回配置ID
         */
        $ItemCFG.prototype.fillData = function (row) {
            var filedArr;
            this.ID = +row[0];
            this.Name = row[1];
            this.Icon = row[2];
            this.DropIcon = row[3];
            this.Job = +row[4];
            this.LvR = +row[5];
            this.BeforeLV = +row[6];
            this.BeforeLVMax = +row[7];
            this.Lv = +row[8];
            this.LvMax = +row[9];
            this.ZhuanMin = +row[10];
            this.ZhuanMax = +row[11];
            this.Rank = +row[12];
            this.LvRMax = +row[13];
            this.AwakenLv = +row[14];
            this.Day = +row[15];
            this.WingLv = +row[16];
            this.Quality = +row[17];
            this.ItemEffectID = +row[18];
            this.IsShowLight = +row[19];
            this.NoLightDate = +row[20];
            this.GetShow = row[21] == "1" ? true : false;
            this.Type1 = +row[22];
            this.Type2 = +row[23];
            this.Type3 = +row[24];
            this.Type4 = +row[25];
            this.ShowType = row[26];
            this.sort = +row[27];
            this.Gender = +row[28];
            this.Price = +row[29];
            this.Stack = +row[30];
            this.CanDestroy = +row[31];
            this.UseType = +row[32];
            this.ContinuousUse = +row[33];
            this.CanAuction = +row[34];
            this.CanNeedBuy = +row[35];
            this.IsSellNotice = row[36] == "1" ? true : false;
            this.FuncType = +row[37];
            this.LimitTime = +row[38];
            this.CanLvUp = +row[39];
            this.CanRecord = +row[40];
            this.Unusual = +row[41];
            this.team = +row[42];
            this.RecoverID = +row[43];
            this.EquipID = +row[44];
            this.donate = +row[45];
            this.Treasure = +row[46];
            this.CanStorage = row[47] == "1" ? true : false;
            this.IntensifyLvMax = +row[48];
            this.AceIntensifyLvMax = +row[49];
            this.RefineLvMax = +row[50];
            this.CDType = +row[51];
            this.CDPub = +row[52];
            this.CD = +row[53];
            this.CanPush = +row[54];
            this.PushType = +row[55];
            this.CanDress = +row[56];
            this.CanShow = +row[57];
            this.DayLimit = +row[58];
            this.DropShowSort = +row[59];
            this.IsTop = row[60] == "1" ? true : false;
            this.IsShowUse = row[61] == "1" ? true : false;
            this.PlayUseEffect = row[62];
            this.Funcid = +row[63];
            if (row[64] == "") {
                this.Funcparams = new Array();
            }
            else {
                filedArr = row[64].split(',');
                this.Funcparams = new Array();
                for (var i = 0; i < filedArr.length; i++) {
                    this.Funcparams[64] = +filedArr[64];
                }
            }
            this.UseNotice = +row[65];
            this.CFuncID = +row[66];
            if (row[67] == "") {
                this.CFuncParam = new Array();
            }
            else {
                filedArr = row[67].split(',');
                this.CFuncParam = new Array();
                for (var i = 0; i < filedArr.length; i++) {
                    this.CFuncParam[i] = filedArr[i];
                }
            }
            this.CanShortcut = row[68] == "1" ? true : false;
            this.Score = +row[69];
            if (row[73] == "") {
                this.SuitID = new Array();
            }
            else {
                filedArr = row[73].split(',');
                this.SuitID = new Array();
                for (var i = 0; i < filedArr.length; i++) {
                    this.SuitID[73] = +filedArr[73];
                }
            }
            this.Desc = row[74];
            this.DropDesc = row[75];
            this.noticeID = +row[76];
            this.IsShowIcon = row[77] == "1" ? true : false;
            this.RelicWeight = +row[78];
            this.RelicStar = +row[79];
            this.RelicJobPush = +row[80];
            if (row[81] == "") {
                this.GatWayID = new Array();
            }
            else {
                filedArr = row[81].split(',');
                this.GatWayID = new Array();
                for (var i = 0; i < filedArr.length; i++) {
                    this.GatWayID[81] = +filedArr[81];
                }
            }
            this.ShowGatWay = row[82] == "1" ? true : false;
            this.ShowEffect = +row[83];
            this.IconEffect = +row[84];
            this.RareMine = +row[85];
            this.MineSort = +row[86];
            this.MovieID = +row[87];
            this.MovieDesID = +row[88];
            return this.ID;
        };
        return $ItemCFG;
    }());
    game_config.$ItemCFG = $ItemCFG;
    __reflect($ItemCFG.prototype, "game_config.$ItemCFG");
})(game_config || (game_config = {}));
/**
* File is automatically generated, Please do not modify
* 邮件表
*/
var game_config;
(function (game_config) {
    var $MailCFG = (function () {
        function $MailCFG() {
        }
        /**
         * 初始化数据
         */
        $MailCFG.prototype.initData = function () {
        };
        /**
         * 读取txt文件填充数据, 返回配置ID
         */
        $MailCFG.prototype.fillData = function (row) {
            var filedArr;
            this.ID = +row[0];
            this.From = row[1];
            this.Title = row[2];
            this.Content = row[3];
            return this.ID;
        };
        return $MailCFG;
    }());
    game_config.$MailCFG = $MailCFG;
    __reflect($MailCFG.prototype, "game_config.$MailCFG");
})(game_config || (game_config = {}));
/**
* File is automatically generated, Please do not modify
* 窗口表_h5
*/
var game_config;
(function (game_config) {
    var $WindowCFG = (function () {
        function $WindowCFG() {
        }
        /**
         * 初始化数据
         */
        $WindowCFG.prototype.initData = function () {
        };
        /**
         * 读取txt文件填充数据, 返回配置ID
         */
        $WindowCFG.prototype.fillData = function (row) {
            var filedArr;
            this.ID = +row[0];
            this.WindowName = row[2];
            this.IsSub = row[3] == "1" ? true : false;
            this.ParentType = +row[4];
            this.SubType = +row[5];
            this.TouchClose = row[6] == "1" ? true : false;
            this.CanCloseAll = row[7] == "1" ? true : false;
            this.IsModal = row[8] == "1" ? true : false;
            this.OpenMode = +row[9];
            this.OpenX = +row[10];
            this.OpenY = +row[11];
            this.CloseOthers = row[12] == "1" ? true : false;
            if (row[13] == "") {
                this.CloseWindowArr = new Array();
            }
            else {
                filedArr = row[13].split(',');
                this.CloseWindowArr = new Array();
                for (var i = 0; i < filedArr.length; i++) {
                    this.CloseWindowArr[13] = +filedArr[13];
                }
            }
            if (row[14] == "") {
                this.OpenLinkArr = new Array();
            }
            else {
                filedArr = row[14].split(',');
                this.OpenLinkArr = new Array();
                for (var i = 0; i < filedArr.length; i++) {
                    this.OpenLinkArr[14] = +filedArr[14];
                }
            }
            if (row[15] == "") {
                this.CloseLinkArr = new Array();
            }
            else {
                filedArr = row[15].split(',');
                this.CloseLinkArr = new Array();
                for (var i = 0; i < filedArr.length; i++) {
                    this.CloseLinkArr[15] = +filedArr[15];
                }
            }
            if (row[16] == "") {
                this.ParallelArr = new Array();
            }
            else {
                filedArr = row[16].split(',');
                this.ParallelArr = new Array();
                for (var i = 0; i < filedArr.length; i++) {
                    this.ParallelArr[16] = +filedArr[16];
                }
            }
            if (row[17] == "") {
                this.FollowArr = new Array();
            }
            else {
                filedArr = row[17].split(',');
                this.FollowArr = new Array();
                for (var i = 0; i < filedArr.length; i++) {
                    this.FollowArr[17] = +filedArr[17];
                }
            }
            this.PlayOpenSoundEffect = row[18] == "1" ? true : false;
            this.PlayCloseSoundEffect = row[19] == "1" ? true : false;
            this.OpenSoundEffect = +row[20];
            return this.ID;
        };
        return $WindowCFG;
    }());
    game_config.$WindowCFG = $WindowCFG;
    __reflect($WindowCFG.prototype, "game_config.$WindowCFG");
})(game_config || (game_config = {}));
/**
 * File is automatically generated, Please do not modify
 * 数据表通用函数
 */
var game_config;
(function (game_config) {
    var reg = new RegExp("\\\\n", "g");
    function replace(str) {
        return str.replace(reg, "\n");
    }
    game_config.replace = replace;
})(game_config || (game_config = {}));
