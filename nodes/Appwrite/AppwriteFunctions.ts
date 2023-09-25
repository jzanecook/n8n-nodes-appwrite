import {
	IHookFunctions,
	IWebhookFunctions,
} from 'n8n-core';

import {
	IDataObject,
	ILoadOptionsFunctions,
	IExecuteFunctions,
} from 'n8n-workflow';

import { Client, Databases, Functions, Storage, InputFile, Models } from 'node-appwrite';

export async function getAppwriteClient(this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions): Promise<Client> {
	const credentials = await this.getCredentials('appwriteApiAuth') as IDataObject;
	if (credentials === undefined) {
		throw new Error("No credentials got returned, they are needed before making any requests!");
	} else {
		const client = new Client().setEndpoint(`${credentials.url}`).setProject(`${credentials.projectId}`).setKey(`${credentials.apiKey}`);
		console.log("Appwrite client created");
		return client;
	}
}

export async function getAppwriteDatabase(this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions, databaseId?: string): Promise<Databases> {
	const client = await getAppwriteClient.call(this);
	const database = new Databases(client);
	return database;
}

export async function listAppwriteDatabases(this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions): Promise<Models.DatabaseList> {
	const database = await getAppwriteDatabase.call(this);
	return database.list();
}

export async function getAppwriteCollection(this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions, databaseId: string, collectionId: string): Promise<Models.Collection> {
	const database = await getAppwriteDatabase.call(this);
	return database.getCollection(databaseId, collectionId);
}

export async function getAppwriteCollectionIndices(this: ILoadOptionsFunctions, databaseId: string, collectionId: string): Promise<Models.IndexList> {
	const database = await getAppwriteDatabase.call(this);
	return database.listIndexes(databaseId, collectionId);
}

export async function listAppwriteCollections(this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions, databaseId: string): Promise<Models.CollectionList> {
	const database = await getAppwriteDatabase.call(this);
	return database.listCollections(databaseId);
}

export async function getAppwriteDocument(this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions, databaseId: string, collectionId: string, documentId: string, queries?: string[]): Promise<Models.Document> {
	const database = await getAppwriteDatabase.call(this);
	if (queries !== undefined && queries.length > 0) {
		return database.getDocument(databaseId, collectionId, documentId, queries);
	}
	return database.getDocument(databaseId, collectionId, documentId);
}

export async function listAppwriteDocuments(this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions, databaseId: string, collectionId: string, queries?: string[]): Promise<Models.DocumentList<Models.Document>> {
	const database = await getAppwriteDatabase.call(this);
	if (queries !== undefined && queries.length > 0) {
		return database.listDocuments(databaseId, collectionId, queries);
	}
	return database.listDocuments(databaseId, collectionId);
}

export async function createAppwriteDocument(this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions, databaseId: string, collectionId: string, documentId: string, data: any): Promise<Models.Document> {
	const database = await getAppwriteDatabase.call(this);
	return database.createDocument(databaseId, collectionId, documentId, data);
}

export async function updateAppwriteDocument(this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions, databaseId: string, collectionId: string, documentId: string, data: any): Promise<Models.Document> {
	const database = await getAppwriteDatabase.call(this);
	return database.updateDocument(databaseId, collectionId, documentId, data);
}

export async function deleteAppwriteDocument(this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions, databaseId: string, collectionId: string, documentId: string): Promise<string> {
	const database = await getAppwriteDatabase.call(this);
	return database.deleteDocument(databaseId, collectionId, documentId);
}

export async function getAppwriteFunction(this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions, functionId: string): Promise<Models.Function> {
	const client = await getAppwriteClient.call(this);
	const functions = new Functions(client);
	return functions.get(functionId);
}

export async function listAppwriteFunctions(this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions): Promise<Models.FunctionList> {
	const client = await getAppwriteClient.call(this);
	const functions = new Functions(client);
	return functions.list();
}

export async function runAppwriteFunction(this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions, functionId: string, data: any): Promise<Models.Execution> {
	const client = await getAppwriteClient.call(this);
	const functions = new Functions(client);
	return functions.createExecution(functionId, data);
}

export async function getAppwriteStorageFile(this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions, bucketId: string, fileId: string): Promise<Models.File> {
	const client = await getAppwriteClient.call(this);
	const storage = new Storage(client);
	return storage.getFile(bucketId, fileId);
}

export async function listAppwriteStorage(this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions, bucketId: string): Promise<Models.FileList> {
	const client = await getAppwriteClient.call(this);
	const storage = new Storage(client);
	return storage.listFiles(bucketId);
}

export async function createAppwriteStorageFile(this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions, bucketId: string, file: InputFile, fileName: string, mimeType: string[]): Promise<Models.File> {
	const client = await getAppwriteClient.call(this);
	const storage = new Storage(client);
	return storage.createFile(bucketId, fileName, file, mimeType);
}

export async function createAppwriteStorageBucket(this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions, bucketId: string, name: string, permissions?: string[], fileSecurity?: boolean | undefined, enabled?: boolean | undefined, maximumFileSize?: number, allowedFileExtensions?: string[] | undefined, compression?: string, encryption?: boolean | undefined, antivirus?: boolean | undefined,): Promise<Models.Bucket> {
	const client = await getAppwriteClient.call(this);
	const storage = new Storage(client);
	return storage.createBucket(bucketId, name, permissions, fileSecurity, enabled, maximumFileSize, allowedFileExtensions, compression, encryption, antivirus);
}

export async function deleteAppwriteStorageFile(this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions, bucketId: string, fileId: string): Promise<string> {
	const client = await getAppwriteClient.call(this);
	const storage = new Storage(client);
	return storage.deleteFile(bucketId, fileId);
}

export async function deleteAppwriteStorageBucket(this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions, bucketId: string): Promise<string> {
	const client = await getAppwriteClient.call(this);
	const storage = new Storage(client);
	return storage.deleteBucket(bucketId);
}
