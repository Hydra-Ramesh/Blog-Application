import config from '../config/config.js';
import { Client, ID, Account } from 'appwrite';

export class AuthService {
    client;
    account;

    constructor() {
        if (!config || !config.appwriteUrl || !config.appwriteProjectId) {
            throw new Error('Appwrite configuration is missing');
        }

        this.client = new Client();
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    /**
     * Creates a new user account.
     * @param {string} email - User's email.
     * @param {string} password - User's password.
     * @param {string} name - User's name.
     * @returns {Promise<Object>} The created user account.
     */
    async createAccount(email, password, name) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            return userAccount;
        } catch (error) {
            throw new Error('Failed to create account. Please try again.');
        }
    }

    /**
     * Logs in a user with email and password.
     * @param {string} email - User's email.
     * @param {string} password - User's password.
     * @returns {Promise<Object>} The session object.
     */
    async login(email, password) {
        try {
            const emailSession = await this.account.createEmailSession(email, password);
            return emailSession;
        } catch (error) {
            throw new Error('Failed to log in. Please check your credentials.');
        }
    }

    /**
     * Retrieves the current logged-in user's details.
     * @returns {Promise<Object>} The user's account details.
     */
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw new Error('Failed to fetch current user. Please try again.');
        }
    }

    /**
     * Logs out the current user by deleting all sessions.
     * @returns {Promise<boolean>} True if logout was successful.
     */
    async logout() {
        try {
            await this.account.deleteSessions();
            return true;
        } catch (error) {
            throw new Error('Failed to log out. Please try again.');
        }
    }
}

const authService = new AuthService();

export default authService;
