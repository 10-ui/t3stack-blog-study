import { z } from "zod";
import { db } from "~/server/db";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAllBlogs: publicProcedure.query(() => {
    return db.post.findMany();
  }),
  postBlog: publicProcedure
    .input(z.object({ title: z.string(), description: z.string() }))
    .mutation((req) => {
      const postBlog = db.post.create({
        data: {
          title: req.input.title,
          description: req.input.description,
        },
      });
      return postBlog;
    }),
  getDetailBlog: publicProcedure
    .input(z.object({ id: z.number() }))
    .query((req) => {
      return db.post.findUnique({
        where: {
          id: req.input.id,
        },
      });
    }),
  deleteBlog: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation((req) => {
      return db.post.delete({
        where: {
          id: req.input.id,
        },
      });
    }),
});
