import React from "react";
import Link from "next/link";
import Logo from "../Logo";
import { MailIcon } from "lucide-react";
import FooterCols from "@/shared/components/footer/FooterCols";
import { useTranslations } from "next-intl";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import LanguageSwitcher from "@/shared/components/footer/LanguageSwitcher";

const Footer = () => {
    const t = useTranslations("Footer");

    const socialLinks = [
        { icon: FaFacebook, href: "https://facebook.com", label: t("social.facebook") },
        { icon: FaInstagram, href: "https://instagram.com", label: t("social.instagram") },
        { icon: MailIcon, href: "mailto:contact@pawsitive-adopting.com", label: t("social.email") },
    ];

    return (
        <footer className="w-full border-t bg-background">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Top Section */}
                <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12">
                    {/* Brand Section */}
                    <div className="space-y-4 lg:max-w-sm">
                        <Logo size="md" />
                        <p className="text-sm text-muted-foreground">
                            {t("brand.description")}
                        </p>
                    </div>
                    {/* Links Columns */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
                        <FooterCols />
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* Copyright */}
                        <p className="text-sm text-muted-foreground">
                            {t("copyright", { year: 2025 })}
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <Link
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="text-muted-foreground hover:text-secondary transition-colors"
                                    >
                                        <Icon className="size-5" />
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Switcher */}
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;