'use client';
import { useState } from 'react';

interface Specification {
    name: string;
    description: string;
    image?: string;
}

interface Props {
    spec: Specification[];
}

export default function SpecificationsAccordion({ spec }: Props) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!Array.isArray(spec) || spec.length === 0) {
        return (
            <div className="bg-white p-6 rounded-md shadow-md mb-6">
                <p className="text-gray-500">No specifications available.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-md shadow-md mb-6" id="specifications">
            <h2 className="text-xl font-bold mb-4 text-realty-navy">Specifications</h2>
            <div className="divide-y divide-gray-200">
                {spec.map((item, index) => (
                    <div key={index} className="">
                        <button
                            onClick={() => toggle(index)}
                            className="py-4 px-4 w-full text-left flex justify-between items-center focus:outline-none text-white bg-[#bf2733]"
                        >
                            <span className="text-lg font-semibold capitalize">{item.name}</span>
                            <span className="text-xl">{openIndex === index ? '-' : '+'}</span>
                        </button>

                        {openIndex === index && (
                            <div className="mt-3 pl-2">
                                {item.image && (
                                    <img
                                        src={
                                            item.image.startsWith('http')
                                                ? item.image
                                                : `https://realtyfocus.info/images/specification/${item.image}`
                                        }
                                        alt={item.name || 'Specification'}
                                        className="w-40 h-40 object-cover rounded mb-2"
                                    />
                                )}
                                <p
                                    className="text-gray-600"
                                    dangerouslySetInnerHTML={{ __html: item.description.replace(/\r\n/g, '<br>') }}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
