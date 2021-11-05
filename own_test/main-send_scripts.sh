#!/bin/bash

source ./owntest.conf

ip_adress=$ip_adress

if [ "$1" != "" ];then
    ip_adress=$1
fi

if [ $ip_adress == "" ];then
    echo "请输入ip"
fi

ssh_address=$username@$ip_adress


scp do_owntest_*.sh owntest.conf "$ssh_address":~

ssh "$ssh_address"  "bash ~/do_owntest_conf.sh"
