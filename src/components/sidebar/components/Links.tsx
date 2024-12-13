// /* eslint-disable */
// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import DashIcon from "components/icons/DashIcon";
// import ArrowDown from "components/icons/ArrowDownIcon";
// import ArrowRight from "components/icons/ArrowRightIcon";

// export const SidebarLinks = (props: { routes: RoutesType[] }): JSX.Element => {
//   const location = useLocation();
//   const { routes } = props;

//   // State to manage the open/closed state of routes with subRoutes
//   const [openRoutes, setOpenRoutes] = useState<{ [key: string]: boolean }>({});

//   // Toggle the open/closed state of a route
//   const toggleRoute = (routeName: string) => {
//     setOpenRoutes((prevState) => ({
//       ...prevState,
//       [routeName]: !prevState[routeName],
//     }));
//   };

//   // Verifies if routeName is the one active (in browser input)
//   const activeRoute = (routeName: string) => {
//     return location.pathname.includes(routeName);
//   };

//   const createLinks = (routes: RoutesType[]) => {
//     return routes.map((route, index) => {
//       const hasSubRoutes = route.subRoutes && route.subRoutes.length > 0;
//       if (route.layout === "/admin") {
//         return (
//           <div key={index} className="relative flex flex-col">
//             <Link
//               to={hasSubRoutes ? "#" : route.layout + "/" + route.path}
//               className={`flex cursor-pointer items-center px-8 py-3 ${
//                 activeRoute(route.path) ? "bg-navy-50 dark:bg-brand-400" : ""
//               }`}
//               onClick={() => hasSubRoutes && toggleRoute(route.path)}
//             >
//               <div className={`flex w-full items-center`}>
//                 <span
//                   className={`${
//                     activeRoute(route.path)
//                       ? "font-bold text-brand-500 dark:text-white"
//                       : "font-medium text-gray-600"
//                   }`}
//                 >
//                   {route.icon ? route.icon : <DashIcon />}{" "}
//                 </span>
//                 <p
//                   className={`leading-1 ml-4 font-bold text-navy-700 dark:text-white`}
//                 >
//                   {route.name}
//                 </p>
//                 {hasSubRoutes &&
//                   (openRoutes[route.path] ? (
//                     <div className="absolute right-5">
//                       <ArrowDown />
//                     </div>
//                   ) : (
//                     <div className="absolute right-5">
//                       <ArrowRight />
//                     </div>
//                   ))}
//               </div>
//             </Link>
//             {openRoutes[route.path] && hasSubRoutes && (
//               <ul className="ml-4">
//                 {route.subRoutes.map((subRoute: any, subIndex: any) => (
//                   <Link
//                     key={subIndex}
//                     to={subRoute.layout + "/" + subRoute.path}
//                   >
//                     <li
//                       className={`my-[3px] flex cursor-pointer items-center px-8 py-2  ${
//                         activeRoute(subRoute.path)
//                           ? "bg-navy-50 dark:bg-brand-400"
//                           : ""
//                       }`}
//                     >
//                       {/* <span
//                         className={`${
//                           activeRoute(subRoute.path)
//                             ? "font-bold text-brand-500 dark:text-white"
//                             : "font-medium text-gray-600"
//                         }`}
//                       >
//                         {subRoute.icon ? subRoute.icon : <DashIcon />}{" "}
//                       </span> */}
//                       <p
//                         className={`leading-1 ml-4 ${
//                           activeRoute(subRoute.path)
//                             ? "font-bold text-navy-700 dark:text-white"
//                             : "font-medium text-gray-600"
//                         }`}
//                       >
//                         {subRoute.name}
//                       </p>
//                     </li>
//                   </Link>
//                 ))}
//               </ul>
//             )}
//             {/* {activeRoute(route.path) && !hasSubRoutes && (
//               <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
//             )} */}
//           </div>
//         );
//       }
//     });
//   };

//   return <>{createLinks(routes)}</>;
// };

// export default SidebarLinks;

import React from "react";

export default function Links() {
  return <div>Links</div>;
}
