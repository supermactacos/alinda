import Link from "next/link"

interface TeamMemberCardProps {
  name: string;
  email: string;
  image: string;
  viewListings?: boolean;
}

export function TeamMemberCard({ name, email, image, viewListings }: TeamMemberCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <div className="flex flex-col items-center text-center">
        <img
          src={image}
          alt={name}
          className="w-48 h-48 object-cover rounded-lg mb-4"
        />
        <h3 className="text-2xl font-semibold mb-2">{name}</h3>
        <a href={`mailto:${email}`} className="text-green-900 hover:underline mb-3">
          {email}
        </a>
        {viewListings && (
          <Link href="#" className="text-green-900 hover:underline block">
            View Listings →
          </Link>
        )}
        <Link href="#" className="text-green-900 hover:underline block mt-2">
          Read Full Bio →
        </Link>
      </div>
    </div>
  )
} 