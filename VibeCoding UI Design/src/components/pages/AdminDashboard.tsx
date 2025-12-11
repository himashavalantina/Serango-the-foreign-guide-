// /* Admin Dashboard - Currently Disabled
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { Button } from "../ui/button";
// import { Badge } from "../ui/badge";
// import { 
//   Users, 
//   Shield, 
//   AlertTriangle, 
//   CheckCircle2, 
//   TrendingUp,
//   Flag,
//   UserCheck,
//   BarChart3,
//   XCircle,
//   MapPin,
//   Plane,
//   Settings,
// } from "lucide-react";
// import { Separator } from "../ui/separator";

// interface AdminDashboardProps {
//   onNavigate: (page: string) => void;
// }

// export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
//   const stats = [
//     { label: "Total Users", value: "12,543", icon: Users, color: "#F7A160" },
//     { label: "Active Guides", value: "487", icon: Shield, color: "#F7A160" },
//     { label: "Pending Verifications", value: "23", icon: UserCheck, color: "#F7DC79" },
//     { label: "Open Disputes", value: "8", icon: AlertTriangle, color: "#EF4444" },
//   ];

//   const pendingGuides = [
//     {
//       id: 1,
//       name: "Maria Garcia",
//       location: "Barcelona, Spain",
//       submitted: "2 hours ago",
//       documents: 4,
//     },
//     {
//       id: 2,
//       name: "Ahmed Hassan",
//       location: "Cairo, Egypt",
//       submitted: "5 hours ago",
//       documents: 5,
//     },
//     {
//       id: 3,
//       name: "Yuki Tanaka",
//       location: "Tokyo, Japan",
//       submitted: "1 day ago",
//       documents: 4,
//     },
//   ];

//   const disputes = [
//     {
//       id: 1,
//       tripId: "TRIP-1234",
//       tourist: "John Smith",
//       guide: "Sophie Martin",
//       reason: "Late arrival",
//       status: "open",
//       submitted: "3 hours ago",
//     },
//     {
//       id: 2,
//       tripId: "TRIP-5678",
//       tourist: "Emma Wilson",
//       guide: "Carlos Rodriguez",
//       reason: "Itinerary not followed",
//       status: "investigating",
//       submitted: "1 day ago",
//     },
//   ];

//   const reports = [
//     { month: "Oct 2025", trips: 1543, revenue: "$45,230" },
//     { month: "Sep 2025", trips: 1389, revenue: "$41,670" },
//     { month: "Aug 2025", trips: 1621, revenue: "$48,630" },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="w-full px-4 sm:px-6 lg:px-8">
//         <div className="mb-8">
//           <h1 className="text-4xl mb-2" style={{ color: "#F7A160" }}>
//             Admin Dashboard
//           </h1>
//           <p className="text-xl text-gray-600">
//             Platform management and oversight
//           </p>
//         </div>

//         {/* Stats */}
//         <div className="grid md:grid-cols-4 gap-6 mb-8">
//           {stats.map((stat, index) => {
//             const Icon = stat.icon;
//             return (
//               <Card key={index} className="shadow-lg">
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between mb-2">
//                     <Icon className="w-8 h-8" style={{ color: stat.color }} />
//                     <TrendingUp className="w-4 h-4 text-yellow-500" />
//                   </div>
//                   <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
//                   <p className="text-3xl" style={{ color: stat.color }}>
//                     {stat.value}
//                   </p>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Pending Guide Verifications */}
//           <Card className="shadow-lg">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <UserCheck className="w-5 h-5" style={{ color: "#F7A160" }} />
//                 Pending Guide Verifications
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {pendingGuides.map((guide, index) => (
//                   <div key={guide.id}>
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <h4 className="font-medium mb-1">{guide.name}</h4>
//                         <p className="text-sm text-gray-600 mb-1">{guide.location}</p>
//                         <div className="flex gap-4 text-sm text-gray-500">
//                           <span>{guide.documents} documents</span>
//                           <span>•</span>
//                           <span>{guide.submitted}</span>
//                         </div>
//                       </div>
//                       <div className="flex gap-2">
//                         <Button size="sm" variant="outline">
//                           <XCircle className="w-4 h-4 mr-1" />
//                           Reject
//                         </Button>
//                         <Button 
//                           size="sm"
//                           style={{
//                             background: "linear-gradient(90deg, #F7A160 0%, #F7DC79 100%)",
//                           }}
//                         >
//                           <CheckCircle2 className="w-4 h-4 mr-1" />
//                           Approve
//                         </Button>
//                       </div>
//                     </div>
//                     {index < pendingGuides.length - 1 && <Separator className="mt-4" />}
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Disputes */}
//           <Card className="shadow-lg">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Flag className="w-5 h-5" style={{ color: "#EF4444" }} />
//                 Active Disputes
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {disputes.map((dispute, index) => (
//                   <div key={dispute.id}>
//                     <div className="flex items-start justify-between mb-2">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2 mb-1">
//                           <h4 className="font-medium">{dispute.tripId}</h4>
//                           <Badge 
//                             className={
//                               dispute.status === "open" 
//                                 ? "bg-red-500 hover:bg-red-500" 
//                                 : "bg-yellow-500 hover:bg-yellow-500"
//                             }
//                           >
//                             {dispute.status}
//                           </Badge>
//                         </div>
//                         <p className="text-sm text-gray-600 mb-1">
//                           <span className="font-medium">{dispute.tourist}</span> vs{" "}
//                           <span className="font-medium">{dispute.guide}</span>
//                         </p>
//                         <p className="text-sm text-gray-600 mb-1">{dispute.reason}</p>
//                         <p className="text-xs text-gray-500">{dispute.submitted}</p>
//                       </div>
//                       <Button size="sm" variant="outline">
//                         Investigate
//                       </Button>
//                     </div>
//                     {index < disputes.length - 1 && <Separator className="mt-4" />}
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Reports */}
//         <Card className="shadow-lg mt-8">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <BarChart3 className="w-5 h-5" style={{ color: "#F7A160" }} />
//               Platform Reports
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-3">
//               {reports.map((report, index) => (
//                 <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                   <span className="font-medium">{report.month}</span>
//                   <div className="flex gap-8">
//                     <div className="text-right">
//                       <p className="text-sm text-gray-600">Trips</p>
//                       <p className="font-medium">{report.trips}</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-sm text-gray-600">Revenue</p>
//                       <p className="font-medium" style={{ color: "#F7DC79" }}>
//                         {report.revenue}
//                       </p>
//                     </div>
//                   </div>
//                   <Button size="sm" variant="outline">
//                     View Details
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Quick Actions */}
//         <div className="mt-8 grid md:grid-cols-3 gap-6">
//           <Card 
//             className="shadow-lg bg-white border-none cursor-pointer hover:shadow-xl transition-all"
//             onClick={() => onNavigate("admin-destinations")}
//           >
//             <CardContent className="p-6 text-center">
//               <MapPin className="w-12 h-12 mx-auto mb-3" style={{ color: "#F7A160" }} />
//               <h3 className="text-lg mb-2">Manage Destinations</h3>
//               <p className="text-sm text-gray-600">Update sustainability scores</p>
//             </CardContent>
//           </Card>
//           <Card 
//             className="shadow-lg bg-white border-none cursor-pointer hover:shadow-xl transition-all"
//             onClick={() => onNavigate("admin-guides")}
//           >
//             <CardContent className="p-6 text-center">
//               <Shield className="w-12 h-12 mx-auto mb-3" style={{ color: "#F7A160" }} />
//               <h3 className="text-lg mb-2">Manage Guides</h3>
//               <p className="text-sm text-gray-600">Verify and monitor guides</p>
//             </CardContent>
//           </Card>
//           <Card 
//             className="shadow-lg bg-white border-none cursor-pointer hover:shadow-xl transition-all"
//             onClick={() => onNavigate("admin-notifications")}
//           >
//             <CardContent className="p-6 text-center">
//               <Plane className="w-12 h-12 mx-auto mb-3" style={{ color: "#F7DC79" }} />
//               <h3 className="text-lg mb-2">Flight Notifications</h3>
//               <p className="text-sm text-gray-600">Manage delay alerts</p>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }
// */
