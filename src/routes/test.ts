import LibCrypto from '../lib/LibCrypto';
//
const router = {
    /**
     * test2
     * @param
     *
     * @return
     */
    test1: async function (req: any, res: any, env: any): Promise<Response>
    {
        console.log("#test.test1");
        const retObj = {ret: "NG", data: [], message: ''}
        try{
            const hashed_password = LibCrypto.encode("1111");
console.log("hashed_password=", hashed_password);
            const decryptPassword = LibCrypto.decode(hashed_password);
console.log("decryptPassword=", decryptPassword);
            return Response.json({
                ret: "OK", 
                data: {hashed_password: hashed_password, decryptPassword: decryptPassword},
            });
        } catch (e) {
            console.error(e);
            return Response.json(retObj);
        } 
    },
}
export default router;
