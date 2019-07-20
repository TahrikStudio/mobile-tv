cd res
optipng -o7 splash.png
for file in *
do
	if [ -d $file ]
	then
		cd $file
		optipng -o7 *.png
		cd ..
	fi
done