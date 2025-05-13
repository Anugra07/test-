
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, Group } from "../types/models";
import { ArrowRight, UserPlus, Users, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BackgroundGlow from "@/components/ui/background-glow";

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [newGroupName, setNewGroupName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Load users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(storedUsers);
    
    // Load groups from localStorage
    const storedGroups = JSON.parse(localStorage.getItem('groups') || '[]');
    setGroups(storedGroups);
    
    // Check if admin is logged in - for a real app, you'd have a proper admin check
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      toast.error("Please log in as admin to view this page");
      navigate("/");
    }
  }, [navigate]);

  const handleUserSelect = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId) 
        : selectedUsers.length < 4 ? [...prev, userId] : prev
    );
    
    if (selectedUsers.length >= 4) {
      toast.warning("Maximum 4 users can be selected for a group");
    }
  };

  const handleCreateGroup = () => {
    if (selectedUsers.length === 0) {
      toast.error("Please select at least one user for the group");
      return;
    }

    if (!newGroupName.trim()) {
      toast.error("Please enter a group name");
      return;
    }

    const groupMembers = users.filter(user => selectedUsers.includes(user.id));
    
    const newGroup: Group = {
      id: `group-${Date.now()}`,
      name: newGroupName,
      members: groupMembers
    };

    // Update users with group assignment
    const updatedUsers = users.map(user => 
      selectedUsers.includes(user.id) 
        ? { ...user, groupId: newGroup.id } 
        : user
    );

    // Save to localStorage
    const updatedGroups = [...groups, newGroup];
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    setGroups(updatedGroups);
    setUsers(updatedUsers);
    setSelectedUsers([]);
    setNewGroupName("");
    
    toast.success(`Group "${newGroupName}" created successfully with ${groupMembers.length} members`);
  };
  
  const handleSignOut = () => {
    localStorage.removeItem('currentUser');
    toast.success("Signed out successfully");
    navigate("/");
  };

  const unassignedUsers = users.filter(user => !user.groupId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between py-4 px-6 md:px-10 lg:px-16 backdrop-blur-md bg-black/30 border-b border-green-500/10">
        <div className="flex items-center">
          <BackgroundGlow>
            <div className="text-3xl md:text-4xl text-green-500 mr-2 md:mr-3">🐺</div>
          </BackgroundGlow>
          <span className="text-lg md:text-2xl font-bold tracking-wider">ADMIN DASHBOARD</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="border-green-500 text-green-500">
            <Users className="mr-2 h-4 w-4" /> Manage Packs
          </Button>
          <Button variant="outline" className="border-red-500 text-red-500" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        {/* Create Group Section */}
        <section className="mb-12">
          <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <UserPlus className="mr-2 h-6 w-6 text-green-500" /> Create a New Wolf Pack
            </h2>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <Input
                placeholder="Enter pack name"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="bg-gray-800 border-gray-700 md:w-1/3"
              />
              <Button 
                onClick={handleCreateGroup}
                disabled={selectedUsers.length === 0 || !newGroupName.trim()}
                className="bg-green-600 hover:bg-green-700"
              >
                Form Pack ({selectedUsers.length}/4 selected) <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <p className="text-sm text-gray-400 mb-2">
              Select up to 4 members to form a new wolf pack. Currently selected: {selectedUsers.length}
            </p>
          </div>
        </section>

        {/* Applicants Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Unassigned Applicants</h2>
          <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-gray-800/50">
                  <TableHead className="text-gray-300 w-[50px]">Select</TableHead>
                  <TableHead className="text-gray-300">Username</TableHead>
                  <TableHead className="text-gray-300">Email</TableHead>
                  <TableHead className="text-gray-300">Contact</TableHead>
                  <TableHead className="text-gray-300">Resume</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {unassignedUsers.length > 0 ? (
                  unassignedUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-gray-800/50">
                      <TableCell>
                        <Checkbox 
                          checked={selectedUsers.includes(user.id)} 
                          onCheckedChange={() => handleUserSelect(user.id)}
                          className="border-green-500 data-[state=checked]:bg-green-500"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.contactNumber}</TableCell>
                      <TableCell>
                        {user.resumeUrl && (
                          <Button variant="link" className="text-green-500 p-0">
                            View Resume
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4 text-gray-400">
                      No unassigned applicants
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Existing Groups */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Existing Wolf Packs</h2>
          
          {groups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map(group => (
                <div key={group.id} className="bg-black/40 backdrop-blur-sm border border-green-500/20 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-green-500">{group.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{group.members.length} members</p>
                  
                  <ul className="space-y-3">
                    {group.members.map(member => (
                      <li key={member.id} className="flex justify-between items-center border-b border-gray-800 pb-2">
                        <div>
                          <p className="font-medium">{member.username}</p>
                          <p className="text-sm text-gray-400">{member.email}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-xs">
                          Details
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 p-6 rounded-lg text-center">
              <p className="text-gray-400">No wolf packs have been formed yet</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
