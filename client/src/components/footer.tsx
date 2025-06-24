import { useQuery } from "@tanstack/react-query";
import { Linkedin, Github, Twitter, Mail } from "lucide-react";
import type { Developer } from "@shared/schema";

export function Footer() {
  const { data: developer } = useQuery<Developer>({
    queryKey: ["/api/developer"]
  });

  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">{developer?.name}</h3>
            <p className="text-neutral-400 font-light">{developer?.title}</p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href={`https://${developer?.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors duration-200"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href={`https://${developer?.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors duration-200"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="#"
              className="text-slate-400 hover:text-white transition-colors duration-200"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a 
              href={`mailto:${developer?.email}`}
              className="text-slate-400 hover:text-white transition-colors duration-200"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 mt-8 pt-8 text-center">
          <p className="text-neutral-400 text-sm font-light">
            © 2024 {developer?.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
