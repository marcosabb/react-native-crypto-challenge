import { useGetUsers } from "@/queries/users.queries";
import { Text, View } from "react-native";

export default function Dashboard() {
  const users = useGetUsers();

  console.log(JSON.stringify(users.data, undefined, 2));
  
  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  );
}