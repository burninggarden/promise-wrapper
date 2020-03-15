class PromiseWrapper<T> {

	private promise   : Promise<T>;
	private resolver! : (result: T) => void;
	private rejector! : (error: Error) => void;

	public constructor() {
		this.promise = new Promise<T>((resolver, rejector) => {
			this.resolver = resolver;
			this.rejector = rejector;
		});
	}

	public getPromise(): Promise<T> {
		return this.promise;
	}

	public resolve(result?: T): void {
		this.resolver(result as T);
	}

	public reject(error: Error): void {
		this.rejector(error);
	}

}

export default PromiseWrapper;
