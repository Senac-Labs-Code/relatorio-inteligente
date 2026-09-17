export default function BolinhaStatus() {
  return (
    <span className="relative mt-2 flex h-1.5 w-1.5 sm:mt-1">
      <span className="absolute inset-0 h-full w-full animate-ping rounded-full bg-(--tinta-3)" />
      <span className="relative h-1.5 w-1.5 rounded-full bg-(--color-primaria)" />
    </span>
  );
}
