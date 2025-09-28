export interface PostResponse {
  id: number;
  userId: number;
  user: {
    name: string;
    image: string;
    comment: string;
  };
  title: string;
  content: string;
  countryName: string;
  createdAt: string;
  image: string;
  userPosts: string;
}

export interface getLikes {
  id: number;
  userId: number;
  postId: number;
}
