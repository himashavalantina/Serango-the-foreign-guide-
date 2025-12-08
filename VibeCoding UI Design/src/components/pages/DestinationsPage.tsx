// import { Card, CardContent } from "../ui/card";
// import { Button } from "../ui/button";
// import { Badge } from "../ui/badge";
// import { SustainabilityScore } from "../shared/SustainabilityScore";
// import { ImageWithFallback } from "../figma/ImageWithFallback";
// import { MapPin, TrendingUp, Sparkles, Users, DollarSign } from "lucide-react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
//
// interface DestinationsPageProps {
//     onNavigate: (page: string) => void;
// }
//
// // Sustainability details for the top 3 trending destinations
// const sustainabilityDetails: Record<number, any> = {
//     1: {
//         E: { total: 30, breakdown: [
//                 { label: "Energy efficiency", score: 6, comment: "Some heritage buildings retrofitted, mostly standard electricity" },
//                 { label: "Waste management", score: 7, comment: "Moderate recycling efforts; plastic use still present" },
//                 { label: "Water conservation", score: 8, comment: "Efficient water use in heritage hotels" },
//                 { label: "Biodiversity protection", score: 9, comment: "Minimal impact; Fort preserves cultural landscape" },
//             ]},
//         S: { total: 25, breakdown: [
//                 { label: "Local employment", score: 8, comment: "Hotels, restaurants, and guides employ locals" },
//                 { label: "Cultural preservation", score: 9, comment: "Promotes Dutch-Sri Lankan heritage" },
//                 { label: "Accessibility & inclusion", score: 8, comment: "Public walkways accessible, some limits" },
//             ]},
//         Ec: { total: 23, breakdown: [
//                 { label: "Fair wages & working conditions", score: 7, comment: "Mostly follow local standards" },
//                 { label: "Local sourcing", score: 8, comment: "Souvenir shops & restaurants source local" },
//                 { label: "Community reinvestment", score: 8, comment: "Supports local infrastructure projects" },
//             ]},
//         overallScore: 88,
//         sustainabilityLabel: "Highly Sustainable",
//     },
//     2: {
//         E: { total: 28, breakdown: [
//                 { label: "Energy efficiency", score: 5, comment: "Hotels use conventional electricity" },
//                 { label: "Waste management", score: 6, comment: "Beach clean-ups exist but littering occurs" },
//                 { label: "Water conservation", score: 8, comment: "Guesthouses manage water efficiently" },
//                 { label: "Biodiversity protection", score: 9, comment: "Sea turtles nesting; marine conservation" },
//             ]},
//         S: { total: 24, breakdown: [
//                 { label: "Local employment", score: 8, comment: "Most tourism staff are locals" },
//                 { label: "Cultural preservation", score: 8, comment: "Local fishing culture & handicrafts promoted" },
//                 { label: "Accessibility & inclusion", score: 8, comment: "Main beach accessible" },
//             ]},
//         Ec: { total: 22, breakdown: [
//                 { label: "Fair wages & working conditions", score: 7, comment: "Small guesthouses pay moderate wages" },
//                 { label: "Local sourcing", score: 8, comment: "Restaurants and shops source local produce" },
//                 { label: "Community reinvestment", score: 7, comment: "Small-scale community projects supported" },
//             ]},
//         overallScore: 83,
//         sustainabilityLabel: "Highly Sustainable",
//     },
//     3: {
//         E: { total: 35, breakdown: [
//                 { label: "Energy efficiency", score: 7, comment: "Small temples & pagoda use limited electricity" },
//                 { label: "Waste management", score: 9, comment: "Low foot traffic reduces litter" },
//                 { label: "Water conservation", score: 9, comment: "Minimal water-intensive infrastructure" },
//                 { label: "Biodiversity protection", score: 10, comment: "Protected area with rare herbs and forest patches" },
//             ]},
//         S: { total: 27, breakdown: [
//                 { label: "Local employment", score: 8, comment: "Temple staff and tour guides from local communities" },
//                 { label: "Cultural preservation", score: 10, comment: "Religious and historical sites respected" },
//                 { label: "Accessibility & inclusion", score: 9, comment: "Access via road; moderate support for visitors" },
//             ]},
//         Ec: { total: 24, breakdown: [
//                 { label: "Fair wages & working conditions", score: 8, comment: "Staff paid modestly; traditional structure" },
//                 { label: "Local sourcing", score: 8, comment: "Local food and souvenirs" },
//                 { label: "Community reinvestment", score: 8, comment: "Temples and conservation programs reinvest locally" },
//             ]},
//         overallScore: 90,
//         sustainabilityLabel: "Highly Sustainable",
//     }
// };
//
// export function DestinationsPage({ onNavigate }: DestinationsPageProps) {
//     const trendingDestinations = [
//         {
//             id: 1,
//             name: "Galle, Dutch Fort",
//             country: "Sri Lanka",
//             image: "https://www.tripadvisor.com/LocationPhotoDirectLink-g297896-i404297699-Galle_Galle_District_Southern_Province.html",
//             sustainability: 85,
//             guides: 47,
//             avgPrice: 420,
//             trending: true,
//             new: false,
//         },
//         {
//             id: 2,
//             name: "Unawatuna Beach",
//             image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
//             country: "Sri Lanka",
//             sustainability: 83,
//             guides: 35,
//             avgPrice: 300,
//             trending: true,
//             new: false,
//         },
//         {
//             id: 3,
//             name: "Rumassala Hill",
//             image: "https://images.unsplash.com/photo-1549887535-1f8fbe17f0c7?w=800",
//             country: "Sri Lanka",
//             sustainability: 90,
//             guides: 22,
//             avgPrice: 350,
//             trending: true,
//             new: false,
//         },
//     ];
//
//     const allDestinations = [
//         {
//             id: 4,
//             name: "Kyoto, Japan",
//             image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
//             country: "Japan",
//             sustainability: 92,
//             guides: 63,
//             avgPrice: 580,
//             trending: false,
//             new: false,
//         },
//         {
//             id: 5,
//             name: "Lisbon, Portugal",
//             image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800",
//             country: "Portugal",
//             sustainability: 78,
//             guides: 35,
//             avgPrice: 350,
//             trending: false,
//             new: true,
//         },
//         // ... add remaining destinations as before
//     ];
//
//     const DestinationCard = ({ destination }: { destination: typeof trendingDestinations[0] }) => {
//         const details = sustainabilityDetails[destination.id];
//
//         return (
//             <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer group border-none">
//                 <div className="relative h-48 overflow-hidden">
//                     <ImageWithFallback
//                         src={destination.image}
//                         alt={destination.name}
//                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                     />
//                     <div className="absolute top-3 right-3 flex gap-2">
//                         {destination.trending && (
//                             <Badge className="bg-[#F7A160] hover:bg-[#F7A160] text-white">
//                                 <TrendingUp className="w-3 h-3 mr-1" />
//                                 Trending
//                             </Badge>
//                         )}
//                         {destination.new && (
//                             <Badge className="bg-[#F7A160] hover:bg-[#F7A160] text-white">
//                                 <Sparkles className="w-3 h-3 mr-1" />
//                                 New
//                             </Badge>
//                         )}
//                     </div>
//                 </div>
//
//                 <CardContent className="p-6 bg-white">
//                     <div className="flex items-start justify-between mb-3">
//                         <div>
//                             <h3 className="text-xl mb-1">{destination.name}</h3>
//                             <div className="flex items-center gap-1 text-gray-600">
//                                 <MapPin className="w-4 h-4" />
//                                 <span className="text-sm">{destination.country}</span>
//                             </div>
//                         </div>
//                     </div>
//
//                     <div className="mb-4">
//                         <SustainabilityScore score={destination.sustainability} size="sm" />
//                     </div>
//
//                     {details && (
//                         <div className="mb-4 text-sm text-gray-700">
//                             <h4 className="font-semibold mb-2">Sustainability Breakdown</h4>
//                             {["E","S","Ec"].map((key) => (
//                                 <div key={key} className="mb-2">
//                                     <p className="font-medium">
//                                         {key === "E" ? "Environmental (E)" : key === "S" ? "Social (S)" : "Economic (Ec)"}: {details[key].total}/{key === "E" ? 40 : key === "S" ? 30 : 30}
//                                     </p>
//                                     <ul className="list-disc list-inside ml-2">
//                                         {details[key].breakdown.map((item:any) => (
//                                             <li key={item.label}>
//                                                 <span className="font-medium">{item.label}: {item.score}/10</span> → {item.comment}
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             ))}
//                             <p className="mt-2 font-semibold">
//                                 Sustainability Score: {details.overallScore}/100 🟢 {details.sustainabilityLabel}
//                             </p>
//                         </div>
//                     )}
//
//                     <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
//             <span className="flex items-center gap-1">
//               <Users className="w-4 h-4" />
//                 {destination.guides} guides
//             </span>
//                         <span className="flex items-center gap-1">
//               <DollarSign className="w-4 h-4" />
//               From ${destination.avgPrice}
//             </span>
//                     </div>
//
//                     <Button
//                         className="w-full"
//                         style={{ background: "linear-gradient(90deg, #F7A160 0%, #F7A160 100%)" }}
//                         onClick={() => onNavigate("planner")}
//                     >
//                         Plan Trip
//                     </Button>
//                 </CardContent>
//             </Card>
//         );
//     };
//
//     return (
//         <div className="min-h-screen py-12" style={{ backgroundColor: "#fefcf8" }}>
//             <div className="w-full px-4 sm:px-6 lg:px-8">
//                 <div className="mb-12 text-center">
//                     <h1 className="text-5xl mb-4" style={{ color: "#F7A160" }}>
//                         Explore Destinations
//                     </h1>
//                     <p className="text-xl text-gray-600">
//                         Discover sustainable travel destinations with expert local guides
//                     </p>
//                 </div>
//
//                 <Tabs defaultValue="trending" className="mb-8">
//                     <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
//                         <TabsTrigger value="trending">Trending</TabsTrigger>
//                         <TabsTrigger value="new">New</TabsTrigger>
//                         <TabsTrigger value="all">All Destinations</TabsTrigger>
//                     </TabsList>
//
//                     <TabsContent value="trending" className="mt-8">
//                         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {trendingDestinations.map((destination) => (
//                                 <DestinationCard key={destination.id} destination={destination} />
//                             ))}
//                         </div>
//                     </TabsContent>
//
//                     <TabsContent value="new" className="mt-8">
//                         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {[...trendingDestinations, ...allDestinations].filter(d => d.new).map((destination) => (
//                                 <DestinationCard key={destination.id} destination={destination} />
//                             ))}
//                         </div>
//                     </TabsContent>
//
//                     <TabsContent value="all" className="mt-8">
//                         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {[...trendingDestinations, ...allDestinations].map((destination) => (
//                                 <DestinationCard key={destination.id} destination={destination} />
//                             ))}
//                         </div>
//                     </TabsContent>
//                 </Tabs>
//             </div>
//         </div>
//     );
// }
//

import React from "react";
import galleImg from "../../assets/galle.png";
import unawatunaImg from "../../assets/unawatuna.png";
import rumassalaImg from "../../assets/rumassala.png";


import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { SustainabilityScore } from "../shared/SustainabilityScore";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { MapPin, TrendingUp, Sparkles, Users, DollarSign } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface DestinationsPageProps {
    onNavigate: (page: string) => void;
}

// Sustainability details for the top 3 trending destinations
const sustainabilityDetails: Record<number, any> = {
    1: {
        E: {
            total: 30,
            breakdown: [
                { label: "Energy efficiency", score: 6, comment: "Some heritage buildings retrofitted, mostly standard electricity" },
                { label: "Waste management", score: 7, comment: "Moderate recycling efforts; plastic use still present" },
                { label: "Water conservation", score: 8, comment: "Efficient water use in heritage hotels" },
                { label: "Biodiversity protection", score: 9, comment: "Minimal impact; Fort preserves cultural landscape" },
            ],
        },
        S: {
            total: 25,
            breakdown: [
                { label: "Local employment", score: 8, comment: "Hotels, restaurants, and guides employ locals" },
                { label: "Cultural preservation", score: 9, comment: "Promotes Dutch-Sri Lankan heritage" },
                { label: "Accessibility & inclusion", score: 8, comment: "Public walkways accessible, some limits" },
            ],
        },
        Ec: {
            total: 23,
            breakdown: [
                { label: "Fair wages & working conditions", score: 7, comment: "Mostly follow local standards" },
                { label: "Local sourcing", score: 8, comment: "Souvenir shops & restaurants source local" },
                { label: "Community reinvestment", score: 8, comment: "Supports local infrastructure projects" },
            ],
        },
        overallScore: 88,
        sustainabilityLabel: "Highly Sustainable",
    },
    2: {
        E: {
            total: 28,
            breakdown: [
                { label: "Energy efficiency", score: 5, comment: "Hotels use conventional electricity" },
                { label: "Waste management", score: 6, comment: "Beach clean-ups exist but littering occurs" },
                { label: "Water conservation", score: 8, comment: "Guesthouses manage water efficiently" },
                { label: "Biodiversity protection", score: 9, comment: "Sea turtles nesting; marine conservation" },
            ],
        },
        S: {
            total: 24,
            breakdown: [
                { label: "Local employment", score: 8, comment: "Most tourism staff are locals" },
                { label: "Cultural preservation", score: 8, comment: "Local fishing culture & handicrafts promoted" },
                { label: "Accessibility & inclusion", score: 8, comment: "Main beach accessible" },
            ],
        },
        Ec: {
            total: 22,
            breakdown: [
                { label: "Fair wages & working conditions", score: 7, comment: "Small guesthouses pay moderate wages" },
                { label: "Local sourcing", score: 8, comment: "Restaurants and shops source local produce" },
                { label: "Community reinvestment", score: 7, comment: "Small-scale community projects supported" },
            ],
        },
        overallScore: 83,
        sustainabilityLabel: "Highly Sustainable",
    },
    3: {
        E: {
            total: 35,
            breakdown: [
                { label: "Energy efficiency", score: 7, comment: "Small temples & pagoda use limited electricity" },
                { label: "Waste management", score: 9, comment: "Low foot traffic reduces litter" },
                { label: "Water conservation", score: 9, comment: "Minimal water-intensive infrastructure" },
                { label: "Biodiversity protection", score: 10, comment: "Protected area with rare herbs and forest patches" },
            ],
        },
        S: {
            total: 27,
            breakdown: [
                { label: "Local employment", score: 8, comment: "Temple staff and tour guides from local communities" },
                { label: "Cultural preservation", score: 10, comment: "Religious and historical sites respected" },
                { label: "Accessibility & inclusion", score: 9, comment: "Access via road; moderate support for visitors" },
            ],
        },
        Ec: {
            total: 24,
            breakdown: [
                { label: "Fair wages & working conditions", score: 8, comment: "Staff paid modestly; traditional structure" },
                { label: "Local sourcing", score: 8, comment: "Local food and souvenirs" },
                { label: "Community reinvestment", score: 8, comment: "Temples and conservation programs reinvest locally" },
            ],
        },
        overallScore: 90,
        sustainabilityLabel: "Highly Sustainable",
    },
};

export function DestinationsPage({ onNavigate }: DestinationsPageProps) {
    const trendingDestinations = [
        { id: 1, name: "Galle, Dutch Fort", country: "Sri Lanka", image: galleImg, sustainability: 85, guides: 47, avgPrice: 420, trending: true, new: false },
        { id: 2, name: "Unawatuna Beach", country: "Sri Lanka", image: unawatunaImg, sustainability: 83, guides: 35, avgPrice: 300, trending: true, new: false },
        { id: 3, name: "Rumassala Hill", country: "Sri Lanka", image: rumassalaImg, sustainability: 90, guides: 22, avgPrice: 350, trending: true, new: false },
    ];

    const allDestinations = [
        { id: 4, name: "Kyoto, Japan", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800", country: "Japan", sustainability: 92, guides: 63, avgPrice: 580, trending: false, new: false },
        { id: 5, name: "Lisbon, Portugal", image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800", country: "Portugal", sustainability: 78, guides: 35, avgPrice: 350, trending: false, new: true },
    ];

    const DestinationCard = ({ destination }: { destination: typeof trendingDestinations[0] }) => {
        const details = sustainabilityDetails[destination.id];

        return (
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer group border-none">
                <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                        {destination.trending && <Badge className="bg-[#F7A160] text-white"><TrendingUp className="w-3 h-3 mr-1" />Trending</Badge>}
                        {destination.new && <Badge className="bg-[#F7A160] text-white"><Sparkles className="w-3 h-3 mr-1" />New</Badge>}
                    </div>
                </div>

                <CardContent className="p-6 bg-white">
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <h3 className="text-xl mb-1">{destination.name}</h3>
                            <div className="flex items-center gap-1 text-gray-600">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">{destination.country}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <SustainabilityScore score={destination.sustainability} size="sm" />
                    </div>

                    {details && (
                        <div className="mb-4 text-sm text-gray-700">
                            <h4 className="font-semibold mb-2">Sustainability Breakdown</h4>
                            {["E", "S", "Ec"].map((key) => (
                                <div key={key} className="mb-2">
                                    <p className="font-medium">
                                        {key === "E" ? "Environmental (E)" : key === "S" ? "Social (S)" : "Economic (Ec)"}: {details[key].total}/{key === "E" ? 40 : key === "S" ? 30 : 30}
                                    </p>
                                    <ul className="list-disc list-inside ml-2">
                                        {details[key].breakdown.map((item: any) => (
                                            <li key={item.label}>
                                                <span className="font-medium">{item.label}: {item.score}/10</span> → {item.comment}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                            <p className="mt-2 font-semibold">
                                Sustainability Score: {details.overallScore}/100 🟢 {details.sustainabilityLabel}
                            </p>
                        </div>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-1"><Users className="w-4 h-4" />{destination.guides} guides</span>
                        <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" />From ${destination.avgPrice}</span>
                    </div>

                    <Button
                        className="w-full"
                        style={{ background: "linear-gradient(90deg, #F7A160 0%, #F7A160 100%)" }}
                        onClick={() => onNavigate("planner")}
                    >
                        Plan Trip
                    </Button>
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="min-h-screen py-12" style={{ backgroundColor: "#fefcf8" }}>
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h1 className="text-5xl mb-4" style={{ color: "#F7A160" }}>Explore Destinations</h1>
                    <p className="text-xl text-gray-600">Discover sustainable travel destinations with expert local guides</p>
                </div>

                <Tabs defaultValue="trending" className="mb-8">
                    <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                        <TabsTrigger value="trending">Trending</TabsTrigger>
                        <TabsTrigger value="new">New</TabsTrigger>
                        <TabsTrigger value="all">All Destinations</TabsTrigger>
                    </TabsList>

                    <TabsContent value="trending" className="mt-8">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {trendingDestinations.map((destination) => (
                                <DestinationCard key={destination.id} destination={destination} />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="new" className="mt-8">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...trendingDestinations, ...allDestinations].filter(d => d.new).map((destination) => (
                                <DestinationCard key={destination.id} destination={destination} />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="all" className="mt-8">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...trendingDestinations, ...allDestinations].map((destination) => (
                                <DestinationCard key={destination.id} destination={destination} />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
