export {
	
	range,
}

function range(from:number, to: number) {
	return {
		[Symbol.iterator]: () => {
			let i = from
			let done = false
			return {
				next(){
					done = i++ >= to
					return {
						value: i, done
					}
				}
			}
		}
	}
}