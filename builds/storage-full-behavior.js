var storage={engine:"behavior",store:null,storeName:"__StorageJS_BehaviorStorage",init:function(){
this.store=this._createStore();
this.store.load(this.storeName);
},_createStore:function(){
var _1=document.createElement("link");
_1.id=this.storeName+"Node";
_1.style.display="none";
document.getElementsByTagName("head")[0].appendChild(_1);
_1.addBehavior("#default#userdata");
return _1;
},get:function(_2){
return this.store.getAttribute(_2);
},set:function(_3,_4){
this.ensureKeyInMap(_3);
this.store.setAttribute(_3,_4);
this.store.save(this.storeName);
},remove:function(_5){
this.removeKeyFromMap(_5);
this.store.removeAttribute(_5);
this.store.save(this.storeName);
},ensureKeyInMap:function(){
},removeKeyFromMap:function(){
}};
storage.init();
storage.keys=[];
storage.ensureKeyInMap=function(_1){
if(!this.hasKeyInMap(_1)){
this.keys.push(_1);
this.saveKeyMap();
}
};
storage.hasKeyInMap=function(_2){
for(var i=0,m=this.keys.length;i<m;i++){
if(_2===this.keys[i]){
return true;
}
}
return false;
};
storage.removeKeyFromMap=function(_3){
var _4=[];
for(var i=0,m=this.keys.length;i<m;i++){
if(_3!==this.keys[i]){
_4.push(_3);
}
}
this.keys=_4;
this.saveKeyMap();
};
storage.stringifyArray=function(_5){
if(typeof JSON!="undefined"&&JSON.stringify){
return JSON.stringify(_5);
}
var _6="";
for(var i=0,m=_5.length;i<m;i++){
_6+=item+":sjs-k:";
}
_6=_6.substring(0,_6.length-8);
return _6;
};
storage.parseString=function(_7){
if(typeof JSON!="undefined"&&JSON.parse){
return JSON.parse(_7);
}
var _8=_7.split(":sjs-k:");
return _8;
};
storage.saveKeyMap=function(){
var _1=this.stringifyArray(this.keys);
this.store.setAttribute("sjs-keymap",_1);
this.store.save(this.storeName);
};
storage.loadKeyMap=function(){
var _2=this.store.getAttribute("sjs-keymap");
var _3=(typeof _2.length!="undefined"&&_2.length>0)?this.parseString(_2):[];
this.keys=_3;
};
storage.loadKeyMap();
storage.clear=function(){
for(var i=0,m=this.keys.length;i<m;i++){
this.store.removeAttribute(this.keys[i]);
}
this.keys=[];
this.saveKeyMap();
};
storage.getAll=function(){
var _1=[];
for(var i=0,m=this.keys.length;i<m;i++){
_1.push({key:this.keys[i],value:this.get(this.keys[i])});
}
return _1;
};
storage.getAllKeys=function(){
return this.keys;
};

