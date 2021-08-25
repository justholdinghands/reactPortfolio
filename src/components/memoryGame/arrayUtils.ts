export const randomSort = <Type>(array: Type[]) => {
  return array.sort(() => 0.5 - Math.random());
};
