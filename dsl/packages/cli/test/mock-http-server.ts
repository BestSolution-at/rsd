import Koa from 'koa';
import compose from 'koa-compose';

async function getBoolean(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if ('/api/samplerecords/boolean' == ctx.path) {
		if (ctx.header['x-fail-unknown-status'] === 'true') {
			ctx.status = 400;
			ctx.type = 'text/plain';
			ctx.body = 'Sample Invalid response';
			return;
		}

		if (ctx.header['x-fail-network-error'] === 'true') {
			// Simulate network error by closing the connection prematurely
			ctx.res.destroy();
			return;
		}

		if (ctx.header['x-fail-invalid-data'] === 'true') {
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = '123';
			return;
		}

		if (ctx.header['x-fail-invalid-json'] === 'true') {
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = 'This is not JSON';
			return;
		}
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = 'true';
	} else {
		await next();
	}
}

async function getShort(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if ('/api/samplerecords/short' == ctx.path) {
		if (ctx.header['x-fail-invalid-data'] === 'true') {
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = 'true';
			return;
		}
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = '123';
	} else {
		await next();
	}
}

async function getInt(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if ('/api/samplerecords/int' == ctx.path) {
		if (ctx.header['x-fail-invalid-data'] === 'true') {
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = 'true';
			return;
		}
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = '123456';
	} else {
		await next();
	}
}

async function getLong(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if ('/api/samplerecords/long' == ctx.path) {
		if (ctx.header['x-fail-invalid-data'] === 'true') {
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = 'true';
			return;
		}
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = '1234567890123';
	} else {
		await next();
	}
}

async function getFloat(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if ('/api/samplerecords/float' == ctx.path) {
		if (ctx.header['x-fail-invalid-data'] === 'true') {
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = 'true';
			return;
		}
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = '123.45';
	} else {
		await next();
	}
}

async function getDouble(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if ('/api/samplerecords/double' == ctx.path) {
		if (ctx.header['x-fail-invalid-data'] === 'true') {
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = 'true';
			return;
		}
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = '123.456789';
	} else {
		await next();
	}
}

async function getString(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if ('/api/samplerecords/string' == ctx.path) {
		if (ctx.header['x-fail-invalid-data'] === 'true') {
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = 'true';
			return;
		}
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = '"sample string"';
	} else {
		await next();
	}
}

async function getLocalDate(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if ('/api/samplerecords/localdate' == ctx.path) {
		if (ctx.header['x-fail-invalid-data'] === 'true') {
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = 'true';
			return;
		}
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = '"2020-01-01"';
	} else {
		await next();
	}
}

async function getLocalDateTime(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if ('/api/samplerecords/localdatetime' == ctx.path) {
		if (ctx.header['x-fail-invalid-data'] === 'true') {
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = 'true';
			return;
		}
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = '"2020-01-01T10:00:00"';
	} else {
		await next();
	}
}

async function getZonedDateTime(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if ('/api/samplerecords/zoneddatetime' == ctx.path) {
		if (ctx.header['x-fail-invalid-data'] === 'true') {
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = 'true';
			return;
		}
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = '"2025-01-01T10:00:00Z"';
	} else {
		await next();
	}
}

async function getScalar(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if ('/api/samplerecords/scalar' == ctx.path) {
		if (ctx.header['x-fail-invalid-data'] === 'true') {
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = 'true';
			return;
		}
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = '"Europe/Vienna"';
	} else {
		await next();
	}
}

async function getEnum(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if ('/api/samplerecords/enum' == ctx.path) {
		if (ctx.header['x-fail-invalid-data'] === 'true') {
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = 'true';
			return;
		}
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = '"A"';
	} else {
		await next();
	}
}

async function voidOperation(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if ('/api/samplerecords/voidoperation' == ctx.path) {
		ctx.status = 204;
	} else {
		await next();
	}
}

const app = new Koa();

const all = compose([
	getBoolean,
	getShort,
	getInt,
	getLong,
	getFloat,
	getDouble,
	getString,
	getLocalDate,
	getLocalDateTime,
	getZonedDateTime,
	getScalar,
	getEnum,
	voidOperation,
]);
app.use(all);
app.listen(3000);
