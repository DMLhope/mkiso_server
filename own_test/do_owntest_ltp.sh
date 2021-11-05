#!/bin/bash
source ./owntest.conf



download_url=$ltp_scrpit_download_url
password=$password
runtime=$ltp_runtime

if [ "$download_url" == "" ] || [ "$runtime" == "" ] || [ "$password" == "" ];then
    echo "配置缺失，请检查conf文件是否填写正确"
    exit 1
fi

wget -P ~/ "$download_url"

cd ~/ || exit 

tar xf ltp-20200515.tar.gz

cd ltp || exit

echo "$password" |sudo -S ./travis/debian.sh

make autotools 

./configure

if [ $(uname -m) != sw_64 ];then
    echo "$password" |sudo -S sed -i "s|#define ustat statfs|//#define ustat statfs|g"  /usr/include/unistd.h
fi

make -j$(nproc)

echo "$password" |sudo -S make install

cd /opt/ltp/testscripts/ || exit

echo "$password" |sudo -S ./ltpstress.sh -n -t "$runtime"


