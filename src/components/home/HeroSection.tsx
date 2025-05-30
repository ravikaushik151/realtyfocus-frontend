import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const HeroSection = () => {
  return (
    <div className="relative bg-hero bg-cover bg-center h-[450px] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 w-full max-w-5xl px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Search Your Dream Home!
          </h1>
          <p className="text-white text-lg">
            Search Projects / Location / Builder
          </p>
        </div>

        <div className="bg-white/90 p-6 rounded-sm shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bangalore">Bangalore</SelectItem>
                <SelectItem value="chennai">Chennai</SelectItem>
                <SelectItem value="hyderabad">Hyderabad</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Project Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residential-apartment">Residential Apartment</SelectItem>
                <SelectItem value="residential-villas">Residential Villas</SelectItem>
                <SelectItem value="residential-plot">Residential Plot</SelectItem>
                <SelectItem value="apartment-penthouse">Residential Apartment and Penthouse</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="text"
              placeholder="Select Project / Locality / Builder"
              className="bg-white"
            />
          </div>

          <div className="flex justify-end mt-4">
            <Button className="bg-realty-red hover:bg-realty-red/90 text-white px-8">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
