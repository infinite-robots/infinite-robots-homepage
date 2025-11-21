import Image from "next/image";

interface ProfileCardProps {
  name: string;
  title: string;
  bio: string;
  imageUrl?: string;
}

export function ProfileCard({ name, title, bio, imageUrl }: ProfileCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50 md:flex-row md:gap-5">
      <div className="shrink-0">
        {imageUrl ? (
          <div className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-zinc-200 dark:ring-zinc-700 md:h-24 md:w-24">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 80px, 96px"
            />
          </div>
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-200 text-xs font-semibold uppercase tracking-wide text-zinc-500 ring-2 ring-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700 md:h-24 md:w-24">
            Photo
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div>
          <h3 className="text-lg font-semibold tracking-tight md:text-xl">
            {name}
          </h3>
          <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400 md:text-sm">
            {title}
          </p>
        </div>
        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 md:text-base">
          {bio}
        </p>
      </div>
    </article>
  );
}
