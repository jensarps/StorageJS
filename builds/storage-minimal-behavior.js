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

