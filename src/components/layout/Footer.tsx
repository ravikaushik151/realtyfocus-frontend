import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const Footer = () => {
  return (
    <footer className="bg-footer bg-cover bg-no-repeat">
      <div className="footer-section container">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Location Links */}
          <div>
            <h3 className="footer-heading">LOCATION</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/location/whitefield" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Whitefield
                </Link>
              </li>
              <li>
                <Link href="/location/sarjapur-road" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Sarjapur-road
                </Link>
              </li>
              <li>
                <Link href="/location/devanahalli" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Devanahalli
                </Link>
              </li>
              <li>
                <Link href="/location/electronic-city" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Electronic-City
                </Link>
              </li>
              <li>
                <Link href="/location/yelahanka" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Yelahanka
                </Link>
              </li>
              <li>
                <Link href="/location/bannerghatta-road" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Bannerghatta-Road
                </Link>
              </li>
              <li>
                <Link href="/location/sarjapur" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Sarjapur
                </Link>
              </li>
              <li>
                <Link href="/location/hennur-road" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Hennur-Road
                </Link>
              </li>
              <li>
                <Link href="/location/hoskote" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Hoskote
                </Link>
              </li>
              <li>
                <Link href="/location/kanakapura-road" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Kanakapura-road
                </Link>
              </li>
              <li>
                <Link href="/location/old-madras-road" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Old-madras-road
                </Link>
              </li>
              <li>
                <Link href="/location/jp-nagar" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> JP-Nagar
                </Link>
              </li>
              <li>
                <Link href="/location/hebbal" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Hebbal
                </Link>
              </li>
              <li>
                <Link href="/location/electronic-city-phase-i" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Electronic-city-phase-i
                </Link>
              </li>
              <li>
                <Link href="/location/mysore-road" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Mysore-Road
                </Link>
              </li>
            </ul>
          </div>

          {/* Builder Links */}
          <div>
            <h3 className="footer-heading">BUILDER</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/builders/brigade-group" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Brigade-group
                </Link>
              </li>
              <li>
                <Link href="/builders/prestige-group" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Prestige-group
                </Link>
              </li>
              <li>
                <Link href="/builders/ds-max-properties" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Ds-max-properties
                </Link>
              </li>
              <li>
                <Link href="/builders/sobha-developers" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Sobha-Developers
                </Link>
              </li>
              <li>
                <Link href="/builders/puravankara" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Puravankara
                </Link>
              </li>
              <li>
                <Link href="/builders/shriram-properties" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Shriram-properties
                </Link>
              </li>
              <li>
                <Link href="/builders/assetz-homes" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Assetz-homes
                </Link>
              </li>
              <li>
                <Link href="/builders/sattva-group" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Sattva-group
                </Link>
              </li>
              <li>
                <Link href="/builders/mahaveer-group" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Mahaveer-group
                </Link>
              </li>
              <li>
                <Link href="/builders/adarsh-developers" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Adarsh-Developers
                </Link>
              </li>
              <li>
                <Link href="/builders/godrej-group" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Godrej-group
                </Link>
              </li>
              <li>
                <Link href="/builders/century-real-estate" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Century-real-estate
                </Link>
              </li>
              <li>
                <Link href="/builders/unishire-groups" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Unishire-groups
                </Link>
              </li>
              <li>
                <Link href="/builders/dsr-group" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Dsr-group
                </Link>
              </li>
              <li>
                <Link href="/builders/aratt-builders" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Aratt-Builders
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="footer-heading">PROPERTY TYPE</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/type/residential-plot" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Residential Plot
                </Link>
              </li>
              <li>
                <Link href="/type/residential-apartment" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Residential Apartment
                </Link>
              </li>
              <li>
                <Link href="/type/residential-villas" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Residential Villas
                </Link>
              </li>
              <li>
                <Link href="/type/residential-apartment-and-penthouse" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Residential Apartment and Penthouse
                </Link>
              </li>
              <li>
                <Link href="/type/town-house" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Town house
                </Link>
              </li>
              <li>
                <Link href="/type/row-house" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Row House
                </Link>
              </li>
              <li>
                <Link href="/status/under-construction" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Under Construction
                </Link>
              </li>
              <li>
                <Link href="/status/completed" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Completed
                </Link>
              </li>
              <li>
                <Link href="/status/coming-soon" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Coming Soon
                </Link>
              </li>
            </ul>

            <h3 className="footer-heading mt-6">CLASSIFICATION</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/classification/1bhk" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> 1 BHK
                </Link>
              </li>
              <li>
                <Link href="/classification/2bhk" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> 2 BHK
                </Link>
              </li>
              <li>
                <Link href="/classification/3bhk" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> 3 BHK
                </Link>
              </li>
              <li>
                <Link href="/classification/4bhk" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> 4 BHK
                </Link>
              </li>
              <li>
                <Link href="/classification/5bhk" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> 5 BHK
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links and Contact Form */}
          <div>
            <h3 className="footer-heading">QUICK LINKS</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <Link href="/" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> About Us
                </Link>
              </li>
              <li>
                <Link href="/projects" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Projects
                </Link>
              </li>
              <li>
                <Link href="/buy-properties" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Buy Property
                </Link>
              </li>
              <li>
                <Link href="/sell-properties" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Sell Property
                </Link>
              </li>
              <li>
                <Link href="/rent-properties" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Rent Property
                </Link>
              </li>
              <li>
                <Link href="/builders" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Builders
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/area-converter" className="footer-link text-sm flex items-center">
                  <span className="mr-2">◾</span> Area Converter
                </Link>
              </li>
            </ul>

            <h3 className="footer-heading">CONTACT US</h3>
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Name"
                className="bg-transparent border-gray-600 text-white placeholder:text-gray-400"
              />
              <Input
                type="email"
                placeholder="Email"
                className="bg-transparent border-gray-600 text-white placeholder:text-gray-400"
              />
              <div className="flex gap-2">
                <select className="bg-transparent border border-gray-600 rounded text-white placeholder:text-gray-400 w-1/3">
                  <option value="india">(+91)</option>
                </select>
                <Input
                  type="tel"
                  placeholder="Phone"
                  className="bg-transparent border-gray-600 text-white placeholder:text-gray-400 w-2/3"
                />
              </div>
              <Textarea
                placeholder="Message"
                className="bg-transparent border-gray-600 text-white placeholder:text-gray-400"
              />
              <Button className="bg-realty-red hover:bg-realty-red/90 text-white">
                Submit
              </Button>
            </div>

            <div className="flex space-x-2 mt-6">
              <Link
                href="https://www.facebook.com"
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white"
              >
                f
              </Link>
              <Link
                href="https://www.twitter.com"
                className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white"
              >
                t
              </Link>
              <Link
                href="https://www.google.com"
                className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white"
              >
                g
              </Link>
              <Link
                href="https://www.linkedin.com"
                className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white"
              >
                in
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="py-4 text-center text-white bg-realty-navy">
        <p>© Copyright 2024 Realty Focus. All Rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
