#!/bin/bash
source ./build_pkg.conf
git_url=$git_url
branch_name=$branch_name
sudo_passwd=$sudo_passwd

work_path=$work_path
datetime=$(date +%Y%m%d%H%M%S)




if [ "$git_url" == "" ] || [ "$branch_name" == "" ] ;then
    echo "conf 文件未配置,检查是否使用参数模式"
    if [ "$1" == "" ] || [ "$2" == "" ];then
        echo "参数检测异常，请检测传入参数，退出..."
        exit 1
    else
        git_url="$1"
        branch_name="$2"
    fi
fi
# 这个变量需要在这做最后赋值
project_name=$(echo "$git_url"|sed  "s|.*/||g"|sed "s|.git||g")

if [ ! -d $work_path ];then
   echo "$sudo_passwd" | sudo -S mkdir -p "$work_path" || { echo "目录创建不成功，请查看是否密码错误"; exit 1; }
   user=$(whoami)
   echo "$sudo_passwd" | sudo -S chown "$user":"$user" "$work_path"
fi

mkdir -p "$work_path"/"$project_name"/
package_path="$work_path"/"$project_name"/"$project_name"-"$datetime"

git clone -b "$branch_name" --depth=1 "$git_url"  $package_path ||{ echo "git clone不成功，请查看是否地址或分支或密码错误"; exit 1; }

cd $package_path

gbp export-orig --upstream-tree=$branch_name

mv .git ../

dpkg-source -b .

dsc_path=$(realpath ../*.dsc)



