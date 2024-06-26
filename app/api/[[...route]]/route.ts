import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { error } from 'console';

import authors from './authors'
import books from './books'

export const runtime = 'edge'

const app = new Hono().basePath('/api')


app.route('/authors', authors);
app.route('/books', books);


app
  .get(
    '/hello',
    clerkMiddleware(),
    (ctx) => {
      const auth = getAuth(ctx);

      if (!auth?.userId) {
        return ctx.json({
          message: 'You are not logged in.'
        })
      }

      return ctx.json({
        message: 'You are logged in!',
        userId: auth.userId
      })
    })
  .get(
    '/hello/:test',
    (c) => {
      const test = c.req.param('test');
      return c.json({
        message: 'Hello Next.js!',
        test
      })
    })
  .get(
    '/read/:postId',
    zValidator("param", z.object({ postId: z.string() })),
    (c) => {
      const { postId } = c.req.valid('param');

      return c.json({
        message: 'Hello Next.js!',
        postId
      })
    })
  .post(
    '/create/:postId',
    zValidator("param", z.object({ postId: z.number() })),
    (c) => {
      const { postId } = c.req.valid('param');

      return c.json({})
    });

export const GET = handle(app)
export const POST = handle(app)