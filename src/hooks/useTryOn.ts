
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import type { TryOnParams } from '@/pages/TryOn';

export const useTryOn = () => {
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

  const fileToBase64DataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
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

    if (!huggingFaceToken.trim()) {
      toast({
        title: "Missing API Token",
        description: "Please enter your Hugging Face API token to use the virtual try-on feature.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      console.log("Starting try-on process...");
      
      const formData = new FormData();
      formData.append('image', personImage);
      formData.append('garment_image', garmentImage);

      console.log("Sending request to Hugging Face Spaces API...");

      const response = await fetch("https://levihsu-ootdiffusion.hf.space/api/predict", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${huggingFaceToken}`,
        },
        body: JSON.stringify({
          data: [
            await fileToBase64DataURL(personImage),
            await fileToBase64DataURL(garmentImage),
            "A person wearing the garment",
            true,
            true,
            tryOnParams.denoisingSteps,
            tryOnParams.seed
          ]
        }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        console.log("Primary API failed, trying alternative approach...");
        
        const altResponse = await fetch("https://api-inference.huggingface.co/models/levihsu/OOTDiffusion", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${huggingFaceToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: `A person wearing a fashionable garment`,
            parameters: {
              guidance_scale: 7.5,
              num_inference_steps: tryOnParams.denoisingSteps,
              seed: tryOnParams.seed
            }
          }),
        });

        if (!altResponse.ok) {
          const errorText = await altResponse.text();
          console.error("Alternative API also failed:", errorText);
          throw new Error(`API request failed: ${altResponse.status} - Please check your API token and ensure you have access to the models.`);
        }

        const altResult = await altResponse.blob();
        if (altResult.size === 0) {
          throw new Error("Received empty response from API");
        }
        
        const imageUrl = URL.createObjectURL(altResult);
        setResultImage(imageUrl);
      } else {
        const result = await response.json();
        console.log("API response:", result);
        
        if (result.data && result.data[0]) {
          const imageUrl = result.data[0];
          setResultImage(imageUrl);
        } else {
          throw new Error("Unexpected response format from API");
        }
      }
      
      toast({
        title: "Try-On Complete!",
        description: "Your virtual try-on result is ready.",
      });

    } catch (error) {
      console.error("Try-on failed:", error);
      toast({
        title: "Try-On Failed", 
        description: error instanceof Error ? error.message : "The virtual try-on service is currently unavailable. This might be due to the model being offline or API limitations. Please try again later or check if your API token has the necessary permissions.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetTryOn = () => {
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
  };

  return {
    personImage,
    garmentImage,
    resultImage,
    isLoading,
    huggingFaceToken,
    tryOnParams,
    setHuggingFaceToken,
    setTryOnParams,
    handlePersonImageUpload,
    handleGarmentImageUpload,
    performTryOn,
    resetTryOn,
  };
};
