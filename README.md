# Data Visualization Framework
 build by Express + React + Socket.io + MongoDB

## 1.Initial Setup
NodeJS 8.9.1

    curl -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key | sudo apt-key add -
    sudo sh -c "echo deb https://deb.nodesource.com/node_8.x zesty main > /etc/apt/sources.list.d/nodesource.list"
    sudo apt-get update
    sudo apt-get install nodejs

MongoDB 3.4

    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
    echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list

    sudo apt-get update
    sudo apt-get install -y mongodb-org
    systemctl enable mongod.service

CNPM & YARN

    sudo  npm install -g cnpm --registry=https://registry.npm.taobao.org
    sudo cnpm install webpack-dev-server webpack express express-generator pm2 --global

    sudo apt-key adv --keyserver pgp.mit.edu --recv D101F7899D41F3C3
    echo "deb http://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    sudo apt-get update && sudo apt-get install yarn

    yarn config set registry 'https://registry.npm.taobao.org'

## 2. Security Setup
Consider NodeJS bind  80/443 port must request *sudo*.
It may have some security issues.
We use nginx as a proxy server. the following steps is setting Nginx as Proxy.

### Install nginx:

    sudo apt-get remove apache2
    sudo apt-get install -y nginx

### Generate Certification File for SSL

    sudo mkdir /etc/nginx/cert; cd /etc/nginx/cert
    sudo openssl genrsa -des3 -passout pass:x -out server.pass.key 2048
    sudo openssl rsa -passin pass:x -in server.pass.key -out server.key
    sudo rm server.pass.key
    sudo openssl req -new -key server.key -out server.csr
    sudo openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt



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
    sudo vi /etc/nginx/nginx.conf 

    Enable the following config

        gzip on;
        gzip_disable "msie6";

        gzip_vary on;
        gzip_proxied any;
        gzip_comp_level 6;
        gzip_buffers 16 8k;
        # gzip_http_version 1.1;
        gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;


## 3. Install and build js

   npm install
   webpack  --config vendor.config.js
   webpack --config webpack.config.js  or  prod.config.js
   npm start

### 3.1 check package update
   npm outdated
   npm install xxx@version

## 4.folder

### 4.1  ./app
   Server side function

#### 4.1.1 controllers
   locales 
   login
   userMgmt
  
   SocketIO/MQTT

#### 4.1.2 models
   user schema in mongodb

## 4.2  ./views
   default layout style, support ejs template and React ServerSide rendering.






