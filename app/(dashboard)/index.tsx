import { UserCard } from "@/components/user-card";
import { UsersListSkeleton } from "@/components/users-list-skeleton";
import { useGetUsers } from "@/queries/users.queries";
import { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Appbar, Button, Text } from "react-native-paper";

export default function Dashboard() {
  const { data: users = [], isLoading, isFetching, isError, refetch } = useGetUsers();

  const handleUserCardPress = useCallback(() => {
    console.log('pressed')
  }, [])
  
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
          keyExtractor={(user) => user.id.toString()}
          renderItem={({ item }) => (
            <UserCard user={item} onPress={handleUserCardPress} />
          )}
          refreshing={isFetching}
          onRefresh={refetch}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16
  }
})