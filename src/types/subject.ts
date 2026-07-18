export interface Subject {
  _id: string;
  name: string;
  categoryId: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSubjectPayload {
  name: string;
  categoryId: string;
  description?: string;
}

export interface UpdateSubjectPayload {
  name?: string;
  categoryId?: string;
  description?: string;
}
