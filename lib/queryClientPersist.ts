import type { QueryClient } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createMmkvPersister } from "./mmkvPersister";

const TWENTY_FOUR_HOURS = 24 * 60 * 60000;

export function setupReactQueryPersist(queryClient: QueryClient) {
	const persister = createMmkvPersister("users");

	return persistQueryClient({
		queryClient,
		persister,
		maxAge: TWENTY_FOUR_HOURS,
		dehydrateOptions: {
			shouldDehydrateQuery: (query) => query.state.status === "success",
		},
	});
}
