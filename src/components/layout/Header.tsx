import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="header-navigation container">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="relative">
          <Image
            src="/images/logo-light.png"
            alt="Realty Focus"
            width={130}
            height={50}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link href="/" className="nav-link font-medium text-sm text-sm">
            HOME
          </Link>
          <Link href="/about" className="nav-link font-medium text-sm">
            ABOUT US
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="nav-link font-medium text-sm focus:outline-none">
              POST
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/buy-properties" className="w-full">
                  BUY PROPERTIES
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/sell-properties-in-bangalore" className="w-full">
                  SELL PROPERTIES
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/rent-properties-in-bangalore" className="w-full">
                  RENT PROPERTIES
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/projects" className="nav-link font-medium text-sm">
            PROJECTS
          </Link>
          <Link href="/builders" className="nav-link font-medium text-sm">
            BUILDERS
          </Link>
          <Link href="/blogs" className="nav-link font-medium text-sm">
            BLOGS
          </Link>
          <Link href="/contact" className="nav-link font-medium text-sm">
            CONTACT US
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col space-y-4 mt-8">
              <Link href="/" className="nav-link font-medium text-sm py-2">
                HOME
              </Link>
              <Link href="/about" className="nav-link font-medium text-sm py-2">
                ABOUT US
              </Link>
              <div className="flex flex-col">
                <div className="nav-link font-medium text-sm py-2">POST</div>
                <Link href="/buy-properties" className="nav-link font-medium text-sm py-2 pl-4">
                  BUY PROPERTIES
                </Link>
                <Link href="/sell-properties-in-bangalore" className="nav-link font-medium text-sm py-2 pl-4">
                  SELL PROPERTIES
                </Link>
                <Link href="/rent-properties-in-bangalore" className="nav-link font-medium text-sm py-2 pl-4">
                  RENT PROPERTIES
                </Link>
              </div>
              <Link href="/projects" className="nav-link font-medium text-sm py-2">
                PROJECTS
              </Link>
              <Link href="/builders" className="nav-link font-medium text-sm py-2">
                BUILDERS
              </Link>
              <Link href="/blogs" className="nav-link font-medium text-sm py-2">
                BLOGS
              </Link>
              <Link href="/contact" className="nav-link font-medium text-sm py-2">
                CONTACT US
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
