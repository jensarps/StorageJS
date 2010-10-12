EmbedJS Build tool
==================

While hacking on embedJS we realized that the tools we use with it, especially the build tools, might be useful in other projects too. To make using it easier we provide those tools separately, and not only bundled with embedJS.
If you want to this is a kind of a make tool for JavaScript files using the distinct philosophy of grouping separate files into features and bundling them accordingly, including dependency resolving, etc.

The philosophy
==============

EmbedJS' way to see files and build them might be different from the build and packaging tools you know, that's why let me dive a little bit into it's philosophy and some reasoning behind it.

Features
--------

A build in embedJS is seen as a set of features (the so called profiles [might not be good naming]), e.g. the "kitchensink" is made up out of the following features:

	base,array,connect,deferred,destroy,html,json,jsonp,lang,xhr,oo,uri,query

The short summary about what a features is:

#) a feature directly refers to one or multiple file(s) that implement it
   e.g. "connect" is implemented in "src/connect/connect.js" and "src/connect/event.js"
#) a feature may have nothing to do with the namespace that it is implemented in
   e.g. the feature "oo" (for object orientation) is implemented in the files "src/oo/declare.js", "src/oo/delegate.js", "src/oo/extend.js", if you know dojo, you know that this implements the functions "dojo.declare", "dojo.delegate", "dojo.extend".
   You see that the feature named "oo" has nothing to do with the function/method names and the final namespace in JavaScript!
   To underline the difference in feature names and JS namespaces the features are not separated by dots, like namespaces, but by dashed, e.g. "oo-declare".


Platforms
---------

If you look at a feature like "query" (the query engine) than it will become very quickly obvious that a feature may be implemented differently for each platform. Because some platforms may provide "document.querySelectorAll()", others might not, one wants to use sizzle, another acme as the query engine - it's the authors choice. Allowing the author to choose is exactly how the different platforms are implemented too. A feature has a mapping to which file(s) implement it - per platform!!!

Examples might show this best:

**android.json**

::

	...
	"query":[
		"src/query/qsa-preprocessor.js"
	],
	...
	
for android the implementation for the feature "query" can be found in the given file. For iOS the same implementation is used in this case.

**vodafone-apps-manager2.2.json**

::

	...
	"query": [
		"dojo/query/acme.js"
	],
	...
	
Vodafone's Widget Runtime (an Opera WRT) doesn't provide querySelectorAll(), so we use dojo's very own query engine "acme" to implement the feature "query".

One set of APIs
---------------

As you might notice at this point, there might be multiple implementations for one features. But the most important thing is that they all target the same goal to create a unique API, a base line - across platforms. In other words: provide one API for all devices!


