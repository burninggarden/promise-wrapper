import Tap            from 'tap';
import PromiseWrapper from 'promise-wrapper';

Tap.test('.getPromise() returns the same promise when called multiple times', test => {
	const promiseWrapper = new PromiseWrapper<string>();

	test.equals(promiseWrapper.getPromise(), promiseWrapper.getPromise());
	test.end();
});

Tap.test('.resolve() fulfills inner promise', test => {
	const promiseWrapper = new PromiseWrapper<string>();

	promiseWrapper.getPromise().then(result => {
		test.equal(result, 'gandalf');
		test.end();
	});

	promiseWrapper.resolve('gandalf');
});

Tap.test('.reject() rejects inner promise', test => {
	const promiseWrapper = new PromiseWrapper<string>();

	promiseWrapper.getPromise().catch(error => {
		test.equal(error.message, 'some error');
		test.end();
	});

	promiseWrapper.reject(new Error('some error'));
});
