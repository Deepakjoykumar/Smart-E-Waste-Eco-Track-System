
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageUpload from "@/components/ImageUpload";
import { useWaste } from "@/context/WasteContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Collection = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const { addWasteItem } = useWaste();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleImageSelect = (file: File, preview: string) => {
    setUploadedImage(preview);
    setUploadedFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadedImage || !name || !type) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields and upload an image",
        variant: "destructive",
      });
      return;
    }
    
    // Generate a random estimated value between 10 and 100
    const estimatedValue = Math.floor(Math.random() * 90) + 10;
    
    // Generate some random components based on the type
    const components = [];
    
    if (type === "Computer" || type === "Laptop") {
      components.push("CPU", "RAM", "Hard Drive", "Motherboard", "Power Supply");
    } else if (type === "Mobile" || type === "Smartphone") {
      components.push("Battery", "Display", "Camera", "CPU", "Memory Chip");
    } else if (type === "TV" || type === "Monitor") {
      components.push("LCD/LED Panel", "Circuit Board", "Power Supply");
    } else {
      components.push("Circuit Board", "Metal Components", "Plastic Case");
    }
    
    // Add the e-waste item
    addWasteItem({
      name,
      type,
      description,
      image: uploadedImage,
      estimatedValue,
      components
    });
    
    toast({
      title: "E-waste registered successfully!",
      description: "You can now track your e-waste in the monitoring section."
    });
    
    navigate("/monitoring");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-6 py-12 flex-grow">
        <h1 className="text-3xl font-bold mb-2">E-Waste Collection</h1>
        <p className="text-gray-600 mb-8">
          Register your electronic waste for collection, tracking, and responsible recycling.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Upload E-Waste Image</CardTitle>
              <CardDescription>
                Upload a clear image of your e-waste for identification using our edge computing system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUpload onImageSelect={handleImageSelect} />
            </CardContent>
          </Card>
          
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>E-Waste Details</CardTitle>
                <CardDescription>
                  Provide information about your electronic waste
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name / Model *
                  </label>
                  <Input
                    id="name"
                    placeholder="e.g., Dell XPS 13, iPhone 11"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Device Type *
                  </label>
                  <Select value={type} onValueChange={setType} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select device type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer">Computer</SelectItem>
                      <SelectItem value="Laptop">Laptop</SelectItem>
                      <SelectItem value="Mobile">Mobile Phone</SelectItem>
                      <SelectItem value="Tablet">Tablet</SelectItem>
                      <SelectItem value="TV">TV</SelectItem>
                      <SelectItem value="Monitor">Monitor</SelectItem>
                      <SelectItem value="Printer">Printer</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Condition, age, and any other relevant details..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={!uploadedImage || !name || !type}
                >
                  Register E-Waste
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
        
        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="text-3xl font-bold text-primary mb-2">01</div>
              <h3 className="font-medium mb-2">Register Your E-Waste</h3>
              <p className="text-sm text-gray-600">Upload photos and provide details about your electronic waste.</p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="text-3xl font-bold text-primary mb-2">02</div>
              <h3 className="font-medium mb-2">Arrange Collection</h3>
              <p className="text-sm text-gray-600">Schedule a pickup or drop-off at our e-waste center.</p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="text-3xl font-bold text-primary mb-2">03</div>
              <h3 className="font-medium mb-2">Track & Get Compensated</h3>
              <p className="text-sm text-gray-600">Monitor the recycling process and receive payment for valuable components.</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Collection;
