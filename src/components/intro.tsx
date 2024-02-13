"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useTranslations from "@/hooks/useTranslations";

const Intro = () => {
  const { t } = useTranslations();
  const dictionary = t.intro;

  return (
    <div className="pt-20 px-10 rounded-2xl bg-gradient-to-b from-white to-white/10 flex flex-col items-center gap-y-12 max-w-6xl">
      <div className="text-center flex flex-col items-center gap-y-6">
        <h1 className="text-5xl font-bold md:text-5xl lg:text-6xl px-4 md:px-5 lg:px-6">
          {dictionary.startConversation}{" "}
          <span className="text-blue-600">{dictionary.documents}</span>.
        </h1>
        <p className="text-zinc-600 sm:text-lg font-medium">
          {dictionary.empowerPDFs}
        </p>
        <Button size="lg">
          <Link
            href="/dashboard"
            className="flex items-center font-bold gap-x-2"
          >
            {dictionary.getStarted} <ArrowRight />
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
