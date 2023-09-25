import {
	INodeProperties,
} from 'n8n-workflow';

export const documentOperations: INodeProperties[] = [
	{
		displayName: 'Options',
		name: 'option',
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
				displayName: "Create Document",
				value: 'createDoc',
				action: 'Create Document',
				description: 'Create a document in collection',
			},
			{
				name: 'Delete',
				displayName: "Delete Document",
				value: 'deleteDoc',
				action: 'Delete Document',
				description: 'Delete document in collection',
			},
			{
				name: 'Get',
				displayName: "Get Document",
				value: 'getDoc',
				action: 'Get Document by ID',
				description: 'Get a document in collection',
			},
			{
				name: 'Get All',
				displayName: "Get All Documents",
				value: 'getAllDocs',
				action: 'Get All Documents with optional queries',
				description: 'Get all documents in collection',
			},
			{
				name: 'Update',
				displayName: "Update Document",
				value: 'updateDoc',
				action: 'Update Document',
				description: 'Get all documents in collection',
			},
		],
		default: 'getAllDocs',
	},
];

export const functionOperations: INodeProperties[] = [
	{
		displayName: 'Options',
		name: 'option',
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
				displayName: "List Functions",
				value: 'listFunctions',
				action: 'List Functions',
				description: 'List Functions in the current project',
			},
			{
				name: 'Execute Function',
				displayName: "Execute Function",
				value: 'executeFunction',
				action: 'Execute Function',
				description: 'Execute a given function and output its result',
			},
		],
		default: 'executeFunction',
	},
];

export const storageOperations: INodeProperties[] = [

	{
		displayName: 'Options',
		name: 'option',
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
				displayName: "List Buckets",
				value: 'listBuckets',
				action: 'List Storage Buckets',
				description: 'List your Storage Buckets in the current project',
			},
			{
				name: 'List Files',
				displayName: "List Files",
				value: 'listFiles',
				action: 'List Files in Bucket',
				description: 'List files in a given bucket',
			},
			{
				name: 'Get File',
				displayName: "Get File",
				value: 'getFile',
				action: 'Get a File from Bucket by ID',
				description: 'Get a file from a given bucket',
			},
			{
				name: 'Create File',
				displayName: "Create Files",
				value: 'createFile',
				action: 'Create a File in Bucket',
				description: 'Create a file in a given bucket',
			},
			{
				name: 'Create Bucket',
				displayName: "Create Bucket",
				value: 'createBucket',
				action: 'Create a Storage Bucket',
				description: 'Create a bucket in the current project',
			},
			{
				name: 'Delete File',
				displayName: "Delete File",
				value: 'deleteFile',
				action: 'Delete a File from Bucket by ID',
				description: 'Delete a file from a given bucket',
			},
			{
				name: 'Delete Bucket',
				displayName: "Delete Bucket",
				value: 'deleteBucket',
				action: 'Delete a Storage Bucket',
				description: 'Delete a bucket from the current project',
			},
		],
		default: 'listFiles',
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
		requiresDataPath: 'single',
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
		requiresDataPath: 'single',
		description: 'Collection to list/create documents in',
	},
	{
		displayName: 'Document ID',
		name: 'documentId',
		type: 'string',
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
		requiresDataPath: 'single',
		description: 'Document ID for collection | For creating unique() is used for generating unique ID, it can be modified for custom document Id',
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
				],
				resource: [
					'document',
				],
			},
		},
		requiresDataPath: 'multiple',
		default: '{"attributeName1":"attribute-value1", "attributeName2":"attribute-value2"}',
		description: 'Body to create document with',
	},
	{
		displayName: 'Queries',
		name: 'queries',
		type: 'fixedCollection',
		placeholder: 'Add Query',
		description: 'Queries to filter the documents by. [learn more about filtering](https://appwrite.io/docs/filters).',
		typeOptions: {
			multipleValues: true,
		},
		default: '',
		displayOptions: {
			show: {
				operation: [
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
				displayName: 'Index to Select',
				name: 'index',
				type: 'string',
				default: '',
				description: 'Index to select, if needed',
				requiresDataPath: 'single',
				// {
				// 	displayName: 'Select',
				// 	name: 'indexSelect',
				// 	type: 'list',
				// 	hint: "Begin typing your index",
				// 	typeOptions: {
				// 		searchListMethod: 'listIndexes',
				// 		searchable: true,
				// 		searchFilterRequired: false,
				// 	},
				// },
			},
			{
				displayName: 'Value 1',
				name: 'value1',
				type: 'string',
				default: '',
				requiresDataPath: 'single',
				description: 'First value for queries, such as what the index is equal to, or the first value of a between',
			},
			{
				displayName: 'Value 2',
				name: 'value2',
				type: 'string',
				default: '',
				requiresDataPath: 'single',
				description: 'Second value for between and a few other queries, ignore if not needed',
			},
			{
				displayName: 'Query',
				name: 'query',
				type: 'options',
				default: 'equal',
				options: [
					{
						name: 'Select',
						value: 'select',
						description: 'Select which attributes should be returned from a document',
					},
					{
						name: 'Equal',
						value: 'equal',
						description: 'Returns document if attribute is equal to any value in the provided array',
					},
					{
						name: 'Not Equal',
						value: 'not_equal',
						description: 'Returns document if attribute is not equal to any value in the provided array',
					},
					{
						name: 'Less Than',
						value: 'less_than',
						description: 'Returns document if attribute is less than the provided value',
					},
					{
						name: 'Less Than or Equal',
						value: 'less_than_or_equal',
						description: 'Returns document if attribute is less than or equal to the provided value',
					},
					{
						name: 'Greater Than',
						value: 'greater_than',
						description: 'Returns document if attribute is greater than the provided value',
					},
					{
						name: 'Greater Than or Equal',
						value: 'greater_than_or_equal',
						description: 'Returns document if attribute is greater than or equal to the provided value',
					},
					{
						name: 'Between',
						value: 'between',
						description: 'Returns document if attribute value falls between the two values. The boundary values are inclusive and can be strings or numbers.',
					},
					{
						name: 'Is Null',
						value: 'is_null',
						description: 'Returns documents where attribute value is null',
					},
					{
						name: 'Is Not Null',
						value: 'is_not_null',
						description: 'Returns documents where attribute value is not null',
					},
					{
						name: 'Starts With',
						value: 'starts_with',
						description: 'Returns documents if a string attributes starts with a substring',
					},
					{
						name: 'Ends With',
						value: 'ends_with',
						description: 'Returns documents if a string attributes ends with a substring',
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
		requiresDataPath: 'multiple',
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
		description: 'Whether to enable file security on bucket',
	},
	{
		displayName: 'Enabled',
		name: 'enabled',
		type: 'boolean',
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
		description: 'Whether to enable bucket',
	},
	{
		displayName: 'Maximum File Size',
		name: 'maximumFileSize',
		type: 'number',
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
		description: 'Allowed file extensions, comma-separated',
	},
	{
		displayName: 'Compression',
		name: 'compression',
		type: 'options',
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
				name: 'Gzip',
				value: 'gzip',
				description: 'Gzip compression',
			},
			{
				name: 'None',
				value: '',
				description: 'No compression',
			},
			{
				name: 'Zstd',
				value: 'zstd',
				description: 'Zstd compression',
			},
		],
		default: '',
		description: 'Compression to use on bucket',
	},
	{
		displayName: 'Encryption',
		name: 'encryption',
		type: 'boolean',
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
		description: 'Whether to enable encryption on bucket',
	},
	{
		displayName: 'Antivirus',
		name: 'antivirus',
		type: 'boolean',
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
		description: 'Whether to enable antivirus on bucket',
	},
];
