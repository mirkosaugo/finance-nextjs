import { Hono } from 'hono'
import { handle } from 'hono/vercel'


import accounts from './accounts'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

// need to append every route to the exported routes const to generate RPC types
const routes = app.route('/accounts', accounts);




// app
//   .get(
//     '/hello',
//     clerkMiddleware(),
//     (ctx) => {
//       const auth = getAuth(ctx);

//       if (!auth?.userId) {
//         return ctx.json({
//           message: 'You are not logged in.'
//         })
//       }

//       return ctx.json({
//         message: 'You are logged in!',
//         userId: auth.userId
//       })
//     })
//   .get(
//     '/hello/:test',
//     (c) => {
//       const test = c.req.param('test');
//       return c.json({
//         message: 'Hello Next.js!',
//         test
//       })
//     })
//   .get(
//     '/read/:postId',
//     zValidator("param", z.object({ postId: z.string() })),
//     (c) => {
//       const { postId } = c.req.valid('param');

//       return c.json({
//         message: 'Hello Next.js!',
//         postId
//       })
//     })
//   .post(
//     '/create/:postId',
//     zValidator("param", z.object({ postId: z.number() })),
//     (c) => {
//       const { postId } = c.req.valid('param');

//       return c.json({})
//     });

export const GET = handle(app)
export const POST = handle(app)

// generate RPC Types:
// https://hono.dev/docs/guides/rpc
export type AppType = typeof routes;
