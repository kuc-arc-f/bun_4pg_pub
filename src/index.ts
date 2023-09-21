import Router from './Router';
import Common from './lib/Common';
import DbCommon from './lib/DbCommon';

export interface Env {
}

export default {
    async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
    ): Promise<Response> {
        const { pathname } = new URL(request.url);
        const url = new URL(request.url);
        const errorObj = {ret: "NG", messase: "Error"};
        if (url.pathname === "/favicon.ico")
            return new Response(null, { status: 404 });
        //
        if (request.method === "POST") {
            const client = await DbCommon.getClient(env);
            const json: any = JSON.stringify(await request.json());
            const reqObj: any = JSON.parse(json);
            const validApiKey = await Common.validApiKey(env, reqObj);
        //console.log(validApiKey);
            if(!validApiKey) {
                errorObj.messase = "Error, Common.validApiKey=false";
                console.log("Error, Common.validApiKey=false");
                return Response.json(errorObj);
            } 
        console.log(reqObj);
            const contentType = request.headers.get("content-type");
            if(contentType !== "application/json") {
                console.log("contentType=", contentType);
                return Response.json({ret: "NG", messase: "Error, contentType <> application/json"});
            }	
        console.log("pathname=", pathname);
            //Router
            const res = await Router.route(pathname, client, reqObj, Response, env);
            ctx.waitUntil(client.end());            
            return res;     
        }
        return Response.json([]); 
    },
};