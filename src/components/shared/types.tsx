// app/(dashboard)/_components/types.ts
export type KindeUser = {
  id?: string;
  given_name?: string;
  family_name?: string;
  name?: string;
  email?: string;
  picture?: string;
};

export type NavItem = {
  name: string;
  path: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};
