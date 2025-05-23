
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WasteItem from "@/components/WasteItem";
import TrackingCard from "@/components/TrackingCard";
import { useWaste } from "@/context/WasteContext";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, SmartphoneCharging } from "lucide-react";

const Monitoring = () => {
  const { wasteItems, getWasteById } = useWaste();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(wasteItems[0] || null);
  
  // Check if there's an ID in the URL and select that item
  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      const item = getWasteById(id);
      if (item) {
        setSelectedItem(item);
      }
    }
  }, [searchParams, getWasteById]);
  
  // Filter waste items based on search term
  const filteredItems = wasteItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Already filtered by the filteredItems variable
  };
  
  const handleSelectItem = (item: typeof wasteItems[0]) => {
    setSelectedItem(item);
    setSearchParams({ id: item.id });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-6 py-12 flex-grow">
        <h1 className="text-3xl font-bold mb-2">E-Waste Monitoring</h1>
        <p className="text-gray-600 mb-8">
          Track the status of your electronic waste through our recycling system.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left sidebar - list of waste items */}
          <div className="md:col-span-1">
            <Card className="p-4">
              <form onSubmit={handleSearch} className="mb-4">
                <div className="flex">
                  <Input
                    type="text"
                    placeholder="Search by name or type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="rounded-r-none"
                  />
                  <Button type="submit" variant="default" className="rounded-l-none">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </form>
              
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {filteredItems.length === 0 ? (
                  <p className="text-center text-gray-500 py-4">No items found</p>
                ) : (
                  filteredItems.map((item) => (
                    <div 
                      key={item.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedItem?.id === item.id 
                          ? "bg-primary text-white" 
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                      onClick={() => handleSelectItem(item)}
                    >
                      <div className="flex items-center gap-3">
                        {item.type === "Mobile" ? (
                          <div className="w-12 h-12 rounded-md bg-gray-200 flex items-center justify-center">
                            <SmartphoneCharging className={`w-8 h-8 ${selectedItem?.id === item.id ? "text-white" : "text-gray-500"}`} />
                          </div>
                        ) : (
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-12 h-12 rounded-md object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = "https://images.unsplash.com/photo-1518770660439-4636190af475";
                            }}
                          />
                        )}
                        <div>
                          <h3 className={`font-medium ${selectedItem?.id === item.id ? "text-white" : "text-gray-800"}`}>
                            {item.name}
                          </h3>
                          <p className={`text-xs ${selectedItem?.id === item.id ? "text-white/80" : "text-gray-600"}`}>
                            {item.type} • {new Date(item.dateCollected).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
          
          {/* Right content - details of selected waste */}
          <div className="md:col-span-2">
            {selectedItem ? (
              <Tabs defaultValue="details">
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                  <TabsTrigger value="tracking" className="flex-1">Tracking</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="animate-fade-in">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex justify-center items-center">
                      {selectedItem.type === "Mobile" ? (
                        <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                          <SmartphoneCharging className="w-32 h-32 text-gray-400" />
                        </div>
                      ) : (
                        <img 
                          src={selectedItem.image} 
                          alt={selectedItem.name}
                          className="w-full h-64 object-cover rounded-lg"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "https://images.unsplash.com/photo-1518770660439-4636190af475";
                          }}
                        />
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedItem.name}</h2>
                      <p className="text-gray-600 mb-2">{selectedItem.type}</p>
                      <p className="text-sm text-gray-700 mb-4">{selectedItem.description}</p>
                      
                      <div className="mb-4">
                        <h3 className="font-medium mb-1">Collection Date:</h3>
                        <p>{new Date(selectedItem.dateCollected).toLocaleDateString()}</p>
                      </div>
                      
                      <div className="mb-4">
                        <h3 className="font-medium mb-1">Current Status:</h3>
                        <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                          {selectedItem.status.replace("-", " ")}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h3 className="font-medium mb-1">Estimated Value:</h3>
                        <p className="text-lg font-bold text-primary">
                          ${selectedItem.estimatedValue.toFixed(2)}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-1">Components:</h3>
                        <div className="flex flex-wrap gap-1">
                          {selectedItem.components?.map((component, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 text-xs rounded">
                              {component}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="tracking" className="animate-fade-in">
                  <TrackingCard item={selectedItem} />
                </TabsContent>
              </Tabs>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500 mb-4">
                  Select an item from the list to view its details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Monitoring;
