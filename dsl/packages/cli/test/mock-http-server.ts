import Koa from 'koa';
import compose from 'koa-compose';

import raw from 'raw-body';

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

async function listSimpleRecord(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (ctx.path === '/api/listsamplerecords/simplerecord') {
		if (ctx.header['x-fail-invalid-data'] === 'true') {
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = JSON.stringify([
				{
					a: '123',
					b: '1',
					c: 'Sample Name',
				},
			]);
			return;
		}
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = JSON.stringify([
			{
				key: '123',
				version: '1',
				value: 'Sample Name',
			},
		]);
	} else {
		await next();
	}
}

async function listSimpleRecordWithError(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	{
		if (ctx.path.startsWith('/api/listsamplerecords/simplerecordwitherror')) {
			ctx.status = 400;
			ctx.type = 'text/plain';
			ctx.body = 'My error';
			return;
		} else {
			await next();
		}
	}
}

async function simpleBooleanPathParam(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (ctx.path.startsWith('/api/pathparametertype/boolean/')) {
		const pathParam = ctx.path.substring('/api/pathparametertype/boolean/'.length);
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = pathParam === 'true' ? 'true' : 'false';
	} else {
		await next();
	}
}

async function simpleShortPathParam(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (ctx.path.startsWith('/api/pathparametertype/short/')) {
		const pathParam = ctx.path.substring('/api/pathparametertype/short/'.length);
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = pathParam;
	} else {
		await next();
	}
}

async function simpleIntPathParam(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (ctx.path.startsWith('/api/pathparametertype/int/')) {
		const pathParam = ctx.path.substring('/api/pathparametertype/int/'.length);
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = pathParam;
	} else {
		await next();
	}
}

async function simpleLongPathParam(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (ctx.path.startsWith('/api/pathparametertype/long/')) {
		const pathParam = ctx.path.substring('/api/pathparametertype/long/'.length);
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = pathParam;
	} else {
		await next();
	}
}

async function simpleFloatPathParam(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (ctx.path.startsWith('/api/pathparametertype/float/')) {
		const pathParam = ctx.path.substring('/api/pathparametertype/float/'.length);
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = pathParam;
	} else {
		await next();
	}
}

async function simpleDoublePathParam(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (ctx.path.startsWith('/api/pathparametertype/double/')) {
		const pathParam = ctx.path.substring('/api/pathparametertype/double/'.length);
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = pathParam;
	} else {
		await next();
	}
}

async function simpleStringPathParam(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (ctx.path.startsWith('/api/pathparametertype/string/')) {
		const pathParam = ctx.path.substring('/api/pathparametertype/string/'.length);
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = `"${decodeURIComponent(pathParam).replace(/"/g, '\\"')}"`;
	} else {
		await next();
	}
}

async function simpleLocalDatePathParam(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (ctx.path.startsWith('/api/pathparametertype/localdate/')) {
		const pathParam = ctx.path.substring('/api/pathparametertype/localdate/'.length);
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = `"${decodeURIComponent(pathParam)}"`;
	} else {
		await next();
	}
}

async function simpleLocalDateTimePathParam(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (ctx.path.startsWith('/api/pathparametertype/localdatetime/')) {
		const pathParam = ctx.path.substring('/api/pathparametertype/localdatetime/'.length);
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = `"${decodeURIComponent(pathParam)}"`;
	} else {
		await next();
	}
}

async function simpleZonedDateTimePathParam(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (ctx.path.startsWith('/api/pathparametertype/zoneddatetime/')) {
		const pathParam = ctx.path.substring('/api/pathparametertype/zoneddatetime/'.length);
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = `"${decodeURIComponent(pathParam)}"`;
	} else {
		await next();
	}
}

async function simpleScalarPathParam(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (ctx.path.startsWith('/api/pathparametertype/scalar/')) {
		const pathParam = ctx.path.substring('/api/pathparametertype/scalar/'.length);
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = `"${decodeURIComponent(pathParam)}"`;
	} else {
		await next();
	}
}

async function simpleEnumPathParam(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (ctx.path.startsWith('/api/pathparametertype/enum/')) {
		const pathParam = ctx.path.substring('/api/pathparametertype/enum/'.length);
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = `"${decodeURIComponent(pathParam)}"`;
	} else {
		await next();
	}
}

async function multiPathParam(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (ctx.path.startsWith('/api/pathparametertype/multipathparam/')) {
		const parts = ctx.path.substring('/api/pathparametertype/multipathparam/'.length).split('/');
		const valueA = decodeURIComponent(parts[0]);
		const valueB = decodeURIComponent(parts[1]);
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = `"${valueA}-${valueB}"`;
	} else {
		await next();
	}
}

const bodyParamPaths = [
	'/api/bodyparametertypes/simpleBooleanBodyParam',
	'/api/bodyparametertypes/simpleShortBodyParam',
	'/api/bodyparametertypes/simpleIntBodyParam',
	'/api/bodyparametertypes/simpleLongBodyParam',
	'/api/bodyparametertypes/simpleFloatBodyParam',
	'/api/bodyparametertypes/simpleDoubleBodyParam',
	'/api/bodyparametertypes/simpleStringBodyParam',
	'/api/bodyparametertypes/simpleLocalDateBodyParam',
	'/api/bodyparametertypes/simpleLocalDateTimeBodyParam',
	'/api/bodyparametertypes/simpleZonedDateTimeBodyParam',
	'/api/bodyparametertypes/simpleScalarBodyParam',
	'/api/bodyparametertypes/simpleEnumBodyParam',
	'/api/bodyparametertypes/simpleInlineEnumBodyParam',
	'/api/bodyparametertypes/multiBodyParam',
	'/api/bodyparametertypes/recordBodyParam',
];

async function bodyParam(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (bodyParamPaths.includes(ctx.path) && ctx.method === 'POST') {
		const str = await raw(ctx.req, { encoding: 'utf-8' });
		if (ctx.path === '/api/bodyparametertypes/multiBodyParam') {
			const body = JSON.parse(str) as { valueA: string; valueB: string };
			const response = `${body.valueA}-${body.valueB}`;
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = `"${response}"`;
			return;
		}

		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = str;
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
	listSimpleRecord,
	listSimpleRecordWithError,

	simpleBooleanPathParam,
	simpleShortPathParam,
	simpleIntPathParam,
	simpleLongPathParam,
	simpleFloatPathParam,
	simpleDoublePathParam,
	simpleStringPathParam,
	simpleLocalDatePathParam,
	simpleLocalDateTimePathParam,
	simpleZonedDateTimePathParam,
	simpleScalarPathParam,
	simpleEnumPathParam,
	multiPathParam,

	bodyParam,
]);
app.use(all);
app.listen(3000);
