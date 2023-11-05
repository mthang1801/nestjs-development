#!/bin/bash

echo "======================== Send telegram down service ========================="
bash send-telegram-down-service.sh

echo "============================= Start Docker ==============================="
sh docker.sh

echo "===================== Send Telegram Build Success ========================"
bash send-telegram-package-info.sh
echo "===================== Build Complete, Bye Bye!!! ========================="
free -m 
exit 0