#!/bin/bash
ssh_address="$1"
ssh $ssh_address < ./do_owntest_conf.sh

scp do_owntest_*.sh  $ssh_address:~

