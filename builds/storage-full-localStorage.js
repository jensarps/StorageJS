var storage={engine:null,addEngine:function(_1,_2){
for(var _3 in _2){
storage[_3]=_2[_3];
}
this.engine=_1;
this.init&&this.init();
}};
storage.addEngine("localStorage",{get:function(_1){
return localStorage.getItem(_1);
},set:function(_2,_3){
localStorage.setItem(_2,_3);
},remove:function(_4){
localStorage.removeItem(_4);
}});
storage.clear=function(){
localStorage.clear();
};
storage.getAll=function(){
var _1=[],i=0,m=localStorage.length,_2;
for(;i<m;i++){
_2=localStorage.key(i);
_1.push({key:_2,value:this.get(_2)});
}
return _1;
};
storage.getAllKeys=function(){
var _1=[],i=0,m=localStorage.length;
for(;i<m;i++){
_1.push(localStorage.key(i));
}
return _1;
};

