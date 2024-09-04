import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { signinInput, signupInput } from "@abhishekshivgan/medium-common";

const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
}>();

userRouter.post("/signup", async (c) => {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);

    if (!success) {
        c.status(422);
        return c.json({
            msg: "Please ensure your username follows the format: xxx@x.x and your password is at least 6 characters long."
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const user = await prisma.user.create({
            data: {
                username: body.username,
                password: body.password,
                name: body.name
            }
        })

        const token = await sign({
            id: user.id
        }, c.env.JWT_SECRET)

        return c.json({
            token: token
        })

    } catch (e) {
        c.status(409)
        return c.json({
            msg: "This username already exist. Try a different username"
        })
    }
})

userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    console.log(body)
    const { success } = signinInput.safeParse(body);
    if (!success) {
        c.status(422);
        return c.json({
            msg: "Please ensure your username follows the format: xxx@x.x and your password is at least 6 characters long."
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const user = await prisma.user.findFirst({
            where: {
                username: body.username,
                password: body.password
            }
        })
        console.log("here1")

        if (!user) {
            c.status(401);
            return c.json({
                msg: "Username or Password is wrong"
            })
        }

        const token = await sign({
            id: user.id
        }, c.env.JWT_SECRET)

        return c.json({
            token: token
        })

    } catch (e) {
        return c.text("Something went wrong")
    }

})

userRouter.get("/me", async (c) => {
    const authHeader = c.req.header("authorization") || "";
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())


    try {
        const decoded = await verify(authHeader, c.env.JWT_SECRET);
        const userId = Number(decoded.id);
        const user = await prisma.user.findFirst({
            where: {
                id: userId
            }
        })

        if (user) {
            return c.json(user);
        } else {
            return c.json({
                msg: "user not found"
            }, 404);
        }
    } catch (err) {
        return c.json({
            msg: "user not found"
        }, 404);
    }
})

export default userRouter

// postgresql://neondb_owner:iMqylneS1rk9@ep-purple-glitter-a142n93u.ap-southeast-1.aws.neon.tech/medium?sslmode=require
// DATABASE_URL=""

// prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMDAxMmZlOGItMGI3NC00ZWNiLWFjMGUtMTg1YTJkNzM0OWNiIiwidGVuYW50X2lkIjoiY2Q2OThkM2QzM2M1OGJmNjdiODVhNjVlYjdkODhlMmUyNDE1NWZlOTk2MDEzNDRhZmEwZTM1OWM2YzMxYjM4NiIsImludGVybmFsX3NlY3JldCI6ImJjNmJhOGM2LWQwNjctNDVmYi04OTg1LTZmMzJiZjY4ZWIzOCJ9.nH_kyZIAu5lLqgMb7lKg3oqMOyVH9JTAjBFrP8rP9J0