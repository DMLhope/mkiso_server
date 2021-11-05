# iso_server
## 前端模块
## 后端模块
## 脚本模块
### 镜像构建

#### 概要
+ 配置文件  --- mkiso.conf
+ 入口程序  --- main.sh
+ 主操作程序  --- run_mkiso.sh

常规单独架构执行时配置文件中变量branch_name和变量swbranch_name至少需要有一个被赋值
全平台构建是配置文件中变量branch_name和变量swbranch_name全部需要被赋值

#### 单独使用说明
执行：`bash main.sh 架构`
架构包含： x86_64 , arm64 , mips64 , sw_64 , all


### 自测脚本
#### 概要
+ 配置文件  --- owntest.conf
+ 入口程序  --- main-send_scripts.sh 
+ 客户端配置脚本  --- do_owntest_conf.sh
+ 自动执行重启脚本  --- do_owntest_reboot.sh
+ 自动执行sts脚本  --- do_owntest_sts.sh
+ 自动执行ltp脚本  --- do_owntest_ltp.sh

#### 单独使用说明
1. 填写配置文件
2. 在服务端执行`bash main-send_scripts.sh ip地址`(在配置文件里设置过ip则可以不带参数直接执行)
    此脚本会将配置及其他脚本发送到客户端
3. 登录客户端执行所需测试脚本即可