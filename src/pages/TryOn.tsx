import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/TryOn/ImageUpload';
import { TryOnResult } from '@/components/TryOn/TryOnResult';
import { TryOnControls } from '@/components/TryOn/TryOnControls';
import { Loader2, Shirt, User, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
    denoisingSteps: 30,
    seed: 42,
    isChecked: true,
    isCheckedCrop: false,
  });

  // Hardcoded Hugging Face token
  const huggingFaceToken = "token";

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
      // Dynamically import the Gradio client
      const { client } = await import("@gradio/client");
      
      // Initialize the client with the correct Space and token
      const app = await client("yisol/IDM-VTON", {
        hf_token: huggingFaceToken as `hf_${string}`
      });

      // Convert images to blobs
      const personBlob = new Blob([await personImage.arrayBuffer()], { type: personImage.type });
      const garmentBlob = new Blob([await garmentImage.arrayBuffer()], { type: garmentImage.type });

      // Make the prediction with all required parameters
      const result = await app.predict("/tryon", [
        {
          "background": personBlob,
          "layers": [],
          "composite": null
        },
        garmentBlob,
        "A fashionable garment",
        tryOnParams.isChecked,
        tryOnParams.isCheckedCrop,
        tryOnParams.denoisingSteps,
        tryOnParams.seed
      ]);

      // Handle different response formats
      let imageUrl: string | null = null;
      
      if (typeof result?.data === 'string') {
        // Direct image URL case
        imageUrl = result.data;
      } else if (result?.data?.[0]?.url) {
        // Nested URL case
        imageUrl = result.data[0].url;
      } else if (result?.data?.[0]?.image) {
        // Base64 image case
        imageUrl = `data:image/png;base64,${result.data[0].image}`;
      }

      if (imageUrl) {
        setResultImage(imageUrl);
        toast({
          title: "Try-On Complete!",
          description: "Your virtual try-on result is ready.",
        });
      } else {
        console.log("Full API response:", result);
        throw new Error("The API returned an unexpected response format");
      }

    } catch (error: unknown) {
      console.error("Try-on failed:", error);
      
      let errorMessage = "Something went wrong. Please try again.";
      if (error instanceof Error) {
        if (error.message.includes("401")) {
          errorMessage = "Authentication failed. Please check your API token and try again.";
        } else if (error.message.includes("unexpected response")) {
          errorMessage = "The API returned an unexpected response. Please try different images or settings.";
        } else {
          errorMessage = error.message;
        }
      }

      toast({
        title: "Try-On Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
                Upload a clear full-body photo with a neutral background
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
                Upload the garment you want to try on (front view works best)
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
                  denoisingSteps: 30,
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