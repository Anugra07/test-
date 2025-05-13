
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ArrowRight, Upload } from "lucide-react";

interface AuthFormProps {
  type: "signup" | "login";
}

interface SignupFormValues {
  username: string;
  email: string;
  password: string;
  contactNumber: string;
  resume?: FileList;
}

interface LoginFormValues {
  email: string;
  password: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const signupForm = useForm<SignupFormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      contactNumber: "",
    }
  });
  
  const loginForm = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    }
  });
  
  const handleSignup = (values: SignupFormValues) => {
    setIsLoading(true);
    
    // Save user data to localStorage for end-to-end functionality
    const newUser = {
      id: `user-${Date.now()}`,
      username: values.username,
      email: values.email,
      contactNumber: values.contactNumber,
      resumeUrl: values.resume ? "resume.pdf" : undefined,
    };
    
    // Get existing users or create empty array
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    existingUsers.push(newUser);
    
    // Save updated users
    localStorage.setItem('users', JSON.stringify(existingUsers));
    
    // Save current user
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    }, 1500);
  };
  
  const handleLogin = (values: LoginFormValues) => {
    setIsLoading(true);
    
    // Get existing users
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find user by email
    const user = existingUsers.find((u: any) => u.email === values.email);
    
    setTimeout(() => {
      setIsLoading(false);
      
      if (user) {
        // Save current user
        localStorage.setItem('currentUser', JSON.stringify(user));
        toast.success("Logged in successfully!");
        navigate("/dashboard");
      } else {
        toast.error("Invalid email or password");
      }
    }, 1500);
  };
  
  if (type === "signup") {
    return (
      <Form {...signupForm}>
        <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4 pt-4">
          <FormField
            control={signupForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="Choose a username" 
                    className="bg-gray-800 border-gray-700"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={signupForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="email" 
                    placeholder="you@example.com" 
                    className="bg-gray-800 border-gray-700"
                    required 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={signupForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="password" 
                    placeholder="••••••••" 
                    className="bg-gray-800 border-gray-700"
                    required 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={signupForm.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="Your phone number" 
                    className="bg-gray-800 border-gray-700"
                    required 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={signupForm.control}
            name="resume"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
                <FormLabel>Upload Resume (Optional)</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files) {
                          onChange(files);
                        }
                      }}
                      {...rest}
                      className="bg-gray-800 border-gray-700"
                    />
                    <Upload className="h-4 w-4 text-gray-400 -ml-8" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700 mt-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <>Join the Hunt <ArrowRight className="ml-2 h-4 w-4" /></>
            )}
          </Button>
        </form>
      </Form>
    );
  }
  
  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4 pt-4">
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type="email" 
                  placeholder="you@example.com" 
                  className="bg-gray-800 border-gray-700"
                  required 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type="password" 
                  placeholder="••••••••" 
                  className="bg-gray-800 border-gray-700"
                  required 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end">
          <a href="#" className="text-xs text-green-400 hover:text-green-300">
            Forgot Password?
          </a>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-green-600 hover:bg-green-700 mt-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            <>Sign In <ArrowRight className="ml-2 h-4 w-4" /></>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AuthForm;
