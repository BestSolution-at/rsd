import Koa from 'koa';
import compose from 'koa-compose';

import raw from 'raw-body';
import busboy from 'busboy';

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
	'/api/bodyparametertypes/unionBodyParam',
];

async function bodyParam(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (bodyParamPaths.includes(ctx.path) && ctx.method === 'POST') {
		const str = await raw(ctx.req, { encoding: 'utf-8' });
		if (ctx.path === '/api/bodyparametertypes/multiBodyParam') {
			const body = JSON.parse(str) as { valueA: string; valueB: string; valueC: Record<string, string> };
			const response = `${body.valueA}-${body.valueB}-${body.valueC.key}`;
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

const bodyParamNilPaths = [
	'/api/bodyparametertypes/simpleBooleanBodyParamNil',
	'/api/bodyparametertypes/simpleBooleanBodyParamOpt',
	'/api/bodyparametertypes/simpleBooleanBodyParamOptNil',

	'/api/bodyparametertypes/simpleShortBodyParamNil',
	'/api/bodyparametertypes/simpleShortBodyParamOpt',
	'/api/bodyparametertypes/simpleShortBodyParamOptNil',

	'/api/bodyparametertypes/simpleIntBodyParamNil',
	'/api/bodyparametertypes/simpleIntBodyParamOpt',
	'/api/bodyparametertypes/simpleIntBodyParamOptNil',

	'/api/bodyparametertypes/simpleLongBodyParamNil',
	'/api/bodyparametertypes/simpleLongBodyParamOpt',
	'/api/bodyparametertypes/simpleLongBodyParamOptNil',

	'/api/bodyparametertypes/simpleFloatBodyParamNil',
	'/api/bodyparametertypes/simpleFloatBodyParamOpt',
	'/api/bodyparametertypes/simpleFloatBodyParamOptNil',

	'/api/bodyparametertypes/simpleDoubleBodyParamNil',
	'/api/bodyparametertypes/simpleDoubleBodyParamOpt',
	'/api/bodyparametertypes/simpleDoubleBodyParamOptNil',

	'/api/bodyparametertypes/simpleStringBodyParamNil',
	'/api/bodyparametertypes/simpleStringBodyParamOpt',
	'/api/bodyparametertypes/simpleStringBodyParamOptNil',

	'/api/bodyparametertypes/simpleLocalDateBodyParamNil',
	'/api/bodyparametertypes/simpleLocalDateBodyParamOpt',
	'/api/bodyparametertypes/simpleLocalDateBodyParamOptNil',

	'/api/bodyparametertypes/simpleLocalDateTimeBodyParamNil',
	'/api/bodyparametertypes/simpleLocalDateTimeBodyParamOpt',
	'/api/bodyparametertypes/simpleLocalDateTimeBodyParamOptNil',

	'/api/bodyparametertypes/simpleZonedDateTimeBodyParamNil',
	'/api/bodyparametertypes/simpleZonedDateTimeBodyParamOpt',
	'/api/bodyparametertypes/simpleZonedDateTimeBodyParamOptNil',

	'/api/bodyparametertypes/simpleScalarBodyParamNil',
	'/api/bodyparametertypes/simpleScalarBodyParamOpt',
	'/api/bodyparametertypes/simpleScalarBodyParamOptNil',

	'/api/bodyparametertypes/simpleEnumBodyParamNil',
	'/api/bodyparametertypes/simpleEnumBodyParamOpt',
	'/api/bodyparametertypes/simpleEnumBodyParamOptNil',

	'/api/bodyparametertypes/simpleInlineEnumBodyParamNil',
	'/api/bodyparametertypes/simpleInlineEnumBodyParamOpt',
	'/api/bodyparametertypes/simpleInlineEnumBodyParamOptNil',

	'/api/bodyparametertypes/multiBodyParamNil',
	'/api/bodyparametertypes/multiBodyParamOpt',
	'/api/bodyparametertypes/multiBodyParamOptNil',

	'/api/bodyparametertypes/recordBodyParamNil',
	'/api/bodyparametertypes/recordBodyParamOpt',
	'/api/bodyparametertypes/recordBodyParamOptNil',

	'/api/bodyparametertypes/unionBodyParamNil',
	'/api/bodyparametertypes/unionBodyParamOpt',
	'/api/bodyparametertypes/unionBodyParamOptNil',
];

async function bodyParamNil(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (bodyParamNilPaths.includes(ctx.path) && ctx.method === 'POST') {
		const str = await raw(ctx.req, { encoding: 'utf-8' });
		if (
			ctx.path === '/api/bodyparametertypes/multiBodyParamNil' ||
			ctx.path === '/api/bodyparametertypes/multiBodyParamOpt' ||
			ctx.path === '/api/bodyparametertypes/multiBodyParamOptNil'
		) {
			const body = JSON.parse(str) as Record<string, string>;
			const response = `${body.valueA}-${body.valueB}-${body.valueC}`;
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = `"${response}"`;
			return;
		}

		ctx.status = 200;
		ctx.type = 'application/json';
		if (str === 'null') {
			ctx.body = '"NULL"';
		} else if (str === '') {
			ctx.body = '"UNDEFINED"';
		} else {
			ctx.body = str;
		}
	} else {
		await next();
	}
}

async function bodyPatchParam(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (ctx.path === '/api/bodyparametertypes/patchableRecordBodyParam' && ctx.method === 'PATCH') {
		const str = await raw(ctx.req, { encoding: 'utf-8' });
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = str;
	} else {
		await next();
	}
}

const listBodyParamPaths = [
	'/api/listbodyparametertypes/listBooleanBodyParam',
	'/api/listbodyparametertypes/listShortBodyParam',
	'/api/listbodyparametertypes/listIntBodyParam',
	'/api/listbodyparametertypes/listLongBodyParam',
	'/api/listbodyparametertypes/listFloatBodyParam',
	'/api/listbodyparametertypes/listDoubleBodyParam',
	'/api/listbodyparametertypes/listStringBodyParam',
	'/api/listbodyparametertypes/listLocalDateBodyParam',
	'/api/listbodyparametertypes/listLocalDateTimeBodyParam',
	'/api/listbodyparametertypes/listZonedDateTimeBodyParam',
	'/api/listbodyparametertypes/listScalarBodyParam',
	'/api/listbodyparametertypes/listEnumBodyParam',
	'/api/listbodyparametertypes/listInlineEnumBodyParam',
	'/api/listbodyparametertypes/listMultiBodyParam',
	'/api/listbodyparametertypes/listRecordBodyParam',
];

async function listBodyParam(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (listBodyParamPaths.includes(ctx.path) && ctx.method === 'PUT') {
		const str = await raw(ctx.req, { encoding: 'utf-8' });
		if (ctx.path === '/api/listbodyparametertypes/listMultiBodyParam') {
			const body = JSON.parse(str) as { valueA: string[]; valueB: number[]; valueC: Record<string, string>[] };
			const response = `${body.valueA.join(',')}-${body.valueB.join(',')}-${body.valueC.map(r => r.key).join(',')}`;
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

const headerParamPaths = [
	'/api/headerparametertypes/simpleBooleanHeaderParam',

	'/api/headerparametertypes/simpleShortHeaderParam',
	'/api/headerparametertypes/simpleIntHeaderParam',
	'/api/headerparametertypes/simpleLongHeaderParam',
	'/api/headerparametertypes/simpleFloatHeaderParam',
	'/api/headerparametertypes/simpleDoubleHeaderParam',
	'/api/headerparametertypes/recordHeaderParam',

	'/api/headerparametertypes/simpleStringHeaderParam',
	'/api/headerparametertypes/simpleLocalDateHeaderParam',
	'/api/headerparametertypes/simpleLocalDateTimeHeaderParam',
	'/api/headerparametertypes/simpleZonedDateTimeHeaderParam',
	'/api/headerparametertypes/simpleScalarHeaderParam',
	'/api/headerparametertypes/simpleEnumHeaderParam',
];

const stringHeaderParamPaths = [
	'/api/headerparametertypes/simpleStringHeaderParam',
	'/api/headerparametertypes/simpleLocalDateHeaderParam',
	'/api/headerparametertypes/simpleLocalDateTimeHeaderParam',
	'/api/headerparametertypes/simpleZonedDateTimeHeaderParam',
	'/api/headerparametertypes/simpleScalarHeaderParam',
	'/api/headerparametertypes/simpleEnumHeaderParam',
];

async function headerParam(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (headerParamPaths.includes(ctx.path) && ctx.method === 'GET') {
		const headerValue = ctx.header.headervalue;
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = stringHeaderParamPaths.includes(ctx.path) ? `"${String(headerValue)}"` : headerValue;
	} else {
		await next();
	}
}

async function multiHeaderParam(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (ctx.path === '/api/headerparametertypes/multiHeaderParam' && ctx.method === 'GET') {
		const headerValueA = ctx.header.valuea;
		const headerValueB = ctx.header.valueb;
		const response = `${String(headerValueA)}-${String(headerValueB)}`;
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = `"${response}"`;
	} else {
		await next();
	}
}

const listHeaderParamPaths = [
	'/api/listheaderparametertypes/listBooleanHeaderParam',
	'/api/listheaderparametertypes/listShortHeaderParam',
	'/api/listheaderparametertypes/listIntHeaderParam',
	'/api/listheaderparametertypes/listLongHeaderParam',
	'/api/listheaderparametertypes/listFloatHeaderParam',
	'/api/listheaderparametertypes/listDoubleHeaderParam',
	'/api/listheaderparametertypes/listStringHeaderParam',
	'/api/listheaderparametertypes/listLocalDateHeaderParam',
	'/api/listheaderparametertypes/listLocalDateTimeHeaderParam',
	'/api/listheaderparametertypes/listZonedDateTimeHeaderParam',
	'/api/listheaderparametertypes/listScalarHeaderParam',
	'/api/listheaderparametertypes/listEnumHeaderParam',
	'/api/listheaderparametertypes/listInlineEnumHeaderParam',
	'/api/listheaderparametertypes/listMultiHeaderParam',
	'/api/listheaderparametertypes/listRecordHeaderParam',
];

const numListHeaderParamPaths = [
	'/api/listheaderparametertypes/listShortHeaderParam',
	'/api/listheaderparametertypes/listIntHeaderParam',
	'/api/listheaderparametertypes/listLongHeaderParam',
	'/api/listheaderparametertypes/listFloatHeaderParam',
	'/api/listheaderparametertypes/listDoubleHeaderParam',
];

async function listHeaderParam(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (listHeaderParamPaths.includes(ctx.path) && ctx.method === 'GET') {
		ctx.status = 200;
		ctx.type = 'application/json';
		if (ctx.path === '/api/listheaderparametertypes/listMultiHeaderParam') {
			const valueA = String(ctx.header.valuea);
			const valueB = String(ctx.header.valueb);
			const valueC = String(ctx.header.valuec);
			const values = [
				valueA.replaceAll(', ', ','),
				valueB.replaceAll(', ', ','),
				(JSON.parse(`[${valueC}]`) as Record<string, unknown>[]).map(v => v.key).join(','),
			];
			const response = values.join('-');
			ctx.body = JSON.stringify(response);
			return;
		}

		const headerValue = String(ctx.header.headervalue);
		if (ctx.path === '/api/listheaderparametertypes/listRecordHeaderParam') {
			ctx.body = `[${headerValue}]`;
			return;
		} else if (ctx.path === '/api/listheaderparametertypes/listBooleanHeaderParam') {
			ctx.body = `[${headerValue}]`;
			console.log('Boolean Header Param Response:', ctx.body);
		} else if (numListHeaderParamPaths.includes(ctx.path)) {
			ctx.body = `[${headerValue}]`;
		} else {
			ctx.body = JSON.stringify(headerValue.split(', '));
		}
	} else {
		await next();
	}
}

const queryParamPaths = [
	'/api/queryparametertypes/simpleBooleanQueryParam',
	'/api/queryparametertypes/simpleBooleanQueryParamOpt',

	'/api/queryparametertypes/simpleShortQueryParam',
	'/api/queryparametertypes/simpleShortQueryParamOpt',
	'/api/queryparametertypes/simpleIntQueryParam',
	'/api/queryparametertypes/simpleIntQueryParamOpt',
	'/api/queryparametertypes/simpleLongQueryParam',
	'/api/queryparametertypes/simpleLongQueryParamOpt',
	'/api/queryparametertypes/simpleFloatQueryParam',
	'/api/queryparametertypes/simpleFloatQueryParamOpt',
	'/api/queryparametertypes/simpleDoubleQueryParam',
	'/api/queryparametertypes/simpleDoubleQueryParamOpt',
	'/api/queryparametertypes/recordQueryParam',
	'/api/queryparametertypes/recordQueryParamOpt',

	'/api/queryparametertypes/simpleStringQueryParam',
	'/api/queryparametertypes/simpleStringQueryParamOpt',
	'/api/queryparametertypes/simpleLocalDateQueryParam',
	'/api/queryparametertypes/simpleLocalDateQueryParamOpt',
	'/api/queryparametertypes/simpleLocalDateTimeQueryParam',
	'/api/queryparametertypes/simpleLocalDateTimeQueryParamOpt',
	'/api/queryparametertypes/simpleZonedDateTimeQueryParam',
	'/api/queryparametertypes/simpleZonedDateTimeQueryParamOpt',
	'/api/queryparametertypes/simpleScalarQueryParam',
	'/api/queryparametertypes/simpleScalarQueryParamOpt',
	'/api/queryparametertypes/simpleEnumQueryParam',
	'/api/queryparametertypes/simpleEnumQueryParamOpt',
];

const stringQueryParamPaths = [
	'/api/queryparametertypes/simpleStringQueryParam',
	'/api/queryparametertypes/simpleLocalDateQueryParam',
	'/api/queryparametertypes/simpleLocalDateTimeQueryParam',
	'/api/queryparametertypes/simpleZonedDateTimeQueryParam',
	'/api/queryparametertypes/simpleScalarQueryParam',
	'/api/queryparametertypes/simpleEnumQueryParam',
];

async function queryParam(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (queryParamPaths.includes(ctx.path) && ctx.method === 'GET') {
		const queryValue = ctx.query.queryValue;
		ctx.status = 200;
		ctx.type = 'application/json';
		if (queryValue === 'null') {
			ctx.body = '"NULL"';
		} else if (queryValue === undefined) {
			ctx.body = '"UNDEFINED"';
		} else {
			ctx.body = stringQueryParamPaths.includes(ctx.path) ? `"${String(queryValue)}"` : queryValue;
		}
	} else {
		await next();
	}
}

async function multiQueryParam(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (
		(ctx.path === '/api/queryparametertypes/multiQueryParam' ||
			ctx.path === '/api/queryparametertypes/multiQueryParamOpt') &&
		ctx.method === 'GET'
	) {
		const queryValueA = ctx.query.valueA;
		const queryValueB = ctx.query.valueB;
		const response = `${String(queryValueA)}-${String(queryValueB)}`;
		ctx.status = 200;
		ctx.type = 'application/json';
		ctx.body = `"${response}"`;
	} else {
		await next();
	}
}

const listQueryParamPaths = [
	'/api/listqueryparametertypes/listBooleanQueryParam',
	'/api/listqueryparametertypes/listShortQueryParam',
	'/api/listqueryparametertypes/listIntQueryParam',
	'/api/listqueryparametertypes/listLongQueryParam',
	'/api/listqueryparametertypes/listFloatQueryParam',
	'/api/listqueryparametertypes/listDoubleQueryParam',
	'/api/listqueryparametertypes/listStringQueryParam',
	'/api/listqueryparametertypes/listLocalDateQueryParam',
	'/api/listqueryparametertypes/listLocalDateTimeQueryParam',
	'/api/listqueryparametertypes/listZonedDateTimeQueryParam',
	'/api/listqueryparametertypes/listScalarQueryParam',
	'/api/listqueryparametertypes/listEnumQueryParam',
	'/api/listqueryparametertypes/listInlineEnumQueryParam',
	'/api/listqueryparametertypes/listMultiQueryParam',
	'/api/listqueryparametertypes/listRecordQueryParam',
];

const numListQueryParamPaths = [
	'/api/listqueryparametertypes/listShortQueryParam',
	'/api/listqueryparametertypes/listIntQueryParam',
	'/api/listqueryparametertypes/listLongQueryParam',
	'/api/listqueryparametertypes/listFloatQueryParam',
	'/api/listqueryparametertypes/listDoubleQueryParam',
];

async function listQueryParam(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (listQueryParamPaths.includes(ctx.path) && ctx.method === 'GET') {
		ctx.status = 200;
		ctx.type = 'application/json';
		if (ctx.path === '/api/listqueryparametertypes/listMultiQueryParam') {
			const valueA = ctx.query.valueA;
			const valueB = ctx.query.valueB;
			const valueC = ctx.query.valueC;
			const values = [
				(Array.isArray(valueA) ? valueA : [valueA]).join(','),
				(Array.isArray(valueB) ? valueB : [valueB]).join(','),
				(Array.isArray(valueC) ? valueC : [valueC])
					.filter(v => v !== undefined)
					.map(v => JSON.parse(v) as Record<string, unknown>)
					.map(v => v.key)
					.join(','),
			];
			const response = values.join('-');
			ctx.body = JSON.stringify(response);
			return;
		}

		const queryValue = ctx.query.queryValue;
		const values = Array.isArray(queryValue) ? queryValue : [queryValue];
		if (ctx.path === '/api/listqueryparametertypes/listRecordQueryParam') {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			const parsedValues = values.filter(v => v !== undefined).map(v => JSON.parse(v));
			ctx.body = JSON.stringify(parsedValues);
			return;
		} else if (ctx.path === '/api/listqueryparametertypes/listBooleanQueryParam') {
			const parsedValues: boolean[] = [];
			for (let i = 0; i < values.length; i++) {
				parsedValues[i] = values[i] === 'true';
			}
			ctx.body = JSON.stringify(parsedValues);
		} else if (numListQueryParamPaths.includes(ctx.path)) {
			const parsedValues: number[] = [];
			for (let i = 0; i < values.length; i++) {
				parsedValues[i] = Number(values[i]);
			}
			ctx.body = JSON.stringify(parsedValues);
		} else {
			ctx.body = JSON.stringify(values);
		}
	} else {
		await next();
	}
}

async function uploadFile(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (ctx.path === '/api/binarytypes/uploadFile' && ctx.method === 'POST') {
		const bb = busboy({ headers: ctx.req.headers });
		let finish: (value: void | PromiseLike<void>) => void;
		const wait = new Promise<void>(resolve => {
			finish = resolve;
		});
		bb.on('file', (name, file, info) => {
			const { filename, mimeType } = info;
			if (name === 'data' && filename === 'hello.txt' && mimeType === 'text/plain') {
				file.on('data', data => {
					ctx.body = String(data).length;
				});
			}
		}).on('close', () => {
			ctx.status = 201;
			ctx.type = 'application/json';
			finish();
		});
		ctx.req.pipe(bb);
		await wait;
	} else {
		await next();
	}
}

async function uploadBlob(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (ctx.path === '/api/binarytypes/uploadBlob' && ctx.method === 'POST') {
		const bb = busboy({ headers: ctx.req.headers });
		let finish: (value: void | PromiseLike<void>) => void;
		const wait = new Promise<void>(resolve => {
			finish = resolve;
		});
		bb.on('file', (name, file, info) => {
			const { filename, mimeType } = info;
			if (name === 'data' && filename === 'blob' && mimeType === 'text/plain') {
				file.on('data', data => {
					ctx.body = String(data).length;
				});
			}
		}).on('close', () => {
			ctx.status = 201;
			ctx.type = 'application/json';
			finish();
		});
		ctx.req.pipe(bb);
		await wait;
	} else {
		await next();
	}
}

async function downloadFile(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (ctx.path === '/api/binarytypes/downloadFile' && ctx.method === 'GET') {
		const fileContent = 'Hello, World!';
		ctx.status = 200;
		ctx.type = 'text/plain;charset=utf-8';
		ctx.set('Content-Disposition', 'attachment; filename="hello.txt"');
		ctx.body = fileContent;
	} else {
		await next();
	}
}

async function downloadBlob(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (ctx.path === '/api/binarytypes/downloadBlob' && ctx.method === 'GET') {
		const blobContent = 'Hello, Blob!';
		ctx.status = 200;
		ctx.type = 'text/plain;charset=utf-8';
		ctx.body = blobContent;
	} else {
		await next();
	}
}

async function uploadMixed(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (ctx.path === '/api/binarytypes/uploadMixed' && ctx.method === 'PUT') {
		const bb = busboy({ headers: ctx.req.headers });
		let finish: (value: void | PromiseLike<void>) => void;
		const wait = new Promise<void>(resolve => {
			finish = resolve;
		});
		let fieldCount = 0;
		bb.on('file', (name, file, info) => {
			const { filename, mimeType } = info;
			if (name === 'dataFile' && filename === 'hello.txt' && mimeType === 'text/plain') {
				file.on('data', () => {
					fieldCount += 1;
				});
			} else if (name === 'dataBlob' && filename === 'blob' && mimeType === 'text/plain') {
				file.on('data', () => {
					fieldCount += 1;
				});
			}
		});
		bb.on('field', (name, val) => {
			if (name === 'text') {
				if (val === '"Sample Text"') {
					fieldCount += 1;
				} else {
					console.error(`Unexpected text field value for ${name}: ${val}`);
				}
			} else if (name === 'number') {
				if (val === '42') {
					fieldCount += 1;
				} else {
					console.error(`Unexpected text field value for ${name}: ${val}`);
				}
			} else if (name === 'rec') {
				if (val === JSON.stringify({ key: '1', version: '1', value: 'Record1' })) {
					fieldCount += 1;
				} else {
					console.error(`Unexpected text field value for ${name}: ${val}`);
				}
			} else if (name === 'textList') {
				if (val === JSON.stringify(['Text1', 'Text2'])) {
					fieldCount += 1;
				} else {
					console.error(`Unexpected text field value for ${name}: ${val}`);
				}
			} else if (name === 'numberList') {
				if (val === JSON.stringify([1, 2, 3])) {
					fieldCount += 1;
				} else {
					console.error(`Unexpected text field value for ${name}: ${val}`);
				}
			} else if (name === 'recList') {
				if (val === JSON.stringify([{ key: '2', version: '1', value: 'Record2' }])) {
					fieldCount += 1;
				} else {
					console.error(`Unexpected text field value for ${name}: ${val}`);
				}
			} else {
				console.error(`Unexpected field name: ${name}`);
			}
		});
		bb.on('close', () => {
			ctx.status = fieldCount === 8 ? 204 : 500;
			finish();
		});
		ctx.req.pipe(bb);
		await wait;
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
	bodyParamNil,
	bodyPatchParam,
	listBodyParam,
	headerParam,
	multiHeaderParam,
	listHeaderParam,

	queryParam,
	multiQueryParam,
	listQueryParam,

	// Binary types
	uploadFile,
	uploadBlob,
	downloadFile,
	downloadBlob,
	uploadMixed,
]);
app.use(all);

app.listen(3000);
