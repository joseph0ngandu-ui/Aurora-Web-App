import { NextRequest, NextResponse } from 'next/server';

// Backend URL - hardcoded server-side (not exposed to client)
const BACKEND_URL = process.env.BACKEND_URL || 'https://windowsserver.taildbc5d3.ts.net';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    return proxyRequest(request, path, 'GET');
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    return proxyRequest(request, path, 'POST');
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    return proxyRequest(request, path, 'PUT');
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    return proxyRequest(request, path, 'DELETE');
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    return proxyRequest(request, path, 'PATCH');
}

async function proxyRequest(
    request: NextRequest,
    pathSegments: string[],
    method: string
) {
    try {
        // Reconstruct the path
        const path = pathSegments.join('/');

        // Get query parameters
        const searchParams = request.nextUrl.searchParams;
        const queryString = searchParams.toString();

        // Build the full backend URL
        const backendUrl = `${BACKEND_URL}/${path}${queryString ? `?${queryString}` : ''}`;

        console.log(`[Proxy] ${method} ${backendUrl}`);

        // Get request body for POST/PUT/PATCH
        let body = null;
        if (['POST', 'PUT', 'PATCH'].includes(method)) {
            try {
                body = await request.text();
            } catch (e) {
                // No body or already consumed
            }
        }

        // Forward headers (excluding host and connection headers)
        const headers: HeadersInit = {};
        request.headers.forEach((value, key) => {
            const lowerKey = key.toLowerCase();
            if (!['host', 'connection', 'content-length'].includes(lowerKey)) {
                headers[key] = value;
            }
        });

        // Make the request to the backend
        const response = await fetch(backendUrl, {
            method,
            headers: {
                ...headers,
                'Content-Type': 'application/json',
            },
            body: body || undefined,
        });

        // Get response body
        const responseText = await response.text();

        // Forward the response
        return new NextResponse(responseText, {
            status: response.status,
            statusText: response.statusText,
            headers: {
                'Content-Type': response.headers.get('Content-Type') || 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
    } catch (error) {
        console.error('[Proxy] Error:', error);
        return NextResponse.json(
            { error: 'Proxy error', message: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}
