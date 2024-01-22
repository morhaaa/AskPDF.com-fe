import Intro from "@/components/intro";
import Features from "@/components/features";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-y-8">
      <Navbar />
      <Intro />
      <Features />
    </main>
  );
}
