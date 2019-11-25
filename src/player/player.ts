export type Player = {
  name: string,

  // I know the following is not necessary, 
  // but just wanted to illustrate what this model would be for larger project
  rank?: number,
  division?: string, 
  country?: string
}