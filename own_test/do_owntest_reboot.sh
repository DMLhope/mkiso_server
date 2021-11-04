#!/bin/bash
download_url="http://10.2.10.31/user:dml/uos-j-desk/owntest-tools/deepin-reboot-test.tar.gz"
runtimes="$1"
password="$2"

if [ "$runtimes" == "" ] || [ "$password" == "" ] ;then
    echo "请提供重启次数及sudo密码"
    echo "例如重启100次，密码123：bash do_owntest_reboot.sh 100 123"
    exit
fi

if [ x"$3" != x"" ];then
    echo "更换下载地址为：""$2"
    download_url=$2
fi

wget -P ~/ "$download_url"

tar -xf deepin-reboot-test.tar.gz

cd deepin-reboot-test/ ||exit

echo "$password" |sudo -S bash deepin-reboot.sh init "$runtimes"