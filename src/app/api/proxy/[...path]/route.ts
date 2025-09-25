import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'http://o-complex.com:1337';

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
	const params = await context.params;
	return handleRequest(request, params.path, 'GET');
}

export async function POST(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
	const params = await context.params;
	return handleRequest(request, params.path, 'POST');
}

export async function PUT(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
	const params = await context.params;
	return handleRequest(request, params.path, 'PUT');
}

export async function DELETE(
	request: NextRequest,
	context: { params: Promise<{ path: string[] }> }
) {
	const params = await context.params;
	return handleRequest(request, params.path, 'DELETE');
}

async function handleRequest(request: NextRequest, pathSegments: string[], method: string) {
	try {
		const path = pathSegments.join('/');
		const url = new URL(path, API_BASE_URL);

		request.nextUrl.searchParams.forEach((value, key) => {
			url.searchParams.set(key, value);
		});

		const headers: HeadersInit = {
			'Content-Type': 'application/json',
		};

		let body;
		if (method !== 'GET' && method !== 'DELETE') {
			body = await request.text();
		}

		const response = await fetch(url.toString(), {
			method,
			headers,
			body,
		});

		const data = await response.json();

		return NextResponse.json(data, {
			status: response.status,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type',
			},
		});
	} catch (error) {
		console.error('Proxy error:', error);
		return NextResponse.json({ error: 'Proxy request failed' }, { status: 500 });
	}
}

export async function OPTIONS() {
	return new NextResponse(null, {
		status: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		},
	});
}
