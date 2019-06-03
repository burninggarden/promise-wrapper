
class PromiseWrapper<T> {

	private promise  : Promise<T>;
	private resolver : (result: T) => void;
	private rejector : (error: Error) => void;

	public getPromise(): Promise<T> {
		if (!this.promise) {
			this.promise = this.createPromise();
		}

		return this.promise;
	}

	private createPromise(): Promise<T> {
		return new Promise<T>((resolver, rejector) => {
			this.resolver = resolver;
			this.rejector = rejector;
		});
	}

	public resolve(result: T): void {
		this.resolver(result);
	}

	public reject(error: Error): void {
		this.rejector(error);
	}

}

export default PromiseWrapper;
