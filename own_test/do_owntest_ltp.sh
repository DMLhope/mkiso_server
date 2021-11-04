#!/bin/bash

wget -P ~/ http://10.2.10.31/user:dml/uos-j-desk/owntest-tools/ltp-20200515.tar.gz
cd ~/ 

tar xf ltp-20200515.tar.gz

cd ltp

echo 123 |sudo -S ./travis/debian.sh

make autotools 

./configure

if [ $(uname -m) != sw_64 ];then
    echo 123 |sudo -S sed -i "s|#define ustat statfs|//#define ustat statfs|g"  /usr/include/unistd.h
fi

make -j$(nproc)

echo 123 |sudo -S make install

cd /opt/ltp/testscripts/

echo 123 |sudo -S ./ltpstress.sh -n -t 48


