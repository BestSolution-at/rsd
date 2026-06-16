import { describe, expect, test } from 'vitest';
import { createScalarSubstition_ServiceService } from '../../test-specs/gen-out/client/typescript-client/src/index.js';
import { isSampleErrorScalarSubError } from '../../test-specs/gen-out/client/typescript-client/src/Errors.js';

const jsonService = createScalarSubstition_ServiceService({
	baseUrl: 'http://localhost:3000',
});

const msgpackService = createScalarSubstition_ServiceService({
	baseUrl: 'http://localhost:3000',
	encoding: 'application/vnd.msgpack',
});

/*const openApiService = createOpenAPISampleServiceService({
	baseUrl: 'http://localhost:3000',
});
*/

const json = {
	encoding: 'application/json' as const,
	service: jsonService,
};

const msgpack = {
	encoding: 'application/vnd.msgpack' as const,
	service: msgpackService,
};

describe('ScalarSubstition_ServiceService', () => {
	describe('get', () => {
		test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
			const [result, error] = await service.get();
			expect(error).toBeNull();
			expect(result).toBeDefined();
			expect(result?.start).toBe(0);
			expect(result?.end).toBe(0);
		});
	});
	describe('list', () => {
		test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
			const [result, error] = await service.list();
			expect(error).toBeNull();
			expect(result).toBeDefined();
			expect(result?.length).toBe(1);
			expect(result?.[0].start).toBe(0);
			expect(result?.[0].end).toBe(0);
		});
	});
	describe('post', () => {
		test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
			const [result, error] = await service.post({ start: 1, end: 2 });
			expect(error).toBeNull();
			expect(result).toBeDefined();
			expect(result?.start).toBe(1);
			expect(result?.end).toBe(2);
		});
	});
	describe('postOpt', () => {
		describe('defined', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.postOpt({ start: 1, end: 2 });
				expect(error).toBeNull();
				expect(result).toBeDefined();
			});
		});
		describe('undefined', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.postOpt();
				expect(error).toBeNull();
				expect(result).toBeDefined();
			});
		});
	});
	describe('postNull', () => {
		describe('defined', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.postNull({ start: 1, end: 2 });
				expect(error).toBeNull();
				expect(result).toBeDefined();
			});
		});
		describe('null', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.postNull(null);
				expect(error).toBeNull();
				expect(result).toBeDefined();
			});
		});
	});
	describe('postOptNull', () => {
		describe('defined', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.postOptNull({ start: 1, end: 2 });
				expect(error).toBeNull();
				expect(result).toBeDefined();
			});
		});
		describe('null', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.postOptNull(null);
				expect(error).toBeNull();
				expect(result).toBeDefined();
			});
		});
		describe('undefined', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.postOptNull();
				expect(error).toBeNull();
				expect(result).toBeDefined();
			});
		});
	});
	describe('postList', () => {
		test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
			const [result, error] = await service.postList([{ start: 1, end: 2 }]);
			expect(error).toBeNull();
			expect(result).toBeDefined();
			expect(result?.length).toBe(1);
			expect(result?.[0].start).toBe(1);
			expect(result?.[0].end).toBe(2);
		});
	});
	describe('postListOpt', () => {
		describe('defined', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.postListOpt([{ start: 1, end: 2 }]);
				expect(error).toBeNull();
				expect(result).toBeDefined();
			});
		});
		describe('undefined', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.postListOpt();
				expect(error).toBeNull();
				expect(result).toBe('UNDEFINED');
			});
		});
	});
	describe('postListNull', () => {
		describe('defined', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.postListNull([{ start: 1, end: 2 }]);
				expect(error).toBeNull();
				expect(result).toBeDefined();
			});
		});
		describe('null', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.postListNull(null);
				expect(error).toBeNull();
				expect(result).toBe('NULL');
			});
		});
	});
	describe('postListOptNull', () => {
		describe('defined', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.postListOptNull([{ start: 1, end: 2 }]);
				expect(error).toBeNull();
				expect(result).toBeDefined();
			});
		});
		describe('null', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.postListOptNull(null);
				expect(error).toBeNull();
				expect(result).toBe('NULL');
			});
		});
		describe('undefined', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.postListOptNull();
				expect(error).toBeNull();
				expect(result).toBe('UNDEFINED');
			});
		});
	});
	describe('query', () => {
		test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
			const [result, error] = await service.query({ start: 1, end: 2 });
			expect(error).toBeNull();
			expect(result).toBeDefined();
			expect(result?.start).toBe(1);
			expect(result?.end).toBe(2);
		});
	});
	describe('queryOpt', () => {
		describe('defined', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.queryOpt({ start: 1, end: 2 });
				expect(error).toBeNull();
				expect(result).toBeDefined();
			});
		});
		describe('undefined', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.queryOpt();
				expect(error).toBeNull();
				expect(result).toBe('UNDEFINED');
			});
		});
	});
	describe('queryNull', () => {
		describe('defined', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.queryNull({ start: 1, end: 2 });
				expect(error).toBeNull();
				expect(result).toBeDefined();
			});
		});
		/*describe('null', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.queryNull(null);
				expect(error).toBeNull();
				expect(result).toBe('NULL');
			});
		});*/
	});
	describe('queryOptNull', () => {
		describe('defined', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.queryOptNull({ start: 1, end: 2 });
				expect(error).toBeNull();
				expect(result).toBeDefined();
			});
		});
		/*escribe('null', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.queryOptNull(null);
				expect(error).toBeNull();
				expect(result).toBe('NULL');
			});
		});*/
		describe('undefined', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.queryOptNull();
				expect(error).toBeNull();
				expect(result).toBe('UNDEFINED');
			});
		});
	});
	describe('queryList', () => {
		test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
			const [result, error] = await service.queryList([{ start: 1, end: 2 }]);
			expect(error).toBeNull();
			expect(result).toBeDefined();
			expect(result?.length).toBe(1);
			expect(result?.[0].start).toBe(1);
			expect(result?.[0].end).toBe(2);
		});
	});
	describe('queryListOpt', () => {
		describe('defined', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.queryListOpt([{ start: 1, end: 2 }]);
				expect(error).toBeNull();
				expect(result).toBeDefined();
			});
		});
		/*describe('undefined', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.queryListOpt();
				expect(error).toBeNull();
				expect(result).toBe('UNDEFINED');
			});
		});*/
	});
	describe('queryListNull', () => {
		describe('defined', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.queryListNull([{ start: 1, end: 2 }]);
				expect(error).toBeNull();
				expect(result).toBeDefined();
			});
		});
		/*describe('null', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.queryListNull(null);
				expect(error).toBeNull();
				expect(result).toBe('NULL');
			});
		});*/
	});
	describe('queryListOptNull', () => {
		describe('defined', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.queryListOptNull([{ start: 1, end: 2 }]);
				expect(error).toBeNull();
				expect(result).toBeDefined();
			});
		});
		/*describe('undefined', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.queryListOptNull();
				expect(error).toBeNull();
				expect(result).toBe('UNDEFINED');
			});
		});
		describe('null', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.queryListOptNull(null);
				expect(error).toBeNull();
				expect(result).toBe('NULL');
			});
		});*/
	});
	describe('header', () => {
		test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
			const [result, error] = await service.header({ start: 1, end: 2 });
			expect(error).toBeNull();
			expect(result).toBeDefined();
			expect(result?.start).toBe(1);
			expect(result?.end).toBe(2);
		});
	});
	describe('headerOpt', () => {
		describe('defined', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.headerOpt({ start: 1, end: 2 });
				expect(error).toBeNull();
				expect(result).toBeDefined();
			});
		});
		describe('undefined', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.headerOpt();
				expect(error).toBeNull();
				expect(result).toBe('UNDEFINED');
			});
		});
	});
	describe('headerNull', () => {
		describe('defined', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.headerNull({ start: 1, end: 2 });
				expect(error).toBeNull();
				expect(result).toBeDefined();
			});
		});
		describe('null', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.headerNull(null);
				expect(error).toBeNull();
				expect(result).toBe('NULL');
			});
		});
	});
	describe('headerOptNull', () => {
		describe('defined', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.headerOptNull({ start: 1, end: 2 });
				expect(error).toBeNull();
				expect(result).toBeDefined();
			});
		});
		describe('null', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.headerOptNull(null);
				expect(error).toBeNull();
				expect(result).toBe('NULL');
			});
		});
		describe('undefined', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.headerOptNull();
				expect(error).toBeNull();
				expect(result).toBe('UNDEFINED');
			});
		});
	});
	describe('headerList', () => {
		test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
			const [result, error] = await service.headerList([{ start: 1, end: 2 }]);
			expect(error).toBeNull();
			expect(result).toBeDefined();
			expect(result?.length).toBe(1);
			expect(result?.[0].start).toBe(1);
			expect(result?.[0].end).toBe(2);
		});
	});
	describe('headerListOpt', () => {
		describe('defined', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.headerListOpt([{ start: 1, end: 2 }]);
				expect(error).toBeNull();
				expect(result).toBeDefined();
			});
		});
		describe('undefined', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.headerListOpt();
				expect(error).toBeNull();
				expect(result).toBe('UNDEFINED');
			});
		});
	});
	describe('headerListNull', () => {
		describe('defined', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.headerListNull([{ start: 1, end: 2 }]);
				expect(error).toBeNull();
				expect(result).toBeDefined();
			});
		});
		describe('null', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.headerListNull(null);
				expect(error).toBeNull();
				expect(result).toBe('NULL');
			});
		});
	});
	describe('headerListOptNull', () => {
		describe('defined', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.headerListOptNull([{ start: 1, end: 2 }]);
				expect(error).toBeNull();
				expect(result).toBeDefined();
			});
		});
		describe('null', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.headerListOptNull(null);
				expect(error).toBeNull();
				expect(result).toBe('NULL');
			});
		});
		describe('undefined', () => {
			test.each([json, msgpack])('ssucess with $encoding', async ({ service }) => {
				const [result, error] = await service.headerListOptNull();
				expect(error).toBeNull();
				expect(result).toBe('UNDEFINED');
			});
		});
	});
	describe('fail', () => {
		test.each([json, msgpack])('fail with $encoding', async ({ service }) => {
			const [result, error] = await service.fail();
			expect(result).toBeUndefined();
			expect(error).toBeDefined();
			if (isSampleErrorScalarSubError(error)) {
				// expect(error.data).toBe();
			}
		});
	});
});
