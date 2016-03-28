/**
 * Created by brightdarkoboahen on 28/03/2016.
 */
'use strict';
export default class MyPromise {
    constructor(url){
        this.url = url;
    }
    Promise(method,url, args){
        return new Promise(function(resolve,reject){
            let client = new XMLHttpRequest(),
                uri = url;
            if(args && (method === 'POST' || method ==='PUT')){
                uri +='?';
                let argcount = 0;
                for(var key in args){
                    if(args.hasOwnProperty(key)){
                        if(argcount++){
                            uri += '&';
                        }
                        uri += encodeURIComponent(key)+'='+encodeURIComponent(args[key]);
                    }
                }
            }
            client.open(method,uri);
            client.send();
            client.onload = function(){
                if(this.status >= 200 && this.status < 300){
                    resolve(this.response);
                }else{
                    reject(this.statusText);
                }
            };
            client.onerror = function(){
                reject(this.statusText);
            }
        });
    }
    get(args){
        return this.Promise('GET',this.url,args);
    }
    post(args){
        return this.Promise('POST', this.url,args);
    }
    put(){

    }
}