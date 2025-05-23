
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ComponentValue {
  name: string;
  value: number;
}

interface ValueEstimatorProps {
  components: ComponentValue[];
  totalValue: number;
}

const ValueEstimator = ({ components, totalValue }: ValueEstimatorProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Component Value Estimation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {components.map((component, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">{component.name}</span>
                <span className="text-sm">${component.value.toFixed(2)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-secondary h-2 rounded-full" 
                  style={{ width: `${(component.value / totalValue) * 100}%` }}
                />
              </div>
            </div>
          ))}
          
          <Separator className="my-4" />
          
          <div className="flex justify-between items-center">
            <span className="font-medium">Total Estimated Value</span>
            <span className="text-lg font-bold text-primary">${totalValue.toFixed(2)}</span>
          </div>
          
          <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="text-sm font-medium mb-1">How compensation works:</h4>
            <p className="text-sm text-gray-600">
              You'll receive compensation based on the value of recyclable components 
              extracted from your e-waste. Payments are processed within 5-7 business days.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ValueEstimator;
