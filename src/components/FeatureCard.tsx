import Image from "next/image"

interface FeatureCardProps {
  title: string
  desc: string
  image: string
}

export default function FeatureCard({ title, desc, image }: FeatureCardProps): JSX.Element {
  return (
    <div className="flex flex-col items-center text-center p-4 w-36 hover:shadow-md hover:-translate-y-1 transition">
      {/* Icon / Image */}
      <Image
        src={image}
        alt={`${title} icon`}
        width={40}
        height={40}
        className="object-contain mb-2 rounded-xl"
        priority
      />

      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-800">{title}</h3>

      {/* Description */}
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
  )
}
