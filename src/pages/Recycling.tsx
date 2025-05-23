
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WasteItem from "@/components/WasteItem";
import { useWaste } from "@/context/WasteContext";
import ValueEstimator from "@/components/ValueEstimator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

const Recycling = () => {
  const { wasteItems, getWasteById, updateWasteStatus } = useWaste();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  
  // Get item ID from URL if available
  const itemId = searchParams.get("id");
  const selectedItem = itemId ? getWasteById(itemId) : null;
  
  // State for recycling process
  const [showComponents, setShowComponents] = useState(false);
  
  const handleRecycleOption = (option: "recycle" | "extract") => {
    if (!selectedItem) return;
    
    if (option === "recycle") {
      updateWasteStatus(selectedItem.id, "recycled");
      toast({
        title: "Item sent for recycling",
        description: "Your e-waste is being recycled in an environmentally friendly way."
      });
    } else {
      updateWasteStatus(selectedItem.id, "component-extraction");
      setShowComponents(true);
      toast({
        title: "Component extraction initiated",
        description: "Valuable components will be extracted and you'll receive compensation."
      });
    }
  };
  
  // Generate component values randomly based on the estimated total value
  const getComponentValues = () => {
    if (!selectedItem || !selectedItem.components) return [];
    
    const components = selectedItem.components;
    let remainingValue = selectedItem.estimatedValue;
    const result = [];
    
    // Distribute the total estimated value among components
    for (let i = 0; i < components.length; i++) {
      if (i === components.length - 1) {
        // Last component gets the remaining value
        result.push({
          name: components[i],
          value: parseFloat(remainingValue.toFixed(2))
        });
      } else {
        // Generate a random portion of the remaining value
        const portionPercentage = Math.random() * 0.5 + 0.1; // Between 10% and 60%
        const value = parseFloat((remainingValue * portionPercentage).toFixed(2));
        remainingValue -= value;
        result.push({
          name: components[i],
          value: value
        });
      }
    }
    
    return result;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-6 py-12 flex-grow">
        <h1 className="text-3xl font-bold mb-2">E-Waste Recycling</h1>
        <p className="text-gray-600 mb-8">
          Choose how you want your electronic waste to be processed.
        </p>
        
        {selectedItem ? (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left column - Item details */}
            <div>
              <WasteItem item={selectedItem} showActions={false} />
              
              {/* Recycling options */}
              {selectedItem.status !== "recycled" && selectedItem.status !== "component-extraction" && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Recycling Options</CardTitle>
                    <CardDescription>Choose how you want to recycle this item</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start">
                        <div className="mr-4">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xl">
                            ♻️
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Full Recycling</h3>
                          <p className="text-sm text-gray-600 mb-2">
                            Completely recycle the device in an environmentally friendly way.
                          </p>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline">Choose</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirm Recycling</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to fully recycle this device? This process cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleRecycleOption("recycle")}>
                                  Confirm
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg border-primary">
                      <div className="flex items-start">
                        <div className="mr-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl">
                            💰
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">Component Extraction</h3>
                            <Badge className="bg-accent text-white">Recommended</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            Extract valuable components and receive compensation based on their value.
                          </p>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button>Choose</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirm Component Extraction</AlertDialogTitle>
                                <AlertDialogDescription>
                                  We'll extract valuable components from your device and provide compensation 
                                  based on their estimated value. Do you want to proceed?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleRecycleOption("extract")}>
                                  Confirm
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Right column - Component extraction or status */}
            <div>
              {selectedItem.status === "recycled" ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Recycling Process</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                      <h3 className="text-green-700 font-medium mb-2">Device is being recycled</h3>
                      <p className="text-green-600 text-sm">
                        Your device is being processed for full recycling. Thank you for choosing 
                        the environmentally responsible option.
                      </p>
                    </div>
                    
                    <h3 className="font-medium mb-2">Recycling Process:</h3>
                    <ol className="list-decimal pl-5 space-y-3 text-sm">
                      <li>Disassembly and separation of components</li>
                      <li>Hazardous material removal and safe disposal</li>
                      <li>Material sorting (plastics, metals, glass)</li>
                      <li>Processing of materials for reuse</li>
                      <li>Final environmental certification</li>
                    </ol>
                  </CardContent>
                </Card>
              ) : selectedItem.status === "component-extraction" || showComponents ? (
                <ValueEstimator
                  components={getComponentValues()}
                  totalValue={selectedItem.estimatedValue}
                />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Recycling Benefits</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      Properly recycling electronic waste helps protect the environment from hazardous materials
                      while recovering valuable resources.
                    </p>
                    
                    <h3 className="font-medium">Environmental Impact:</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Reduces landfill waste and pollution</li>
                      <li>Prevents hazardous materials from entering soil and water</li>
                      <li>Conserves natural resources</li>
                      <li>Reduces energy consumption and greenhouse gas emissions</li>
                    </ul>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium mb-1">Did You Know?</h3>
                      <p className="text-sm text-gray-600">
                        Recycling one million laptops saves the energy equivalent to electricity 
                        used by 3,657 homes in a year.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Additional information */}
              {selectedItem.status !== "recycled" && selectedItem.status !== "component-extraction" && !showComponents && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Component Extraction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      Valuable components will be extracted and you'll receive compensation based on their value.
                    </p>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium mb-2">Potential valuable components:</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>• Circuit boards</div>
                        <div>• Processors</div>
                        <div>• Memory modules</div>
                        <div>• Hard drives</div>
                        <div>• Precious metals</div>
                        <div>• Batteries</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {wasteItems.map((item) => (
              <WasteItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Recycling;
