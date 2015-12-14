del platforms\android\build\outputs\apk\kichili.apk
del platforms\android\build\outputs\apk\*release*
call cordova build --release android
call jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore E:\Kichili\PublishApp\my-release-key.keystore platforms\android\build\outputs\apk\android-release-unsigned.apk alias_name
call zipalign -v 4 platforms\android\build\outputs\apk\android-release-unsigned.apk platforms\android\build\outputs\apk\kichili.apk