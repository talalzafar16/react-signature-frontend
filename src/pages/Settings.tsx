import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";


const Settings = () => {
  const [sellerInfo, setSellerInfo] = useState({
    name: "",
    mobile: "+92-",
    plotNumber: "",
    societyName: "Pak View City",
  });

  const handleChange = (field: string, value: string) => {
    setSellerInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleMobileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;

    // Remove any characters that are not digits, keeping `+92-` intact
    input = input.replace(/[^\d]/g, '');
    input = input.replace(/^92/, ''); // Prevent user from changing the +92 prefix

    // Limit input to 11 digits
    if (input.length > 11) {
      input = input.slice(0, 11);
    }

    // Format the input as +92-XXX-XXX-XXXX
    const formattedNumber = formatMobileNumber(input);

    // Update the sellerInfo state with the formatted mobile number
    setSellerInfo((prevInfo) => ({
      ...prevInfo,
      mobile: formattedNumber,
    }));
  };

  // Function to format the mobile number as +92-XXX-XXX-XXXX
  const formatMobileNumber = (input: string) => {
    const part1 = input.slice(0, 3); // first 3 digits
    const part2 = input.slice(3, 6); // next 3 digits
    const part3 = input.slice(6, 11); // last 4 digits

    return `+92-${part1}${part2 ? `-${part2}` : ''}${part3 ? `-${part3}` : ''}`;
  };

  const handleSubmit = () => {};

  return (
    <div className="flex justify-center items-center p-5 bg-slate-100 min-h-screen">
      <Dialog>
        <DialogTrigger className="bg-[#BC9128] text-white rounded-full py-1 px-5 max-sm:px-3">
          Sell Property
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="font-bold">Sell Property</DialogHeader>
          <DialogDescription>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-y-5">
                <div>
                  <Label htmlFor="name">Name*</Label>
                  <Input
                    id="name"
                    value={sellerInfo.name}
                    required
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="mobile">Phone number*</Label>
                  <Input
                    id="mobile"
                    value={sellerInfo.mobile}
                    required
                    onChange={handleMobileInputChange}
                    maxLength={16}
                  />
                </div>
                <div>
                  <Label htmlFor="plotNumber">Plot Number*</Label>
                  <Input
                    id="plotNumber"
                    required
                    value={sellerInfo.plotNumber}
                    onChange={(e) => handleChange("plotNumber", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="societyName">Society Name*</Label>
                  <Input
                    id="societyName"
                    readOnly
                    value={sellerInfo.societyName}
                    onChange={(e) =>
                      handleChange("societyName", e.target.value)
                    }
                  />
                </div>
                <div className="w-full flex justify-center">
                  {/* <DialogTrigger asChild> */}
                  <button
                    type="submit"
                    className="border-none rounded-full bg-black text-white font-bold  py-2 px-10"
                  >
                    Submit
                  </button>
                  {/* </DialogTrigger> */}
                </div>
              </div>
            </form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;
