var storage={engine:"widget",get:function(_1){
return widget.preferenceForKey(_1);
},set:function(_2,_3){
this.ensureKeyInMap(_2);
widget.setPreferenceForKey(_3,_2);
},remove:function(_4){
this.removeKeyFromMap(_4);
widget.setPreferenceForKey(null,_4);
},ensureKeyInMap:function(){
},removeKeyFromMap:function(){
}};

