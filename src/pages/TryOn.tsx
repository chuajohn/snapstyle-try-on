
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/TryOn/ImageUpload';
import { TryOnResult } from '@/components/TryOn/TryOnResult';
import { TryOnControls } from '@/components/TryOn/TryOnControls';
import { Loader2, Shirt, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export interface TryOnParams {
  backgroundFile: File | null;
  garmentFile: File | null;
  denoisingSteps: number;
  seed: number;
  isChecked: boolean;
  isCheckedCrop: boolean;
}

const TryOn = () => {
  const [personImage, setPersonImage] = useState<File | null>(null);
  const [garmentImage, setGarmentImage] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tryOnParams, setTryOnParams] = useState<TryOnParams>({
    backgroundFile: null,
    garmentFile: null,
    denoisingSteps: 20,
    seed: 42,
    isChecked: true,
    isCheckedCrop: false,
  });

  const handlePersonImageUpload = (file: File) => {
    setPersonImage(file);
    setTryOnParams(prev => ({ ...prev, backgroundFile: file }));
  };

  const handleGarmentImageUpload = (file: File) => {
    setGarmentImage(file);
    setTryOnParams(prev => ({ ...prev, garmentFile: file }));
  };

  const performTryOn = async () => {
    if (!personImage || !garmentImage) {
      toast({
        title: "Missing Images",
        description: "Please upload both a person image and a garment image.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Convert images to base64 for API
      const personImageBase64 = await fileToBase64(personImage);
      const garmentImageBase64 = await fileToBase64(garmentImage);

      const response = await fetch("https://api-inference.huggingface.co/models/yisol/IDM-VTON", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: {
            background: personImageBase64,
            garment: garmentImageBase64,
            denoising_steps: tryOnParams.denoisingSteps,
            seed: tryOnParams.seed,
            is_checked: tryOnParams.isChecked,
            is_checked_crop: tryOnParams.isCheckedCrop,
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setResultImage(imageUrl);
      
      toast({
        title: "Try-On Complete!",
        description: "Your virtual try-on result is ready.",
      });
    } catch (error) {
      console.error("Try-on failed:", error);
      toast({
        title: "Try-On Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Virtual Try-On</h1>
          <p className="text-lg text-gray-600">
            Upload your photo and a garment to see how it looks on you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Person Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Your Photo
              </CardTitle>
              <CardDescription>
                Upload a clear photo of yourself
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUpload
                onImageUpload={handlePersonImageUpload}
                acceptedTypes="image/*"
                placeholder="Upload your photo"
                currentImage={personImage}
              />
            </CardContent>
          </Card>

          {/* Garment Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shirt className="h-5 w-5" />
                Garment
              </CardTitle>
              <CardDescription>
                Upload the garment you want to try on
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUpload
                onImageUpload={handleGarmentImageUpload}
                acceptedTypes="image/*"
                placeholder="Upload garment image"
                currentImage={garmentImage}
              />
            </CardContent>
          </Card>

          {/* Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Try-On Settings</CardTitle>
              <CardDescription>
                Adjust the virtual try-on parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TryOnControls
                params={tryOnParams}
                onChange={setTryOnParams}
              />
              <Button
                onClick={performTryOn}
                disabled={!personImage || !garmentImage || isLoading}
                className="w-full mt-4"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Try On Garment"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Result */}
        {resultImage && (
          <div className="mt-8">
            <TryOnResult
              resultImage={resultImage}
              onDownload={() => {
                const link = document.createElement('a');
                link.href = resultImage;
                link.download = 'virtual-tryon-result.png';
                link.click();
              }}
              onReset={() => {
                setResultImage(null);
                setPersonImage(null);
                setGarmentImage(null);
                setTryOnParams({
                  backgroundFile: null,
                  garmentFile: null,
                  denoisingSteps: 20,
                  seed: 42,
                  isChecked: true,
                  isCheckedCrop: false,
                });
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TryOn;
