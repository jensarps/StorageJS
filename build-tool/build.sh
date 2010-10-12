DIR=`dirname $0`
CUR_DIR=`pwd`

java -jar $DIR/js.jar $DIR/js/build.js $DIR/js $CUR_DIR/build-config.json $@

exit;






	DEST_FILE=$DIR/../build/embed-$1-$PLATFORM_NAME.js
	DEST_FILE_UNCOMPRESSED=$DIR/../build/embed-$1-$PLATFORM_NAME.uncompressed.js
	java -jar $DIR/shrinksafe.jar $FILES > $DEST_FILE
	echo "created `du -h $DEST_FILE`"
	# Create uncompressed files
	cat $FILES > $DEST_FILE_UNCOMPRESSED
	echo "created `du -h $DEST_FILE_UNCOMPRESSED`"
done

echo
echo "Creating files in src/tests"
$DIR/createRunTests.sh