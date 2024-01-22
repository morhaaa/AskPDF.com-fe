import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Intro = () => {
  return (
    <div className="pt-20 px-10 rounded-2xl bg-gradient-to-b from-gray-100 to-gray-100/10 flex flex-col items-center gap-y-12 max-w-6xl">
      <div className="text-center flex flex-col items-center gap-y-6">
        <h1 className="text-5xl font-bold md:text-5xl lg:text-6xl">
          Start a Conversation with <br /> Your{" "}
          <span className="text-blue-600"> Documents </span> .
        </h1>
        <p className="text-zinc-600 sm:text-lg font-medium">
          Empower Your PDFs with AI - Chat, Inquire, and Unlock the Intelligence
          Within Your Documents
        </p>
        <Button size="lg">
          <Link href="/dashboard" className="flex items-center gap-x-2">
            Get Started <ArrowRight />
          </Link>
        </Button>
      </div>
      {/* Preview */}
      <div className="max-w-6xl px-6 lg:px-8">
        <Image
          src="/dashboard-preview.jpg"
          width={1364}
          height={866}
          alt="preview"
          className="rounded-xl bg-gray-900/5 lg:rounded-2xl drop-shadow-xl"
        />
      </div>
    </div>
  );
};

export default Intro;
