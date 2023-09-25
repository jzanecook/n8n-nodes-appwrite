import { INodeProperties } from "n8n-workflow";

export const functionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		noDataExpression: true,
		type: 'options',
		required: true,
		options: [
			{
				name: 'Execute Function',
				displayName: "Execute Function",
				value: 'executeFunction',
				action: 'Execute function',
				description: 'Execute a given function and output its result',
			},
			{
				name: 'Get Function',
				displayName: "Get Function",
				value: 'getFunction',
				action: 'Get function',
				description: 'Get a Function in the current project',
			},
			{
				name: 'List Functions',
				displayName: "List Functions",
				value: 'listFunctions',
				action: 'List functions',
				description: 'List Functions in the current project',
			},
		],
		default: 'executeFunction',
		displayOptions: {
			show: {
				resource: [
					'function',
				],
			},
		},
	},
];

export const functionFields: INodeProperties[] = [
	{
		displayName: 'Function ID',
		name: 'functionId',
		type: 'string',
		required: true,
		requiresDataPath: 'single',
		description: 'Function ID to get or execute',
		displayOptions: {
			show: {
				resource: [
					'function',
				],
				operation: [
					'executeFunction',
					'getFunction',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Data',
		name: 'data',
		type: 'json',
		requiresDataPath: 'multiple',
		description: 'Data to send to function',
		displayOptions: {
			show: {
				resource: [
					'function',
				],
				operation: [
					'executeFunction',
				],
			},
		},
		default: '',
	},
];
