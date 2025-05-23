import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoBackground from "@/components/VideoBackground";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Recycle, Leaf, BarChart3, PiggyBank } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - Updated Design */}
      <section className="relative min-h-[70vh] flex items-center">
        <VideoBackground />
        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 animate-fade-in">
              <span className="text-white font-medium text-sm">Sustainable E-Waste Management</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white animate-fade-in" style={{animationDelay: "0.1s"}}>
              SMART E-WASTE<br />
              <span className="text-secondary mt-2 inline-block">ECO-TRACK SYSTEM</span>
            </h1>
            
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-white/90 animate-fade-in" style={{animationDelay: "0.2s"}}>
              Our innovative platform connects you with sustainable e-waste solutions, 
              providing component tracking, recycling, and fair compensation.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{animationDelay: "0.3s"}}>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white rounded-full">
                <Link to="/collection">Dispose E-Waste</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 rounded-full">
                <Link to="/monitoring">Track E-Waste</Link>
              </Button>
            </div>
            
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-white animate-fade-in" style={{animationDelay: "0.4s"}}>
              <div className="flex flex-col items-center p-3 bg-black/30 backdrop-blur-sm rounded-lg">
                <Recycle className="w-8 h-8 mb-2 text-secondary" />
                <span className="text-sm font-medium">Eco-Friendly Process</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-black/30 backdrop-blur-sm rounded-lg">
                <Leaf className="w-8 h-8 mb-2 text-secondary" />
                <span className="text-sm font-medium">Sustainable Options</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-black/30 backdrop-blur-sm rounded-lg">
                <BarChart3 className="w-8 h-8 mb-2 text-secondary" />
                <span className="text-sm font-medium">Real-time Tracking</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-black/30 backdrop-blur-sm rounded-lg">
                <PiggyBank className="w-8 h-8 mb-2 text-secondary" />
                <span className="text-sm font-medium">Fair Compensation</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Collection",
                description: "Register and schedule a pickup or drop-off for your electronic waste.",
                icon: "📦",
                link: "/collection"
              },
              {
                title: "Monitoring",
                description: "Track the status of your e-waste throughout the process.",
                icon: "🔍",
                link: "/monitoring"
              },
              {
                title: "Component Extraction",
                description: "Valuable components are identified and extracted from your e-waste.",
                icon: "⚙️",
                link: "/recycling"
              },
              {
                title: "Compensation",
                description: "Receive fair payment based on the value of salvageable components.",
                icon: "💰",
                link: "/recycling"
              }
            ].map((feature, index) => (
              <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <Link to={feature.link} className="text-primary font-medium flex items-center">
                    Learn more <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Eco Impact */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Environmental Impact</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Our system helps reduce e-waste pollution while recovering valuable materials.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: "99%", label: "Materials Recovery Rate" },
              { value: "5,000+", label: "Devices Recycled Monthly" },
              { value: "500+", label: "Tons of CO₂ Prevented" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Recycle Your E-Waste?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Join our eco-friendly e-waste management system and contribute to a sustainable future 
            while getting compensated for valuable components.
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
            <Link to="/collection">Get Started Now</Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
