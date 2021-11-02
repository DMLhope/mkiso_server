#!/bin/bash

set -x


git_url="git@gitlabsh.uniontech.com:military/system/product/uos-j/mkiso-v20-desktop.git"
branch_name="desktop-mil/sp4-stable/1041"
swbranch_name="sw64/desktop-mil/1041"

arch="$1"
ssh_user_name="uos-j"
ssh_user_passwd="$2"

# x86: uos-j@10.2.18.188
# arm: dml@10.2.10.36
# mips: uos-j@10.2.21.117
# sw: uos-j@10.2.21.91 

amd64_server="10.2.18.188"
arm64_server="10.2.10.36"
mips64_server="10.2.21.117"
sw64_server="10.2.21.91"



do_ssh(){
case $arch in
    x86_64)
        ssh  $ssh_user_name@$amd64_server "bash -s $git_url $branch_name $ssh_user_passwd " < ./run_mkiso.sh  > ./log/amd64.log 2>&1 &
    ;;
    arm64)
        ssh  $ssh_user_name@$arm64_server "bash -s $git_url $branch_name $ssh_user_passwd " < ./run_mkiso.sh  > ./log/arm64.log 2>&1 &
    ;;
    mips64)
        ssh  $ssh_user_name@$mips64_server "bash -s $git_url $branch_name $ssh_user_passwd " < ./run_mkiso.sh  > ./log/mips64.log 2>&1 &
    ;;
    sw_64)
        ssh  $ssh_user_name@$sw64_server "bash -s $git_url $swbranch_name $ssh_user_passwd " < ./run_mkiso.sh  > ./log/sw64.log 2>&1 &
    ;;
    all-desk)
        ssh  $ssh_user_name@$amd64_server "bash -s $git_url $branch_name $ssh_user_passwd " < ./run_mkiso.sh  > ./log/amd64.log 2>&1 &
        ssh  $ssh_user_name@$arm64_server "bash -s $git_url $branch_name $ssh_user_passwd " < ./run_mkiso.sh  > ./log/arm64.log 2>&1 &
        ssh  $ssh_user_name@$mips64_server "bash -s $git_url $branch_name $ssh_user_passwd " < ./run_mkiso.sh  > ./log/mips64.log 2>&1 &
        ssh  $ssh_user_name@$sw64_server "bash -s $git_url $swbranch_name $ssh_user_passwd " < ./run_mkiso.sh  > ./log/sw64.log 2>&1 &
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