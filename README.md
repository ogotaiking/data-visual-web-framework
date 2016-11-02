# Data Visualization Framework
 build by Express + React + Socket.io + MongoDB

## Initial Setup
    curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
    sudo apt-get install -y nodejs
    sudo apt-get install sudonpm mongodb

    sudo ln -s /usr/bin/nodejs /usr/bin/node
    npm install -g express express-generator nodemon

    sudo apt-key adv --keyserver pgp.mit.edu --recv D101F7899D41F3C3
    echo "deb http://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    sudo apt-get update && sudo apt-get install yarn

    yarn config set registry 'https://registry.npm.taobao.org'

## Security Setup
Consider NodeJS bind  80/443 port must request *sudo* may have some security issues.
We use nginx as a proxy server. the following setups is setting Nginx as Proxy.

1. Install nginx:
    sudo apt-get install -y nginx

2. Generate Certification File for SSL

    $ sudo mkdir /etc/nginx/cert; cd /etc/nginx/cert
    $ openssl genrsa -des3 -passout pass:x -out server.pass.key 2048
    ...
    $ openssl rsa -passin pass:x -in server.pass.key -out server.key
    writing RSA key
    $ rm server.pass.key
    $ openssl req -new -key server.key -out server.csr
    ...

3. Edit nginx config for http proxy

    sudo vi /etc/nginx/sites-enabled/default

    <!=Append the following config  =!>

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
        }    
    }
