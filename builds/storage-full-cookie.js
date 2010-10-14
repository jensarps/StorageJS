var storage={engine:"cookie",cookieName:"StorageJSCookie",store:{},init:function(){
this.readStoreFromCookie();
},get:function(_1){
return this.store[_1]||null;
},set:function(_2,_3){
this.store[_2]=_3;
this.updateCookie();
},remove:function(_4){
delete this.store[_4];
this.updateCookie();
},updateCookie:function(){
var _5=this.stringify(this.store);
var c=document.cookie;
var _6={expires:100};
var _7=_6.expires;
if(typeof _7=="number"){
var d=new Date();
d.setTime(d.getTime()+_7*24*60*60*1000);
_7=_6.expires=d;
}
if(_7&&_7.toUTCString){
_6.expires=_7.toUTCString();
}
var _8=encodeURIComponent(_5);
var _9=this.cookieName+"="+_8,_a;
for(_a in _6){
_9+="; "+_a;
var _b=_6[_a];
if(_b!==true){
_9+="="+_b;
}
}
document.cookie=_9;
},readStoreFromCookie:function(){
var c=document.cookie;
var _c=c.match(new RegExp("(?:^|; )"+this.cookieName+"=([^;]*)"));
var _d=_c?this.parse(decodeURIComponent(_c[1])):{};
this.store=_d;
},stringify:function(_e){
if(typeof (JSON)!="undefined"&&JSON.stringify){
return JSON.stringify(_e);
}
var _f="";
for(var _10 in this.store){
_f+=_10+":sjs-kv:"+this.store[_10]+":sjs-i:";
}
_f=_f.substring(0,_f.length-8);
return _f;
},parse:function(_11){
if(typeof (JSON)!="undefined"&&JSON.parse){
return JSON.parse(_11);
}
var _12={};
var _13=_11.split(":sjs-i:");
for(var i=0,m=_13.length,kv;i<m;i++){
kv=_13[i].split(":sjs-kv:");
_12[kv[0]]=kv[1];
}
return _12;
}};
storage.init();
storage.clear=function(){
this.store={};
this.updateCookie();
};
storage.getAll=function(){
var _1=[];
for(var _2 in this.store){
_1.push({key:_2,value:this.get(_2)});
}
return _1;
};
storage.getAllKeys=function(){
var _1=[];
for(var _2 in this.store){
_1.push(_2);
}
return _1;
};

