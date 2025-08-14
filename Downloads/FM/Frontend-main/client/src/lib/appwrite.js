import { Client, Account, Databases, Teams, ID, Permission, Role } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT || 'pgatease2004');

const account = new Account(client);
const databases = new Databases(client);
const teams = new Teams(client);

export { client, account, databases, teams, ID, Permission, Role };