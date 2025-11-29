"use client";

import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";

export default function HomePage() {
  const t = useTranslations("HomePage.heroSection");

  return (
    <section className="w-full">
      <div className="min-h-[calc(100vh-68px)] flex flex-col items-center justify-center mx-4">
        <div className="max-w-6xl w-full flex flex-col items-center text-center gap-6 ">
          <div className="text-secondary">
            {/* Subtitle */}
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-foreground">
              <div className="w-8 h-px bg-foreground"></div>
              <span>{t("subtitle")}</span>
              <div className="w-8 h-px bg-foreground"></div>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-balance leading-tight">
              {t("title")}
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl font-medium text-foreground/80 max-w-3xl mx-auto leading-relaxed mt-4">
              {t("description")}
            </p>
          </div>

          <div className="relative w-full max-w-2xl">
            <div className="absolute left-0 top-0 z-0 bg-secondary pl-4 pr-6 py-7 rounded-2xl flex flex-row gap-2 text-white items-center ">
              <MapPin size={14} className="-mt-6" />
              <span className="text-white text-xs font-medium -mt-6">
                {t("input.label")}
              </span>
            </div>

            <div className="relative z-10 flex items-center gap-3 pt-7">
              <input
                type="text"
                placeholder={t("input.placeholder")}
                className="flex-1 rounded-2xl border-2 border-secondary bg-background px-8 py-3 text-base placeholder-secondary"
              />
              <Button className="rounded-2xl bg-red-300 hover:bg-red-400 text-black font-semibold px-8 py-3 h-auto text-sm absolute right-1">
                {t("input.button")}
              </Button>
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col items-center gap-4 pt-4">
            <p className="text-sm text-foreground">
              {t("cta.title")}
            </p>
            <Link
              href="/association-signup"
              className="px-8 py-3 bg-secondary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              {t("cta.link")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
