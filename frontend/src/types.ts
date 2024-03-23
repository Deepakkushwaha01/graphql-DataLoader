export type Article = {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
    author:{
        avatar:string,
        name:string
    },
    refetchData: () => void;
}


export type Author ={
    name:string;
    createdAt: string;
    avatar:string;
}


export interface RootState {
    articles: {
      itemperpage: number;
      offset:number;
      articles:{
        nodes:[],
        meta:{
            limit: number;
            offset: number;
            total: number;
        }
      };
      loading:Boolean;
      shouldRefetch:Boolean;
      refetchComplete: boolean;
    };
   
  }