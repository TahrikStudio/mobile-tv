# # Trigger a build
cd ..
npm run build
cd app

# # Clear current files
rm -rf www/static www/index.html

# # Copy sources
cp -r ../dist/* www/
rm www/static/css/*.map
rm www/static/js/*.map

# # Replace
sed -i 's/\/static/.\/static/g' www/index.html
sed -i 's/\/static\/img/\.\.\/img/g' www/static/css/app*.css

export ANDROID_HOME=/home/niyasc/Development
export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-amd64
export PATH=$PATH:/opt/gradle/gradle-6.6/bin/
export PATH=$PATH:~/Android/Sdk/tools
export PATH=$PATH:~/Android/Sdk/platform-tools
trap interrupted INT
function interrupted () {
    rm -f platforms/android/release.properties
}

# stty -echo
# read -p "Store Password: " spassw; echo
# read -p "Key Password: " kpassw; echo
# stty echo

cat << EOT > platforms/android/release.properties
storeFile=../../malayalamlive.keystore
storePassword=malayalamlive
keyAlias=release_key
keyPassword=malayalamlive
EOT

export ORG_GRADLE_PROJECT_cdvReleaseSigningPropertiesFile=../release.properties 
cordova build --release android
# cordova build android
rm platforms/android/release.properties

echo "Build completed, trying to kill java daeomon"
pkill java
