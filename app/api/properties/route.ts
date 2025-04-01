import { NextResponse } from 'next/server';

interface Property {
  listingID: string;
  address: string;
  zip: string;
  propertyType: string;
  propertySubType: string;
  price: number;
  beds: number;
  baths: number;
  photos: string[];
  agentInfo: {
    name: string;
    phone: string;
    email: string;
  };
}

interface IDXError {
  status: number;
  message: string;
}

const IDX_BASE_URL = 'https://api.idxbroker.com';

function getErrorMessage(status: number): string {
  switch (status) {
    case 401:
      return 'Invalid or revoked API key';
    case 403:
      return 'Access to this method is restricted';
    case 406:
      return 'Valid ancillary key is required';
    case 412:
      return 'Hourly API access limit exceeded';
    case 404:
      return 'Invalid API endpoint';
    default:
      return 'An unexpected error occurred';
  }
}

export async function GET() {
  if (!process.env.KEY) {
    return NextResponse.json(
      { message: 'API key is not configured' },
      { status: 500 }
    );
  }

  try {
    // First, get available MLS feeds
    const mlsResponse = await fetch(`${IDX_BASE_URL}/mls/listcomponents`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accesskey': process.env.KEY
      }
    });

    if (!mlsResponse.ok) {
      const errorText = await mlsResponse.text();
      console.error('IDX MLS Error:', mlsResponse.status, errorText);
      return NextResponse.json(
        { message: 'Failed to get MLS components' },
        { status: mlsResponse.status }
      );
    }

    const mlsComponents = await mlsResponse.json();
    console.log('Available MLS components:', mlsComponents);

    // Then get available methods for the MLS component
    const methodsResponse = await fetch(`${IDX_BASE_URL}/mls/listmethods`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accesskey': process.env.KEY
      }
    });

    if (!methodsResponse.ok) {
      const errorText = await methodsResponse.text();
      console.error('IDX Methods Error:', methodsResponse.status, errorText);
      return NextResponse.json(
        { message: 'Failed to get MLS methods' },
        { status: methodsResponse.status }
      );
    }

    const methods = await methodsResponse.json();
    console.log('Available MLS methods:', methods);

    // Now try to get properties with the first available MLS ID
    const url = new URL(`${IDX_BASE_URL}/mls/listings`);
    const params = new URLSearchParams();
    params.append('zip', '33480');

    const response = await fetch(`${url}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accesskey': process.env.KEY
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('IDX API Error:', response.status, errorText);
      console.error('Request URL:', `${url}?${params.toString()}`);
      console.error('Request Headers:', {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accesskey': 'HIDDEN'
      });
      
      return NextResponse.json(
        { message: getErrorMessage(response.status) },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Search response:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching IDX properties:', error);
    return NextResponse.json(
      { message: 'Internal server error while fetching properties' },
      { status: 500 }
    );
  }
} 