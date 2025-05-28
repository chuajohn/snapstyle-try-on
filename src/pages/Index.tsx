
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navigation/Navbar';
import { Shirt, Camera, Sparkles, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">SnapStyle</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience the future of fashion with our AI-powered virtual try-on technology. 
            See how clothes look on you before you buy them!
          </p>
          <Link to="/try-on">
            <Button size="lg" className="text-lg px-8 py-4">
              Try Virtual Try-On
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Camera className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Upload Your Photo</CardTitle>
              <CardDescription>
                Simply upload a clear photo of yourself to get started
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Shirt className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Choose Garments</CardTitle>
              <CardDescription>
                Upload images of clothes you want to try on
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Sparkles className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>See the Magic</CardTitle>
              <CardDescription>
                Our AI creates realistic try-on results in seconds
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Try On Some Clothes?</h2>
            <p className="text-lg mb-6 opacity-90">
              Experience the future of online shopping with our virtual try-on technology
            </p>
            <Link to="/try-on">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Start Virtual Try-On
                <Shirt className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
