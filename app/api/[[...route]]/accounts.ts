import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from '@hono/zod-validator';
import { and, eq, inArray } from "drizzle-orm";
import { Hono } from 'hono'
import { z } from "zod";

import { db } from '@/db/drizzle';
import { accounts, insertAccountSchema } from '@/db/schema';




// need to append every get/post/put/delete to the exported app const to generate RPC types
const app = new Hono()
  .get('/', clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: 'Unauthorized' }, 401);
      // throw new HTTPException(401, {
      //   res: c.json({ error: 'Unauthorized' }, 401),
      // });
    }

    const data = await db.select({
      id: accounts.id,
      name: accounts.name,
    }).from(accounts).where(eq(accounts.userId, auth.userId));

    return c.json({ data });
  })
  .post('/',
    clerkMiddleware(),
    zValidator("json", insertAccountSchema.pick({ name: true })),
    async (c) => {
      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const values = c.req.valid('json');

      // destructuring the values return the first row in the array (the inserted row)
      const [data] = await db.insert(accounts).values({
        userId: auth.userId,
        ...values,
      }).returning();

      return c.json({ data });
    })
  .post('/delete',
    clerkMiddleware(),
    zValidator("json", z.object({ ids: z.array(z.string()) })),
    async (c) => {
      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const values = c.req.valid('json');

      const data = await db.delete(accounts).where(
        and(
          eq(accounts.userId, auth.userId),
          inArray(accounts.id, values.ids),
        ),
      ).returning({
        id: accounts.id
      });

      return c.json({ data });
    })


export default app




