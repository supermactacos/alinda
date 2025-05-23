import Link from "next/link"

interface TeamMemberCardProps {
  name: string;
  email: string;
  image: string;
  readFullBio?: boolean;
  bioLink?: string;
}

export function TeamMemberCard({ name, email, image, readFullBio = true, bioLink }: TeamMemberCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <div className="flex flex-col items-center text-center">
        <img
          src={image}
          alt={name}
          className="w-48 h-48 object-cover rounded-lg mb-4"
        />
        <h3 className="text-3xl font-semibold mb-2">{name}</h3>
        <a href={`mailto:${email}`} className="text-green-900 hover:underline mb-3 text-lg">
          {email}
        </a>
        {readFullBio && (
          bioLink ? (
            <Link href={bioLink} className="text-green-900 hover:underline block mt-2 text-lg">
              Read Full Bio →
            </Link>
          ) : (
            <span className="text-gray-400 block mt-2 text-lg">Bio Coming Soon</span>
          )
        )}
      </div>
    </div>
  )
} 