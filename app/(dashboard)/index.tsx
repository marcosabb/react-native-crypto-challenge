import { useGetUsers } from "@/queries/users.queries";
import { FlatList, Text, View } from "react-native";

export default function Dashboard() {
  const { data: users } = useGetUsers();

  console.log(JSON.stringify(users, undefined, 2));
  
  return (
    <View>
      <FlatList
        data={users}
        keyExtractor={(user) => user.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.id}</Text>
            <Text>{item.row_number}</Text>
            <Text>{item.nome}</Text>
            <Text>{item.email}</Text>
            <Text>{item.telefone}</Text>
          </View>
        )}
      />
    </View>
  );
}