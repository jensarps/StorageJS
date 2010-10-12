var storage={engine:null,addEngine:function(_1,_2){
for(var _3 in _2){
storage[_3]=_2[_3];
}
this.engine=_1;
this.init&&this.init();
}};
storage.addEngine("widget",{get:function(_1){
return widget.preferenceForKey(_1);
},set:function(_2,_3){
this.ensureKeyInMap(_2);
widget.setPreferenceForKey(_3,_2);
},remove:function(_4){
this.removeKeyFromMap(_4);
widget.setPreferenceForKey(null,_4);
},ensureKeyInMap:function(){
},removeKeyFromMap:function(){
}});
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
widget.setPreferenceForKey(_1,"sjs-keymap");
};
storage.loadKeyMap=function(){
var _2=widget.preferenceForKey("sjs-keymap");
var _3=_2.length&&_2.length>0?this.parseString(_2):[];
this.keys=_3;
};
storage.loadKeyMap();
storage.clear=function(){
for(var i=0,m=this.keys.length;i<m;i++){
widget.setPreferenceForKey(null,this.keys[i]);
}
this.keys=[];
this.saveKeyMap();
};
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
widget.setPreferenceForKey(_1,"sjs-keymap");
};
storage.loadKeyMap=function(){
var _2=widget.preferenceForKey("sjs-keymap");
var _3=_2.length&&_2.length>0?this.parseString(_2):[];
this.keys=_3;
};
storage.loadKeyMap();
storage.getAll=function(){
var _1=[];
for(var i=0,m=this.keys.length;i<m;i++){
_1.push({key:this.keys[i],value:this.get(this.keys[i])});
}
return _1;
};
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
widget.setPreferenceForKey(_1,"sjs-keymap");
};
storage.loadKeyMap=function(){
var _2=widget.preferenceForKey("sjs-keymap");
var _3=_2.length&&_2.length>0?this.parseString(_2):[];
this.keys=_3;
};
storage.loadKeyMap();
storage.getAllKeys=function(){
return this.keys;
};

