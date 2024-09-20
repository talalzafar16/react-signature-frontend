import { Card, CardContent } from "@/components/ui/card";

import earningIcon from "@/assets/dashboard/money-recive.svg";
import expenseIcon from "@/assets/dashboard/money-send.svg";

const EarningsAndExpenses = () => {
  return (
    <Card className="h-full">
      <CardContent className="p-5 flex flex-col justify-between h-full">
        {/* <!-- Earnings --> */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-5">
            <img src={earningIcon} alt="Earnings" className="w-10 h-10" />
            <div className="flex flex-col gap-3">
              <p className="text-sm">Earnings</p>
              <h1 className="font-bold text-lg">PKR 22,542.23</h1>
            </div>
          </div>
          <div className="flex items-center gap-3 pl-14">
            <span className="text-[#12B12C] bg-[#18D8371A] rounded-lg p-1 text-xs font-bold">+12.3%</span>
            <p className="text-xs text-grayText">since last week</p>
        </div>
        </div>
        {/* <!-- border --> */}
        <div className="border-b-2 max-sm:mt-5"></div>
        {/* <!-- Expenses --> */}
        <div className="flex flex-col gap-5 pt-4">
          <div className="flex items-center gap-5">
            <img src={expenseIcon} alt="Earnings" className="w-10 h-10" />
            <div className="flex flex-col gap-3">
              <p className="text-sm">Expenses</p>
              <h1 className="font-bold text-lg">PKR 22,542.23</h1>
            </div>
          </div>
          <div className="flex items-center gap-3 pl-14">
            <span className="text-[#F66B1D] bg-[#D846181A] rounded-lg p-1 text-xs font-bold">-2.30%</span>
            <p className="text-xs text-grayText">since last week</p>
        </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarningsAndExpenses;
