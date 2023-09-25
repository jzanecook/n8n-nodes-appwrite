// import {
// 	IExecuteFunctions,
// } from 'n8n-core';

import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeExecutionWithMetadata,
	// INodeListSearchResult,
	// ILoadOptionsFunctions,
	IExecuteFunctions,
	NodeApiError,
} from 'n8n-workflow';

import {
	// getAppwriteFunction,
	createAppwriteDocument,
	getAppwriteDocument,
	listAppwriteDocuments,
	deleteAppwriteDocument,
	// getAppwriteCollection,
	// listAppwriteCollections,
	listAppwriteFunctions,
	runAppwriteFunction,
	deleteAppwriteStorageBucket,
	updateAppwriteDocument,
	createAppwriteStorageBucket,
	createAppwriteStorageFile,
	deleteAppwriteStorageFile,
	// getAppwriteCollectionIndices,
	listAppwriteStorage,
	getAppwriteStorageFile,
} from './AppwriteFunctions';

import { documentFields, documentOperations, functionFields, storageFields, functionOperations, storageOperations } from './DocumentDescription';
import { ID, Query } from "node-appwrite";

const convertStringToQuery = (query: string, index: string, value?: string | number, value2?: string) => {
	switch (query) {
		case 'select':
			if (value) {
				return Query.select(JSON.parse(value.toString()));
			}
		case 'equal':
			if (value) {
				return Query.equal(index, JSON.parse(value.toString()));
			}
		case 'not_equal':
			if (value) {
				return Query.notEqual(index.toString(), JSON.parse(value.toString()));
			}
		case 'less_than':
			if (value) {
				return Query.lessThan(index.toString(), JSON.parse(value.toString()));
			}
		case 'greater_than':
			if (value) {
				return Query.greaterThan(index.toString(), JSON.parse(value.toString()));
			}
		case 'less_than_or_equal':
			if (value) {
				return Query.lessThanEqual(index.toString(), JSON.parse(value.toString()));
			}
		case 'greater_than_or_equal':
			if (value) {
				return Query.greaterThanEqual(index.toString(), JSON.parse(value.toString()));
			}
		case 'greater_than':
			if (value) {
				return Query.greaterThan(value.toString(), JSON.parse(value.toString()));
			}
		case 'between':
			if (index && value && value2) {
				return Query.between(index.toString(), value.toString(), JSON.parse(value2.toString()));
			}
		case 'is_null':
			if (value) {
				return Query.isNull(index.toString());
			}
		case 'is_not_null':
			if (value) {
				return Query.isNotNull(index.toString());
			}
		case 'starts_with':
			if (value) {
				return Query.startsWith(index.toString(), JSON.parse(value.toString()));
			}
		case 'ends_with':
			if (value) {
				return Query.endsWith(index.toString(), JSON.parse(value.toString()));
			}
		case 'search':
			if (value) {
				return Query.search(index.toString(), JSON.parse(value.toString()));
			}
		case 'order_descending':
			if (value) {
				return Query.orderDesc(index.toString());
			}
		case 'order_ascending':
			if (value) {
				return Query.orderAsc(index.toString());
			}
		case 'limit':
			if (value) {
				return Query.limit(JSON.parse(value.toString()));
			}
		case 'offset':
			if (value) {
				return Query.offset(JSON.parse(value.toString()));
			}
		case 'cursor_after':
			if (value) {
				return Query.cursorAfter(JSON.parse(value.toString()));
			}
		case 'cursor_before':
			if (value) {
				return Query.cursorBefore(JSON.parse(value.toString()));
			}
		default:
			return "";
	}
}


// async function listIndexes(this: ILoadOptionsFunctions, filter?: string, paginationToken?: string): Promise<INodeListSearchResult> {
// 	const credentials = await this.getCredentials('appwriteApi') as IDataObject;
// 	if (filter) {
// 		const collectionId = this.getNodeParameter('collectionId', "");
// 		const indices: Models.IndexList = await getAppwriteCollectionIndices.call(this, `${credentials.databaseId}`, `${collectionId}`);
// 		const indicesMapped = indices.indexes.map((index: Models.Index) => ({
// 			name: index.key,
// 			value: index.key,
// 		}));
// 		const returnData: INodeListSearchResult = {
// 			results: indicesMapped,
// 		}
// 		return returnData;
// 	}
// 	return {
// 		results: [],
// 	}
// }

export class Appwrite implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Appwrite',
		name: 'appwrite',
		icon: 'file:Appwrite.svg',
		group: [],
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
				name: 'appwriteApi',
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
					{
						name: 'Function',
						value: 'function',
					},
					{
						name: 'Storage',
						value: 'storage',
					},
				],
				default: 'document',
				required: true,
				description: 'Resource or operation to utilize',
			},
			...documentOperations,
			...documentFields,
			...functionOperations,
			...functionFields,
			...storageOperations,
			...storageFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][] | NodeExecutionWithMetadata[][] | null> {
		const returnData: IDataObject[] = [];

		let responseData;
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		try {
			if (resource === 'document') {

				if (operation === 'createDoc') {
					// get databaseId input
					const databaseId = this.getNodeParameter('databaseId', 0) as string;

					// get collectionID input
					const collectionId = this.getNodeParameter('collectionId', 0) as string;
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

					responseData = await createAppwriteDocument.call(this, databaseId, collectionId, documentId, body);
					returnData.push(responseData);
				}

				if (operation === 'getAllDocs') {
					// get databaseId input
					const databaseId = this.getNodeParameter('databaseId', 0) as string;

					// get collectionID input
					const collectionId = this.getNodeParameter('collectionId', 0) as string;
					// get additional fields input
					const optionalFields = this.getNodeParameter('queries', 0) as IDataObject;
					const queriesToSend: string[] = []

					if (optionalFields.options) {
						const queries = optionalFields.query as IDataObject[];
						if (queries) {
							for (const query of queries) {
								queriesToSend.push(convertStringToQuery(`${query.index}`, query.value as string, query.value2 as string ?? undefined));
							}
						}
					}

					responseData = await listAppwriteDocuments.call(this, databaseId, collectionId, queriesToSend);
					returnData.push(responseData);
				}

				if (operation === 'getDoc') {

					// get databaseId input
					const databaseId = this.getNodeParameter('databaseId', 0) as string;

					// get collectionID input
					const collectionId = this.getNodeParameter('collectionId', 0) as string;
					// get documentID input
					const documentId = this.getNodeParameter('documentId', 0) as string;
					const optionalFields = this.getNodeParameter('queries', 0) as IDataObject;
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
					responseData = await getAppwriteDocument.call(this, databaseId, collectionId, documentId, queriesToSend);
					returnData.push(responseData);
				}

				if (operation === 'updateDoc') {
					// get databaseId input
					const databaseId = this.getNodeParameter('databaseId', 0) as string;

					// get collectionID input
					const collectionId = this.getNodeParameter('collectionId', 0) as string;
					// get documentID input
					const documentId = this.getNodeParameter('documentId', 0) as string;

					const body: IDataObject = {
						data: this.getNodeParameter('body', 0) as IDataObject,
					};

					responseData = await updateAppwriteDocument.call(this, databaseId, collectionId, documentId, body);
					returnData.push(responseData);
				}

				if (operation === 'deleteDoc') {
					// get databaseId input
					const databaseId = this.getNodeParameter('databaseId', 0) as string;

					// get collectionID input
					const collectionId = this.getNodeParameter('collectionId', 0) as string;
					// get documentID input
					const documentId = this.getNodeParameter('documentId', 0) as string;

					responseData = await deleteAppwriteDocument.call(this, databaseId, collectionId, documentId);
					returnData.push({ "response": responseData });
				}
			} else if (resource === 'function') {
				if (operation === 'listFunctions') {
					responseData = await listAppwriteFunctions.call(this);
					returnData.push(responseData);
				} else if (operation === 'getFunction') {
					const functionId = this.getNodeParameter('functionId', 0) as string;
					const data = this.getNodeParameter('data', 0) as IDataObject;
					responseData = await runAppwriteFunction.call(this, functionId, data);
					returnData.push(responseData);
				}
			} else if (resource === 'storage') {
				if (operation === 'listBuckets') {
					const bucketId = this.getNodeParameter('bucketId', 0) as string;
					responseData = await listAppwriteStorage.call(this, bucketId);
					returnData.push(responseData);
				} else if (operation === 'listFiles') {
					const bucketId = this.getNodeParameter('bucketId', 0) as string;
					responseData = await listAppwriteStorage.call(this, bucketId);
					returnData.push(responseData);
				} else if (operation === 'getFile') {
					const bucketId = this.getNodeParameter('bucketId', 0) as string;
					const fileId = this.getNodeParameter('fileId', 0) as string;
					responseData = await getAppwriteStorageFile.call(this, bucketId, fileId);
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
					responseData = await createAppwriteStorageBucket.call(this, ID.unique(), name, permissions.split(',').map((permission: string) => permission.trim()), fileSecurity, enabled, maximumFileSize, allowedFileExtensions.split(',').map((fileExtension: string) => fileExtension.trim()), compression, encryption, antivirus,);
					returnData.push(responseData);
				} else if (operation === 'createFile') {
					const bucketId = this.getNodeParameter('bucketId', 0) as string;
					const file = this.getNodeParameter('file', 0) as string;
					const fileName = this.getNodeParameter('fileName', 0) as string;
					const mimeType = this.getNodeParameter('mimeType', 0) as string;
					responseData = await createAppwriteStorageFile.call(this, bucketId, file, fileName, mimeType.split(',').map((mimeType: string) => mimeType.trim()),);
					returnData.push(responseData);
				} else if (operation === 'deleteBucket') {
					const bucketId = this.getNodeParameter('bucketId', 0) as string;
					responseData = await deleteAppwriteStorageBucket.call(this, bucketId);
					returnData.push({ "success": responseData });
				} else if (operation === 'deleteFile') {
					const bucketId = this.getNodeParameter('bucketId', 0) as string;
					const fileId = this.getNodeParameter('fileId', 0) as string;
					responseData = await deleteAppwriteStorageFile.call(this, bucketId, fileId);
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
