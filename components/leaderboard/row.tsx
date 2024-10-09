import NextImage from "next/image";

interface IContributorProps {
  avatarSrc: string | null;
  username: string;
  name?: string;
}
export const Contributor = ({
  avatarSrc,
  username,
  name,
}: IContributorProps) => {
  return (
    <div className="flex md:gap-4" color="foreground">
      <Contributor.Avatar alt={`${username} avatar`} src={avatarSrc} />
      <div className="flex flex-col justify-center items-start w-36">
        <h2 className="w-fit text-base font-semibold leading-none truncate">
          {name ?? username}
        </h2>
        {name && (
          <p className="w-fit text-small text-default-500 truncate">
            {username}
          </p>
        )}
      </div>
    </div>
  );
};

interface IAvatarProps {
  alt: string;
  src: string | null;
}

const Avatar = ({ alt, src }: IAvatarProps) => {
  return (
    <div className="relative border bg-foreground overflow-hidden rounded-full min-w-[45px] min-h-[45px] shrink-0 flex items-center justify-center">
      {src !== null && (
        <NextImage
          className="pointer-events-none absolute -left-0 -top-0 h-[45px] w-[45px] max-w-[initial] transition-opacity z-10 opacity-100 object-cover object-center"
          src={src}
          alt={alt}
          height={40}
          width={40}
        />
      )}
    </div>
  );
};

Contributor.Avatar = Avatar;
