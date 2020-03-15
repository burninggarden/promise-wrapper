import PromiseWrapper from 'promise-wrapper';

describe('PromiseWrapper', () => {
	it('.getPromise() returns the same promise when called multiple times', () => {
		const promiseWrapper = new PromiseWrapper<string>();
		const firstPromise = promiseWrapper.getPromise();
		const secondPromise = promiseWrapper.getPromise();

		expect(firstPromise).toStrictEqual(secondPromise);
	});

	it('.resolve() fulfills inner promise', async () => {
		const promiseWrapper = new PromiseWrapper<string>();

		promiseWrapper.getPromise().then(result => {
			expect(result).toStrictEqual('gandalf');
		});

		promiseWrapper.resolve('gandalf');

		await promiseWrapper.getPromise();
	});

	it('.reject() rejects inner promise', async () => {
		const promiseWrapper = new PromiseWrapper<string>();
		const testWrapper = new PromiseWrapper<any>();

		promiseWrapper.getPromise().catch(error => {
			expect(error.message).toStrictEqual('some error');
			testWrapper.resolve();
		});

		promiseWrapper.reject(new Error('some error'));

		await testWrapper.getPromise();
	});
});
