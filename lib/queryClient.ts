import { QueryClient } from "@tanstack/react-query";

const THIRTY_SECONDS = 30000;
const SEVEN_DAYS = 7 * 24 * 60 * 60000;

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			staleTime: THIRTY_SECONDS,
			gcTime: SEVEN_DAYS,
			refetchOnReconnect: true,
			refetchOnWindowFocus: false,
			networkMode: "offlineFirst",
		},
	},
});
