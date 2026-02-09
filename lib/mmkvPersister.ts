import type { PersistedClient } from "@tanstack/react-query-persist-client";

import { storage } from "@/lib/mmkv";

type Persister = {
	persistClient: (client: PersistedClient) => void;
	restoreClient: () => Promise<PersistedClient | undefined>;
	removeClient: () => Promise<void>;
};

export function createMmkvPersister(key: string): Persister {
	return {
		persistClient: (client) => {
			storage.set(key, JSON.stringify(client));
		},

		restoreClient: async () => {
			const value = storage.getString(key);
			return value ? JSON.parse(value) : undefined;
		},

		removeClient: async () => {
			storage.remove(key);
		},
	};
}
