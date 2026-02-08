import { decrypt } from "@/utils/crypto";
import { api } from "./client";
import type { Users, UsersResponse } from "./types";

export async function getUsers() {
	const response = await api
		.get("webhook/data-5dYbrVSlMVJxfmco")
		.json<UsersResponse>();

	const decryptedUsers = decrypt({
		encrypted: response.data.encrypted,
		secretKey: response.data.secretKey,
	});

	const plainUsers = (JSON.parse(decryptedUsers) || []) as Users;

	return plainUsers;
}
