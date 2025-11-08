import { ProductReviewType } from "@sellyzer/shared";

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

/**
 * Рассчитывает процент положительных отзывов (4 и 5 звезд)
 * @param review — объект с количеством отзывов по звездам
 * @returns процент положительных отзывов (0–100), округлённый до целого
 */
export function positiveProductReviewPercent(
	review: ProductReviewType
): number {
	if (!review) return 0;

	const { countStars4, countStars5, totalCount } = review;

	if (totalCount === 0) return 0;

	const positive = countStars4 + countStars5;

	return Math.round((positive / totalCount) * 100);
}

/**
 * Обрезает строку до заданной длины и добавляет "..." если нужно
 * @param str — исходная строка
 * @param maxLength — максимальное количество символов
 * @returns обрезанная строка
 */
export function truncateString(str: string, maxLength: number): string {
	if (str.length <= maxLength) return str;
	
	return str.slice(0, maxLength - 3) + "...";
}
