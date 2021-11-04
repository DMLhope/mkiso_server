#!/bin/bash

source ./owntest.conf

ssh_address=$username@$ip_adress
ssh "$ssh_address" < ./do_owntest_conf.sh

scp do_owntest_*.sh owntest.conf "$ssh_address":~

