
// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { ImageUpload } from '@/components/TryOn/ImageUpload';
// import { TryOnResult } from '@/components/TryOn/TryOnResult';
// import { TryOnControls } from '@/components/TryOn/TryOnControls';
// import { Loader2, Shirt, User, AlertCircle } from 'lucide-react';
// import { toast } from '@/hooks/use-toast';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';

// export interface TryOnParams {
//   backgroundFile: File | null;
//   garmentFile: File | null;
//   denoisingSteps: number;
//   seed: number;
//   isChecked: boolean;
//   isCheckedCrop: boolean;
// }

// const TryOn = () => {
//   const [personImage, setPersonImage] = useState<File | null>(null);
//   const [garmentImage, setGarmentImage] = useState<File | null>(null);
//   const [resultImage, setResultImage] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [huggingFaceToken, setHuggingFaceToken] = useState<string>('');
//   const [tryOnParams, setTryOnParams] = useState<TryOnParams>({
//     backgroundFile: null,
//     garmentFile: null,
//     denoisingSteps: 30,
//     seed: 42,
//     isChecked: true,
//     isCheckedCrop: false,
//   });

//   const handlePersonImageUpload = (file: File) => {
//     setPersonImage(file);
//     setTryOnParams(prev => ({ ...prev, backgroundFile: file }));
//   };

//   const handleGarmentImageUpload = (file: File) => {
//     setGarmentImage(file);
//     setTryOnParams(prev => ({ ...prev, garmentFile: file }));
//   };

//   const performTryOn = async () => {
//     if (!personImage || !garmentImage) {
//       toast({
//         title: "Missing Images",
//         description: "Please upload both a person image and a garment image.",
//         variant: "destructive",
//       });
//       return;
//     }

//     if (!huggingFaceToken.trim()) {
//       toast({
//         title: "Missing API Token",
//         description: "Please enter your Hugging Face API token to use the virtual try-on feature.",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsLoading(true);
    
//     try {
//       console.log("Starting try-on process...");
      
//       // Create FormData for the API request
//       const formData = new FormData();
      
//       // Add the required parameters according to the API documentation
//       formData.append('image', personImage);
//       formData.append('garment_image', garmentImage);
//       formData.append('garment_description', "A fashionable garment");
//       formData.append('is_checked', tryOnParams.isChecked.toString());
//       formData.append('is_checked_crop', tryOnParams.isCheckedCrop.toString());
//       formData.append('denoise_steps', tryOnParams.denoisingSteps.toString());
//       formData.append('seed', tryOnParams.seed.toString());

//       console.log("Sending request to Hugging Face API...");

//       // Try the correct Hugging Face Spaces API endpoint
//       const response = await fetch("https://yisol-idm-vton.hf.space/api/predict", {
//         method: "POST",
//         headers: {
//           "Authorization": `Bearer ${huggingFaceToken}`,
//         },
//         body: formData,
//       });

//       console.log("Response status:", response.status);

//       if (!response.ok) {
//         // If the Spaces API fails, try the Inference API with correct endpoint
//         console.log("Spaces API failed, trying Inference API...");
        
//         const inferenceResponse = await fetch("https://api-inference.huggingface.co/models/yisol/IDM-VTON", {
//           method: "POST",
//           headers: {
//             "Authorization": `Bearer ${huggingFaceToken}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             inputs: {
//               image: await fileToBase64(personImage),
//               garment_image: await fileToBase64(garmentImage),
//               garment_description: "A fashionable garment",
//               is_checked: tryOnParams.isChecked,
//               is_checked_crop: tryOnParams.isCheckedCrop,
//               denoise_steps: tryOnParams.denoisingSteps,
//               seed: tryOnParams.seed
//             }
//           }),
//         });

//         if (!inferenceResponse.ok) {
//           const errorText = await inferenceResponse.text();
//           console.error("Both APIs failed. Last error:", errorText);
//           throw new Error(`API request failed: ${inferenceResponse.status} - Please check your API token and try again.`);
//         }

//         const inferenceResult = await inferenceResponse.blob();
//         if (inferenceResult.size === 0) {
//           throw new Error("Received empty response from API");
//         }
        
//         const imageUrl = URL.createObjectURL(inferenceResult);
//         setResultImage(imageUrl);
//       } else {
//         // Handle Spaces API response
//         const result = await response.json();
//         console.log("Spaces API response:", result);
        
//         if (result.data && result.data[0]) {
//           // The result should contain the generated image
//           const imageUrl = result.data[0];
//           setResultImage(imageUrl);
//         } else {
//           throw new Error("Unexpected response format from Spaces API");
//         }
//       }
      
//       toast({
//         title: "Try-On Complete!",
//         description: "Your virtual try-on result is ready.",
//       });

//     } catch (error) {
//       console.error("Try-on failed:", error);
//       toast({
//         title: "Try-On Failed",
//         description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fileToBase64 = (file: File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         const result = reader.result as string;
//         // Remove the data:image/...;base64, prefix
//         resolve(result.split(',')[1]);
//       };
//       reader.onerror = error => reject(error);
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">Virtual Try-On</h1>
//           <p className="text-lg text-gray-600">
//             Upload your photo and a garment to see how it looks on you!
//           </p>
//         </div>

//         {/* API Token Input */}
//         <Card className="mb-6">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <AlertCircle className="h-5 w-5" />
//               Hugging Face API Configuration
//             </CardTitle>
//             <CardDescription>
//               Enter your Hugging Face API token to use the virtual try-on feature. You can get one from{' '}
//               <a 
//                 href="https://huggingface.co/settings/tokens" 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="text-blue-600 hover:underline"
//               >
//                 huggingface.co/settings/tokens
//               </a>
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-2">
//               <Label htmlFor="hf-token">Hugging Face API Token</Label>
//               <Input
//                 id="hf-token"
//                 type="password"
//                 value={huggingFaceToken}
//                 onChange={(e) => setHuggingFaceToken(e.target.value)}
//                 placeholder="hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
//               />
//             </div>
//           </CardContent>
//         </Card>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Person Image Upload */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <User className="h-5 w-5" />
//                 Your Photo
//               </CardTitle>
//               <CardDescription>
//                 Upload a clear photo of yourself
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <ImageUpload
//                 onImageUpload={handlePersonImageUpload}
//                 acceptedTypes="image/*"
//                 placeholder="Upload your photo"
//                 currentImage={personImage}
//               />
//             </CardContent>
//           </Card>

//           {/* Garment Image Upload */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Shirt className="h-5 w-5" />
//                 Garment
//               </CardTitle>
//               <CardDescription>
//                 Upload the garment you want to try on
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <ImageUpload
//                 onImageUpload={handleGarmentImageUpload}
//                 acceptedTypes="image/*"
//                 placeholder="Upload garment image"
//                 currentImage={garmentImage}
//               />
//             </CardContent>
//           </Card>

//           {/* Controls */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Try-On Settings</CardTitle>
//               <CardDescription>
//                 Adjust the virtual try-on parameters
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <TryOnControls
//                 params={tryOnParams}
//                 onChange={setTryOnParams}
//               />
//               <Button
//                 onClick={performTryOn}
//                 disabled={!personImage || !garmentImage || !huggingFaceToken.trim() || isLoading}
//                 className="w-full mt-4"
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Processing...
//                   </>
//                 ) : (
//                   "Try On Garment"
//                 )}
//               </Button>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Result */}
//         {resultImage && (
//           <div className="mt-8">
//             <TryOnResult
//               resultImage={resultImage}
//               onDownload={() => {
//                 const link = document.createElement('a');
//                 link.href = resultImage;
//                 link.download = 'virtual-tryon-result.png';
//                 link.click();
//               }}
//               onReset={() => {
//                 setResultImage(null);
//                 setPersonImage(null);
//                 setGarmentImage(null);
//                 setTryOnParams({
//                   backgroundFile: null,
//                   garmentFile: null,
//                   denoisingSteps: 30,
//                   seed: 42,
//                   isChecked: true,
//                   isCheckedCrop: false,
//                 });
//               }}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TryOn;


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
  const [huggingFaceToken, setHuggingFaceToken] = useState<string>('');
  const [tryOnParams, setTryOnParams] = useState<TryOnParams>({
    backgroundFile: null,
    garmentFile: null,
    denoisingSteps: 30,
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

  if (!huggingFaceToken.trim() || !huggingFaceToken.startsWith('hf_')) {
    toast({
      title: "Invalid API Token",
      description: "Please enter a valid Hugging Face API token starting with 'hf_'.",
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

        {/* API Token Input */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Hugging Face API Configuration
            </CardTitle>
            <CardDescription>
              You need a Hugging Face API token with <strong>write</strong> access to use this feature.
              Get one from{' '}
              <a 
                href="https://huggingface.co/settings/tokens" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                huggingface.co/settings/tokens
              </a>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="hf-token">Hugging Face API Token</Label>
              <Input
                id="hf-token"
                type="password"
                value={huggingFaceToken}
                onChange={(e) => setHuggingFaceToken(e.target.value)}
                placeholder="hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              />
              <p className="text-xs text-gray-500">
                Your token must start with 'hf_' and is only used for this session.
              </p>
            </div>
          </CardContent>
        </Card>

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
                disabled={!personImage || !garmentImage || !huggingFaceToken.trim() || isLoading}
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