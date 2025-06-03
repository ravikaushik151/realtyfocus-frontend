'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

export default function EnquiryForm() {
    return (
        <div className="bg-white p-6 rounded-md shadow-md sticky top-4">
            <h2 className="text-xl font-bold mb-4 text-realty-navy">Enquire Now</h2>
            <form className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input id="name" type="text" className="form-input" placeholder="Enter your name" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input id="email" type="email" className="form-input" placeholder="Enter your email" />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input id="phone" type="tel" className="form-input" placeholder="Enter your phone number" />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea id="message" className="form-textarea" rows={4} placeholder="Enter your message"></textarea>
                </div>
                <Button className="w-full bg-realty-red hover:bg-realty-red/90 text-white">
                    Submit Enquiry
                </Button>
            </form>
        </div>
    );
}