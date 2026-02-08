import { memo } from "react";
import { StyleSheet, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

function UsersListSkeletonComponent() {
	return (
		<View style={styles.container}>
			<SkeletonPlaceholder>
				{Array.from({ length: 8 }).map((_, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: it's ok
					<View key={index} style={styles.item}>
						<View style={styles.avatar} />

						<View style={styles.content}>
							<View style={styles.title} />
							<View style={styles.description} />
						</View>
					</View>
				))}
			</SkeletonPlaceholder>
		</View>
	);
}

export const UsersListSkeleton = memo(UsersListSkeletonComponent);

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},

	item: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
	},

	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
	},

	content: {
		flex: 1,
		marginLeft: 12,
	},

	title: {
		width: "55%",
		height: 14,
		borderRadius: 4,
	},

	description: {
		width: "35%",
		height: 12,
		marginTop: 8,
		borderRadius: 4,
	},
});
