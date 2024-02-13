import Intro from "@/components/intro";
import Features from "@/components/features";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-y-8 bg-gradient-to-br from-white via-zinc-100 to-white">
      <Navbar />
      <Intro />
      <Features />
    </main>
  );
}
