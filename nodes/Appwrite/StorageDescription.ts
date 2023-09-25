import { INodeProperties } from "n8n-workflow";

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
				name: 'Create Bucket',
				displayName: "Create Bucket",
				value: 'createBucket',
				action: 'Create a Storage Bucket',
				description: 'Create a bucket in the current project',
			},
			{
				name: 'Create File',
				displayName: "Create Files",
				value: 'createFile',
				action: 'Create a File in Bucket',
				description: 'Create a file in a given bucket',
			},
			{
				name: 'Delete Bucket',
				displayName: "Delete Bucket",
				value: 'deleteBucket',
				action: 'Delete a Storage Bucket',
				description: 'Delete a bucket from the current project',
			},
			{
				name: 'Delete File',
				displayName: "Delete File",
				value: 'deleteFile',
				action: 'Delete a File from Bucket by ID',
				description: 'Delete a file from a given bucket',
			},
			{
				name: 'Get File',
				displayName: "Get File",
				value: 'getFile',
				action: 'Get a File from Bucket by ID',
				description: 'Get a file from a given bucket',
			},
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
		],
		default: 'listFiles',
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
