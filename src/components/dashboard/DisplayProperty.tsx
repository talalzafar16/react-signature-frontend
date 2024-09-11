import { Card, CardContent } from "@/components/ui/card";
import { CiLocationOn } from "react-icons/ci";

type DisplayPropertyProps = {
  property: {
    name: string;
    location: string;
    price: number;
    investement: number;
    img: string;
    baths: number;
    beds: number;
    parking: number;
  };
};

const DisplayProperty = ({ property }: DisplayPropertyProps) => {
  const formattedPrice = (price: number) => {
    return price.toLocaleString(); // Adds commas automatically
  };

  return (
    <Card className="p-2">
      <CardContent className="flex flex-col p-0">
        <div className="w-full">
          <img
            src={property.img}
            alt={property.name}
            className="w-full h-52 object-cover rounded-lg"
          />
        </div>
        <div className="pt-5 flex gap-2 items-start border-b-2 pb-5">
          <CiLocationOn color="#4C52EC" />
          <div>
            <p className="text-grayText text-xs line-clamp-1">
              {property.location}
            </p>
            <p className="pt-3 font-bold line-clamp-1">{property.name}</p>
            <p className="text-grayText text-xs">
              {property.beds} Beds, {property.baths} Baths, {property.parking}{" "}
              Parking
            </p>
          </div>
        </div>
        <div className="pt-3 w-full pl-3">
          <p className="text-grayText text-xs line-clamp-1">
            Property Price:{" "}
            <span className="text-[#4C52EC] text-sm">
              PKR {formattedPrice(property.price)}
            </span>
          </p>
          <p className="text-grayText text-xs line-clamp-1">
            Investment:{" "}
            <span className="text-[#4C52EC] text-sm">
              PKR {formattedPrice(property.investement)}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DisplayProperty;
