import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
	NodeExecutionWithMetadata,
} from 'n8n-workflow';

// import {
// 	documentOperations,
// 	documentFields,
// } from "./DocumentDescription"
// import {
// 	storageOperations,
// 	storageFields,
// } from "./StorageDescription"
// import {
// 	functionOperations,
// 	functionFields,
// } from "./FunctionDescription"
import { convertStringToQuery, createAppwriteDocument, createAppwriteStorageBucket, createAppwriteStorageFile, deleteAppwriteDocument, deleteAppwriteStorageBucket, deleteAppwriteStorageFile, getAppwriteClient, getAppwriteDocument, getAppwriteFunction, getAppwriteStorageFile, listAppwriteBuckets, listAppwriteDocuments, listAppwriteFunctions, listAppwriteStorage, runAppwriteFunction, updateAppwriteDocument } from './AppwriteFunctions';
import { ID } from 'node-appwrite';

export class Appwrite implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Appwrite',
		name: 'appwrite',
		icon: 'file:Appwrite.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		description: "Use Appwrite's API from inside N8N, updated by @ZachHandley",
		defaults: {
			name: 'Appwrite',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: "appwriteApi",
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				noDataExpression: true,
				type: 'options',
				options: [
					{
						name: 'Document',
						value: 'document',
					},
					// {
					// 	name: 'Function',
					// 	value: 'function',
					// },
					// {
					// 	name: 'Storage',
					// 	value: 'storage',
					// },
				],
				default: 'document',
				description: 'Resource or operation to utilize',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				noDataExpression: true,
				type: 'options',
				displayOptions: {
					show: {
						resource: ['document'],
					}
				},
				default: 'createDoc',
				options: [
					{
						name: 'Create',
						value: 'createDoc',
						action: 'Create document',
					},
					{
						name: 'Delete',
						value: 'deleteDoc',
						action: 'Delete document',
					},
				],
			},
			{
				displayName: 'Database ID',
				name: 'databaseId',
				type: 'string',
				required: true,
				default: '',
				// requiresDataPath: 'single',
				description: 'Database ID in which transaction will be performed',
				displayOptions: {
					show: {
						resource: [
							'document'
						],
						operation: [
							'createDoc',
							'deleteDoc',
						],
					},
				},
			},
			{
				displayName: 'Collection ID',
				name: 'collectionId',
				type: 'string',
				required: true,
				default: '',
				// requiresDataPath: 'single',
				description: 'Collection to list/create documents in',
				displayOptions: {
					show: {
						resource: [
							'document'
						],
						operation: [
							'createDoc',
							'deleteDoc',
						],
					},
				},
			},
			{
				displayName: 'Document ID',
				name: 'documentId',
				type: 'string',
				default: 'unique',
				// requiresDataPath: 'single',
				description: 'ID for collection | For creating, unique is used for generating unique ID, it can be modified for custom document ID',
				displayOptions: {
					show: {
						resource: [
							'document'
						],
						operation: [
							'createDoc',
							'deleteDoc',
						],
					},
				},
			},
			// ...documentOperations,
			// ...documentFields,
			// ...storageOperations,
			// ...storageFields,
			// ...functionOperations,
			// ...functionFields,
		],
	};

	// The function below is responsible for actually doing whatever this node
	// is supposed to do. In this case, we're just appending the `myString` property
	// with whatever the user has entered.
	// You can make async calls and use `await`.
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][] | NodeExecutionWithMetadata[][] | null> {
		const returnData: IDataObject[] = [];
		console.log("INSIDE EXECUTE!");

		let responseData;
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		const { url, projectId, apiKey } = await this.getCredentials('appwriteApi') as { url: string, projectId: string, apiKey: string };
		const appwriteClient = await getAppwriteClient(url, projectId, apiKey);
		console.log("Got appwrite client");
		try {
			if (resource === 'document') {
				// get databaseId input
				const databaseId = this.getNodeParameter('databaseId', 0) as string;
				const collectionId = this.getNodeParameter('collectionId', 0) as string;

				if (operation === 'createDoc') {

					// get collectionID input
					const docId = this.getNodeParameter('documentId', 0) as string;
					let body: IDataObject;
					let documentId: string;
					if (docId.includes('unique')) {
						documentId = ID.unique();
						body = {
							data: this.getNodeParameter('body', 0) as IDataObject,
						}
					} else {
						documentId = docId;
						body = {
							data: this.getNodeParameter('body', 0) as IDataObject,
						};
					}

					responseData = await createAppwriteDocument(appwriteClient, databaseId, collectionId, documentId, body);
					returnData.push(responseData);
				}

				if (operation === 'getAllDocs') {
					// get additional fields input
					const optionalFields = this.getNodeParameter('additionalFields', 0) as IDataObject;
					const queriesToSend: string[] = []

					if (optionalFields.options) {
						const queries = optionalFields.query as IDataObject[];
						if (queries) {
							for (const query of queries) {
								queriesToSend.push(convertStringToQuery(`${query.index}`, query.value as string, query.value2 as string ?? undefined));
							}
						}
					}

					responseData = await listAppwriteDocuments(appwriteClient, databaseId, collectionId, queriesToSend);
					returnData.push(responseData);
				}

				if (operation === 'getDoc') {
					// get documentID input
					const documentId = this.getNodeParameter('documentId', 0) as string;
					const optionalFields = this.getNodeParameter('additionalFields', 0) as IDataObject;
					const queriesToSend: string[] = []

					if (optionalFields.options) {
						const queries = optionalFields.query as IDataObject[];
						console.log("Inside optional fields, options value: ", optionalFields.options);
						console.log("Queries found: ", queries);
						if (queries) {
							for (const query of queries) {
								queriesToSend.push(convertStringToQuery(`${query.index}`, query.value as string, query.value2 as string ?? undefined));
							}
						}
					}
					responseData = await getAppwriteDocument(appwriteClient, databaseId, collectionId, documentId, queriesToSend);
					returnData.push(responseData);
				}

				if (operation === 'updateDoc') {
					// get documentID input
					const documentId = this.getNodeParameter('documentId', 0) as string;

					const body: IDataObject = {
						data: this.getNodeParameter('body', 0) as IDataObject,
					};

					responseData = await updateAppwriteDocument(appwriteClient, databaseId, collectionId, documentId, body);
					returnData.push(responseData);
				}

				if (operation === 'deleteDoc') {
					// get documentID input
					const documentId = this.getNodeParameter('documentId', 0) as string;

					responseData = await deleteAppwriteDocument(appwriteClient, databaseId, collectionId, documentId);
					returnData.push({ "response": responseData });
				}
			} else if (resource === 'function') {
				if (operation === 'listFunctions') {
					responseData = await listAppwriteFunctions(appwriteClient);
					returnData.push(responseData);
				} else if (operation === 'getFunction') {
					const functionId = this.getNodeParameter('functionId', 0) as string;
					responseData = await getAppwriteFunction(appwriteClient, functionId);
					returnData.push(responseData);
				} else if (operation === 'executeFunction') {
					const functionId = this.getNodeParameter('functionId', 0) as string;
					const data = this.getNodeParameter('data', 0) as IDataObject;
					responseData = await runAppwriteFunction(appwriteClient, functionId, data);
					returnData.push(responseData);
				}
			} else if (resource === 'storage') {
				if (operation === 'listBuckets') {
					responseData = await listAppwriteBuckets(appwriteClient);
					returnData.push(responseData);
				} else if (operation === 'listFiles') {
					const bucketId = this.getNodeParameter('bucketId', 0) as string;
					responseData = await listAppwriteStorage(appwriteClient, bucketId);
					returnData.push(responseData);
				} else if (operation === 'getFile') {
					const bucketId = this.getNodeParameter('bucketId', 0) as string;
					const fileId = this.getNodeParameter('fileId', 0) as string;
					responseData = await getAppwriteStorageFile(appwriteClient, bucketId, fileId);
					returnData.push(responseData);
				} else if (operation === 'createBucket') {
					const name = this.getNodeParameter('name', 0) as string;
					const permissions = this.getNodeParameter('permissions', 0) as string;
					const fileSecurity = this.getNodeParameter('fileSecurity', 0) as boolean;
					const enabled = this.getNodeParameter('enabled', 0) as boolean;
					const maximumFileSize = this.getNodeParameter('maximumFileSize', 0) as number;
					const allowedFileExtensions = this.getNodeParameter('allowedFileExtensions', 0) as string;
					const compression = this.getNodeParameter('compression', 0) as string;
					const encryption = this.getNodeParameter('encryption', 0) as boolean;
					const antivirus = this.getNodeParameter('antivirus', 0) as boolean;
					responseData = await createAppwriteStorageBucket(appwriteClient, ID.unique(), name, permissions.split(',').map((permission: string) => permission.trim()), fileSecurity, enabled, maximumFileSize, allowedFileExtensions.split(',').map((fileExtension: string) => fileExtension.trim()), compression, encryption, antivirus,);
					returnData.push(responseData);
				} else if (operation === 'createFile') {
					const bucketId = this.getNodeParameter('bucketId', 0) as string;
					const file = this.getNodeParameter('file', 0) as string;
					const fileName = this.getNodeParameter('fileName', 0) as string;
					const mimeType = this.getNodeParameter('mimeType', 0) as string;
					responseData = await createAppwriteStorageFile(appwriteClient, bucketId, file, fileName, mimeType.split(',').map((mimeType: string) => mimeType.trim()),);
					returnData.push(responseData);
				} else if (operation === 'deleteBucket') {
					const bucketId = this.getNodeParameter('bucketId', 0) as string;
					responseData = await deleteAppwriteStorageBucket(appwriteClient, bucketId);
					returnData.push({ "success": responseData });
				} else if (operation === 'deleteFile') {
					const bucketId = this.getNodeParameter('bucketId', 0) as string;
					const fileId = this.getNodeParameter('fileId', 0) as string;
					responseData = await deleteAppwriteStorageFile(appwriteClient, bucketId, fileId);
					returnData.push({ "success": responseData });
				}
			} else {
				throw new NodeApiError(this.getNode(), { "Error": "Resource not found" });
			}
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({ error: error.message });
			} else {
				throw error;
			}
		}

		// Map data to n8n data
		return [this.helpers.returnJsonArray(returnData)];
	}
}
