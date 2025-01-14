/** 
 * Se Min/Max não existir, automaticamente a versão atual é maior/menor!
 * Se gEqMin for true, a verificação de versão minima e atual será Menor ou Igual, se não, o contrário.
 * (O mesmo de gEqMin se aplica para lEqMax)
 */ 

/**
 * Takes up to three semver strings and an options object.
 * @param {String} min
 * @param {String} curr
 * @param {String} max
 * @param {Object} opt Properties: eqMin, eqMax, gEqMin, lEqMax
 * @returns {Boolean} Comparison result
 */
export default function semverComp(min, curr, max, opt = {}) {
	if ((!min && !max) || !curr) throw new Error(`Missing Comparators. min ${min}; curr ${curr}; max ${max}`);
  
	console.log('OP | Intervalo de Versões %s > %s > %s', min, curr, max);

	// Type converting from String to Number.
	min = min && coerceNum(min);
	curr = curr && coerceNum(curr);
	max = max && coerceNum(max);
  
	if (min && max && opt.eqMin && opt.eqMax) return min === curr && curr === max;
	if (min && opt.eqMin) return min === curr;
	if (max && opt.eqMax) return max === curr;
  
	// Type converting from Number to Boolean.
	if (min) {
		if (opt.gEqMin) min = min <= curr; // Se MIN é menor do que ATUAL, min = true;
		else min = min < curr;
	}
	else {
		min = true;
	}
  
	if (max) {
		if (opt.lEqMax) max = curr <= max; // Se ATUAL é menor do que MAX, max = true;
		else max = curr < max;
	}
	else {
		max = true;
	}
  
	if (min && max) return true;
	return false;
}
  
// eslint-disable-next-line require-jsdoc
function coerceNum(string) {
	if (typeof string !== 'string') throw new Error(`Wrong term passed ${string}`);
	const array = Array.from(string.split('.'), v => parseInt(v));
	if (array.some(v => isNaN(v)) || array.length !== 3) throw new Error(`Invalid SemVer string: ${string}`);
	array[0] = array[0] * 1000000;
	array[1] = array[1] * 1000;
	return array.reduce((sum, val) => (sum += val));
}