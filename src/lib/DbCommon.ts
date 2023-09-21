
import { Client } from "pg";
//import Common from './Common';
//
const DbCommon = {
    /**
     *
     * @param
     *
     * @return
     */   
    getClient: async function (env: any): Promise<any>
    {
        try{
//            let ret = {};
            const client = new Client({
                user: env.DB_USERNAME,
                password: env.DB_PASSWORD,
                host: env.DB_HOST,
                port: env.DB_PORT,
                database: env.DB_NAME
            })
            await client.connect();            
            return client;
        } catch (e) {
            console.error(e);
            throw new Error('Error , getClient');
        }    
    },
   
}
export default DbCommon;
