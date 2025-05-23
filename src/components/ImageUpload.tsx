
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface ImageUploadProps {
  onImageSelect: (file: File, previewUrl: string) => void;
}

const ImageUpload = ({ onImageSelect }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    // Simulate edge computing analysis
    setIsUploading(true);
    const reader = new FileReader();
    
    reader.onloadend = () => {
      // Simulate processing delay
      setTimeout(() => {
        setPreview(reader.result as string);
        onImageSelect(file, reader.result as string);
        setIsUploading(false);
        
        toast({
          title: "Image analysis complete",
          description: "E-waste type successfully identified",
        });
      }, 1500);
    };
    
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      {!preview ? (
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={triggerFileInput}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <Upload className="w-8 h-8 text-gray-400" />
            <p className="text-sm text-gray-500">Click to upload an image of your e-waste</p>
            <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
            <Button 
              variant="secondary"
              className="mt-2"
              disabled={isUploading}
            >
              Select Image
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative">
          <img 
            src={preview} 
            alt="Uploaded e-waste" 
            className="w-full h-64 object-cover rounded-lg" 
          />
          <Button
            variant="outline"
            size="sm"
            className="absolute bottom-2 right-2 bg-white"
            onClick={triggerFileInput}
          >
            Change Image
          </Button>
        </div>
      )}
      
      {isUploading && (
        <div className="flex items-center justify-center mt-4">
          <div className="animate-pulse text-primary">
            Processing image with edge computing...
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
