import { Client, Account, Databases } from 'react-native-appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('6787a1f8002b46b56168')

export const account = new Account(client);
export const databases = new Databases(client);