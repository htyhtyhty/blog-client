export interface IRouter {
  name: string;
  path: string;
  component: any;
  isMenu: boolean;
  hasSider: boolean;
  children?: IRouter[];
}
