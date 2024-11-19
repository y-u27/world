export interface PostResponse {
  id: number;
  userId: number;
  user: {
    image: string;
  };
  title: string;
  content: string;
  countryName: string;
  createdAt: string;
}
