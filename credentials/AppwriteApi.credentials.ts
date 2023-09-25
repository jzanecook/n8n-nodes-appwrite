import {
	IAuthenticate,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class AppwriteApi implements ICredentialType {
	name = 'appwriteApi';
	displayName = 'Appwrite API';
	documentationUrl = 'https://appwrite.io';
	icon = 'file:Appwrite.svg';
	properties: INodeProperties[] = [
		{
			displayName: 'Appwrite Server URL',
			name: 'url',
			type: 'string',
			default: '',
			placeholder: 'https://api.appwrite.io',
		},
		{
			displayName: 'Project ID',
			name: 'projectId',
			type: 'string',
			default: '',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
	authenticate: IAuthenticate = {
		type: 'generic',
		properties: {
			headers: {
				'X-Appwrite-Project': '={{$credentials.projectId}}',
				'Content-Type': 'application/json',
				'X-Appwrite-Key': '={{$credentials.apiKey}}',
			},
		},
	};
	test = {
		request: {
			baseURL: '={{$credentials?.url}}',
			url: '/health',
		},
	};
}
