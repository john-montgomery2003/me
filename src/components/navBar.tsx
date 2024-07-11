"use client";

import { useState } from 'react';
import Link from 'next/link';

const links = ["BLOG", "PROJECTS"];

const NavLink = ({ text }: { text: string }) => (
    <Link href={`/${text.toLowerCase()}`}>
        <div className="text-accent flex flex-col items-center space-y-1 hover:pl-4 transition-all duration-300">
            {text.split('').map((char, index) => (
                <span key={index}>{char}</span>
            ))}
        </div>
    </Link>
);

const HamburgerMenu = ({ isOpen, onClick }: { isOpen: boolean, onClick: () => void }) => (
    <div onClick={onClick} className="fixed top-0 left-0 p-4 z-50 cursor-pointer md:hidden">
        {isOpen ? (
            <div className="text-accent text-4xl">x</div>
        ) : (
            <>
                <div className="w-8 h-1 bg-tertiary mb-1"></div>
                <div className="w-8 h-1 bg-tertiary mb-1"></div>
                <div className="w-8 h-1 bg-tertiary"></div>
            </>
        )}
    </div>
);

const MobileMenu = ({ links, onClose }: { links: string[], onClose: () => void }) => (
    <div className="fixed inset-0 bg-tertiary flex flex-col justify-center items-center z-40">
        {links.map((link, index) => (
            <div key={index} className="w-full">
                <Link href={`/${link.toLowerCase()}`} onClick={onClose}>
                    <div className="text-accent flex justify-center items-center text-3xl py-4">
                        {link}
                    </div>
                </Link>
            </div>
        ))}
    </div>
);

export default function NavBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleHamburgerClick = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleCloseMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <HamburgerMenu isOpen={isMobileMenuOpen} onClick={handleHamburgerClick} />
            {isMobileMenuOpen && <MobileMenu links={links} onClose={handleCloseMobileMenu} />}
            <div className="fixed top-0 left-0 pt-12 w-12 h-screen bg-tertiary flex flex-col justify-around items-center text-white hidden md:flex">
                {links.map((link, index) => (
                    <NavLink key={index} text={link} />
                ))}
            </div>
        </>
    );
}
