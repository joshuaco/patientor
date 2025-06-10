import { Heart } from 'lucide-react';

const HEALTHBAR_TEXTS = [
  'The patient is in great shape',
  'The patient has a low risk of getting sick',
  'The patient has a high risk of getting sick',
  'The patient has a diagnosed condition',
];

function HealthRatingBar({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Heart
          key={index}
          className={`w-4 h-4 ${
            index < rating ? 'text-red-500 fill-red-400' : 'text-gray-300'
          }`}
        />
      ))}
      <p className="text-sm text-gray-500 sr-only">
        {HEALTHBAR_TEXTS[rating - 1]}
      </p>
    </div>
  );
}

export default HealthRatingBar;
