import type { User } from "@/api/types";
import { UserCard } from "@/components/user-card";
import { UsersListSkeleton } from "@/components/users-list-skeleton";
import { useGetUsers } from "@/queries/users.queries";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Appbar, Button, Text } from "react-native-paper";

export default function Dashboard() {
	const router = useRouter();

	const {
		data: users = [],
		isLoading,
		isFetching,
		isError,
		refetch,
	} = useGetUsers();

	const handleUserCardPress = useCallback(
		(user: User) => {
			router.push(`/users/${user.id}`);
		},
		[router],
	);

	const keyExtractor = useCallback((item: User) => item.id.toString(), []);

	const renderItem = useCallback(
		({ item }: { item: User }) => (
			<UserCard user={item} onPress={handleUserCardPress} />
		),
		[handleUserCardPress],
	);

	const getItemLayout = useCallback(
		(_: ArrayLike<User> | null | undefined, index: number) => ({
			length: 64,
			offset: 64 * index,
			index,
		}),
		[],
	);

	return (
		<View style={styles.container}>
			<Appbar.Header>
				<Appbar.Content title="Users" />
				<Appbar.Action icon="refresh" onPress={refetch} />
			</Appbar.Header>

			{isLoading && <UsersListSkeleton />}

			{!isLoading && users.length === 0 && (
				<View style={styles.content}>
					<Text>Nenhum usuário encontrado</Text>
				</View>
			)}

			{isError && (
				<View style={styles.content}>
					<Text>Erro ao buscar usuários</Text>
					<Button mode="contained" onPress={() => refetch()}>
						Tentar novamente
					</Button>
				</View>
			)}

			{!isLoading && !isError && users.length > 0 && (
				<FlatList
					data={users}
					keyExtractor={keyExtractor}
					renderItem={renderItem}
					getItemLayout={getItemLayout}
					refreshing={isFetching}
					onRefresh={refetch}
					removeClippedSubviews={true}
					maxToRenderPerBatch={10}
					initialNumToRender={10}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 16,
	},
});
