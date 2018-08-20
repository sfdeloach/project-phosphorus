#!/bin/sh
echo "Starting project-phosphorus development enviroment..."

# Google Chrome 
echo "...Google Chrome"
google-chrome &

# VS Code
echo "...VS Code"
code &

# Angular Development Server
echo "...Angular Dev Server"
cd /home/steven/workspace/project-phosphorus
git pull origin master
ng serve


