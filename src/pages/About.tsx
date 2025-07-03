
import React from 'react';
import { Sparkles, Users, Target, Award, Heart, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const About = () => {
  const values = [
    {
      icon: <Sparkles className="w-8 h-8 text-[#4ED3E0]" />,
      title: "Innovation",
      description: "We leverage cutting-edge AI technology to revolutionize how people discover and experience fashion."
    },
    {
      icon: <Users className="w-8 h-8 text-[#4ED3E0]" />,
      title: "Community",
      description: "Building a diverse community where everyone can express their unique style with confidence."
    },
    {
      icon: <Target className="w-8 h-8 text-[#4ED3E0]" />,
      title: "Precision",
      description: "Our AI-powered fitting technology ensures you get the perfect fit every time."
    },
    {
      icon: <Heart className="w-8 h-8 text-[#4ED3E0]" />,
      title: "Sustainability",
      description: "Committed to reducing fashion waste through smart purchasing decisions and conscious consumption."
    }
  ];

  const team = [
    {
      name: "Alexandra Chen",
      role: "Founder & CEO",
      bio: "Former Google AI researcher with a passion for fashion technology. Alexandra founded SNAPSTYLE to democratize personalized fashion experiences.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO",
      bio: "15+ years in machine learning and computer vision. Leads our AI development team in creating revolutionary fitting algorithms.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Sophia Kim",
      role: "Head of Design",
      bio: "Award-winning fashion designer and stylist. Ensures our platform reflects the latest trends while maintaining timeless appeal.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const stats = [
    { number: "500K+", label: "Happy Customers" },
    { number: "95%", label: "Fit Accuracy" },
    { number: "2M+", label: "Virtual Try-Ons" },
    { number: "50+", label: "Partner Brands" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4ED3E0]/10 to-transparent"></div>
        <div className="container py-20 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Redefining Fashion with
              <span className="text-[#4ED3E0] block">Artificial Intelligence</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              SNAPSTYLE is pioneering the future of fashion e-commerce by combining advanced AI technology 
              with curated style to create personalized shopping experiences that fit perfectly every time.
            </p>
            <Button 
              size="lg"
              className="bg-[#4ED3E0] text-black hover:bg-[#4ED3E0]/90 rounded-xl px-8"
            >
              Discover Our Story
            </Button>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container py-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#4ED3E0]">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                We believe that finding the perfect fit shouldn't be a game of chance. Our mission is to eliminate 
                the frustration of online shopping by using intelligent technology to understand your unique body, 
                style preferences, and lifestyle needs.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Through our AI-powered platform, we're not just selling clothes – we're curating experiences 
                that make you look and feel your absolute best.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=600&q=80"
                alt="Fashion technology"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#4ED3E0] text-black p-4 rounded-xl font-semibold">
                <Zap className="w-6 h-6 mb-2" />
                AI-Powered
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-card/30 backdrop-blur-sm py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#4ED3E0]">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at SNAPSTYLE
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-card/70 backdrop-blur-sm border-border/30 text-center p-6 hover:shadow-lg hover:shadow-[#4ED3E0]/10 transition-all duration-300">
                <CardContent className="p-0">
                  <div className="mb-4 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#4ED3E0] mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-card/30 backdrop-blur-sm py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#4ED3E0]">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The visionaries and innovators behind SNAPSTYLE's revolutionary platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="bg-card/70 backdrop-blur-sm border-border/30 overflow-hidden hover:shadow-lg hover:shadow-[#4ED3E0]/10 transition-all duration-300">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-1 text-foreground">
                    {member.name}
                  </h3>
                  <div className="text-[#4ED3E0] font-medium mb-3">
                    {member.role}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container py-20">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-[#4ED3E0]/10 to-[#4ED3E0]/5 border-[#4ED3E0]/20 backdrop-blur-sm">
            <CardContent className="p-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#4ED3E0]">
                Ready to Transform Your Wardrobe?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of fashion-forward individuals who've discovered their perfect style with SNAPSTYLE's AI-powered platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-[#4ED3E0] text-black hover:bg-[#4ED3E0]/90 rounded-xl px-8"
                >
                  Start Shopping
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-[#4ED3E0] text-[#4ED3E0] hover:bg-[#4ED3E0]/10 rounded-xl px-8"
                >
                  Try Virtual Fitting
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
