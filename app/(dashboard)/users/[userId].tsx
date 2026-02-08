import type { User } from "@/api/types";
import { useQueryClient } from "@tanstack/react-query";
import { formatToPhone } from "brazilian-values";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import { Share, View } from "react-native";
import { Appbar, Button, Card, Divider, Text } from "react-native-paper";

export default function UserDetails() {
	const router = useRouter();
	const { userId } = useLocalSearchParams();

	const queryClient = useQueryClient();

	const user = useMemo(() => {
		const users = queryClient.getQueryData<User[]>(["users"]) ?? [];
		return users.find((user) => user.id === Number(userId));
	}, [userId, queryClient]);

	async function onShare() {
		const message = [
			`Usuário: ${user?.nome}`,
			`E-mail: ${user?.email}`,
			`Telefone: ${formatToPhone(String(user?.telefone))}`,
		];

		await Share.share({
			message: message.join("\n"),
		});
	}

	return (
		<View style={{ flex: 1 }}>
			<Appbar.Header>
				<Appbar.BackAction onPress={() => router.back()} />
				<Appbar.Content title="Detalhes" />
			</Appbar.Header>

			<View style={{ padding: 16, gap: 12 }}>
				<Card mode="contained">
					<Card.Title title={user?.nome} />
					<Card.Content style={{ gap: 10 }}>
						<Text variant="labelSmall">E-mail</Text>
						<Text variant="bodyMedium">{user?.email}</Text>
						<Divider />

						<Text variant="labelSmall">Telefone</Text>
						<Text variant="bodyMedium">
							{formatToPhone(String(user?.telefone))}
						</Text>
						<Divider />
					</Card.Content>

					<Card.Actions>
						<Button mode="contained" icon="share-variant" onPress={onShare}>
							Compartilhar
						</Button>
					</Card.Actions>
				</Card>
			</View>
		</View>
	);
}
