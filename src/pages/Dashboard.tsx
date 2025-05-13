
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { User, Group, Vacancy } from "../types/models";
import { ArrowRight, Mail, Phone, User as UserIcon, Briefcase, FileText, LogOut } from "lucide-react";
import BackgroundGlow from "@/components/ui/background-glow";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Dashboard: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userGroup, setUserGroup] = useState<Group | null>(null);
  const [createdVacancy, setCreatedVacancy] = useState<Vacancy | null>(null);
  const [activeTab, setActiveTab] = useState("group");
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load current user
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) {
      toast.error("Please log in to view your dashboard");
      navigate("/");
      return;
    }

    const user = JSON.parse(storedUser);
    setCurrentUser(user);
    
    // Check if user belongs to a group
    const groups = JSON.parse(localStorage.getItem('groups') || '[]');
    const group = groups.find((g: Group) => g.members.some((m: User) => m.id === user.id));
    
    if (group) {
      setUserGroup(group);
    }
    
    // Check if user has created a vacancy
    if (user.createdVacancyId) {
      const vacancies = JSON.parse(localStorage.getItem('vacancies') || '[]');
      const vacancy = vacancies.find((v: Vacancy) => v.id === user.createdVacancyId);
      
      if (vacancy) {
        setCreatedVacancy(vacancy);
        setActiveTab("vacancy");
      }
    }
  }, [navigate]);
  
  const handleSignOut = () => {
    localStorage.removeItem('currentUser');
    toast.success("Signed out successfully");
    navigate("/");
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Loading dashboard...</h1>
          <Button onClick={() => navigate("/")} className="bg-green-600 hover:bg-green-700">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

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
          <Link to="/vacancies" className="text-gray-300 hover:text-green-400 transition">
            Browse Vacancies
          </Link>
          <span className="hidden md:inline text-gray-300">Welcome, {currentUser.username}</span>
          <Button variant="outline" className="border-green-500 text-green-500" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Your Wolf Pack Dashboard</h1>

        {userGroup || createdVacancy ? (
          <div className="max-w-4xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-6">
                <TabsTrigger value="group" className="data-[state=active]:bg-green-600">
                  Your Pack
                </TabsTrigger>
                <TabsTrigger value="vacancy" className="data-[state=active]:bg-red-600">
                  Your Vacancy
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="group">
                {userGroup ? (
                  <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 p-6 md:p-8 rounded-lg">
                    <div className="mb-8 text-center">
                      <h2 className="text-3xl font-bold text-green-500 mb-2">{userGroup.name}</h2>
                      <p className="text-gray-300">You are part of this wolfpack with {userGroup.members.length - 1} other members</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {userGroup.members.map(member => (
                        <div 
                          key={member.id} 
                          className={`p-4 rounded-lg ${member.id === currentUser.id ? 'bg-green-900/30 border border-green-500/30' : 'bg-gray-800/30'}`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-12 h-12 flex items-center justify-center shadow-lg flex-shrink-0">
                              <UserIcon className="h-6 w-6" />
                            </div>
                            
                            <div className="flex-grow">
                              <h3 className="text-xl font-bold mb-1">
                                {member.username} 
                                {member.id === currentUser.id && <span className="ml-2 text-xs bg-green-600 px-2 py-0.5 rounded-full">You</span>}
                              </h3>
                              
                              <div className="space-y-1 text-sm">
                                <p className="flex items-center text-gray-300">
                                  <Mail className="h-4 w-4 mr-2 text-green-400" /> {member.email}
                                </p>
                                <p className="flex items-center text-gray-300">
                                  <Phone className="h-4 w-4 mr-2 text-green-400" /> {member.contactNumber}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 text-center">
                      <Button className="bg-green-600 hover:bg-green-700">
                        Open Pack Chat <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-black/40 backdrop-blur-sm border border-red-500/20 p-6 rounded-lg text-center max-w-xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4 text-red-400">No Wolf Pack Assigned</h2>
                    <p className="text-gray-300 mb-6">You haven't been assigned to a wolf pack yet. Please wait for an admin to add you to a pack.</p>
                    <Button variant="outline" className="border-green-500 text-green-500" onClick={() => window.location.reload()}>
                      Refresh Status
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="vacancy">
                {createdVacancy ? (
                  <div className="bg-black/40 backdrop-blur-sm border border-red-500/20 p-6 md:p-8 rounded-lg">
                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-3xl font-bold text-red-500">{createdVacancy.title}</h2>
                        <span className="bg-red-900/50 text-red-300 text-sm px-3 py-1 rounded-full">
                          {createdVacancy.industry}
                        </span>
                      </div>
                      
                      <div className="space-y-4 mb-8">
                        <div className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                          <p className="text-gray-300">{createdVacancy.description}</p>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Briefcase className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                          <p className="text-gray-300">{createdVacancy.goals}</p>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Applicants ({createdVacancy.applicants ? createdVacancy.applicants.length : 0})</h3>
                      
                      {createdVacancy.applicants && createdVacancy.applicants.length > 0 ? (
                        <div className="space-y-4">
                          {createdVacancy.applicants.map(applicant => (
                            <div key={applicant.id} className="bg-gray-800/30 p-4 rounded-lg">
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="bg-gradient-to-br from-gray-500 to-gray-600 rounded-full w-10 h-10 flex items-center justify-center shadow-lg flex-shrink-0">
                                    <UserIcon className="h-5 w-5" />
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-bold">{applicant.username}</h4>
                                    <div className="text-sm text-gray-300 flex items-center mt-1">
                                      <Mail className="h-3 w-3 mr-1" /> {applicant.email}
                                    </div>
                                    <div className="text-sm text-gray-300 flex items-center mt-1">
                                      <Phone className="h-3 w-3 mr-1" /> {applicant.contactNumber}
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="space-x-2">
                                  {applicant.resumeUrl && (
                                    <Button variant="outline" size="sm" className="border-green-500 text-green-500">
                                      View Resume
                                    </Button>
                                  )}
                                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                    Contact
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-gray-400 py-8">No applicants yet</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-black/40 backdrop-blur-sm border border-yellow-500/20 p-6 rounded-lg text-center max-w-xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4 text-yellow-400">No Vacancy Created</h2>
                    <p className="text-gray-300 mb-6">You haven't created a vacancy yet. Create a vacancy to start building your own pack.</p>
                    <Button className="bg-red-600 hover:bg-red-700">
                      <Link to="/">Create a Vacancy</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="bg-black/40 backdrop-blur-sm border border-yellow-500/20 p-6 rounded-lg text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">No Pack or Vacancy</h2>
            <p className="text-gray-300 mb-6">You haven't been assigned to a wolf pack or created a vacancy yet.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-green-600 hover:bg-green-700">
                <Link to="/vacancies">Browse Vacancies</Link>
              </Button>
              <Button className="bg-red-600 hover:bg-red-700">
                <Link to="/">Create a Vacancy</Link>
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
