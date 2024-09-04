import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@abhishekshivgan/medium-common";

const blogRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: any
    }
}>();

blogRoute.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const blogs = await prisma.blog.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                },
                publishedDate: true
            }
        });
        return c.json({
            blogs: blogs
        })
    } catch (e) {
        c.status(411);
        return c.json({
            msg: "Something went wrong"
        })
    }
})

blogRoute.get('/:id', async (c) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    console.log(id);
    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                publishedDate: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json({
            blog: blog
        })
    } catch (e) {
        c.status(403);
        console.log(e)
        return c.json({
            msg: "Something went wrong"
        })
    }
})

blogRoute.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            c.set("userId", user.id);
            await next();
        } else {
            return c.json({
                msg: "You are not logged in"
            })
        }
    } catch (e) {
        return c.json({
            msg: "Auth verification failed"
        })
    }
    
})

blogRoute.post("/", async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            msg: "Blog inputs are incorrect"
        })
    }
    const authorId = await c.get("userId");
    try {
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: Number(authorId),
                publishedDate: new Date()
            }
        })

        return c.json({
            id: blog.id
        })
    } catch (e) {
        c.status(411);
        return c.json({
            msg: "something went wrong"
        })
    }
})

blogRoute.put('/', async (c) => {
    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            msg: "Update blog inputs are incorrect"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const authorId = await c.get("userId");
    
    try {
        await prisma.blog.update({
            where: {
                id: Number(body.id),
                authorId
            }, data: {
                title: body.title,
                content: body.content
            }
        })

        return c.json({
            msg: "blog post updated"
        })
    } catch (e) {
        c.status(411);
        return c.json({
            msg: "Something went wrong"
        })
    }

})




export default blogRoute