'use client';
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DashboardNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setdata] = useState({
    id: "",
    username: "",
    email: "",
    isVerified: "",
  });

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/user/me");
        console.log("Dashboard data:", response.data);
        console.log("First name:", response.data.user);
        setdata(response.data.user);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchData();
  }, []);

  const navItems = [
    { label: "Dashboard", path: "/AdminDashboard", icon: "home" },
    { label: "Sales", path: "/AdminDashboard/sales", icon: "sales" },
    { label: "Employees", path: "/AdminDashboard/employees", icon: "users" },
    { label: "Projects", path: "/AdminDashboard/projects", icon: "project" },
    { label: "Tasks", path: "/AdminDashboard/tasks", icon: "task" },
    { label: "Profile", path: "/AdminDashboard/profile", icon: "profile" },
    { label: "Budgets", path: "/AdminDashboard/budgets", icon: "budget" },
    { label: "Approvals", path: "/AdminDashboard/approvals", icon: "approval" },
    { label: "Project Budgets", path: "/AdminDashboard/projects/budget", icon: "budget" },
  ];

  const getIcon = (iconType: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      home: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      sales: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      users: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      project: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      task: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      profile: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      budget: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
        </svg>
      ),
      approval: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    };
    return iconMap[iconType] || null;
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-20 left-4 z-40 p-2 rounded-md bg-white shadow-md hover:bg-gray-100"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:relative w-64 bg-white shadow-sm h-screen top-0 left-0 transform lg:transform-none transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4 flex flex-col h-full">
          <h2 className="text-xl font-bold text-blue-600 mb-8">LakshyaX</h2>
          <nav className="space-y-2 overflow-y-auto flex-1 pr-2">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  pathname === item.path
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                {getIcon(item.icon)}
                <span className="lg:block">{item.label}</span>
                {pathname === item.path && (
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
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default DashboardNav;
