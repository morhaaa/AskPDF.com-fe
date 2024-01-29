import { Skeleton } from "@/components/ui/skeleton";

const SkeletonsPreview = () => {
  const skeletonsArray = Array.from({ length: 4 });

  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 grid-flow-row mt-4">
      {skeletonsArray.map((_, index) => (
        <Skeleton key={index} className="w-full h-32 shadow-md" />
      ))}
    </section>
  );
};

export default SkeletonsPreview;
