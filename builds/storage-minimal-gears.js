var storage={engine:null,addEngine:function(_1,_2){
for(var _3 in _2){
storage[_3]=_2[_3];
}
this.engine=_1;
this.init&&this.init();
}};
storage.addEngine("gears",{dbName:"SJSDatabase",tableName:"SJSStorageTable",db:null,init:function(){
this.initGears();
this.db=google.gears.factory.create("beta.database");
this.db.open(this.dbName);
this.db.execute("CREATE TABLE IF NOT EXISTS "+this.tableName+" ( key TEXT PRIMARY KEY, value TEXT )");
},get:function(_1){
var rs=this.db.execute("SELECT value FROM "+this.tableName+" WHERE key = ?",[_1]);
var _2=null;
if(rs.isValidRow()&&rs.fieldCount()>0){
_2=rs.field(0);
}
rs.close();
return _2;
},set:function(_3,_4){
if(this.get(_3)===null){
this.db.execute("INSERT INTO "+this.tableName+" values (?, ?)",[_3,_4]);
}else{
this.db.execute("UPDATE "+this.tableName+" SET value = ? WHERE key = ?",[_4,_3]);
}
},remove:function(_5){
this.db.execute("DELETE FROM "+this.tableName+" WHERE key = ?",[_5]);
},initGears:function(){
if(window.google&&google.gears){
return;
}
var _6=null;
if(typeof GearsFactory!="undefined"){
_6=new GearsFactory();
}else{
try{
_6=new ActiveXObject("Gears.Factory");
if(_6.getBuildInfo().indexOf("ie_mobile")!=-1){
_6.privateSetGlobalObject(this);
}
}
catch(e){
if((typeof navigator.mimeTypes!="undefined")&&navigator.mimeTypes["application/x-googlegears"]){
_6=document.createElement("object");
_6.style.display="none";
_6.width=0;
_6.height=0;
_6.type="application/x-googlegears";
document.documentElement.appendChild(_6);
if(_6&&(typeof _6.create=="undefined")){
_6=null;
}
}
}
}
if(!_6){
return;
}
if(!window.google){
google={};
}
if(!google.gears){
google.gears={factory:_6};
}
}});

