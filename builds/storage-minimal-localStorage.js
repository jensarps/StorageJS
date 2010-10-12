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

