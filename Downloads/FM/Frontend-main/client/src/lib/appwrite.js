import { Client, Account, Databases, Teams, ID, Permission, Role } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')  // Always same
  .setProject('pgatease2004');// Your actual Project ID

const account = new Account(client);
const databases = new Databases(client);
const teams = new Teams(client);

export { client, account, databases, teams, ID, Permission, Role };