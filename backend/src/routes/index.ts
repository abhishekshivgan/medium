import { Hono } from "hono";
import userRouter from "./user";
import blogRoute from "./blog";

const mainRouter = new Hono();

mainRouter.route('/user', userRouter)
mainRouter.route('/blog', blogRoute)

export default mainRouter;