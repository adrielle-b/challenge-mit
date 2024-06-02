export type bodyLogin = {
  login: string;
  password: string;
};

export type bodyRegister = {
  name: string;
  login: string;
  password: string;
};

export type bodyCreatePost = {
  title: string;
  content: string;
  authorId: string;
};

export type bodyUpdatePost = {
  title: string;
  content: string;
};

export type Post = {
  title: string;
  content: string;
  id: string;
  authorId: string;
};
