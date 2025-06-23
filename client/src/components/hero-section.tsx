import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { smoothScrollTo } from "@/lib/utils";
import type { Developer } from "@shared/schema";

export function HeroSection() {
  const { data: developer, isLoading } = useQuery<Developer>({
    queryKey: ["/api/developer"]
  });

  const handleViewWork = () => smoothScrollTo("projects");

  if (isLoading) {
    return (
      <section id="home" className="pt-20 pb-16 gradient-bg text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
              <div className="animate-pulse space-y-4">
                <div className="h-16 bg-white/20 rounded"></div>
                <div className="h-8 bg-white/20 rounded"></div>
                <div className="h-24 bg-white/20 rounded"></div>
                <div className="flex gap-4">
                  <div className="h-12 w-32 bg-white/20 rounded"></div>
                  <div className="h-12 w-32 bg-white/20 rounded"></div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="w-72 h-72 bg-white/20 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="pt-20 pb-16 gradient-bg text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {developer?.firstName} {developer?.lastName}
            </h1>
            <h2 className="text-xl sm:text-2xl font-medium mb-6 text-blue-100">
              {developer?.title}
            </h2>
            <p className="text-lg mb-8 text-blue-100 leading-relaxed">
              {developer?.tagline}
            </p>
            <div className="flex justify-center lg:justify-start">
              <Button 
                onClick={handleViewWork}
                className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 font-medium"
              >
                View My Work
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2 flex justify-center">
            <img 
              src={developer?.profileImageUrl} 
              alt={`${developer?.name} - Software Engineer`}
              className="w-72 h-72 rounded-full object-cover border-4 border-white shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
