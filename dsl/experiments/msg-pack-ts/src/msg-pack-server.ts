import { decode } from '@msgpack/msgpack';
import Koa from 'koa';
import compose from 'koa-compose';

async function handle(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	console.log(`Received ${ctx.method} request for ${ctx.url}`);
	if (ctx.path === '/msgpack' && ctx.method === 'POST') {
		const chunks: Uint8Array[] = [];
		for await (const chunk of ctx.req) {
			chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
		}
		const body = Buffer.concat(chunks);
		console.log(decode(body));
		// Echo back the received MsgPack data
		ctx.status = 200;
		ctx.type = 'application/msgpack';
		ctx.body = body;
		return;
	}
	return;
}

const app = new Koa();
const all = compose([handle]);

app.use(all);

app.listen(3001, () => {
	console.log('Server running on http://localhost:3001');
});
