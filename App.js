import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [hasContactsPermission, setContactsPermission] = useState(null);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    askContactsPermission();
  }, []);

  const askContactsPermission = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    setContactsPermission( status == 'granted' );
  }

  const getContacts = async () => {
    const { data } = await Contacts.getContactsAsync();

    if (data.length > 0) {
      setContacts(data);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={({item}) => {
          if (item.phoneNumbers === undefined) {
            return (<Text>{item.name}</Text>);
          } else {
            return (<Text>{item.name} {item.phoneNumbers[0].number}</Text>);
          }
        }}
        keyExtractor={item => item.id}
      />
      {hasContactsPermission ? (
        <Button title="Get contacts" onPress={getContacts} />
      ) : (
        <Text>No access to contacts</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
