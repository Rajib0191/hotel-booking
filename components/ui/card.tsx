import { AvailableRoom } from "@/controller/useAvailableRooms";
import { IMAGE_PATH } from "@/services/apiService";
import { Snowflake, Tv, Refrigerator, Users } from "lucide-react";
import Image from "next/image";
import Button from "../common/Button";
import { useBookRoom } from "@/hooks/bookingsQueries";
import { BookingRequest } from "@/types/booking";

interface CardProps {
  item: AvailableRoom;
  checkInDate?: string;
  checkOutDate?: string;
}

const Card = ({ item, checkOutDate, checkInDate }: CardProps) => {
  const { mutate, isPending, isError, error, isSuccess } = useBookRoom();

  const handleSubmit = (formData: BookingRequest) => {
    mutate(formData);
  };

  return (
    <div className="max-w-full rounded-sm shadow-custom-shadow p-4 flex gap-4 bg-white">
      {/* =====Image===== */}
      <div className="relative w-40 h-40 flex-shrink-0">
        <Image
          src={`${IMAGE_PATH}/${item?.imageUrl}`}
          alt="Sayeman Beach Resort"
          height={160}
          width={160}
          priority
          className="w-auto h-full object-cover rounded-md"
        />
      </div>

      {/* =====Content===== */}
      <div className="flex flex-col justify-between w-full">
        {/* Header */}
        <div className="">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Sayeman Beach Resort</h2>
            <div className="flex justify-start items-center text-sm gap-1">
              <Users size={16} />
              <span>
                {item?.capacity} {item?.capacity > 1 ? "Persons" : "Person"}
              </span>
            </div>
          </div>
          <div className="">
            <p className="text-sm leading-4">{item?.description}</p>
          </div>
        </div>

        {/* Features */}
        <div className="flex justify-start items-center gap-2 text-sm text-gray-600">
          <Tv size={16} />
          <span>TV</span>
          <Refrigerator size={16} />
          <span>Fridge</span>
          <Snowflake size={16} />
          <span>Air Condition</span>
        </div>

        {/* Pricing */}
        <div className="mt-4 text-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-gray-800">
                BDT {item?.pricePerNight}
              </p>
              <p className="text-xs text-gray-500">for 1 Night, per room</p>
            </div>

            <Button
              title="Book Room"
              className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-semibold px-4 py-2 rounded"
              onClick={() =>
                handleSubmit({
                  roomId: item.id,
                  checkInDate: checkInDate ? checkInDate : "",
                  checkOutDate: checkOutDate ? checkOutDate : "",
                })
              }
              disabled={isPending}
              loading={isPending}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
