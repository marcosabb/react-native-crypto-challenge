import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "@tanstack/react-query";

export function setupReactQueryNetwork() {
	onlineManager.setEventListener((setOnline) => {
		return NetInfo.addEventListener((state) => {
			setOnline(Boolean(state.isConnected && state.isInternetReachable));
		});
	});
}
