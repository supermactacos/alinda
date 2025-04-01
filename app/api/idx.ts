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
  // Add other fields as needed based on your IDX response
}

interface IDXError {
  status: number;
  message: string;
}

export async function fetchCondoProperties(): Promise<Property[] | IDXError> {
  try {
    const response = await fetch('/api/properties');

    const data = await response.json();

    if (!response.ok) {
      return {
        status: response.status,
        message: data.message || 'An unexpected error occurred'
      };
    }

    return data as Property[];
  } catch (error) {
    console.error('Error fetching IDX properties:', error);
    return {
      status: 500,
      message: 'Internal server error while fetching properties',
    };
  }
}

function getErrorMessage(status: number): string {
  switch (status) {
    case 401:
      return 'Invalid or revoked API key';
    case 403:
      return 'Access to this method is restricted';
    case 412:
      return 'Hourly API access limit exceeded';
    case 404:
      return 'Invalid API endpoint';
    default:
      return 'An unexpected error occurred';
  }
} 