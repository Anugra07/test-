
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AuthForm from "@/components/AuthForm";
import VacancyForm from "@/components/VacancyForm";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import BackgroundGlow from "@/components/ui/background-glow";
import { toast } from "sonner";
import { ArrowRight, Briefcase, FileText } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Vacancy, User } from "../types/models";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("join");
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Check for create=true in URL query params
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('create') === 'true') {
      const user = localStorage.getItem('currentUser');
      if (user) {
        setCurrentUser(JSON.parse(user));
        setActiveTab('create');
        setIsModalOpen(true);
      }
    }
    
    // Load featured vacancies
    const storedVacancies = JSON.parse(localStorage.getItem('vacancies') || '[]');
    setVacancies(storedVacancies.slice(0, 2)); // Just show first two for featured
    
    // Check if user is logged in
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, [location.search]);

  const openModal = (tab: string) => {
    if (tab === 'create' && !currentUser) {
      // If trying to create a vacancy but not logged in, show login first
      setActiveTab('login');
      toast("Please log in before creating a vacancy");
    } else {
      setActiveTab(tab);
    }
    setIsModalOpen(true);
  };
  
  const handleSignOut = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    toast.success("Signed out successfully");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-gray-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-10 flex items-center justify-between py-4 px-6 md:px-10 lg:px-16 backdrop-blur-md bg-black/30 border-b border-green-500/10">
        <div className="flex items-center">
          <BackgroundGlow>
            <div className="text-3xl md:text-4xl text-green-500 mr-2 md:mr-3">🐺</div>
          </BackgroundGlow>
          <span className="text-lg md:text-2xl font-bold tracking-wider">WOLF STREET VENTURES</span>
        </div>
        
        <div className="hidden md:flex space-x-6 lg:space-x-10">
          <Link to="/" className="text-gray-300 hover:text-green-400 transition">Home</Link>
          <Link to="/vacancies" className="text-gray-300 hover:text-green-400 transition">Vacancies</Link>
          
          {currentUser ? (
            <>
              <Link to="/dashboard" className="text-gray-300 hover:text-green-400 transition">Dashboard</Link>
              <button onClick={handleSignOut} className="text-gray-300 hover:text-green-400 transition">Sign Out</button>
              <Link to="/admin" className="text-gray-300 hover:text-green-400 transition">Admin</Link>
            </>
          ) : (
            <button onClick={() => openModal('login')} className="text-gray-300 hover:text-green-400 transition">
              Sign In
            </button>
          )}
        </div>
        
        <MobileMenu />
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center py-10 px-4 md:px-8 lg:px-16">
        <div className="max-w-5xl w-full text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-6">
            THE ENTREPRENEURS' {" "}
            <span className="text-green-500 animate-pulse">WOLFPACK</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-gray-300 mb-6 md:mb-10 leading-relaxed">
            Where ambitious entrepreneurs hunt for success together. Join a pack or lead your own in the concrete jungle of business.
          </p>
          
          <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 max-w-2xl mx-auto p-4 md:p-6 mb-8 md:mb-14 text-lg md:text-xl rounded-lg italic text-gray-300">
            "The only thing standing between you and your goal is the bullshit story you keep telling yourself as to why you can't achieve it."
          </div>
          
          {/* Options Cards */}
          <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8 mt-8 md:mt-16">
            {/* Join a Pack Option */}
            <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 p-6 md:p-8 rounded-2xl flex-1 max-w-md mx-auto md:mx-0 relative overflow-hidden hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500 opacity-10 rounded-full"></div>
              
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-16 md:w-20 h-16 md:h-20 flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-5">JOIN A WOLFPACK</h3>
              <p className="mb-6 md:mb-10 text-gray-300 leading-relaxed text-sm md:text-base">
                Become part of an established team of hungry entrepreneurs. Learn from experienced leaders and grow together in a powerful network.
              </p>
              
              <Button 
                onClick={() => {
                  openModal('join');
                  toast("Ready to join the hunt", {
                    description: "Fill out your details to join an existing pack"
                  });
                }}
                className="w-full text-white bg-green-600 hover:bg-green-700 py-6 rounded-full font-bold shadow-lg shadow-green-700/20"
              >
                JOIN THE HUNT <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            {/* Start a Pack Option */}
            <div className="bg-black/40 backdrop-blur-sm border border-red-500/20 p-6 md:p-8 rounded-2xl flex-1 max-w-md mx-auto md:mx-0 relative overflow-hidden hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500 opacity-10 rounded-full"></div>
              
              <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-full w-16 md:w-20 h-16 md:h-20 flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-5">LEAD YOUR OWN PACK</h3>
              <p className="mb-6 md:mb-10 text-gray-300 leading-relaxed text-sm md:text-base">
                You're an alpha. Post your vision and recruit hungry wolves ready to dominate the market. Create the next empire on your terms.
              </p>
              
              <Button 
                onClick={() => {
                  openModal('create');
                  toast("Ready to lead", {
                    description: "Create a vacancy to build your own pack"
                  });
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-6 rounded-full font-bold shadow-lg shadow-red-700/20"
              >
                CREATE A VACANCY <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-10 md:mt-20 py-2 md:py-3 px-4 md:px-6 rounded-full inline-block bg-black/30 backdrop-blur-sm border border-yellow-500/20 text-xs md:text-sm text-gray-300">
            <span className="text-yellow-400 mr-2">⚡</span> 
            Absolutely no mercy. Just relentless ambition.
          </div>
        </div>

        {/* Open Vacancies Section */}
        <div className="w-full max-w-5xl mt-20 mb-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Open Vacancies</h2>
            <Link to="/vacancies">
              <Button variant="outline" className="border-green-500 text-green-500">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vacancies.length > 0 ? (
              vacancies.map((vacancy) => (
                <div key={vacancy.id} className="bg-black/40 backdrop-blur-sm border border-green-500/20 p-6 rounded-lg hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-green-500">{vacancy.title}</h3>
                    <span className="bg-green-900/50 text-green-300 text-xs px-2 py-0.5 rounded-full">
                      {vacancy.industry}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <FileText className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                      <p className="text-sm text-gray-300 line-clamp-2">{vacancy.description}</p>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Briefcase className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                      <p className="text-sm text-gray-300 line-clamp-2">{vacancy.requirements}</p>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => {
                      navigate(`/vacancies`);
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 text-sm"
                  >
                    Apply Now <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="col-span-2 bg-black/40 backdrop-blur-sm border border-green-500/20 p-6 rounded-lg text-center">
                <p className="text-gray-400">No open vacancies at the moment. Be the first to create one!</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md bg-gray-900 text-gray-100 border-green-500/20">
          <div className="text-center mb-4">
            <div className="flex items-center justify-center">
              <div className="text-3xl text-green-500 mr-2">🐺</div>
              <span className="text-xl font-bold tracking-wider">WOLF STREET VENTURES</span>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800">
              <TabsTrigger value="join" className="data-[state=active]:bg-green-600">JOIN THE PACK</TabsTrigger>
              <TabsTrigger value="login" className="data-[state=active]:bg-green-600">ALPHA ACCESS</TabsTrigger>
            </TabsList>
            
            <TabsContent value="join">
              <AuthForm type="signup" />
            </TabsContent>
            
            <TabsContent value="login">
              <AuthForm type="login" />
            </TabsContent>
            
            <TabsContent value="create">
              <VacancyForm />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
