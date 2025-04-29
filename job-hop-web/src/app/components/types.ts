export interface Job {
  id: string;
  company_name: string;
  title: string;
  description?: string;
  url?: string;
  resume_id?: string;
  cover_letter?: string;
  status: string;
}

export interface Resume {
  id: string;
  name: string;
}
