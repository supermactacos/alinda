'use client';

import { useEffect, useState } from 'react';
import { fetchCondoProperties } from '@/app/api/idx';

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

export function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProperties() {
      const result = await fetchCondoProperties();
      
      if ('status' in result) {
        setError(result.message);
      } else {
        setProperties(result);
      }
      setLoading(false);
    }

    loadProperties();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading properties...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center py-8">{error}</div>;
  }

  if (properties.length === 0) {
    return <div className="text-center py-8">No properties found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div key={property.listingID} className="bg-white rounded-lg shadow-md overflow-hidden">
          {property.photos[0] && (
            <div className="relative h-48">
              <img
                src={property.photos[0]}
                alt={property.address}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{property.address}</h3>
            <div className="text-gray-600 mb-2">
              <span className="font-medium">${property.price.toLocaleString()}</span>
            </div>
            <div className="text-sm text-gray-500">
              <div>{property.beds} Beds • {property.baths} Baths</div>
              <div>{property.propertySubType}</div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-sm">
                <div>{property.agentInfo.name}</div>
                <div>{property.agentInfo.phone}</div>
                <a href={`mailto:${property.agentInfo.email}`} className="text-green-700 hover:underline">
                  {property.agentInfo.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 