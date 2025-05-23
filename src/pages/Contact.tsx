
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Map, MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible.",
      });
      
      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-6 py-12 flex-grow">
        <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
        <p className="text-gray-600 mb-8">
          Get in touch with our e-waste management team.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact form */}
          <Card>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="Message subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          {/* Contact information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-primary" />
                  Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <address className="not-italic">
                  <p>E-waste Center,</p>
                  <p>Erode Sengunthar Engineering College,</p>
                  <p>Perundurai,</p>
                  <p>Tamil Nadu, India</p>
                </address>
              </CardContent>
              <CardFooter className="pt-0">
                <a 
                  href="https://maps.google.com/?q=Erode+Sengunthar+Engineering+College+Perundurai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center"
                >
                  <Map className="mr-1 h-4 w-4" />
                  View on Google Maps
                </a>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-primary" />
                  Email Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <span className="font-medium block">General Inquiries:</span>
                  <a href="mailto:info@smartewaste.com" className="text-primary hover:underline">
                    info@smartewaste.com
                  </a>
                </p>
                <p>
                  <span className="font-medium block">Support:</span>
                  <a href="mailto:support@smartewaste.com" className="text-primary hover:underline">
                    support@smartewaste.com
                  </a>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="mr-2 h-5 w-5 text-primary" />
                  Call Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <span className="font-medium block">Phone:</span>
                  <a href="tel:+919876543210" className="text-primary hover:underline">
                    +91 98765 43210
                  </a>
                </p>
                <p>
                  <span className="font-medium block">Toll Free:</span>
                  <a href="tel:18001234567" className="text-primary hover:underline">
                    1800 123 4567
                  </a>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-primary" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <span className="font-medium">Monday - Friday:</span>
                  <span className="ml-2">9:00 AM - 6:00 PM</span>
                </p>
                <p>
                  <span className="font-medium">Saturday:</span>
                  <span className="ml-2">9:00 AM - 1:00 PM</span>
                </p>
                <p>
                  <span className="font-medium">Sunday:</span>
                  <span className="ml-2">Closed</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Map (placeholder) */}
        <div className="mt-12">
          <div className="w-full h-72 bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Map className="h-10 w-10 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Map placeholder - Google Maps integration would go here</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
