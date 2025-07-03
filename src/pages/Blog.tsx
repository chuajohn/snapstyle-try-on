
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Fashion: How Technology is Revolutionizing Style",
      excerpt: "Discover how artificial intelligence is transforming the fashion industry, from personalized recommendations to virtual fitting rooms.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      author: "Sarah Chen",
      date: "March 15, 2024",
      category: "Technology",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Sustainable Fashion: Building a Conscious Wardrobe",
      excerpt: "Learn how to make environmentally conscious fashion choices without compromising on style or breaking the bank.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
      author: "Maya Rodriguez",
      date: "March 12, 2024",
      category: "Sustainability",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "Spring 2024 Trends: What's Hot This Season",
      excerpt: "From vibrant colors to flowing silhouettes, explore the must-have trends that are defining spring fashion this year.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80",
      author: "Alex Thompson",
      date: "March 10, 2024",
      category: "Trends",
      readTime: "4 min read"
    },
    {
      id: 4,
      title: "The Art of Layering: Master the Perfect Outfit Combinations",
      excerpt: "Unlock the secrets to creating stunning layered looks that work for any season and occasion.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
      author: "Jordan Kim",
      date: "March 8, 2024",
      category: "Styling",
      readTime: "6 min read"
    },
    {
      id: 5,
      title: "Digital Wardrobe Management: Organize Your Style in the Cloud",
      excerpt: "Learn how to digitally organize your wardrobe, plan outfits, and make the most of your clothing collection.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      author: "Taylor Swift",
      date: "March 5, 2024",
      category: "Lifestyle",
      readTime: "5 min read"
    },
    {
      id: 6,
      title: "Color Psychology in Fashion: What Your Outfit Says About You",
      excerpt: "Explore how colors impact perception and mood, and learn to use color strategically in your fashion choices.",
      image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80",
      author: "Dr. Emma Wilson",
      date: "March 1, 2024",
      category: "Psychology",
      readTime: "8 min read"
    }
  ];

  const categories = ["All", "Technology", "Sustainability", "Trends", "Styling", "Lifestyle", "Psychology"];

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#4ED3E0]">
            Fashion Forward Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay ahead of the curve with insights on fashion trends, technology, and style inspiration from our expert team.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              className={`rounded-full ${
                category === "All" 
                  ? "bg-[#4ED3E0] text-black hover:bg-[#4ED3E0]/90" 
                  : "border-[#4ED3E0] text-[#4ED3E0] hover:bg-[#4ED3E0]/10"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Post */}
        <Card className="mb-12 overflow-hidden bg-card/70 backdrop-blur-sm border-border/30">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={blogPosts[0].image} 
                alt={blogPosts[0].title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-[#4ED3E0]/20 text-[#4ED3E0] px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
                <span className="text-sm text-muted-foreground">
                  {blogPosts[0].category}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                {blogPosts[0].title}
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {blogPosts[0].excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User size={16} />
                    {blogPosts[0].author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    {blogPosts[0].date}
                  </div>
                  <span>{blogPosts[0].readTime}</span>
                </div>
                <Button 
                  variant="outline" 
                  className="border-[#4ED3E0] text-[#4ED3E0] hover:bg-[#4ED3E0]/10"
                >
                  Read More <ArrowRight className="ml-2" size={16} />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <Card key={post.id} className="overflow-hidden bg-card/70 backdrop-blur-sm border-border/30 hover:shadow-lg hover:shadow-[#4ED3E0]/10 transition-all duration-300 group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-[#2A2D36] text-[#4ED3E0] px-2 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {post.readTime}
                  </span>
                </div>
                <h3 className="font-semibold text-lg leading-tight group-hover:text-[#4ED3E0] transition-colors">
                  {post.title}
                </h3>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User size={12} />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      {post.date}
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-[#4ED3E0] hover:bg-[#4ED3E0]/10 p-0"
                  >
                    Read <ArrowRight className="ml-1" size={14} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-20">
          <Card className="bg-gradient-to-r from-[#4ED3E0]/10 to-[#4ED3E0]/5 border-[#4ED3E0]/20 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-[#4ED3E0]">
                Stay in the Loop
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Get the latest fashion insights, trend reports, and style tips delivered straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#4ED3E0]/50"
                />
                <Button className="bg-[#4ED3E0] text-black hover:bg-[#4ED3E0]/90 rounded-xl px-6">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Blog;
