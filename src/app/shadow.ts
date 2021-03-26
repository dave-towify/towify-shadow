export type NShadow = {
  [key in 'horizontalShadow' | 'verticalShadow' | 'spread' | 'blur']: number
};

export type Shadow = {
  horizontalShadow: number;
  verticalShadow: number;
  spread: number;
  blur: number;
  color: string;
};
