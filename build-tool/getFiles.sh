DIR=`dirname $0`
CUR_DIR=`pwd`

java -jar $DIR/js.jar $DIR/js/getFiles.js $DIR/js $CUR_DIR/build-config.json $@