export interface PostResponse {
  id: number;
  userId: number;
  user: {
    name: string;
    image: string;
  };
  title: string;
  content: string;
  countryName: string;
  createdAt: string;
}
