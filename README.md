# Data Visualization Framework
 build by Express + React + Socket.io + MongoDB

## 1.Initial Setup
    curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
    sudo apt-get install -y nodejs
    sudo apt-get install npm

    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
    echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
    sudo apt-get update
    sudo apt-get install -y mongodb-org

    # add /etc/systemd/system/mongodb.service
    
    [Unit]
    Description=High-performance, schema-free document-oriented database
    After=network.target

    [Service]
    User=mongodb
    ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf

    [Install]
    WantedBy=multi-user.target


    # Then  sudo systemctl start mongodb / sudo systemctl enable mongodb

    #DISABLE HUDGEPAGE Trasnparent

    Create the following file at /etc/init.d/disable-transparent-hugepages 

    #!/bin/bash
    ### BEGIN INIT INFO
    # Provides:          disable-transparent-hugepages
    # Required-Start:    $local_fs
    # Required-Stop:
    # X-Start-Before:    mongod mongodb-mms-automation-agent
    # Default-Start:     2 3 4 5
    # Default-Stop:      0 1 6
    # Short-Description: Disable Linux transparent huge pages
    # Description:       Disable Linux transparent huge pages, to improve
    #                    database performance.
    ### END INIT INFO

    case $1 in
      start)
        if [ -d /sys/kernel/mm/transparent_hugepage ]; then
          thp_path=/sys/kernel/mm/transparent_hugepage
        elif [ -d /sys/kernel/mm/redhat_transparent_hugepage ]; then
          thp_path=/sys/kernel/mm/redhat_transparent_hugepage
        else
          return 0
        fi

        echo 'never' > ${thp_path}/enabled
        echo 'never' > ${thp_path}/defrag

        re='^[0-1]+$'
        if [[ $(cat ${thp_path}/khugepaged/defrag) =~ $re ]]
        then
          # RHEL 7
          echo 0  > ${thp_path}/khugepaged/defrag
        else
          # RHEL 6
          echo 'no' > ${thp_path}/khugepaged/defrag
        fi

        unset re
        unset thp_path
        ;;
    esac

    then--------------------
    sudo chmod 755 /etc/init.d/disable-transparent-hugepages
    sudo update-rc.d disable-transparent-hugepages defaults
    



    sudo  npm install -g cnpm --registry=https://registry.npm.taobao.org
    sudo cnpm install webpack nodemon express express-generator pm2 --global

     sudo apt-key adv --keyserver pgp.mit.edu --recv D101F7899D41F3C3
    echo "deb http://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    sudo apt-get update && sudo apt-get install yarn

    yarn config set registry 'https://registry.npm.taobao.org'

## 2. Security Setup
Consider NodeJS bind  80/443 port must request *sudo*.
It may have some security issues.
We use nginx as a proxy server. the following steps is setting Nginx as Proxy.

### Install nginx:

    sudo apt-get install -y nginx

### Generate Certification File for SSL

    sudo mkdir /etc/nginx/cert; cd /etc/nginx/cert
    openssl genrsa -des3 -passout pass:x -out server.pass.key 2048
    openssl rsa -passin pass:x -in server.pass.key -out server.key
    rm server.pass.key
    openssl req -new -key server.key -out server.csr
    openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt



### Edit nginx config for http proxy

    sudo vi /etc/nginx/sites-enabled/default

#### Append the following config

    upstream nodejs {
    server 127.0.0.1:3000;
        keepalive 64;
    }
    server {
        listen 80;
        listen 443 ssl;
        server_name www.foo.org  foo.org;
        ssl_certificate         /etc/nginx/cert/server.crt;
        ssl_certificate_key     /etc/nginx/cert/server.key;
        access_log /var/log/nginx/test.log;
        location / {
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host  $http_host;
            proxy_set_header X-Nginx-Proxy true;
            proxy_set_header Connection "";
            proxy_pass      http://nodejs;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }    
    }

### Enable Gzip on nginx
    sudo vi /etc/nginx/nginx.conf , enable the following config

        gzip on;
        gzip_disable "msie6";

        gzip_vary on;
        gzip_proxied any;
        gzip_comp_level 6;
        gzip_buffers 16 8k;
        # gzip_http_version 1.1;
        gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;


## 3. Resolve webpack build slow problem

### 3.1 Debug webpack build runtime:

    webpack --profile --display-modules

        Hash: 92bf8258e85b08683c92
        Version: webpack 1.13.3
        Time: 12858ms
                 Asset       Size  Chunks             Chunk Names
          /js/index.js     256 kB       0  [emitted]  index
          /js/table.js  541 bytes       1  [emitted]  table
        ./js/common.js     325 kB       2  [emitted]  ./js/common.js
           [0] ./client/entry.js 4.04 kB {0} [built]
               factory:23ms building:538ms = 561ms
           [0] ./client/comp/table.js 874 bytes {1} [built]
               factory:260ms building:331ms dependencies:407ms = 998ms
           [1] ./client/comp/button.js 2.71 kB {0} [built]
       [0] 561ms -> factory:49ms building:60ms dependencies:40ms = 710ms
           [5] ./client/comp/charts/stock.js 2.49 kB {0} [built]
               [0] 561ms -> factory:50ms building:95ms dependencies:6ms = 712ms
           [6] ./~/react-highcharts/dist/ReactHighstock.js 2.22 kB {0} [built]
               [0] 561ms -> [5] 145ms -> factory:8054ms building:28ms dependencies:1ms = 8789ms
           [7] ./~/highcharts/highstock.js 250 kB {0} [built]
               [0] 561ms -> [5] 145ms -> [6] 8082ms -> factory:4ms building:308ms = 9100ms
           [9] ./~/antd/dist/antd.css 864 bytes {2} [built]
               [0] 561ms -> factory:152ms building:4ms = 717ms
          [10] ./~/css-loader!./~/antd/dist/antd.css 315 kB {2} [built]
               [0] 561ms -> [9] 156ms -> factory:0ms building:8042ms = 8759ms
          [11] ./~/css-loader/lib/css-base.js 1.51 kB {2} [built]
               [0] 561ms -> [9] 156ms -> [10] 8042ms -> factory:1ms building:31ms = 8791ms
          [12] ./~/style-loader/addStyles.js 7.15 kB {2} [built]
               [0] 561ms -> [9] 156ms -> factory:288ms building:7777ms = 8782ms
             5 hidden modules

### 3.2 setup vendor.js , ref venor.config.js
    webpack --config vendor.config.js

    2 files :  manifest.json / vendor.js , include vendor.js in layout template

### 3.3 modify webpack.config.js , add plugins:

    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./manifest.json'),
    }),
