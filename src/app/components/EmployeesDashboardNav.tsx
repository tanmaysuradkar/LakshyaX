import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const EmployeesDashboardNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [data, setdata] = useState({
    id: "",
    username: "",
    email: "",
    isVerified: "",
  });
  const handleNavigation = (path: string) => {
    router.push(path);
  };
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post("/api/user/me");
//         console.log("Dashboard data:", response.data);
//         console.log("First name:", response.data.user);
//         setdata(response.data.user);
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//       }
//     };
//     fetchData();
//   }, []);
  return (
    <aside className="w-64 bg-white shadow-sm h-screen fixed left-0 top-0">
      <div className="p-4">
        <h2 className="text-xl font-bold text-blue-600 mb-8">LakshyaX</h2>
        <nav className="space-y-2">
          <button
            onClick={() => handleNavigation("/Dashboard")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === "/Dashboard"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span>Dashboard</span>
            {pathname === "/Dashboard" && (
              <svg
                className="w-5 h-5 ml-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>

          <button
            onClick={() => handleNavigation("/Dashboard/projects")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === "/Dashboard/projects"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span>Projects</span>
            {pathname === "/Dashboard/projects" && (
              <svg
                className="w-5 h-5 ml-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>

          <button
            onClick={() => handleNavigation("/Dashboard/tasks")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === "/Dashboard/tasks"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            <span>Tasks</span>
            {pathname === "/Dashboard/tasks" && (
              <svg
                className="w-5 h-5 ml-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>

          <button
            onClick={() => handleNavigation("/Dashboard/meet")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === "/Dashboard/meet"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span>Meet</span>
            {pathname === "/Dashboard/meet" && (
              <svg
                className="w-5 h-5 ml-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>

          <button
            onClick={() => handleNavigation("/Dashboard/message")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === "/Dashboard/message"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <span>Message</span>
            {pathname === "/Dashboard/message" && (
              <svg
                className="w-5 h-5 ml-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>

          <button
            onClick={() => handleNavigation("/Dashboard/profile")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === "/Dashboard/profile"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span>Profile</span>
            {pathname === "/Dashboard/profile" && (
              <svg
                className="w-5 h-5 ml-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default EmployeesDashboardNav;
