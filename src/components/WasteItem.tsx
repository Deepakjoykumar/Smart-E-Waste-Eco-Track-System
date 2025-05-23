
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WasteItem as WasteItemType } from "@/context/WasteContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface WasteItemProps {
  item: WasteItemType;
  showActions?: boolean;
}

const WasteItem = ({ item, showActions = true }: WasteItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "collected": return "bg-blue-100 text-blue-800";
      case "processing": return "bg-yellow-100 text-yellow-800";
      case "recycled": return "bg-green-100 text-green-800";
      case "component-extraction": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const handleTrack = () => {
    navigate(`/monitoring?id=${item.id}`);
  };

  const handleRecycle = () => {
    navigate(`/recycling?id=${item.id}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
        <Badge 
          className={`absolute top-2 right-2 ${getStatusColor(item.status)}`}
        >
          {item.status.replace("-", " ")}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>{item.type}</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-gray-500 mb-2">Collected: {formatDate(item.dateCollected)}</p>
        
        {isExpanded && (
          <div className="text-sm mt-2 animate-fade-in">
            <p className="mb-2">{item.description}</p>
            {item.components && (
              <div className="mt-3">
                <p className="font-medium mb-1">Components:</p>
                <div className="flex flex-wrap gap-1">
                  {item.components.map((component, i) => (
                    <Badge key={i} variant="outline" className="bg-gray-100">
                      {component}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            <p className="mt-3 font-medium">
              Estimated value: ${item.estimatedValue.toFixed(2)}
            </p>
          </div>
        )}
        
        <Button 
          variant="link" 
          className="p-0 h-auto text-sm text-gray-600"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show less" : "Show more"}
        </Button>
      </CardContent>
      
      {showActions && (
        <CardFooter className="flex gap-2 pt-0">
          <Button variant="outline" onClick={handleTrack}>Track</Button>
          <Button variant="default" onClick={handleRecycle}>Recycle</Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default WasteItem;
