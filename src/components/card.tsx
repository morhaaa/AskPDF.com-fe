import React from "react";
import { ReactNode } from "react";

interface CardProps {
  title: string;
  logo: ReactNode;
  subtitle: string;
  button?: string
}

const Card: React.FC<CardProps> = ({ title, logo, subtitle }) => {
  return (
    <div className="bg-gradient-to-br from-black/20 to-slate-600/70 border border-slate-400 rounded-lg overflow-hidden shadow-xl cursor-pointer p-10">
      <div className="flex flex-col items-center gap-y-6 text-center text-white ">
        <div className="bg-violet-500 border border-slate-600 rounded-full drop-shadow-xl p-8">
          {logo}
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-slate-300">{subtitle}</p>
        </div>
      </div>
      {/* BUTTON ??*/}
    </div>
  );
};

export default Card;
