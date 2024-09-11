import DashboardLeft from "@/components/dashboard/DashboardLeft";
import DashboardRight from "@/components/dashboard/DashboardRight";

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="w-4/6">
        <DashboardLeft />
      </div>
      <div className="w-2/6">
        <DashboardRight />
      </div>
    </div>
  );
};

export default Dashboard;
