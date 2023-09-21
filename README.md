# bun_4pg_pub

 Version: 0.9.2

 Author  : Kouji Nakashima / kuc-arc-f.com

 date    : 2023/09/21

 update  :

***
### Summary

cloudflare workers + bun + postgres,  sample

***
### wrangler.toml, setting

* db setting, sample

```
name = "name1"
main = "src/index.ts"
compatibility_date = "2023-09-01"
node_compat = true

[vars]
API_KEY = "123"
DB_NAME = ""
DB_USERNAME = "postgres"
DB_HOST = ""
DB_PORT = "5432"
DB_PASSWORD = ""

```
***
### blog 

* install 
```
bun install
```
***
* dev-start
```
bun run start
```
***
### deploy

```
bunx wrangler login
bun run deploy
```
***

