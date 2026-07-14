// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";
// import {
//     Plus,
//     Search,
//     Users,
// } from "lucide-react";

// import { useAuthStore } from "@/store/useAuthStore";


// export function QuickActions() {
//     const user = useAuthStore((state) => state.user);

//     const role = user?.role;


//     const action = {
//         teacher: {
//             label: "Create Package",
//             href: "/teacher/packages/create",
//             icon: Plus,
//         },

//         student: {
//             label: "Find Teacher",
//             href: "/teachers",
//             icon: Search,
//         },

//         admin: {
//             label: "Manage Users",
//             href: "/admin/users",
//             icon: Users,
//         },
//     }[role ?? "student"];


//     if (!action) return null;


//     const Icon = action.icon;


//     return (
//         <Link href={action.href}>
//             <motion.button
//                 whileHover={{
//                     y: -2,
//                     scale: 1.02,
//                 }}
//                 whileTap={{
//                     scale: 0.97,
//                 }}
//                 className="
//           hidden
//           h-11
//           items-center
//           gap-2
//           rounded-2xl
//           bg-gradient-to-r
//           from-indigo-600
//           to-violet-600
//           px-5
//           text-sm
//           font-semibold
//           text-white
//           shadow-md
//           transition-all
//           hover:shadow-lg
//           md:flex
//         "
//             >
//                 <Icon className="h-4 w-4" />

//                 <span>
//                     {action.label}
//                 </span>

//             </motion.button>
//         </Link>
//     );
// }