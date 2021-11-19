#!/bin/bash

source ./owntest.conf

ip_adress=$ip_adress

if [ "$1" != "" ];then
    ip_adress=$1
fi

if [ $ip_adress == "" ];then
    echo "请输入ip"
fi


if [ $(grep -rn "$ip_adress " ~/.ssh/known_hosts|wc -l) -lt 1 ];then
    ssh-keyscan -t ECDSA -p 22  $ip_adress >> ~/.ssh/known_hosts
fi

ssh_address=$username@$ip_adress



sshpass -p "$password" scp do_owntest_*.sh owntest.conf "$ssh_address":~

sshpass -p "$password" ssh "$ssh_address"  "bash ~/do_owntest_conf.sh"

if [ $2 != "" ];then
    case $2 in
        reboot)
            sshpass -p "$password" ssh "$ssh_address"  "bash ~/do_owntest_reboot.sh"
            ;;
        ltp)
            sshpass -p "$password" ssh "$ssh_address"  "bash ~/do_owntest_ltp.sh"
            ;;
        *)
        echo "请检查参数"
        exit 1
            ;;
    esac
fi