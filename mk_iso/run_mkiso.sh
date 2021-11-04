#!/bin/bash
set -x

source ./mkiso.conf

git_url="$git_url"
branch_name="$branch_name"
sudo_passwd="$ssh_user_passwd"
work_path="/data/build_iso"
project_name=$(echo "$git_url"|sed  "s|.*/||g"|sed "s|.git||g")
echo "$project_name"
datetime=$(date +%Y%m%d%H%M%S)
arch="$4"

server_address_info="$server_address_info"


if [ "$git_url" == "" ] || [ "$branch_name" == "" ] || [ "$sudo_passwd" == "" ] ;then
    echo "git地址或分支错误或未输入用户密码..."
    exit 1
fi


if [ ! -d $work_path ];then
   echo "$sudo_passwd" | sudo -S mkdir -p "$work_path" || { echo "目录创建不成功，请查看是否密码错误"; exit 1; }
   user=$(whoami)
   echo "$sudo_passwd" | sudo -S chown "$user":"$user" "$work_path"
fi

echo "$work_path"/"$project_name"-"$datetime"

git clone -b "$branch_name" --depth=1 "$git_url" "$work_path"/"$project_name"-"$datetime"  ||{ echo "git clone不成功，请查看是否密码错误"; exit 1; }

cd "$work_path"/"$project_name"-"$datetime" || { echo "路径出错"; exit 1; }

if [ "$arch" == "" ];then
    case $(uname -m) in
    x86_64)
        arch="amd64"
    ;;
    aarch64)
        arch="arm64"
    ;;
    mips64)
        arch="mips64"
    ;;
    sw_64)
        arch="sw_64"
    ;;
    *)
        echo "arch error or not support"
        exit 1
    ;;
    esac
fi

echo "$sudo_passwd" | sudo -S bash ./mkiso.sh $arch > ./build_iso_$arch.log 2>&1

scp live/"$(date +%Y%m%d)"/*.iso ./build_iso_$arch.log  "$server_address_info"

