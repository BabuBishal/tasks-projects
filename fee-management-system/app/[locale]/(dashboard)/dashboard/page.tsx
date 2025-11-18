// import PaymentHistory from "@/components/dashboard/PaymentHistory";
import PaymentStatusOverview from "@/app/[locale]/(dashboard)/_components/PaymentStatusOverview";
import QuickActions from "@/app/[locale]/(dashboard)/_components/QuickActions";
import StatsOverview from "@/components/layout/StatsOverview";
import { Users, DollarSign, Wallet2, TrendingUp } from "lucide-react";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// import {Badge } from "l3ui";

const Dashboard = async () => {
  const res = await fetch(`${baseUrl}/api/dashboard-stats`);
  const data = await res.json();
  const { dashboardStats, paymentStats } = data;
  console.log("first", dashboardStats);
  // console.log("data", data?.paymentStats);
  const icons = [DollarSign, Users, Wallet2, TrendingUp];

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  //     </div>
  //   );
  // }

  // if (!data) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <p className="text-red-600">Failed to load dashboard data</p>
  //     </div>
  //   );
  // }

  return (
    <div className="w-full h-full flex flex-col gap-10">
      <div className=" ">
        <h1 className="text-primary text-2xl font-bold">Dashboard</h1>
        <h4 className="text-muted text-sm">
          Overview of the fee payment system
        </h4>
      </div>
      <StatsOverview stats={dashboardStats} icons={icons} />
      <div className="flex flex-col md:flex-row gap-5">
        <PaymentStatusOverview paymentStatus={paymentStats} />
        <QuickActions />
      </div>
      {/* <PaymentHistory /> */}
    </div>
  );
};

export default Dashboard;

// import { useState, useEffect } from 'react';

// export default function DashboardPage() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const response = await fetch('/api/dashboard-stats');
//       const result = await response.json();
//       setData(result);
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (!data) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p className="text-red-600">Failed to load dashboard data</p>
//       </div>
//     );
//   }

//   const { dashboardStats, paymentStats, recentPayments, overdueFees } = data;

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
//           <p className="text-gray-600 mt-1">Welcome to Fee Management System</p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {dashboardStats.map((stat, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <div className="text-3xl">{stat.icon}</div>
//                 <div className="text-2xl font-bold text-gray-900">
//                   {stat.value}
//                 </div>
//               </div>
//               <h3 className="text-sm font-semibold text-gray-700 mb-1">
//                 {stat.title}
//               </h3>
//               <p className="text-xs text-gray-500">{stat.desc}</p>
//             </div>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//           {/* Payment Status Chart */}
//           <div className="bg-white rounded-lg shadow p-6 col-span-1">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">
//               Payment Status
//             </h2>
//             <div className="space-y-4">
//               <StatusBar
//                 label="Paid"
//                 count={paymentStats.paid}
//                 total={paymentStats.total}
//                 color="bg-green-500"
//               />
//               <StatusBar
//                 label="Partial"
//                 count={paymentStats.partial}
//                 total={paymentStats.total}
//                 color="bg-yellow-500"
//               />
//               <StatusBar
//                 label="Pending"
//                 count={paymentStats.pending}
//                 total={paymentStats.total}
//                 color="bg-blue-500"
//               />
//               <StatusBar
//                 label="Overdue"
//                 count={paymentStats.overdue}
//                 total={paymentStats.total}
//                 color="bg-red-500"
//               />
//             </div>
//           </div>

//           {/* Recent Payments */}
//           <div className="bg-white rounded-lg shadow p-6 col-span-2">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">
//               Recent Payments
//             </h2>
//             {recentPayments && recentPayments.length > 0 ? (
//               <div className="overflow-x-auto">
//                 <table className="min-w-full">
//                   <thead>
//                     <tr className="border-b">
//                       <th className="text-left py-2 px-3 text-sm font-semibold text-gray-700">
//                         Student
//                       </th>
//                       <th className="text-left py-2 px-3 text-sm font-semibold text-gray-700">
//                         Amount
//                       </th>
//                       <th className="text-left py-2 px-3 text-sm font-semibold text-gray-700">
//                         Method
//                       </th>
//                       <th className="text-left py-2 px-3 text-sm font-semibold text-gray-700">
//                         Date
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {recentPayments.map((payment) => (
//                       <tr key={payment.id} className="border-b hover:bg-gray-50">
//                         <td className="py-3 px-3 text-sm text-gray-900">
//                           {payment.studentName}
//                         </td>
//                         <td className="py-3 px-3 text-sm font-medium text-gray-900">
//                           Rs {payment.amount.toLocaleString()}
//                         </td>
//                         <td className="py-3 px-3 text-sm text-gray-600">
//                           {payment.method}
//                         </td>
//                         <td className="py-3 px-3 text-sm text-gray-600">
//                           {new Date(payment.date).toLocaleDateString()}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <p className="text-gray-500 text-center py-4">No recent payments</p>
//             )}
//           </div>
//         </div>

//         {/* Overdue Fees */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">
//             Overdue Fees
//           </h2>
//           {overdueFees && overdueFees.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="min-w-full">
//                 <thead>
//                   <tr className="border-b">
//                     <th className="text-left py-2 px-3 text-sm font-semibold text-gray-700">
//                       Roll No
//                     </th>
//                     <th className="text-left py-2 px-3 text-sm font-semibold text-gray-700">
//                       Student Name
//                     </th>
//                     <th className="text-left py-2 px-3 text-sm font-semibold text-gray-700">
//                       Program
//                     </th>
//                     <th className="text-left py-2 px-3 text-sm font-semibold text-gray-700">
//                       Balance
//                     </th>
//                     <th className="text-left py-2 px-3 text-sm font-semibold text-gray-700">
//                       Due Date
//                     </th>
//                     <th className="text-left py-2 px-3 text-sm font-semibold text-gray-700">
//                       Days Overdue
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {overdueFees.map((fee) => (
//                     <tr key={fee.id} className="border-b hover:bg-gray-50">
//                       <td className="py-3 px-3 text-sm font-medium text-gray-900">
//                         {fee.studentRollNo}
//                       </td>
//                       <td className="py-3 px-3 text-sm text-gray-900">
//                         {fee.studentName}
//                       </td>
//                       <td className="py-3 px-3 text-sm text-gray-600">
//                         {fee.program}
//                       </td>
//                       <td className="py-3 px-3 text-sm font-medium text-red-600">
//                         Rs {fee.balance.toLocaleString()}
//                       </td>
//                       <td className="py-3 px-3 text-sm text-gray-600">
//                         {new Date(fee.dueDate).toLocaleDateString()}
//                       </td>
//                       <td className="py-3 px-3 text-sm">
//                         <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
//                           {fee.daysOverdue} days
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <p className="text-gray-500 text-center py-4">
//               No overdue fees 🎉
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function StatusBar({ label, count, total, color }) {
//   const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

//   return (
//     <div>
//       <div className="flex justify-between mb-1">
//         <span className="text-sm font-medium text-gray-700">{label}</span>
//         <span className="text-sm text-gray-600">
//           {count} ({percentage}%)
//         </span>
//       </div>
//       <div className="w-full bg-gray-200 rounded-full h-2">
//         <div
//           className={`${color} h-2 rounded-full transition-all duration-300`}
//           style={{ width: `${percentage}%` }}
//         ></div>
//       </div>
//     </div>
//   );
// }
