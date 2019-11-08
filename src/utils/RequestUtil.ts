
// http请求封装
class RequestUtil {
    private HTTP_URL: string;
    constructor() {
        this.HTTP_URL = Setting.env == 'dev' ? 'http://192.168.1.233:84' : 'https://xxxx';
    }
    private dataFormat(data) {
        if (data) {
            let arr = [];
            for (let key in data) {
                arr.push(key + '=' + data[key]);
            }
            return arr.join('&');
        }
        return '';
    }
    private getToen() {
        return sessionStorage.getItem('token');
    }
    public requestGetImg(requestUrl: string, data?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let request = new egret.HttpRequest();
            let param = this.dataFormat(data);
            request.responseType = egret.HttpResponseType.TEXT;

            request.open(requestUrl, egret.HttpMethod.GET);
            request.send();

            request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
                resolve()
            }, this)
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent) => {
                reject(event);
            }, this);
        })

    }
    public requestGet(requestUrl: string, data?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let request = new egret.HttpRequest();
            let param = this.dataFormat({ ...data, ...{ ucode: this.getToen() } });
            request.responseType = egret.HttpResponseType.TEXT;

            request.open(this.HTTP_URL + requestUrl + '?' + param, egret.HttpMethod.GET);
            request.send();

            request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
                let request = <egret.HttpRequest>event.currentTarget;
                resolve(JSON.parse(request.response));
            }, this);
        })

    }
    public requestPost(requestUrl: string, data?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let request = new egret.HttpRequest();
            let param = this.dataFormat({ ...data, ...{ ucode: this.getToen() } });
            // let param =JSON.stringify(data);
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.open(this.HTTP_URL + requestUrl, egret.HttpMethod.POST);
            request.send(param);

            request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
                let request = <egret.HttpRequest>event.currentTarget;

                if (request.response) {
                    resolve(JSON.parse(request.response));
                } else {
                    PopUps.tipMsg('系统出错，请稍后再试~');
                    reject(event);
                }
            }, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.Event) => {
                PopUps.tipMsg('服务器连接失败，请稍后再试~');
            }, this);
        });
    }
}