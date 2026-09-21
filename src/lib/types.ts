export type Photo = {
  id: string;
  dataUrl: string;
};

export type CheckItem = {
  id: string;
  label: string;
  noteHtml: string;
  photos: Photo[];
};

export type Visit = {
  id: string;
  storeId: string;
  number: number;
  createdAt: number;
  updatedAt: number;
  items: CheckItem[];
  kontrolNoktasiHtml: string;
  genelHtml: string;
  genelPhotos?: Photo[];
  noteFont?: string;
  noteColor?: string;
  noteSize?: string;
};

export type Store = {
  id: string;
  name: string;
  createdAt: number;
  order: number;
};

export type TemplateItem = {
  id: string;
  label: string;
};
