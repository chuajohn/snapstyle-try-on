
import { ApiConfiguration } from '@/components/TryOn/ApiConfiguration';
import { TryOnUploadSection } from '@/components/TryOn/TryOnUploadSection';
import { TryOnResult } from '@/components/TryOn/TryOnResult';
import { useTryOn } from '@/hooks/useTryOn';

export interface TryOnParams {
  backgroundFile: File | null;
  garmentFile: File | null;
  denoisingSteps: number;
  seed: number;
  isChecked: boolean;
  isCheckedCrop: boolean;
}

const TryOn = () => {
  const {
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
  } = useTryOn();

  const handleDownload = () => {
    if (resultImage) {
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = 'virtual-tryon-result.png';
      link.click();
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

        <ApiConfiguration
          huggingFaceToken={huggingFaceToken}
          onTokenChange={setHuggingFaceToken}
        />

        <TryOnUploadSection
          personImage={personImage}
          garmentImage={garmentImage}
          tryOnParams={tryOnParams}
          isLoading={isLoading}
          huggingFaceToken={huggingFaceToken}
          onPersonImageUpload={handlePersonImageUpload}
          onGarmentImageUpload={handleGarmentImageUpload}
          onParamsChange={setTryOnParams}
          onTryOn={performTryOn}
        />

        {resultImage && (
          <div className="mt-8">
            <TryOnResult
              resultImage={resultImage}
              onDownload={handleDownload}
              onReset={resetTryOn}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TryOn;
