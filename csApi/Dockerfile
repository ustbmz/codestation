## 打包使用的node版本
FROM node:lts-alpine as build-stage
## auth
LABEL maintainer="cnmz@msn.com"
## 创建工作目录
WORKDIR /app
## 复制项目文件至镜像目录
COPY . .
## 构建项目  

RUN npm install
## RUN yarn install --registry https://registry.npm.taobao.org

COPY . .
RUN npm run build
## 暴漏端口
EXPOSE 12005
## 
VOLUME [ "/app/public" ]
## 执行命令
CMD [ "node","./dist/server.bundle.js"]