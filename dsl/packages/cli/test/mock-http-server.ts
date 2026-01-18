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
	'/api/listbodyparametertypes/listBooleanBodyParamOpt',
	'/api/listbodyparametertypes/listBooleanBodyParamNil',
	'/api/listbodyparametertypes/listBooleanBodyParamOptNil',

	'/api/listbodyparametertypes/listShortBodyParam',
	'/api/listbodyparametertypes/listShortBodyParamOpt',
	'/api/listbodyparametertypes/listShortBodyParamNil',
	'/api/listbodyparametertypes/listShortBodyParamOptNil',

	'/api/listbodyparametertypes/listIntBodyParam',
	'/api/listbodyparametertypes/listIntBodyParamOpt',
	'/api/listbodyparametertypes/listIntBodyParamNil',
	'/api/listbodyparametertypes/listIntBodyParamOptNil',

	'/api/listbodyparametertypes/listLongBodyParam',
	'/api/listbodyparametertypes/listLongBodyParamOpt',
	'/api/listbodyparametertypes/listLongBodyParamNil',
	'/api/listbodyparametertypes/listLongBodyParamOptNil',

	'/api/listbodyparametertypes/listFloatBodyParam',
	'/api/listbodyparametertypes/listFloatBodyParamOpt',
	'/api/listbodyparametertypes/listFloatBodyParamNil',
	'/api/listbodyparametertypes/listFloatBodyParamOptNil',

	'/api/listbodyparametertypes/listDoubleBodyParam',
	'/api/listbodyparametertypes/listDoubleBodyParamOpt',
	'/api/listbodyparametertypes/listDoubleBodyParamNil',
	'/api/listbodyparametertypes/listDoubleBodyParamOptNil',

	'/api/listbodyparametertypes/listStringBodyParam',
	'/api/listbodyparametertypes/listStringBodyParamOpt',
	'/api/listbodyparametertypes/listStringBodyParamNil',
	'/api/listbodyparametertypes/listStringBodyParamOptNil',

	'/api/listbodyparametertypes/listLocalDateBodyParam',
	'/api/listbodyparametertypes/listLocalDateBodyParamOpt',
	'/api/listbodyparametertypes/listLocalDateBodyParamNil',
	'/api/listbodyparametertypes/listLocalDateBodyParamOptNil',

	'/api/listbodyparametertypes/listLocalDateTimeBodyParam',
	'/api/listbodyparametertypes/listLocalDateTimeBodyParamOpt',
	'/api/listbodyparametertypes/listLocalDateTimeBodyParamNil',
	'/api/listbodyparametertypes/listLocalDateTimeBodyParamOptNil',

	'/api/listbodyparametertypes/listZonedDateTimeBodyParam',
	'/api/listbodyparametertypes/listZonedDateTimeBodyParamOpt',
	'/api/listbodyparametertypes/listZonedDateTimeBodyParamNil',
	'/api/listbodyparametertypes/listZonedDateTimeBodyParamOptNil',

	'/api/listbodyparametertypes/listScalarBodyParam',
	'/api/listbodyparametertypes/listScalarBodyParamOpt',
	'/api/listbodyparametertypes/listScalarBodyParamNil',
	'/api/listbodyparametertypes/listScalarBodyParamOptNil',

	'/api/listbodyparametertypes/listEnumBodyParam',
	'/api/listbodyparametertypes/listEnumBodyParamOpt',
	'/api/listbodyparametertypes/listEnumBodyParamNil',
	'/api/listbodyparametertypes/listEnumBodyParamOptNil',

	'/api/listbodyparametertypes/listInlineEnumBodyParam',
	'/api/listbodyparametertypes/listInlineEnumBodyParamOpt',
	'/api/listbodyparametertypes/listInlineEnumBodyParamNil',
	'/api/listbodyparametertypes/listInlineEnumBodyParamOptNil',

	'/api/listbodyparametertypes/listMultiBodyParam',
	'/api/listbodyparametertypes/listMultiBodyParamOpt',
	'/api/listbodyparametertypes/listMultiBodyParamNil',
	'/api/listbodyparametertypes/listMultiBodyParamOptNil',

	'/api/listbodyparametertypes/listRecordBodyParam',
	'/api/listbodyparametertypes/listRecordBodyParamOpt',
	'/api/listbodyparametertypes/listRecordBodyParamNil',
	'/api/listbodyparametertypes/listRecordBodyParamOptNil',
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
		} else if (
			ctx.path === '/api/listbodyparametertypes/listMultiBodyParamNil' ||
			ctx.path === '/api/listbodyparametertypes/listMultiBodyParamOpt' ||
			ctx.path === '/api/listbodyparametertypes/listMultiBodyParamOptNil'
		) {
			const body = JSON.parse(str) as {
				valueA: string[] | undefined | null;
				valueB: number[] | undefined | null;
				valueC: Record<string, string>[] | undefined | null;
			};
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = JSON.stringify([
				body.valueA === undefined ? 'UNDEFINED' : body.valueA === null ? 'NULL' : 'DEFINED',
				body.valueB === undefined ? 'UNDEFINED' : body.valueB === null ? 'NULL' : 'DEFINED',
				body.valueC === undefined ? 'UNDEFINED' : body.valueC === null ? 'NULL' : 'DEFINED',
			]);
			return;
		}

		ctx.status = 200;
		ctx.type = 'application/json';
		if (str === 'null') {
			ctx.body = '"NULL"';
		} else if (str === '') {
			ctx.body = '"UNDEFINED"';
		} else {
			if (ctx.path.includes('Opt') || ctx.path.includes('Nil')) {
				ctx.body = '"DEFINED"';
			} else {
				ctx.body = str;
			}
		}
	} else {
		await next();
	}
}

const headerParamPaths = [
	'/api/headerparametertypes/simpleBooleanHeaderParam',
	'/api/headerparametertypes/simpleBooleanHeaderParamOpt',
	'/api/headerparametertypes/simpleBooleanHeaderParamNil',
	'/api/headerparametertypes/simpleBooleanHeaderParamOptNil',

	'/api/headerparametertypes/simpleShortHeaderParam',
	'/api/headerparametertypes/simpleShortHeaderParamOpt',
	'/api/headerparametertypes/simpleShortHeaderParamNil',
	'/api/headerparametertypes/simpleShortHeaderParamOptNil',

	'/api/headerparametertypes/simpleIntHeaderParam',
	'/api/headerparametertypes/simpleIntHeaderParamOpt',
	'/api/headerparametertypes/simpleIntHeaderParamNil',
	'/api/headerparametertypes/simpleIntHeaderParamOptNil',

	'/api/headerparametertypes/simpleLongHeaderParam',
	'/api/headerparametertypes/simpleLongHeaderParamOpt',
	'/api/headerparametertypes/simpleLongHeaderParamNil',
	'/api/headerparametertypes/simpleLongHeaderParamOptNil',

	'/api/headerparametertypes/simpleFloatHeaderParam',
	'/api/headerparametertypes/simpleFloatHeaderParamOpt',
	'/api/headerparametertypes/simpleFloatHeaderParamNil',
	'/api/headerparametertypes/simpleFloatHeaderParamOptNil',

	'/api/headerparametertypes/simpleDoubleHeaderParam',
	'/api/headerparametertypes/simpleDoubleHeaderParamOpt',
	'/api/headerparametertypes/simpleDoubleHeaderParamNil',
	'/api/headerparametertypes/simpleDoubleHeaderParamOptNil',

	'/api/headerparametertypes/recordHeaderParam',
	'/api/headerparametertypes/recordHeaderParamOpt',
	'/api/headerparametertypes/recordHeaderParamNil',
	'/api/headerparametertypes/recordHeaderParamOptNil',

	'/api/headerparametertypes/simpleStringHeaderParam',
	'/api/headerparametertypes/simpleStringHeaderParamOpt',
	'/api/headerparametertypes/simpleStringHeaderParamNil',
	'/api/headerparametertypes/simpleStringHeaderParamOptNil',

	'/api/headerparametertypes/simpleLocalDateHeaderParam',
	'/api/headerparametertypes/simpleLocalDateHeaderParamOpt',
	'/api/headerparametertypes/simpleLocalDateHeaderParamNil',
	'/api/headerparametertypes/simpleLocalDateHeaderParamOptNil',

	'/api/headerparametertypes/simpleLocalDateTimeHeaderParam',
	'/api/headerparametertypes/simpleLocalDateTimeHeaderParamOpt',
	'/api/headerparametertypes/simpleLocalDateTimeHeaderParamNil',
	'/api/headerparametertypes/simpleLocalDateTimeHeaderParamOptNil',

	'/api/headerparametertypes/simpleZonedDateTimeHeaderParam',
	'/api/headerparametertypes/simpleZonedDateTimeHeaderParamOpt',
	'/api/headerparametertypes/simpleZonedDateTimeHeaderParamNil',
	'/api/headerparametertypes/simpleZonedDateTimeHeaderParamOptNil',

	'/api/headerparametertypes/simpleScalarHeaderParam',
	'/api/headerparametertypes/simpleScalarHeaderParamOpt',
	'/api/headerparametertypes/simpleScalarHeaderParamNil',
	'/api/headerparametertypes/simpleScalarHeaderParamOptNil',

	'/api/headerparametertypes/simpleEnumHeaderParam',
	'/api/headerparametertypes/simpleEnumHeaderParamOpt',
	'/api/headerparametertypes/simpleEnumHeaderParamNil',
	'/api/headerparametertypes/simpleEnumHeaderParamOptNil',

	'/api/headerparametertypes/simpleInlineEnumHeaderParam',
	'/api/headerparametertypes/simpleInlineEnumHeaderParamOpt',
	'/api/headerparametertypes/simpleInlineEnumHeaderParamNil',
	'/api/headerparametertypes/simpleInlineEnumHeaderParamOptNil',

	'/api/headerparametertypes/multiHeaderParam',
	'/api/headerparametertypes/multiHeaderParamOpt',
	'/api/headerparametertypes/multiHeaderParamNil',
	'/api/headerparametertypes/multiHeaderParamOptNil',
];

const stringHeaderParamPaths = [
	'/api/headerparametertypes/simpleStringHeaderParam',
	'/api/headerparametertypes/simpleLocalDateHeaderParam',
	'/api/headerparametertypes/simpleLocalDateTimeHeaderParam',
	'/api/headerparametertypes/simpleZonedDateTimeHeaderParam',
	'/api/headerparametertypes/simpleScalarHeaderParam',
	'/api/headerparametertypes/simpleEnumHeaderParam',
	'/api/headerparametertypes/simpleInlineEnumHeaderParam',
];

async function headerParam(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (headerParamPaths.includes(ctx.path) && ctx.method === 'GET') {
		if (ctx.path === '/api/headerparametertypes/multiHeaderParam') {
			const headerValueA = ctx.header.valuea;
			const headerValueB = ctx.header.valueb;
			const response = `${String(headerValueA)}-${String(headerValueB)}`;
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = `"${response}"`;
			return;
		} else if (
			ctx.path === '/api/headerparametertypes/multiHeaderParamOpt' ||
			ctx.path === '/api/headerparametertypes/multiHeaderParamNil' ||
			ctx.path === '/api/headerparametertypes/multiHeaderParamOptNil'
		) {
			const headerValueA = ctx.header.valuea;
			const headerValueB = ctx.header.valueb;
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = JSON.stringify([
				headerValueA === undefined ? 'UNDEFINED' : headerValueA === 'null' ? 'NULL' : 'DEFINED',
				headerValueB === undefined ? 'UNDEFINED' : headerValueB === 'null' ? 'NULL' : 'DEFINED',
			]);
			return;
		}
		const headerValue = ctx.header.headervalue;
		ctx.status = 200;
		ctx.type = 'application/json';
		if (headerValue === undefined) {
			ctx.body = '"UNDEFINED"';
		} else if (headerValue === 'null') {
			ctx.body = '"NULL"';
		} else {
			ctx.body = stringHeaderParamPaths.includes(ctx.path) ? `"${String(headerValue)}"` : headerValue;
		}
	} else {
		await next();
	}
}

const listHeaderParamPaths = [
	'/api/listheaderparametertypes/listBooleanHeaderParam',
	'/api/listheaderparametertypes/listBooleanHeaderParamOpt',
	'/api/listheaderparametertypes/listBooleanHeaderParamNil',
	'/api/listheaderparametertypes/listBooleanHeaderParamOptNil',

	'/api/listheaderparametertypes/listShortHeaderParam',
	'/api/listheaderparametertypes/listShortHeaderParamOpt',
	'/api/listheaderparametertypes/listShortHeaderParamNil',
	'/api/listheaderparametertypes/listShortHeaderParamOptNil',

	'/api/listheaderparametertypes/listIntHeaderParam',
	'/api/listheaderparametertypes/listIntHeaderParamOpt',
	'/api/listheaderparametertypes/listIntHeaderParamNil',
	'/api/listheaderparametertypes/listIntHeaderParamOptNil',

	'/api/listheaderparametertypes/listLongHeaderParam',
	'/api/listheaderparametertypes/listLongHeaderParamOpt',
	'/api/listheaderparametertypes/listLongHeaderParamNil',
	'/api/listheaderparametertypes/listLongHeaderParamOptNil',

	'/api/listheaderparametertypes/listLongHeaderParam',
	'/api/listheaderparametertypes/listLongHeaderParamOpt',
	'/api/listheaderparametertypes/listLongHeaderParamNil',
	'/api/listheaderparametertypes/listLongHeaderParamOptNil',

	'/api/listheaderparametertypes/listFloatHeaderParam',
	'/api/listheaderparametertypes/listFloatHeaderParamOpt',
	'/api/listheaderparametertypes/listFloatHeaderParamNil',
	'/api/listheaderparametertypes/listFloatHeaderParamOptNil',

	'/api/listheaderparametertypes/listDoubleHeaderParam',
	'/api/listheaderparametertypes/listDoubleHeaderParamOpt',
	'/api/listheaderparametertypes/listDoubleHeaderParamNil',
	'/api/listheaderparametertypes/listDoubleHeaderParamOptNil',

	'/api/listheaderparametertypes/listStringHeaderParam',
	'/api/listheaderparametertypes/listStringHeaderParamOpt',
	'/api/listheaderparametertypes/listStringHeaderParamNil',
	'/api/listheaderparametertypes/listStringHeaderParamOptNil',

	'/api/listheaderparametertypes/listLocalDateHeaderParam',
	'/api/listheaderparametertypes/listLocalDateHeaderParamOpt',
	'/api/listheaderparametertypes/listLocalDateHeaderParamNil',
	'/api/listheaderparametertypes/listLocalDateHeaderParamOptNil',

	'/api/listheaderparametertypes/listLocalDateTimeHeaderParam',
	'/api/listheaderparametertypes/listLocalDateTimeHeaderParamOpt',
	'/api/listheaderparametertypes/listLocalDateTimeHeaderParamNil',
	'/api/listheaderparametertypes/listLocalDateTimeHeaderParamOptNil',

	'/api/listheaderparametertypes/listZonedDateTimeHeaderParam',
	'/api/listheaderparametertypes/listZonedDateTimeHeaderParamOpt',
	'/api/listheaderparametertypes/listZonedDateTimeHeaderParamNil',
	'/api/listheaderparametertypes/listZonedDateTimeHeaderParamOptNil',

	'/api/listheaderparametertypes/listScalarHeaderParam',
	'/api/listheaderparametertypes/listScalarHeaderParamOpt',
	'/api/listheaderparametertypes/listScalarHeaderParamNil',
	'/api/listheaderparametertypes/listScalarHeaderParamOptNil',

	'/api/listheaderparametertypes/listEnumHeaderParam',
	'/api/listheaderparametertypes/listEnumHeaderParamOpt',
	'/api/listheaderparametertypes/listEnumHeaderParamNil',
	'/api/listheaderparametertypes/listEnumHeaderParamOptNil',

	'/api/listheaderparametertypes/listInlineEnumHeaderParam',
	'/api/listheaderparametertypes/listInlineEnumHeaderParamOpt',
	'/api/listheaderparametertypes/listInlineEnumHeaderParamNil',
	'/api/listheaderparametertypes/listInlineEnumHeaderParamOptNil',

	'/api/listheaderparametertypes/listMultiHeaderParam',
	'/api/listheaderparametertypes/listMultiHeaderParamOpt',
	'/api/listheaderparametertypes/listMultiHeaderParamNil',
	'/api/listheaderparametertypes/listMultiHeaderParamOptNil',

	'/api/listheaderparametertypes/listRecordHeaderParam',
	'/api/listheaderparametertypes/listRecordHeaderParamOpt',
	'/api/listheaderparametertypes/listRecordHeaderParamNil',
	'/api/listheaderparametertypes/listRecordHeaderParamOptNil',
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
		} else if (
			ctx.path === '/api/listheaderparametertypes/listMultiHeaderParamOpt' ||
			ctx.path === '/api/listheaderparametertypes/listMultiHeaderParamNil' ||
			ctx.path === '/api/listheaderparametertypes/listMultiHeaderParamOptNil'
		) {
			const values = [
				ctx.header.valuea === undefined ? 'UNDEFINED' : ctx.header.valuea === 'null' ? 'NULL' : 'DEFINED',
				ctx.header.valueb === undefined ? 'UNDEFINED' : ctx.header.valueb === 'null' ? 'NULL' : 'DEFINED',
				ctx.header.valuec === undefined ? 'UNDEFINED' : ctx.header.valuec === 'null' ? 'NULL' : 'DEFINED',
			];
			ctx.body = JSON.stringify(values);
			return;
		}

		const headerValue = String(ctx.header.headervalue);
		if (ctx.header.headervalue === undefined) {
			ctx.body = '"UNDEFINED"';
		} else if (headerValue === 'null') {
			ctx.body = '"NULL"';
		} else if (ctx.path === '/api/listheaderparametertypes/listRecordHeaderParam') {
			if (ctx.path.includes('Opt') || ctx.path.includes('Nil')) {
				ctx.body = '"DEFINED"';
			} else {
				ctx.body = `[${headerValue}]`;
			}
		} else if (ctx.path === '/api/listheaderparametertypes/listBooleanHeaderParam') {
			if (ctx.path.includes('Opt') || ctx.path.includes('Nil')) {
				ctx.body = '"DEFINED"';
			} else {
				ctx.body = `[${headerValue}]`;
			}
		} else if (numListHeaderParamPaths.includes(ctx.path)) {
			if (ctx.path.includes('Opt') || ctx.path.includes('Nil')) {
				ctx.body = '"DEFINED"';
			} else {
				ctx.body = `[${headerValue}]`;
			}
		} else {
			if (ctx.path.includes('Opt') || ctx.path.includes('Nil')) {
				ctx.body = '"DEFINED"';
			} else {
				ctx.body = JSON.stringify(headerValue.split(', '));
			}
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
	if (
		(ctx.path === '/api/binarytypes/uploadFile' ||
			ctx.path === '/api/binarytypes/uploadFileOpt' ||
			ctx.path === '/api/binarytypes/uploadFileNil' ||
			ctx.path === '/api/binarytypes/uploadFileOptNil') &&
		ctx.method === 'POST'
	) {
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
		})
			.on('field', (name, val) => {
				if (name === 'data' && val === 'null') {
					ctx.body = '-1';
				}
			})
			.on('close', () => {
				ctx.status = 201;
				ctx.type = 'application/json';
				if (ctx.body === undefined) {
					ctx.body = '0';
				}
				finish();
			});
		ctx.req.pipe(bb);
		await wait;
	} else {
		await next();
	}
}

async function uploadFileList(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (
		(ctx.path === '/api/binarytypes/uploadFileList' ||
			ctx.path === '/api/binarytypes/uploadFileListOpt' ||
			ctx.path === '/api/binarytypes/uploadFileListNil' ||
			ctx.path === '/api/binarytypes/uploadFileListOptNil') &&
		ctx.method === 'PUT'
	) {
		const bb = busboy({ headers: ctx.req.headers });
		let finish: (value: void | PromiseLike<void>) => void;
		const wait = new Promise<void>(resolve => {
			finish = resolve;
		});
		let sizeSum = 0;
		bb.on('file', (name, file, info) => {
			const { filename, mimeType } = info;
			if (name === 'data' && (filename === 'file1.txt' || filename === 'file2.txt') && mimeType === 'text/plain') {
				file.on('data', data => {
					sizeSum += String(data).length;
				});
			}
		})
			.on('field', (name, val) => {
				if (name === 'data' && val === 'null') {
					sizeSum -= 1;
				}
			})
			.on('close', () => {
				ctx.status = 200;
				ctx.type = 'application/json';
				ctx.body = String(sizeSum);
				finish();
			});
		ctx.req.pipe(bb);
		await wait;
	} else {
		await next();
	}
}

async function uploadBlob(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (
		(ctx.path === '/api/binarytypes/uploadBlob' ||
			ctx.path === '/api/binarytypes/uploadBlobOpt' ||
			ctx.path === '/api/binarytypes/uploadBlobNil' ||
			ctx.path === '/api/binarytypes/uploadBlobOptNil') &&
		ctx.method === 'POST'
	) {
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
		})
			.on('field', (name, val) => {
				if (name === 'data' && val === 'null') {
					ctx.body = '-1';
				}
			})
			.on('close', () => {
				ctx.status = 201;
				ctx.type = 'application/json';
				if (ctx.body === undefined) {
					ctx.body = '0';
				}
				finish();
			});
		ctx.req.pipe(bb);
		await wait;
	} else {
		await next();
	}
}

async function uploadBlobList(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	if (
		(ctx.path === '/api/binarytypes/uploadBlobList' ||
			ctx.path === '/api/binarytypes/uploadBlobListOpt' ||
			ctx.path === '/api/binarytypes/uploadBlobListNil' ||
			ctx.path === '/api/binarytypes/uploadBlobListOptNil') &&
		ctx.method === 'PUT'
	) {
		const bb = busboy({ headers: ctx.req.headers });
		let finish: (value: void | PromiseLike<void>) => void;
		const wait = new Promise<void>(resolve => {
			finish = resolve;
		});
		let sizeSum = 0;
		bb.on('file', (name, file, info) => {
			const { filename, mimeType } = info;
			if (name === 'data' && filename === 'blob' && mimeType === 'text/plain') {
				file.on('data', data => {
					sizeSum += String(data).length;
				});
			}
		})
			.on('field', (name, val) => {
				if (name === 'data' && val === 'null') {
					sizeSum -= 1;
				}
			})
			.on('close', () => {
				ctx.status = 200;
				ctx.type = 'application/json';
				ctx.body = String(sizeSum);
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
	if (
		(ctx.path === '/api/binarytypes/uploadMixed' ||
			ctx.path === '/api/binarytypes/uploadMixedOpt' ||
			ctx.path === '/api/binarytypes/uploadMixedNil' ||
			ctx.path === '/api/binarytypes/uploadMixedOptNil') &&
		ctx.method === 'PUT'
	) {
		const bb = busboy({ headers: ctx.req.headers });
		let finish: (value: void | PromiseLike<void>) => void;
		const wait = new Promise<void>(resolve => {
			finish = resolve;
		});
		let result: Record<string, unknown> = {};
		bb.on('file', (name, file, info) => {
			const { filename, mimeType } = info;
			if (name === 'dataFile' && filename === 'hello.txt' && mimeType === 'text/plain') {
				file.on('data', data => {
					result = { ...result, dataFileContent: String(data) };
				});
			} else if (name === 'dataBlob' && filename === 'blob' && mimeType === 'text/plain') {
				file.on('data', data => {
					result = { ...result, dataBlobContent: String(data) };
				});
			} else if (name === 'rec' && filename === 'blob' && mimeType === 'application/json') {
				file.on('data', data => {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					result = { ...result, rec: JSON.parse(String(data)) };
				});
			} else if (name === 'recList' && filename === 'blob' && mimeType === 'application/json') {
				file.on('data', data => {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					const val = JSON.parse(String(data));
					result = { ...result, recList: result.recList ? [...(result.recList as unknown[]), val] : [val] };
				});
			} else {
				console.error(`Unexpected file field: ${name}, ${filename}, ${mimeType}`);
			}
		});
		bb.on('field', (name, val) => {
			if (name === 'text') {
				if (val === 'null') {
					result = { ...result, text: null };
				} else {
					result = { ...result, text: val };
				}
			} else if (name === 'number') {
				if (val === 'null') {
					result = { ...result, number: null };
				} else {
					result = { ...result, number: parseInt(val) };
				}
			} else if (name === 'textList') {
				if (val === 'null') {
					result = { ...result, textList: null };
				} else {
					result = { ...result, textList: result.textList ? [...(result.textList as unknown[]), val] : [val] };
				}
			} else if (name === 'numberList') {
				if (val === 'null') {
					result = { ...result, numberList: null };
				} else {
					result = {
						...result,
						numberList: result.numberList ? [...(result.numberList as unknown[]), parseInt(val)] : [parseInt(val)],
					};
				}
			} else if (name === 'dataBlob' && val === 'null') {
				result = { ...result, dataBlobContent: null };
			} else if (name === 'dataFile' && val === 'null') {
				result = { ...result, dataFileContent: null };
			} else if (name === 'rec' && val === 'null') {
				result = { ...result, rec: null };
			} else if (name === 'recList' && val === 'null') {
				result = { ...result, recList: null };
			} else {
				console.error(`Unexpected field name: ${name}`);
			}
		});
		bb.on('close', () => {
			ctx.status = 200;
			ctx.type = 'application/json';
			ctx.body = JSON.stringify(result);
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
	listHeaderParam,

	queryParam,
	multiQueryParam,
	listQueryParam,

	// Binary types
	uploadFile,
	uploadFileList,
	uploadBlob,
	uploadBlobList,
	downloadFile,
	downloadBlob,
	uploadMixed,
]);
app.use(all);

app.listen(3000);
