//
const router = {
    /**
     * create
     * @param
     *
     * @return
     */
    create: async function (client: any, req: any, res: any, env: any): Promise<Response>
    {
    console.log(req);
        const retObj = {ret: "NG", data: [], message: ''}
        try{
            let result = {};
            if (req) {
                const text = `
                INSERT INTO public."Task" (title, content, "userId", "createdAt", "updatedAt") 
                VALUES($1, $2, 0, current_timestamp, current_timestamp) RETURNING *
                `;      
                const values = [req.title, req.content ]
                const res = await client.query(text, values);
                result = res.rows[0];
            }            
            return Response.json({ret: "OK", data: result});
        } catch (e) {
            console.error(e);
            return Response.json(retObj);
        } 
    }, 
    /**
     *
     * @param
     *
     * @return
     */ 
    delete: async function (client: any, req: any, res: any, env: any): Promise<Response>
    {
    console.log(req);
        const retObj = {ret: "NG", data: [], message: ''}
        try{
            if (req) {
                const text = `
                DELETE FROM public."Task" WHERE id = ${req.id}
                `;
console.log(text);
                const res = await client.query(text);
            }
            return Response.json({ret: "OK", data: req});
        } catch (e) {
            console.error(e);
            return Response.json(retObj);
        } 
    },
    /**
     *
     * @param
     *
     * @return
     */ 
    update: async function (client: any, req: any, res: any, env: any): Promise<Response>
    {
    //    console.log("#test.update");
    console.log(req);
        const retObj = {ret: "NG", data: [], message: ''}
        try{
            if (req) {
                let result = {};
                const text = `
                UPDATE  public."Task" 
                SET title = $1, content=$2
                WHERE id =$3
                RETURNING *
                `;
                const values = [req.title, req.content, req.id ];
console.log(text);
                const res = await client.query(text, values);
                result = res.rows[0];
console.log(result);
            }                
            return Response.json({ret: "OK", data: req});
        } catch (e) {
            //client.end();
            console.error(e);
            return Response.json(retObj);
        } 
    },
    /**
     *
     * @param
     *
     * @return
     */
    get: async function (client: any, req: any, res: any, env: any): Promise<Response>
    {
console.log(req);
        let item = {};
        let result: any = {}; 
        const retObj = {ret: "NG", data: [], message: ''}
        try{
            if (req) {
                const text = `
                SELECT * FROM public."Task" where id = ${req.id}
                `;
                result = await client.query(text);
console.log(result.rows.length)
                if(result.rows.length < 1) {
                    console.error("Error, results.length < 1");
                    throw new Error('Error , get');
                }
                item= result.rows[0];
            }      
            return Response.json({ret: "OK", data: item});
        } catch (e) {
            console.error(e);
            return Response.json(retObj);
        } 
    }, 
    /**
     *
     * @param
     *
     * @return
     */ 
    get_list: async function (client: any, req: any, res: any, env: any): Promise<Response>
    {
    //console.log(req);
        let result: any = [];
        const retObj = {ret: "NG", data: [], message: ''}
        try{
            if (req) {
                const text = `
                SELECT * FROM public."Task" ORDER BY id DESC LIMIT 100
                `;
                result = await client.query(text);            
                //console.log(resulte);
                if(result.rows.length< 1) {
                    console.error("Error, results.length < 1");
                    throw new Error('Error , get');
                }              
            }           
            return Response.json({ret: "OK", data: result.rows});
        } catch (e) {
        console.error(e);
        return Response.json(retObj);
        } 
    },   
    /**
     *
     * @param
     *
     * @return
     */ 
    search: async function (client: any, req: any, res: any, env: any): Promise<Response>
    {
    console.log(req);
        let resulte: any = [];
        const retObj = {ret: "NG", data: [], message: ''}
        try{
        let result: any = {};  
        if (req) {
            const sql = `
            SELECT * FROM todos
            WHERE userId = ${req.userId}
            AND title like '%${req.seachKey}%'
            ORDER BY id DESC
            LIMIT 1000
            `;  
    //console.log(sql);
            resulte = await env.DB.prepare(sql).all();
            //console.log(resulte);
            if(resulte.length < 1) {
            console.error("Error, results.length < 1");
            throw new Error('Error , get');
            }              
        }           
        return Response.json({ret: "OK", data: resulte.results});
        } catch (e) {
        console.error(e);
        return Response.json(retObj);
        } 
    },  
}
export default router;
