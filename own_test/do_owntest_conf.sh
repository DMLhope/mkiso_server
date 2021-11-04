#!/bin/bash

sources_list="deb http://sh-internal.deepin.com/repo/v20-J/desktop-mil shangyu main contrib non-free"
# git_url=""
# project_name=""
# work_path="/data/owntest/"
# test_option="$1"

# case $test_option in
# reboot_test)
# git_url="https://gitlabsh.uniontech.com/military/system/deepin-server/deepin-reboot-test.git"
# project_name=$(echo "$git_url"|sed  "s|.*/||g"|sed "s|.git||g")
# ;;
# ltp_test)

# ;;
# *)

# ;;
# esac

if [ $(uname -m) == "sw_64" ];then
    sources_list="deb http://sh-internal.deepin.com/repo/v20-J/desktop-mil-sw64 shangyu main contrib non-free"
fi

# if [ ! -d $work_path ];then
#     echo 123|sudo -S mkdir -p $work_path
#     user=$(whoami)
#    echo "$sudo_passwd" | sudo -S chown "$user":"$user" "$work_path"
# fi
echo $sources_list > /tmp/sources.list
echo 123|sudo -S cp -v /tmp/sources.list /etc/apt/sources.list
echo 123|sudo -S mv /etc/apt/sources.list.d /etc/apt/sources.list.bak 

echo 123|sudo -S apt update

echo 123|sudo -S apt install -y git htop tmux wget



# git clone $git_url $work_path/$project_name

# echo 123|sudo -S bash $work_path/$project_name/reboot.sh init 200



