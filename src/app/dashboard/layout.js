import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <Sidebar />
            <main className="flex-1 p-6 bg-[#0e0e0e] min-h-screen text-white">
              {children}
            </main>
        </div>
      </body>
    </html>
  );
}
