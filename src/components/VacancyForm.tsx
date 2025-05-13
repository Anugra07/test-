
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Vacancy } from "../types/models";

interface VacancyFormValues {
  title: string;
  industry: string;
  description: string;
  requirements: string;
  goals: string;
  whyJoin: string;
}

const VacancyForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<VacancyFormValues>({
    defaultValues: {
      title: "",
      industry: "",
      description: "",
      requirements: "",
      goals: "",
      whyJoin: ""
    }
  });
  
  const handleSubmit = (values: VacancyFormValues) => {
    setIsLoading(true);
    
    // Get current user
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    const newVacancy: Vacancy = {
      id: `vac-${Date.now()}`,
      title: values.title,
      creatorId: currentUser.id || 'unknown',
      industry: values.industry,
      description: values.description,
      requirements: values.requirements,
      goals: values.goals,
      whyJoin: values.whyJoin,
      createdAt: new Date(),
      applicants: []
    };
    
    // Get existing vacancies or create empty array
    const existingVacancies = JSON.parse(localStorage.getItem('vacancies') || '[]');
    existingVacancies.push(newVacancy);
    
    // Save updated vacancies
    localStorage.setItem('vacancies', JSON.stringify(existingVacancies));
    
    // Update current user with createdVacancyId
    currentUser.createdVacancyId = newVacancy.id;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Update user in users array
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = allUsers.map((user: any) => 
      user.id === currentUser.id ? {...user, createdVacancyId: newVacancy.id} : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Vacancy created! Ready to build your pack.');
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pack Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Name your wolf pack"
                  className="bg-gray-800 border-gray-700"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry/Startup Type</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="E.g. Tech, Finance, Marketing"
                  className="bg-gray-800 border-gray-700"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pack Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Describe the vision for your pack"
                  className="bg-gray-800 border-gray-700 min-h-[120px]"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Required Skills</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="What skills and expertise are you looking for in pack members?"
                  className="bg-gray-800 border-gray-700 min-h-[100px]"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="goals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Goals</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="What are your startup's ultimate objectives and vision?"
                  className="bg-gray-800 border-gray-700 min-h-[100px]"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="whyJoin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Why Join Your Pack</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Why should entrepreneurs join your pack? What makes your vision compelling?"
                  className="bg-gray-800 border-gray-700 min-h-[100px]"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full bg-red-600 hover:bg-red-700"
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
            'LAUNCH YOUR PACK'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default VacancyForm;
