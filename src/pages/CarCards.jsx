import React, { useMemo, useState } from "react";
import CarCard from "../components/CarCard";

/* ======================================================
   PRODUCTION FLEET GENERATOR
====================================================== */

const generateFleet = () => {
    const brands = [
        "Toyota",
        "Honda",
        "Hyundai",
        "Mahindra",
        "Tata",
        "BMW",
        "Mercedes",
        "Audi",
        "Kia",
        "MG",
        "Volkswagen",
        "Skoda",
        "Nissan",
        "Ford",
        "Jeep",
    ];

    const colors = [
        "Black",
        "White",
        "Grey",
        "Blue",
        "Red",
        "Silver",
        "Green",
        "Yellow",
    ];

    return Array.from({ length: 45 }, (_, index) => ({
        id: `F-${index + 1}`,

        name: `${brands[index % brands.length]} Model ${index + 1}`,

        brand: brands[index % brands.length],

        color: colors[index % colors.length],

        ratePerDay: 1500 + index * 100,

        imageUrl: `https://source.unsplash.com/600x400/?${brands[
            index % brands.length
        ]},car`,

        specs: {
            propulsion: index % 2 === 0 ? "Petrol" : "Electric",
            output: `${250 + index * 10} HP`,
            drivetrain: index % 3 === 0 ? "AWD" : "FWD",
        },

        owner: {
            name: `Owner ${index + 1}`,
            age: 25 + (index % 20),
            gender: index % 2 === 0 ? "Male" : "Female",
            profession: "Business Owner",
            avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
        },
    }));
};

const FLEET_DATA = generateFleet();

export default function CarCards() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("ALL");
    const [selectedColor, setSelectedColor] = useState("ALL");

    const uniqueBrands = [
        "ALL",
        ...new Set(FLEET_DATA.map((car) => car.brand)),
    ];

    const uniqueColors = [
        "ALL",
        ...new Set(FLEET_DATA.map((car) => car.color)),
    ];

    const filteredCars = useMemo(() => {
        return FLEET_DATA.filter((car) => {
            const searchText = `
        ${car.id}
        ${car.name}
        ${car.brand}
        ${car.color}
      `.toLowerCase();

            const query = searchQuery.toLowerCase();

            const matchesSearch = searchText.includes(query);

            const matchesBrand =
                selectedBrand === "ALL" || car.brand === selectedBrand;

            const matchesColor =
                selectedColor === "ALL" || car.color === selectedColor;

            return matchesSearch && matchesBrand && matchesColor;
        });
    }, [searchQuery, selectedBrand, selectedColor]);

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-10 pb-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
                {/* HEADER */}

                <div>
                    <span className="text-[10px] font-mono text-cyan-400 tracking-[0.3em] uppercase font-black block">
            // VEHICLE DIRECTORY
                    </span>

                    <h1 className="text-4xl font-black uppercase">
                        Fleet Collection
                    </h1>
                </div>

                {/* SEARCH PANEL */}

                <div className="bg-[#0b0b0e] border border-white/5 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-2xl">
                    {/* SEARCH */}

                    <div>
                        <label className="block text-[10px] uppercase text-zinc-500 mb-2">
                            Search Vehicle
                        </label>

                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Toyota, BMW, Black, F-12..."
                                className="w-full bg-[#111115] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-cyan-500"
                            />

                            <svg
                                className="absolute left-3 top-3.5 h-4 w-4 text-zinc-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* BRAND */}

                    <div>
                        <label className="block text-[10px] uppercase text-zinc-500 mb-2">
                            Brand
                        </label>

                        <select
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                            className="w-full bg-[#111115] border border-white/10 rounded-lg px-3 py-3 text-sm"
                        >
                            {uniqueBrands.map((brand) => (
                                <option key={brand}>{brand}</option>
                            ))}
                        </select>
                    </div>

                    {/* COLOR */}

                    <div>
                        <label className="block text-[10px] uppercase text-zinc-500 mb-2">
                            Color
                        </label>

                        <select
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            className="w-full bg-[#111115] border border-white/10 rounded-lg px-3 py-3 text-sm"
                        >
                            {uniqueColors.map((color) => (
                                <option key={color}>{color}</option>
                            ))}
                        </select>
                    </div>

                    {/* COUNT */}

                    <div className="flex items-end">
                        <div className="w-full bg-[#111115] border border-white/10 rounded-lg p-3 flex justify-between items-center">
                            <span className="text-zinc-500 uppercase text-xs">
                                Vehicles
                            </span>

                            <span className="text-cyan-400 text-xl font-black">
                                {filteredCars.length}
                            </span>
                        </div>
                    </div>
                </div>

                {/* RESULTS */}

                {filteredCars.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                        {filteredCars.map((car) => (
                            <CarCard key={car.id} car={car} />
                        ))}
                    </div>
                ) : (
                    <div className="border border-dashed border-white/10 rounded-2xl py-24 text-center">
                        <h3 className="text-xl font-bold mb-2">
                            No Vehicles Found
                        </h3>

                        <p className="text-zinc-500">
                            Try changing search or filters.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}