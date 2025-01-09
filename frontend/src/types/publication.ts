export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  citations: number;
  tags: string[];
  description: string;
  introduction: string;
  methodology: string;
  results: string;
  future_scope: string;
  references: string[];
  doi: string;
}

export interface PublicationFormData extends Omit<Publication, 'id'> {
  id?: string;
}
