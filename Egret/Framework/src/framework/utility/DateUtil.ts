/**
 * DateUtil
 */
class DateUtil {

	public static date_year: string = "年";
	public static date_month: string = "月";
	public static date_day: string = "日";
	public static date_hour: string = "时";
	public static date_minute: string = "分";
	public static date_second: string = "秒";

	public static time_day: string = "天";
	public static time_hour: string = "小时";
	public static time_minute: string = "分钟";
	public static time_second: string = "秒";

	/**
	 * 获取UTC时间戳
	 */
	public static getUTCTime(years: number, month: number, date: number, hours: number = 0, minutes: number = 0, seconds: number = 0, ms: number = 0): number {
		return Date.UTC(years, month, date, hours, minutes, seconds, ms);
	}

	/**
	 * 获取UTC时间戳（秒）
	 */
	public static getUTCTimeSecond(years: number, month: number, date: number, hours: number = 0, minutes: number = 0, seconds: number = 0, ms: number = 0): number {
		return Math.floor(Date.UTC(years, month, date, hours, minutes, seconds, ms) * 0.001);
	}

	/**
	 * 时间加0
	 */
	public static addZero(value: number): string {
		return value < 10 ? "0" + value : "" + value;
	}

	/**
	 * 格式化日期
	 */
	public static formatDate(date: Date, format: string = "yyyy-MM-dd hh:mm:ss"): string {
		var o: Object = {
			"M+": date.getUTCMonth() + 1,
			"d+": date.getUTCDate(),
			"h+": date.getUTCHours(),
			"m+": date.getUTCMinutes(),
			"s+": date.getUTCSeconds(),
			"q+": Math.floor((date.getMonth() + 3) / 3),
			"S": date.getMilliseconds()
		};
		if (/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (date.getUTCFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return format;
	}
	/**
	* 格式化日期(中文)
	*/
	public static formatDateByChinese(date: Date, format: string = "yyyy-MM-dd hh:mm:ss"): string {
		var o: Object = new Object({
			"M": (date.getUTCMonth() + 1) + this.date_month,
			"d+": (date.getUTCDate()) + this.date_day,
			"h+": date.getUTCHours(),
			"m+": date.getUTCMinutes(),
			"s+": date.getUTCSeconds(),
			"q+": (Math.floor((date.getMonth() + 3) / 3)) + this.date_year,
			"S": date.getMilliseconds()
		});
		o["y"] = date.getUTCFullYear() + this.date_year;
		o["M"] = (date.getUTCMonth() + 1) + this.date_month;
		o["d"] = (date.getUTCDate()) + this.date_day;
		o["h"] = String(date.getUTCHours()).length == 1 ? "0" + date.getUTCHours() : String(date.getUTCHours());
		o["m"] = String(date.getUTCMinutes()).length == 1 ? "0" + date.getUTCMinutes() : String(date.getUTCMinutes());
		o["s"] = String(date.getUTCSeconds()).length == 1 ? "0" + date.getUTCSeconds() : String(date.getUTCSeconds());
		format = format.replace(/yyyy/g, o["y"]).replace(/MM/g, o["M"]).replace(/dd/g, o["d"]).replace(/hh/g, o["h"]).replace(/mm/g, o["m"]).replace(/ss/g, o["s"])
		return format;
	}
	/**
 	 * 格式化日期（秒）(中文)
 	 */
	public static formatDateFromTimeChinese(time: number, format = "yyyy-MM-dd hh:mm:ss"): string {
		var date: Date = new Date(time * 1000);
		return DateUtil.formatDateByChinese(date, format);
	}
	/**
	 * 格式化日期（秒）
	 */
	public static formatDateFromTime(time: number, format = "yyyy-MM-dd hh:mm:ss"): string {
		var date: Date = new Date(time * 1000);
		return DateUtil.formatDate(date, format);
	}

	/**
	 * 格式化时间（毫秒）
	 */
	public static formatTimeMsec(time: number, separator: string = ":"): string {
		var date: Date = new Date(time);
		var h: string = DateUtil.addZero(date.getUTCHours());
		var m: string = DateUtil.addZero(date.getUTCMinutes());
		var s: string = DateUtil.addZero(date.getUTCSeconds());
		return h + separator + m + separator + s;
	}

	/**
	 * 格式化时间（秒）
	 */
	public static formatTime(time: number, separator: string = ":"): string {
		var date: Date = new Date(time * 1000);
		var h: string = DateUtil.addZero(date.getUTCHours());
		var m: string = DateUtil.addZero(date.getUTCMinutes());
		var s: string = DateUtil.addZero(date.getUTCSeconds());
		return h + separator + m + separator + s;
	}

	/**
	 * 格式化中文时间（秒）
	 */
	public static formatTimeInChinese(time: number, short: boolean = false): string {
		var date: Date = new Date(time * 1000);
		var yy: number = date.getUTCFullYear();
		var mm: number = date.getUTCMonth() + 1;
		var dd: number = date.getUTCDate();

		var str: string = yy + DateUtil.date_year + mm + DateUtil.date_month + dd + DateUtil.date_day;

		if (!short) {
			var h: string = DateUtil.addZero(date.getUTCHours());
			var m: string = DateUtil.addZero(date.getUTCMinutes());
			var s: string = DateUtil.addZero(date.getUTCSeconds());
			str += " " + h + ":" + m + ":" + s;
		}

		return str;
	}

	/**
	 * 格式化剩余时间（秒）
	 */
	public static formatTimeLeft(time: number, separator: string = ":"): string {
		var h: string = DateUtil.addZero(Math.floor(time / 3600));
		time %= 3600;
		var m: string = DateUtil.addZero(Math.floor(time / 60));
		time %= 60;
		var s: string = DateUtil.addZero(Math.floor(time));
		return h + separator + m + separator + s;
	}

	/**
	 * 格式化中文剩余时间（秒）
	 */
	public static formatTimeLeftInChinese(time: number, showDay: boolean = true, showHour: boolean = true, showMinute: boolean = true, showSecond: boolean = true): string {
		var str: string = "";
		if (showDay) {
			var d: number = Math.floor(time / 86400);
			if (d > 0) {
				str += d + DateUtil.time_day;
				time %= 86400;
			}
		}
		if (showHour) {
			var h: number = Math.floor(time / 3600);
			if (h > 0) {
				str += h + DateUtil.time_hour;
				time %= 3600;
			}
		}
		if (showMinute) {
			var m: number = Math.floor(time / 60);
			if (m > 0) {
				str += m + DateUtil.time_minute;
				time %= 60;
			}
		}
		if (showSecond) {
			var s: number = Math.floor(time);
			if (s > 0) {
				str += s + DateUtil.time_second;
			}
		}
		return str;
	}
	/**
	 * 格式化中文剩余时间（秒）
	 */
	public static formatTimeLeftInChinese2(time: number, showDay: boolean = true, showHour: boolean = true, showMinute: boolean = true, showSecond: boolean = true): string {
		var str: string = "";
		if (showDay) {
			var d: number = Math.floor(time / 86400);
			if (d > 0) {
				str += d + DateUtil.time_day;
				time %= 86400;
			}
		}
		if (showHour) {
			var h: number = Math.floor(time / 3600);
			if (h > 0) {
				str += h + DateUtil.time_hour;
				time %= 3600;
			}
		}
		if (showMinute) {
			var m: number = Math.floor(time / 60);
			if (m > 0) {
				str += m + DateUtil.date_minute;
				time %= 60;
			}
		}
		if (showSecond) {
			var s: number = Math.floor(time);
			if (s > 0) {
				str += s + DateUtil.time_second;
			} else {
				str += "0" + DateUtil.time_second;
			}
		}
		return str;
	}
	/**
	 * 获取0点时间（传入秒）
	 */
	public static getZeroTime(time: number): number {
		var date: Date = new Date(time * 1000);
		return DateUtil.getUTCTime(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
	}

	/**
 * 获取0点时间（传入秒）
 */
	public static getZeroTimeSecond(time: number): number {
		var date: Date = new Date(time * 1000);
		return DateUtil.getUTCTime(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 1000;
	}

	/**
	 * 获取当天指定时间(传入秒)
	 */
	public static getDayTime(time: number, hours: number = 0, minutes: number = 0, seconds: number = 0): number {
		var date: Date = new Date(time * 1000);
		return DateUtil.getUTCTime(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), hours, minutes, seconds);
	}

	/**
	 * 根据传入时间戳（毫秒）获取是当月的哪一天
	 */
	public static getUTCDay(time: number): number {
		var date: Date = new Date(time);
		return date.getUTCDate();
	}

	/**
	 * 获取两个时间戳（毫秒）时间间隔（天）
	 */
	public static getDifferDay(startTime: number, endTime: number): number {
		var dateStart: number = this.getZeroTime(startTime / 1000);
		var dateEnd: number = this.getZeroTime(endTime / 1000);
		var differDay: number = Math.floor((dateEnd - dateStart) / 86400000);
		return differDay;
	}

	/**
	 * 获取两个时间戳（秒）时间间隔（天）
	 */
	public static getDifferDayBySecondTime(startTime: number, endTime: number): number {
		var dateStart: number = this.getZeroTimeSecond(startTime);
		var dateEnd: number = this.getZeroTimeSecond(endTime);
		var differDay: number = Math.floor((dateEnd - dateStart) / 86400);
		return differDay;
	}

	public static getChineseDayTime(spanTime) {
		var hourTime: number = 3600;
		var dayTime: number = 24 * hourTime;
		var day: number = (spanTime / dayTime) >> 0;
		var hour: number = (spanTime % dayTime / hourTime) >> 0;
		var minutes: number = (spanTime % hourTime / 60) >> 0;
		var seconds: number = (spanTime % hourTime % 60) >> 0;
		if (hour > 0) {
			day = Math.ceil(spanTime / dayTime);
		}
		var str: string = day + "天";
		return str;
	}
}