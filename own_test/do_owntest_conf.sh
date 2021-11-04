#!/bin/bash

source ./owntest.conf


sources_list=$sources_list
sw_sources_list=$sw_sources_list
password=$password

if [ "$sources_list" == "" ] || [ "$sw_sources_list" == "" ] || [ "$password" == "" ];then
    echo "配置缺失，请检查conf文件是否填写正确"
    exit 1
fi

if [ $(uname -m) == "sw_64" ];then
    echo "$sw_sources_list" > /tmp/sources.list
else
    echo "$sources_list" > /tmp/sources.list
fi
echo "$password"|sudo -S cp -v /tmp/sources.list /etc/apt/sources.list
echo "$password"|sudo -S mv /etc/apt/sources.list.d /etc/apt/sources.list.bak 

echo "$password"|sudo -S apt update

echo "$password"|sudo -S apt install -y git htop tmux wget

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



# if [ ! -d $work_path ];then
#     echo 123|sudo -S mkdir -p $work_path
#     user=$(whoami)
#    echo "$sudo_passwd" | sudo -S chown "$user":"$user" "$work_path"
# fi





# git clone $git_url $work_path/$project_name

# echo 123|sudo -S bash $work_path/$project_name/reboot.sh init 200



