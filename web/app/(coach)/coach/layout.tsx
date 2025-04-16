import CoachDashboard from "@/app/component/CoachDashboard";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="min-h-screen flex flex-col bg-white">
        <CoachDashboard />
        <div className="flex-grow py-10 px-4 sm:px-6 lg:pl-96 lg:px-10">
          {children}
        </div>
      </main>
    </>
  );
}
