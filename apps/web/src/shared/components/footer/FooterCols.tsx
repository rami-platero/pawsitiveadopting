import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react'

const FooterCols = () => {

    const tNav = useTranslations("Navbar");
    const tFooter = useTranslations("Footer");

    const footerCols = [
        {
            title: tFooter("explore.title"),
            links: [
                { title: tNav("links.browse.title"), href: tNav("links.browse.link") },
                { title: tNav("links.associations.title"), href: tNav("links.associations.link") },
                { title: tNav("links.about.title"), href: tNav("links.about.link") },
            ]
        },
        {
            title: tFooter("company.title"),
            links: [
                { title: tFooter("company.contact"), href: "/contact" },
                { title: tFooter("company.careers"), href: "/careers" },
                { title: tFooter("company.blog"), href: "/blog" },
            ]
        },
        {
            title: tFooter("legal.title"),
            links: [
                { title: tFooter("legal.privacy"), href: "/privacy" },
                { title: tFooter("legal.terms"), href: "/terms" },
                { title: tFooter("legal.cookies"), href: "/cookies" },
            ]
        },


    ];

    return footerCols.map((col, index) => (
        <div key={index} className="space-y-4">
            <div className="space-y-4">
                <h3 className="font-semibold text-sm text-secondary">{col.title}</h3>
                <ul className="space-y-3">
                    {col.links.map((link) => (
                        <li key={link.title}>
                            <Link
                                href={link.href}
                                className="text-sm text-muted-foreground hover:text-secondary transition-colors"
                            >
                                {link.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    ))
}

export default FooterCols