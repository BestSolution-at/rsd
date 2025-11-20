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

async function errorOperation(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if ('/api/samplerecords/erroroperation' == ctx.path) {
		ctx.status = 400;
		ctx.type = 'application/json';
		ctx.body = 'My error';
	} else {
		await next();
	}
}

async function multiErrorOperation(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if ('/api/samplerecords/multierroroperation' == ctx.path) {
		if (ctx.header['x-with-status-401'] === 'true') {
			ctx.status = 401;
		} else {
			ctx.status = 400;
		}

		ctx.type = 'text/plain';
		ctx.body = 'My multi error';
	} else {
		await next();
	}
}

async function getSimpleRecord(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (ctx.path.startsWith('/api/samplerecords/simplerecord/')) {
		if (ctx.header['x-fail-invalid-data'] === 'true') {
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = JSON.stringify({
				a: '123',
				b: '1',
				c: 'Sample Name',
			});
			return;
		}
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = JSON.stringify({
			key: '123',
			version: '1',
			value: 'Sample Name',
		});
	} else {
		await next();
	}
}

async function getSimpleRecordWithError(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (ctx.path.startsWith('/api/samplerecords/simplerecordwitherror/')) {
		ctx.status = 400;
		ctx.type = 'text/plain';
		ctx.body = 'My error';
		return;
	} else {
		await next();
	}
}

async function listBoolean(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if ('/api/listsamplerecords/boolean' == ctx.path) {
		if (ctx.header['x-fail-invalid-data'] === 'true') {
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = JSON.stringify(['a', 'b', 1]);
			return;
		}
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = JSON.stringify([true, false, true]);
	} else {
		await next();
	}
}

async function listShort(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if ('/api/listsamplerecords/short' == ctx.path) {
		if (ctx.header['x-fail-invalid-data'] === 'true') {
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = JSON.stringify(['a', 'b', true]);
			return;
		}
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = JSON.stringify([123, 456, 789]);
	} else {
		await next();
	}
}

async function listInt(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if ('/api/listsamplerecords/int' == ctx.path) {
		if (ctx.header['x-fail-invalid-data'] === 'true') {
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = JSON.stringify(['a', 'b', true]);
			return;
		}
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = JSON.stringify([123456, 789012, 345678]);
	} else {
		await next();
	}
}

async function listLong(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if ('/api/listsamplerecords/long' == ctx.path) {
		if (ctx.header['x-fail-invalid-data'] === 'true') {
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = JSON.stringify(['a', 'b', true]);
			return;
		}
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = JSON.stringify([1234567890123, 2345678901234, 3456789012345]);
	} else {
		await next();
	}
}

async function listFloat(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if ('/api/listsamplerecords/float' == ctx.path) {
		if (ctx.header['x-fail-invalid-data'] === 'true') {
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = JSON.stringify(['a', 'b', true]);
			return;
		}
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = JSON.stringify([12.34, 56.78, 90.12]);
	} else {
		await next();
	}
}

async function listDouble(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if ('/api/listsamplerecords/double' == ctx.path) {
		if (ctx.header['x-fail-invalid-data'] === 'true') {
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = JSON.stringify(['a', 'b', true]);
			return;
		}
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = JSON.stringify([12.3456789, 98.7654321, 54.3210987]);
	} else {
		await next();
	}
}

async function listString(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if ('/api/listsamplerecords/string' == ctx.path) {
		if (ctx.header['x-fail-invalid-data'] === 'true') {
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = JSON.stringify([123, true, 45.6]);
			return;
		}
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = JSON.stringify(['first', 'second', 'third']);
	} else {
		await next();
	}
}

async function listLocalDate(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if ('/api/listsamplerecords/localdate' == ctx.path) {
		if (ctx.header['x-fail-invalid-data'] === 'true') {
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = JSON.stringify([123, true, 45.6]);
			return;
		}
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = JSON.stringify(['2020-01-01', '2021-02-02', '2022-03-03']);
	} else {
		await next();
	}
}

async function listLocalDateTime(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if ('/api/listsamplerecords/localdatetime' == ctx.path) {
		if (ctx.header['x-fail-invalid-data'] === 'true') {
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = JSON.stringify([123, true, 45.6]);
			return;
		}
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = JSON.stringify(['2020-01-01T10:00:00', '2021-02-02T11:30:00', '2022-03-03T12:45:00']);
	} else {
		await next();
	}
}

async function listZonedDateTime(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if ('/api/listsamplerecords/zoneddatetime' == ctx.path) {
		if (ctx.header['x-fail-invalid-data'] === 'true') {
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = JSON.stringify([123, true, 45.6]);
			return;
		}
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = JSON.stringify(['2020-01-01T10:00:00Z', '2021-02-02T11:30:00Z', '2022-03-03T12:45:00Z']);
	} else {
		await next();
	}
}

async function listScalar(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if ('/api/listsamplerecords/scalar' == ctx.path) {
		if (ctx.header['x-fail-invalid-data'] === 'true') {
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = JSON.stringify([123, true, 45.6]);
			return;
		}
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = JSON.stringify(['Europe/Vienna', 'America/New_York', 'Asia/Tokyo']);
	} else {
		await next();
	}
}

async function listEnum(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if ('/api/listsamplerecords/enum' == ctx.path) {
		if (ctx.header['x-fail-invalid-data'] === 'true') {
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = JSON.stringify([123, true, 45.6]);
			return;
		}
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = JSON.stringify(['A', 'B']);
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
	errorOperation,
	multiErrorOperation,
	getSimpleRecord,
	getSimpleRecordWithError,

	listBoolean,
	listShort,
	listInt,
	listLong,
	listFloat,
	listDouble,
	listString,
	listLocalDate,
	listLocalDateTime,
	listZonedDateTime,
	listScalar,
	listEnum,
]);
app.use(all);
app.listen(3000);
