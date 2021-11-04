#!/bin/bash

wget -P ~/ http://10.2.10.31/user:dml/uos-j-desk/owntest-tools/deepin-reboot-test.tar.gz

tar -xf deepin-reboot-test.tar.gz

cd deepin-reboot-test/

echo 123 |sudo -S bash deepin-reboot.sh init 200