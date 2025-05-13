
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Vacancy, User } from "../types/models";
import { ArrowRight, Briefcase, FileText, User as UserIcon } from "lucide-react";
import BackgroundGlow from "@/components/ui/background-glow";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthForm from "@/components/AuthForm";

const Vacancies = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("join");
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);

  useEffect(() => {
    // Load vacancies from localStorage
    const storedVacancies = JSON.parse(localStorage.getItem('vacancies') || '[]');
    setVacancies(storedVacancies.length > 0 ? storedVacancies : []);
    
    // Load current user if available
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const handleApply = (vacancy: Vacancy) => {
    if (!currentUser) {
      // Save the selected vacancy for after login
      setSelectedVacancy(vacancy);
      setActiveTab('join');
      setIsModalOpen(true);
      return;
    }

    // Check if user already applied
    const existingVacancies = JSON.parse(localStorage.getItem('vacancies') || '[]');
    const targetVacancy = existingVacancies.find((v: Vacancy) => v.id === vacancy.id);
    
    if (targetVacancy && targetVacancy.applicants.some((a: User) => a.id === currentUser.id)) {
      toast("You've already applied to this vacancy");
      return;
    }

    // Add user to vacancy applicants
    const updatedVacancies = existingVacancies.map((v: Vacancy) => {
      if (v.id === vacancy.id) {
        return {
          ...v,
          applicants: [...v.applicants, currentUser]
        };
      }
      return v;
    });

    // Save updated vacancies
    localStorage.setItem('vacancies', JSON.stringify(updatedVacancies));
    setVacancies(updatedVacancies);

    toast.success("Application submitted successfully!");
  };

  const openModal = (tab: string) => {
    setActiveTab(tab);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between py-4 px-6 md:px-10 lg:px-16 backdrop-blur-md bg-black/30 border-b border-green-500/10">
        <div className="flex items-center">
          <BackgroundGlow>
            <div className="text-3xl md:text-4xl text-green-500 mr-2 md:mr-3">🐺</div>
          </BackgroundGlow>
          <span className="text-lg md:text-2xl font-bold tracking-wider">WOLF STREET VENTURES</span>
        </div>
        
        <div className="flex items-center gap-4">
          {currentUser ? (
            <>
              <span className="hidden md:inline text-green-400">{currentUser.username}</span>
              <Button className="bg-green-600 hover:bg-green-700">
                <Link to="/dashboard" className="flex items-center">
                  Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </>
          ) : (
            <Button 
              onClick={() => openModal('login')}
              className="bg-green-600 hover:bg-green-700"
            >
              Sign In <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 mb-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-center">Open Wolf Pack Vacancies</h1>
          <p className="text-xl text-gray-300 mb-12 text-center">Join a pack of ambitious entrepreneurs ready to dominate their market</p>

          {vacancies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {vacancies.map((vacancy) => (
                <div key={vacancy.id} className="bg-black/40 backdrop-blur-sm border border-green-500/20 p-6 rounded-lg hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-green-500">{vacancy.title}</h2>
                    <span className="bg-green-900/50 text-green-300 text-xs px-3 py-1 rounded-full">
                      {vacancy.industry}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <FileText className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300">{vacancy.description}</p>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <UserIcon className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300">{vacancy.requirements}</p>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Briefcase className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300">{vacancy.goals}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button 
                      onClick={() => handleApply(vacancy)}
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={currentUser?.id === vacancy.creatorId}
                    >
                      {currentUser?.id === vacancy.creatorId ? 
                        'You created this vacancy' : 
                        <>Apply to Join <ArrowRight className="ml-2 h-4 w-4" /></>
                      }
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center bg-black/40 backdrop-blur-sm border border-green-500/20 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4">No Vacancies Available</h3>
              <p className="text-gray-300 mb-6">There are currently no open vacancies. Be the first to create one!</p>
            </div>
          )}
          
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-4">Want to start your own pack?</p>
            <Button className="bg-red-600 hover:bg-red-700" onClick={() => openModal('create')}>
              Create a Vacancy <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>

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
              <Button 
                onClick={() => {
                  if (!currentUser) {
                    setActiveTab('login');
                    toast("Please login first to create a vacancy");
                  } else {
                    setIsModalOpen(false);
                    window.location.href = '/?create=true';
                  }
                }}
                className="w-full bg-red-600 hover:bg-red-700 py-3"
              >
                Continue to Create Vacancy <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Vacancies;
