#!/bin/bash
source ./owntest.conf

download_url=$reboot_scrpit_download_url
runtimes=$reboot_runtimes
password=$password

if [ "$download_url" == "" ] || [ "$runtimes" == "" ] || [ "$password" == "" ] ;then
    echo "配置缺失，请检查conf文件是否填写正确"
    exit 1
fi

if [ x"$3" != x"" ];then
    echo "更换下载地址为：""$2"
    download_url=$2
fi

wget -P ~/ "$download_url"

#TODO 重启脚本名称后续可变

tar -xf deepin-reboot-test.tar.gz

cd deepin-reboot-test/ ||exit

echo "$password" |sudo -S bash deepin-reboot.sh init "$runtimes"