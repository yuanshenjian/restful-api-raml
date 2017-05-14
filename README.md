# RESTful API with RMAL
一句话来描述该工程 

>利用Docker容器化技术将Raml构建RESTful API的构建动作和数据进行分离，使得任何安装了`docker`的机器都可以一键启动所有服务。

工程包含以下两方面内容：

1. 使用了 [Raml](http://raml.org/) 设计一个简化版`Company-Employee`管理系统的RESTful API，并通过 [raml2html](https://github.com/raml2html/raml2html) 文档化API，利用 [osprey-mock-service](https://github.com/mulesoft-labs/osprey-mock-service) 构建API Mock Server。

2. 借助 [Docker](https://docs.docker.com/) 将构建动作进行了抽离，封装在独立的`Image`，使用 [Docker-compose](https://docs.docker.com/compose/) 将数据和构建进行搭桥并一键启动所有服务。


## 环境准备
* 安装 [npm](https://www.npmjs.com/)
* 安装 [Docker](https://docs.docker.com/) 


## 一键启动

```
$ docker-compose up
```

## 访问服务
* api-docs: [http://localhost:8082](http://localhost:8082)
* mock-server: [http://localhost:8088/companies](http://localhost:8088/companies)


## 私人订制
### 更改端口
编辑 `docker-compose.yml`文件:

```sh
version: '3'
services:
  raml:
    build: .
    ports:
      - "8088:8080"
      - "8082:8081"
    volumes:
      - ./data:/app/data
```
`8088`、`8082`分别为api-docs和mock-server的端口，更改这两个值即可。


### 调式API
启动后，如果访问[http://localhost:8082](http://localhost:8082)没有正常出现API文档，可以进入容器，运行下面手动生成API 文档命令查看错误日志：

```sh
$ docker ps
CONTAINER ID        IMAGE                     COMMAND                  CREATED             STATUS              PORTS                                            NAMES
3d13adb457f3        dojorestfulapiraml_raml   "/usr/bin/supervisord"   3 weeks ago         Up 6 seconds        0.0.0.0:8088->8080/tcp, 0.0.0.0:8082->8081/tcp   dojorestfulapiraml_raml_1

$ docker exec -it 3d13adb457f3 sh
$ npm run docs-generator
```
