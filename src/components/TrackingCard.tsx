
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WasteItem } from "@/context/WasteContext";
import { CheckCircle } from "lucide-react";

const statusOrder = ["collected", "processing", "component-extraction", "recycled"];

interface TrackingCardProps {
  item: WasteItem;
}

const TrackingCard = ({ item }: TrackingCardProps) => {
  const currentStatusIndex = statusOrder.indexOf(item.status);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Tracking Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {statusOrder.map((status, index) => {
            const isActive = index <= currentStatusIndex;
            const isCurrent = index === currentStatusIndex;
            
            return (
              <div key={status} className="flex items-start gap-4">
                <div className="relative">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isActive ? "bg-primary text-white" : "bg-gray-200"
                  } ${isCurrent ? "animate-pulse-slow" : ""}`}>
                    {isActive && <CheckCircle className="w-5 h-5" />}
                    {!isActive && <span className="text-gray-500">{index + 1}</span>}
                  </div>
                  
                  {index < statusOrder.length - 1 && (
                    <div className={`absolute top-8 left-1/2 w-0.5 h-10 -translate-x-1/2 ${
                      index < currentStatusIndex ? "bg-primary" : "bg-gray-200"
                    }`} />
                  )}
                </div>
                
                <div className="pt-1">
                  <h3 className={`font-medium ${isActive ? "text-primary" : "text-gray-500"}`}>
                    {status === "collected" && "Collected"}
                    {status === "processing" && "Processing"}
                    {status === "component-extraction" && "Component Extraction"}
                    {status === "recycled" && "Recycled"}
                  </h3>
                  
                  <p className="text-sm text-gray-500 mt-1">
                    {status === "collected" && "Your e-waste has been collected and is awaiting processing."}
                    {status === "processing" && "Your e-waste is being evaluated and sorted for recycling."}
                    {status === "component-extraction" && "Valuable components are being extracted from your e-waste."}
                    {status === "recycled" && "Your e-waste has been successfully recycled!"}
                  </p>
                  
                  {isCurrent && (
                    <p className="text-xs text-primary mt-1 font-medium">Current status</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrackingCard;
