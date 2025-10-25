import { settings } from "./../schema/settings";
import { db } from "./../plugins/database.plugin";

export async function seedSettings() {
	const existing = await db.select().from(settings).limit(1);

	if (existing.length > 0) {
		console.log("✅ Settings already exist — skipping seed.");
		return;
	}

	await db.insert(settings).values({
		id: 1,
		proDailyRate: 33,
		minDeposit: 100,
	});

	console.log("🌱 Settings seeded successfully.");
}
