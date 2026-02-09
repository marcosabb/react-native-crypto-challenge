import type { User } from "@/api/types";
import { formatToPhone } from "brazilian-values";
import { memo } from "react";
import { List } from "react-native-paper";

type UserCardProps = {
	user: User;
	onPress: (user: User) => void;
};

function UserCardComponent({ user, onPress }: UserCardProps) {
	return (
		<List.Item
			title={user.nome}
			description={`${user.email} - ${formatToPhone(String(user.telefone))}`}
			left={(props) => <List.Icon {...props} icon="account" />}
			onPress={() => onPress(user)}
		/>
	);
}

export const UserCard = memo(UserCardComponent);
