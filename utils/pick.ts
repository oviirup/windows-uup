/**
 * pick()
 * @description Picks specified properties from an object
 * @example pick({ foo:'bar', baz:'qux' }, ['foo ', 'baz']) // { foo: 'bar', baz: 'qux' }
 * @link https://github.com/jonschlinkert/object.pick
 * @link https://stackoverflow.com/questions/47232518/write-a-typesafe-pick-function-in-typescript
 */
export function pick<T, K extends keyof T>(
	obj: T,
	...keys: K[]
) {
	if (!keys.length) return obj as T
	const result: any = {}
	keys.forEach((K) => {
		if(K in obj) result[K] = obj[K]
	})
	return result as Pick<T, K>
}

export default pick