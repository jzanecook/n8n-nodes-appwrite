import { INodeProperties } from "n8n-workflow";

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
