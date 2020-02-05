type UserId = number;
type JobId = number;
type Tag = string;

interface IUser {
  id: UserId;
  name: string;
  tags: Tag[];
}

interface IJob {
  id: JobId;
  title: string;
  company: string;
  tags: Tag[];
}

interface IDictionary<T> {
  [key: string]: T;
}
