import testRouter from './routes/test';
import taskRouter from './routes/task';
import userRouter from './routes/user';
/*
import todoRouter from './routes/todo';
import sessionRouter from './routes/session';
import repoNameRouter from './routes/RepoName';
import repoCountRouter from './routes/RepoCount';
import planRouter from './routes/plan';
import erChartRouter from './routes/ErChart';
import taskItemRouter from './routes/TaskItem';
import projectRouter from './routes/Project';

*/
//
const Router = {
  /**
  * route
  * @param
  *
  * @return
  */  
  route: async function (pathname: string, client: any, req: any, res: any, env: any): Promise<Response>
  {
    let response: Response = Response.json({ret: "NG", data: req, messase: "Error, Router"});
    //test
    if (pathname === "/test/test1") {
      response = await testRouter.test1(client, req, res, env);  
    }
    //todo
    if (pathname === "/tasks/create") {
      response = await taskRouter.create(client, req, res, env);  
    }
    if (pathname === "/tasks/delete") {
      response = await taskRouter.delete(client, req, res, env);  
    }
    if (pathname === "/tasks/update") {
      response = await taskRouter.update(client, req, res, env);  
    }
    if (pathname === "/tasks/get") {
      response = await taskRouter.get(client, req, res, env);  
    }
    if (pathname === "/tasks/get_list") {
      response = await taskRouter.get_list(client, req, res, env);  
    }
    //user
    if (pathname === "/users/create") {
      response = await userRouter.create(client, req, res, env);  
    }
    if (pathname === "/users/get") {
      response = await userRouter.get(client, req, res, env);  
    }    
    //@ts-ignore
    return response;
  },
}
export default Router;
