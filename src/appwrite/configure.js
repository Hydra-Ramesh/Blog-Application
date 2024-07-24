import config from '../config/config.js';
import { Client, ID, Storage, Query, Databases } from 'appwrite';

export class Service {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId); // Corrected from setEndpointKey to setProject
        this.databases = new Databases(this.client); // Corrected to use Databases class
        this.storage = new Storage(this.client);
    }

    async createPost({ title, slug, content, featureImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                ID.unique(), // Generating unique ID for document
                {
                    title,
                    content,
                    featureImage,
                    status,
                    userId,
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug, { title, content, featureImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status,
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            throw error;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
        } catch (error) {
            throw error;
        }
    }

    async getAllPosts(queries = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            );
        } catch (error) {
            throw error;
        }
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            throw error;
        }
    }

    async getFilePreview(fileId) {
        return this.storage.getFilePreview(
            config.appwriteBucketId,
            fileId
        );
    }
}

const service = new Service();
export default service; // export the instance
