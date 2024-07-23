import config from '../config/config.js';
import {Client, ID, Storage, Quary} from '@appwrite/sdk-for-js';


export class Service{
    client =new Client();
    databases;
    storage;
    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setEndpointKey(config.appwriteProjectId);
        this.databases = new Storage(this.client);
        this.storage = new Storage(this.client);
    }
    async createPost({title, slug, content, featureImage, status, userId}){
        try{
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status,
                    userId,
                }
            )
        }catch(error){
            throw error;
        }
    }
    async updatePost(slug,{title, content, featureImage, status}){
        try{
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
            )
        }catch(error){
            throw error;
        }
    }
    async deletePost(slug){
        try{
            return await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true;
        }catch(error){
            throw error;
            return false;
        }
    }
    async getPost(slug){
        try{
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        }catch(error){
            throw error;
        }
    }
    async getAllPosts(queries = [Quary.equals('status', 'active')]){
        try{
            return await this.databases.searchDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
            )

        }catch(error){
            throw error;
            return false;
        }
    }
    async uploadFile(file){
        try{
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        }catch(error){
            throw error;
            return false;
        }
    }
    async deleteFile(fileId){
        try{
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )
        }catch(error){
            throw error;
            return false;
        }
    }
    async getFilePreview(fileId){
        return this.storage.getFilePreview(
            config.appwriteBucketId,
            fileId,
        )
    }
}
const service =new Service();
export default Service;



