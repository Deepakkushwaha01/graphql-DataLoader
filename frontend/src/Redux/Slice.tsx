import { gql } from '@apollo/client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../AppProvider';



const query = gql`
  query Query($limit: Int, $offset: Int) {
    articleList(limit: $limit, offset: $offset) {
      nodes {
        _id
        title
        content
        createdAt
        author {
          name
          avatar
        }
      }
      meta {
        limit
        offset
        total
      }
    }
  }
`;

/* function useArticleList(variables: ArticleListVariables) {
    return useQuery<{ articleList: { nodes: Article[]; meta: ArticleMeta } }>(
      query,
      {
        variables,
      }
    );
  } */

  const initialState={
    articles:{},
    itemperpage:10,
    offset:0,
    loading:true,
    error:null,
    shouldRefetch: false,
}

export const FetchArticle=createAsyncThunk("FetchArticle",async(_, { getState })=>{
    
    const { itemperpage, offset } = (getState() as any).articles;

   const res= await client.query({
    query: query,
    variables:{
        limit:itemperpage,
        offset
    }
  });    
 return res.data.articleList
})



const articleSlice = createSlice({
    name: 'articles',
    initialState,
    extraReducers(builder) {
        builder
        .addCase(FetchArticle.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(FetchArticle.fulfilled, (state, action) => {
            state.loading = false;
             state.articles=action.payload 
          })
          .addCase(FetchArticle.rejected, (state) => {
            state.loading = false;
           /*  state.error = action.error.message; */
          });
    },
    reducers: {
setOffsetValue:(state,action)=>{
state.offset=action.payload
},

triggerRefetch: (state) => {
    state.shouldRefetch = true; 
  },
  refetchComplete: (state) => {
    state.shouldRefetch = false; 
  },
    },
  });
  

  export const { setOffsetValue,triggerRefetch,refetchComplete } = articleSlice.actions;
  export default articleSlice.reducer;