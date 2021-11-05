#!/bin/bash

set -x
source ./mkiso.conf

git_url=$git_url

branch_name=$branch_name
swbranch_name=$swbranch_name

log_path=$log_path

arch=$arch
ssh_user_name=$ssh_user_name
ssh_user_passwd=$ssh_user_passwd

amd64_server=$amd64_server
arm64_server=$arm64_server
mips64_server=$mips64_server
sw64_server=$sw64_server

server_address_info=$server_address_info


if [ "$git_url" == "" ] || [ "$log_path" == "" ] || [ "$ssh_user_name" == "" ] || [ "$ssh_user_passwd" == "" ] || \
    [ "$amd64_server" == "" ] || [ "$arm64_server" == "" ] || [ "$mips64_server" == "" ] || [ "$sw64_server" == "" ] || \
    [ "$server_address_info" == "" ];then
    echo "配置缺失，请检查conf文件是否填写正确"
    exit 1
fi

if [ "$branch_name" == "" ] && [ "$swbranch_name" == "" ];then
    echo "配置缺失，请检查conf文件中git分支信息否填写正确"
    exit 1
fi

if [ "$arch" == "" ] && [ "$1" != "" ];then
    arch=$1
fi

if [ ! -d "$log_path" ];then
    mkdir -p "$log_path"
fi

do_ssh(){
case $arch in
    x86_64)
        ssh  $ssh_user_name@$amd64_server "bash -s $git_url $branch_name $ssh_user_passwd $server_address_info " < ./run_mkiso.sh  > $log_path/amd64-server.log 2>&1 &
    ;;
    arm64)
        ssh  $ssh_user_name@$arm64_server "bash -s $git_url $branch_name $ssh_user_passwd $server_address_info " < ./run_mkiso.sh  > $log_path/arm64-server.log 2>&1 &
    ;;
    mips64)
        ssh  $ssh_user_name@$mips64_server "bash -s $git_url $branch_name $ssh_user_passwd $server_address_info " < ./run_mkiso.sh  > $log_path/mips64-server.log 2>&1 &
    ;;
    sw_64)
        ssh  $ssh_user_name@$sw64_server "bash -s $git_url $swbranch_name $ssh_user_passwd $server_address_info " < ./run_mkiso.sh  > $log_path/sw64-server.log 2>&1 &
    ;;
    all-desk)
        ssh  $ssh_user_name@$amd64_server "bash -s $git_url $branch_name $ssh_user_passwd $server_address_info " < ./run_mkiso.sh  > $log_path/amd64-server.log 2>&1 &
        ssh  $ssh_user_name@$arm64_server "bash -s $git_url $branch_name $ssh_user_passwd $server_address_info " < ./run_mkiso.sh  > $log_path/arm64-server.log 2>&1 &
        ssh  $ssh_user_name@$mips64_server "bash -s $git_url $branch_name $ssh_user_passwd $server_address_info " < ./run_mkiso.sh  > $log_path/mips64-server.log 2>&1 &
        ssh  $ssh_user_name@$sw64_server "bash -s $git_url $swbranch_name $ssh_user_passwd $server_address_info " < ./run_mkiso.sh  > $log_path/sw64-server.log 2>&1 &
    ;;
    *)
        echo "架构不支持"
        exit 1
    ;;
esac
}

main(){
    do_ssh
}

main