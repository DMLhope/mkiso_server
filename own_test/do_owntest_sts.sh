#!/bin/bash
git clone https://gitlabsh.uniontech.com/ut000085/sts.git
cd sts
git checkout remotes/origin/testsuite .
sudo  UNIXBENCH_GIT_URL=https://gitlabsh.uniontech.com/ut000074/byte-unixbench.git  ./sts.mk testsuite/unixbench
