
export interface User {
  id: string;
  username: string;
  email: string;
  contactNumber: string;
  resumeUrl?: string;
  groupId?: string;
  createdVacancyId?: string;
}

export interface Group {
  id: string;
  name: string;
  members: User[];
}

export interface Vacancy {
  id: string;
  title: string;
  creatorId: string;
  industry: string;
  description: string;
  requirements: string;
  goals: string;
  whyJoin: string;
  createdAt: Date;
  applicants: User[];
}
