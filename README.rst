StorageJS
=========

Intro
-----

StorageJS is a micro wrapper for client side persistent storage. It is explicitly aimed at mobile devices (but can be used for desktop apps, too, of course).

StorageJS uses the EmbedJS approach. That means:

a) It is divided into features, and for these features exist different implementations (based on the targeted storage engine).

b) You have different output builds for the different storage backends. There is branching on run time.

That way, you have the smallest possible footprint for your project, and deliver only the code that you really need for your project.


Supported Storage Engines
-------------------------

StorageJS supports localStorage, Widget preference store, Gears, userData behavior and Cookies. Due to the fact that StorageJS provides sync read access to storage, there's no support for Sqlite impls.


Features
--------

The base feature, "engine", exposes the follwing methods:

var value = storage.get(key);

storage.set(key, value);

storage.remove(key);

Both key and value MUST be strings.

The other features add more methods, such as clear(), getAll() or getAllKeys(), or modify given methods. Please refer to the README in each feature's directory to learn more about what it does.


Building
--------

To create a build specific to your project, you can cherry-pick whatever features you need and create a profile. However, some default profiles that cover the most use cases are already pre-defined. Inside of the "builds" directory are ready made builds you can use out of the box.

To build your custom profile, you need the EmbedJS build tool. You can get it from github. Next, you need to modify the build-config.json file. It's well commented, so don't hesitate! Finally, run the build.sh shell script to create your builds.

::
  
  # Clone the repos
  > git clone git@github.com:jensarps/StorageJS.git
  > git clone git@github.com:uxebu/embedjs-tools.git

  # trigger the actual build using the embedjs-tools bash script
  > cd StorageJS
  > ../embedjs-tools/build.sh profile=YourCustomProfile
  


Size matters
------------

The minimal profile, containing the base feature "engine" (providing the get/set/remove methods), results in builds of the following size (not gzipped):

::

  storage-minimal-behavior.js          876b
  storage-minimal-cookie.js           1534b
  storage-minimal-gears.js            1656b
  storage-minimal-localStorage.js      332b
  storage-minimal-widget.js            455b
  
  
Documentation
-------------

Will follow soon, I promise.