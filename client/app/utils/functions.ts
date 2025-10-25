/**
 * Склоняет слово по количеству (русский язык)
 * @param count — число
 * @param forms — массив из трёх форм: [единственное, пару, множественное]
 * @returns правильная форма слова
 */
export function plural(count: number, forms: [string, string, string]): string {
	const mod10 = count % 10;
	const mod100 = count % 100;

	if (mod10 === 1 && mod100 !== 11) return forms[0];

	if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14))
		return forms[1];

	return forms[2];
}
