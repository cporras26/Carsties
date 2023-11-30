type Props = {
  title: string;
  subtitle?: string;
  center?: boolean;
};

export default function Heading({ title, subtitle, center }: Props) {
  return (
    <div>
      <div className="text-sm font-bold sm:text-base md:text-xl lg:text-2xl">
        {title}
      </div>
      {subtitle && (
        <div className="mt-2 text-xs font-light text-neutral-500 sm:text-sm md:text-base">
          {subtitle}
        </div>
      )}
    </div>
  );
}
