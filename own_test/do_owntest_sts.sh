#!/bin/bash
source ./owntest.conf

password=$password

git clone https://gitlabsh.uniontech.com/ut000085/sts.git
cd sts
git checkout remotes/origin/testsuite .
echo "$password"|sudo -S UNIXBENCH_GIT_URL=https://gitlabsh.uniontech.com/ut000074/byte-unixbench.git  ./sts.mk testsuite/unixbench
