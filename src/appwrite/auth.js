import config from '../config/config.js';
import { Client, ID, Account } from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId); // Corrected from setEndpointKey to setProject
        this.account = new Account(this.client);
    }

    async createAccount(email, password, name) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            return userAccount;
        } catch (error) {
            throw error;
        }
    }

    async login(email, password) {
        try {
            const emailSession = await this.account.createEmailSession(email, password);
            return emailSession;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
            return true;
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;
