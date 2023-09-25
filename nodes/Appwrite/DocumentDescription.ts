import {
	INodeProperties,
} from 'n8n-workflow';

export const documentOperations: INodeProperties[] = [
	{
		displayName: 'Documents',
		name: 'documentOperation',
		noDataExpression: true,
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'document',
				],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'createDoc',
				description: 'Create a document in collection',
			},
			{
				name: 'Delete',
				value: 'deleteDoc',
				description: 'Delete document in collection',
			},
			{
				name: 'Get',
				value: 'getDoc',
				description: 'Get a document in collection',
			},
			{
				name: 'Get All',
				value: 'getAllDocs',
				description: 'Get all documents in collection',
			},
			{
				name: 'Update',
				value: 'updateDoc',
				description: 'Get all documents in collection',
			},
		],
		default: 'getAllDocs',
		description: 'Select the operation to perform on the collection of documents',
	},
];

export const functionOperations: INodeProperties[] = [
	{
		displayName: 'Functions',
		name: 'functionOperations',
		noDataExpression: true,
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'function',
				],
			},
		},
		options: [
			{
				name: 'List Functions',
				value: 'listFunctions',
				description: 'List Functions in the current project',
			},
			{
				name: 'Execute Function',
				value: 'executeFunction',
				description: 'Execute a given function and output its result',
			},
		],
		default: 'executeFunction',
		description: 'Select the operation to perform on Functions, currently only Execution and listing is supported',
	},
];

export const storageOperations: INodeProperties[] = [

	{
		displayName: 'Storage',
		name: 'storageOperations',
		noDataExpression: true,
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'storage',
				],
			},
		},
		options: [
			{
				name: 'List Buckets',
				value: 'listBuckets',
				description: 'List your Storage Buckets in the current project',
			},
			{
				name: 'List Files',
				value: 'listFiles',
				description: 'List files in a given bucket',
			},
			{
				name: 'Get File',
				value: 'getFile',
				description: 'Get a file from a given bucket',
			},
			{
				name: 'Create File',
				value: 'createFile',
				description: 'Create a file in a given bucket',
			},
			{
				name: 'Create Bucket',
				value: 'createBucket',
				description: 'Create a bucket in the current project',
			},
			{
				name: 'Delete File',
				value: 'deleteFile',
				description: 'Delete a file from a given bucket',
			},
			{
				name: 'Delete Bucket',
				value: 'deleteBucket',
				description: 'Delete a bucket from the current project',
			},
		],
		default: 'listFiles',
		description: 'Select the operation to perform on Storage, you should be able to do most things with this node related to storage',
	},
];

// 'function',
// 'storage',

export const documentFields: INodeProperties[] = [
	{
		displayName: 'Database ID',
		name: 'databaseId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'createDoc',
					'getAllDocs',
					'getDoc',
					'updateDoc',
					'deleteDoc',
				],
				resource: [
					'document',
				],
			},
		},
		default: '',
		description: 'Database ID in which transaction will be performed',
	},
	{
		displayName: 'Collection ID',
		name: 'collectionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'createDoc',
					'getAllDocs',
					'getDoc',
					'updateDoc',
					'deleteDoc',
				],
				resource: [
					'document',
				],
			},
		},
		default: '',
		description: 'Collection to list/create documents in',
	},
	{
		displayName: 'Document ID',
		name: 'documentId',
		type: 'string',
		required: false,
		displayOptions: {
			show: {
				operation: [
					'createDoc',
					'getDoc',
					'updateDoc',
					'deleteDoc',
				],
				resource: [
					'document',
				],
			},
		},
		default: 'unique()',
		description: 'Document ID for collection, if not provided will assume Queries will single out one document (e.g. by user_id) | For creating unique() is used for generating unique ID, it can be modified for custom document Id',
	},
	{
		displayName: 'Body',
		name: 'body',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'createDoc',
					'updateDoc',
					'executeFunction',
				],
				resource: [
					'document',
				],
			},
		},
		default: '{"attributeName1":"attribute-value1", "attributeName2":"attribute-value2"}',
		description: 'Body to create document with',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Query',
		default: {},
		displayOptions: {
			show: {
				operation: [
					'createDoc',
					'getAllDocs',
					'getDoc',
				],
				resource: [
					'document',
				],
			},
		},
		options: [
			{
				displayName: 'Queries',
				name: 'queries',
				type: 'collection',
				placeholder: 'Add Query',
				default: [],
				typeOptions: {
					multipleValues: true,
				},
				description: "Queries to filter the documents by. [learn more about filtering](https://appwrite.io/docs/filters)",
				options: [
					{
						displayName: 'Query',
						name: 'query',
						type: 'options',
						default: 'select',
						options: [
							{
								name: 'Select',
								value: 'select',
								description: 'Select which attributes should be returned from a document.',
							},
							{
								name: 'Equal',
								value: 'equal',
								description: 'Returns document if attribute is equal to any value in the provided array.',
							},
							{
								name: 'Not Equal',
								value: 'not_equal',
								description: 'Returns document if attribute is not equal to any value in the provided array.',
							},
							{
								name: 'Less Than',
								value: 'less_than',
								description: 'Returns document if attribute is less than the provided value.',
							},
							{
								name: 'Less Than or Equal',
								value: 'less_than_or_equal',
								description: 'Returns document if attribute is less than or equal to the provided value.',
							},
							{
								name: 'Greater Than',
								value: 'greater_than',
								description: 'Returns document if attribute is greater than the provided value.',
							},
							{
								name: 'Greater Than or Equal',
								value: 'greater_than_or_equal',
								description: 'Returns document if attribute is greater than or equal to the provided value.',
							},
							{
								name: 'Between',
								value: 'between',
								description: 'Returns document if attribute value falls between the two values. The boundary values are inclusive and can be strings or numbers.',
							},
							{
								name: 'Is Null',
								value: 'is_null',
								description: 'Returns documents where attribute value is null.',
							},
							{
								name: 'Is Not Null',
								value: 'is_not_null',
								description: 'Returns documents where attribute value is not null.',
							},
							{
								name: 'Starts With',
								value: 'starts_with',
								description: 'Returns documents if a string attributes starts with a substring.',
							},
							{
								name: 'Ends With',
								value: 'ends_with',
								description: 'Returns documents if a string attributes ends with a substring.',
							},
							{
								name: 'Search',
								value: 'search',
								description: 'Searches string attributes for provided keywords. Requires a Full-text index on queried attributes.',
							},
							{
								name: 'Order Descending',
								value: 'order_descending',
								description: 'Orders results in descending order by attribute. Attribute must be indexed. Pass in an empty string to return in natural order.',
							},
							{
								name: 'Order Ascending',
								value: 'order_ascending',
								description: 'Orders results in ascending order by attribute. Attribute must be indexed. Pass in an empty string to return in natural order.',
							},
							{
								name: 'Limit',
								value: 'limit',
								description: 'Limits the number of results returned by the query. Used for pagination. If the limit query is not used, the limit defaults to 25 results.',
							},
							{
								name: 'Offset',
								value: 'offset',
								description: 'Offset the results returned by skipping some of the results. Used for pagination.',
							},
							{
								name: 'Cursor After',
								value: 'cursor_after',
								description: 'Places the cursor after the specified resource ID. Used for pagination.',
							},
							{
								name: 'Cursor Before',
								value: 'cursor_before',
								description: 'Places the cursor before the specified resource ID. Used for pagination.',
							},
						],
					},
					{
						displayName: 'Index to Select',
						name: 'index',
						type: 'resourceLocator',
						default: '',
						description: 'Index to select, if needed',
						modes: [
							{
								displayName: 'Name',
								name: 'indexName',
								type: 'string',
								hint: "Index to select",
								placeholder: "user_id",
							},
							{
								displayName: 'Select',
								name: 'indexSelect',
								type: 'list',
								hint: "Begin typing your index",
								typeOptions: {
									searchListMethod: 'listIndexes',
									searchable: true,
									searchFilterRequired: false,
								},
							},
						],
					},
					{
						displayName: 'Value 1',
						name: 'value1',
						type: 'string',
						default: '',
						description: 'First value for queries, such as what the index is equal to, or the first value of a between',
					},
					{
						displayName: 'Value 2',
						name: 'value2',
						type: 'string',
						default: '',
						description: 'Second value for between and a few other queries, ignore if not needed',
					},
				],
			},
		],
	},
];

export const functionFields: INodeProperties[] = [
	{
		displayName: 'Function ID',
		name: 'functionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'executeFunction',
				],
				resource: [
					'function',
				],
			},
		},
		default: '',
		description: 'Function ID to execute',
	},
	{
		displayName: 'Data',
		name: 'data',
		type: 'json',
		required: false,
		displayOptions: {
			show: {
				operation: [
					'executeFunction',
				],
				resource: [
					'function',
				],
			},
		},
		default: '',
		description: 'Data to send to function',
	},
];

export const storageFields: INodeProperties[] = [
	{
		displayName: 'Bucket ID',
		name: 'bucketId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'listFiles',
					'getFile',
					'createFile',
					'deleteFile',
				],
				resource: [
					'storage',
				],
			},
		},
		default: '',
		description: 'Bucket ID to perform operation on',
	},
	{
		displayName: 'File ID',
		name: 'fileId',
		type: 'string',
		required: false,
		displayOptions: {
			show: {
				operation: [
					'getFile',
					'deleteFile',
				],
				resource: [
					'storage',
				],
			},
		},
		default: '',
		description: 'File ID to perform operation on',
	},
	{
		displayName: 'File Name',
		name: 'fileName',
		type: 'string',
		required: false,
		displayOptions: {
			show: {
				operation: [
					'createFile',
				],
				resource: [
					'storage',
				],
			},
		},
		default: '',
		description: 'File name to create',
	},
	{
		displayName: 'File',
		name: 'file',

		type: 'string',
		required: false,
		displayOptions: {
			show: {
				operation: [
					'createFile',
				],
				resource: [
					'storage',
				],
			},
		},
		default: '',
		description: 'File to upload',
	},
	{
		displayName: 'Mime Type',
		name: 'mimeType',
		type: 'string',
		required: false,
		displayOptions: {
			show: {
				operation: [
					'createFile',
				],
				resource: [
					'storage',
				],
			},
		},
		default: '',
		description: 'Mime type of file to upload',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: false,
		displayOptions: {
			show: {
				operation: [
					'createBucket',
				],
				resource: [
					'storage',
				],
			},
		},

		default: '',
		description: 'Name of bucket to create',
	},
	{
		displayName: 'Permissions',
		name: 'permissions',
		type: 'multiOptions',
		required: false,
		displayOptions: {
			show: {
				operation: [
					'createBucket',
				],
				resource: [
					'storage',
				],
			},
		},
		options: [
			{
				name: 'Read',
				value: 'read',
				description: 'Read from bucket',
			},
			{
				name: 'Write',
				value: 'write',
				description: 'Write to bucket',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete from bucket',
			},
		],
		default: [],
		description: 'Permissions to set on bucket',
	},
	{
		displayName: 'File Security',
		name: 'fileSecurity',
		type: 'boolean',
		required: false,
		displayOptions: {
			show: {
				operation: [
					'createBucket',
				],
				resource: [
					'storage',
				],
			},
		},
		default: false,
		description: 'Enable file security on bucket',
	},
	{
		displayName: 'Enabled',
		name: 'enabled',
		type: 'boolean',
		required: false,
		displayOptions: {
			show: {
				operation: [
					'createBucket',
				],
				resource: [
					'storage',
				],
			},
		},
		default: true,
		description: 'Enable bucket',
	},
	{
		displayName: 'Maximum File Size',
		name: 'maximumFileSize',
		type: 'number',
		required: false,
		displayOptions: {
			show: {
				operation: [
					'createBucket',
				],
				resource: [
					'storage',
				],
			},
		},
		default: 0,
		description: 'Maximum file size in bytes',
	},
	{
		displayName: 'Allowed File Extensions',
		name: 'allowedFileExtensions',
		type: 'string',
		required: false,
		displayOptions: {
			show: {
				operation: [
					'createBucket',
				],
				resource: [
					'storage',
				],
			},
		},
		default: '',
		description: 'Allowed file extensions, comma separated',
	},
	{
		displayName: 'Compression',
		name: 'compression',
		type: 'options',
		required: false,
		displayOptions: {
			show: {
				operation: [
					'createBucket',
				],
				resource: [
					'storage',
				],
			},
		},
		options: [
			{
				name: 'None',
				value: '',
				description: 'No compression',
			},
			{
				name: 'Tar',
				value: 'tar',
				description: 'Tar compression',
			},
			{
				name: 'Gzip',
				value: 'gzip',
				description: 'Gzip compression',
			},
			{
				name: 'Bzip',
				value: 'bzip',
				description: 'Bzip compression',
			},
			{
				name: 'Bzip2',
				value: 'bzip2',
				description: 'Bzip2 compression',
			},
			{
				name: 'Xz',
				value: 'xz',
				description: 'Xz compression',
			},
			{
				name: 'Z',
				value: 'z',
				description: 'Z compression',
			},
			{
				name: '7z',
				value: '7z',
				description: '7z compression',
			},
			{
				name: 'Tar Bzip2',
				value: 'tar.bz2',
				description: 'Tar Bzip2 compression',
			},
			{
				name: 'Tar Gzip',
				value: 'tar.gz',
				description: 'Tar Gzip compression',
			},
			{
				name: 'Tar Xz',
				value: 'tar.xz',
				description: 'Tar Xz compression',
			},
			{
				name: 'Tar Z',
				value: 'tar.Z',
				description: 'Tar Z compression',
			},
			{
				name: 'Tar 7z',
				value: 'tar.7z',
				description: 'Tar 7z compression',
			},
		],
		default: '',
		description: 'Compression to use on bucket',
	},
	{
		displayName: 'Encryption',
		name: 'encryption',
		type: 'boolean',
		required: false,
		displayOptions: {
			show: {
				operation: [
					'createBucket',
				],
				resource: [
					'storage',
				],
			},
		},
		default: false,
		description: 'Enable encryption on bucket',
	},
	{
		displayName: 'Antivirus',
		name: 'antivirus',
		type: 'boolean',
		required: false,
		displayOptions: {
			show: {
				operation: [
					'createBucket',
				],
				resource: [
					'storage',
				],
			},
		},
		default: false,
		description: 'Enable antivirus on bucket',
	},
];
