var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
// http请求封装
var RequestUtil = (function () {
    function RequestUtil() {
        this.HTTP_URL = Setting.env == 'dev' ? 'http://192.168.1.233:84' : 'https://xxxx';
    }
    RequestUtil.prototype.dataFormat = function (data) {
        if (data) {
            var arr = [];
            for (var key in data) {
                arr.push(key + '=' + data[key]);
            }
            return arr.join('&');
        }
        return '';
    };
    RequestUtil.prototype.getToen = function () {
        return sessionStorage.getItem('token');
    };
    RequestUtil.prototype.requestGetImg = function (requestUrl, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var request = new egret.HttpRequest();
            var param = _this.dataFormat(data);
            request.responseType = egret.HttpResponseType.TEXT;
            request.open(requestUrl, egret.HttpMethod.GET);
            request.send();
            request.addEventListener(egret.Event.COMPLETE, function (event) {
                resolve();
            }, _this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
                reject(event);
            }, _this);
        });
    };
    RequestUtil.prototype.requestGet = function (requestUrl, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var request = new egret.HttpRequest();
            var param = _this.dataFormat(__assign({}, data, { ucode: _this.getToen() }));
            request.responseType = egret.HttpResponseType.TEXT;
            request.open(_this.HTTP_URL + requestUrl + '?' + param, egret.HttpMethod.GET);
            request.send();
            request.addEventListener(egret.Event.COMPLETE, function (event) {
                var request = event.currentTarget;
                resolve(JSON.parse(request.response));
            }, _this);
        });
    };
    RequestUtil.prototype.requestPost = function (requestUrl, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var request = new egret.HttpRequest();
            var param = _this.dataFormat(__assign({}, data, { ucode: _this.getToen() }));
            // let param =JSON.stringify(data);
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.open(_this.HTTP_URL + requestUrl, egret.HttpMethod.POST);
            request.send(param);
            request.addEventListener(egret.Event.COMPLETE, function (event) {
                var request = event.currentTarget;
                if (request.response) {
                    resolve(JSON.parse(request.response));
                }
                else {
                    PopUps.tipMsg('系统出错，请稍后再试~');
                    reject(event);
                }
            }, _this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
                PopUps.tipMsg('服务器连接失败，请稍后再试~');
            }, _this);
        });
    };
    return RequestUtil;
}());
__reflect(RequestUtil.prototype, "RequestUtil");
