import CoachDashboard from "../component/CoachDashboard";
import "../globals.css";

export const metadata = {
  title: "redfire",
  description: "really good to eat ",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full bg-white" lang="en">
      <body className="h-full">
        <div>
          <CoachDashboard />
          <main className="">
            <div className="">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
