import { gql, useMutation, useQuery } from "@apollo/client";
import { FormControl, InputLabel, MenuItem, Select, TextField, styled,Button, CircularProgress } from "@mui/material";
import {  useState } from "react";

import { useNavigate } from "react-router-dom";




const query=gql`
query Author {
    articleList {
      author {
        _id
        name
      }
    }
  }
`

const mutation=gql`
mutation Mutation($input: ArticleInputType!) {
  articleCreate(input: $input) {
    content
    createdAt
    title
  }
}

`

type Author = {
_id:String,
name:String
}


type QueryResult = {
  articleList:{
    author:Author[]
  }
}


function useAuthorList() {
    return useQuery<QueryResult>(query);
}


const ArticleForm = () => {
    const {data}=useAuthorList()
    const [articleData,state]=useMutation(mutation);

   console.log(state)
 
const navigate =useNavigate();

const [ArticleForm,setArticleForm]=useState({
    title:"",
    content:"",
    createdAt:new Date().toISOString(),
    authorId:""
})

const handleChange = (event:any) => {
    const { name, value } = event.target;
    setArticleForm({
      ...ArticleForm,
      [name]: value,
    });
  };



const handledata=async(e:any)=>{
  e.preventDefault();
  try {
    await articleData({ variables: { input: ArticleForm } })

  setArticleForm({
    title:"",
    content:"",
    createdAt:new Date().toISOString(),
    authorId:""
}) 
/*  navigate('/')  */


  } catch (error) {
    console.error(error);
  }
 
}

return (
    <Div>
<Form onSubmit={handledata}>
      <TextField
        label="Title"
        variant="outlined"
        name="title"
        fullWidth
         value={ArticleForm.title} 
         onChange={handleChange} 
      />

 <TextField
        label="Content"
        multiline 
        rows={4} 
        variant="outlined"
        name="content"
        value={ArticleForm.content}
        onChange={handleChange}
      />

<FormControl variant="outlined">
        <InputLabel id="country-label">Author</InputLabel>
        <Select
          labelId="country-label"
          label="Author"
          name="authorId"
           value={ArticleForm.authorId} 
          onChange={handleChange}
        >
        {
          data?.articleList.author.map((val,index)=>{
            return  <MenuItem key={index} value={`${val._id}`}>{val.name}</MenuItem>
          })
        } 
        </Select>
      </FormControl>

      <Button type="submit" variant="outlined"  color="primary">
        Submit {state.loading && <CircularProgress/>}
      </Button>

</Form>


    </Div>  
  )
}

const Div=styled("div")(({})=>({
  height:"auto",
  minHeight:"100vh",
    display:"grid",
    placeItems:"center"
}))

const Form=styled("form")(({})=>({
width:"40vw",
height:"auto",
minHeight:"50vh",
display:"flex",
flexDirection:"column",
gap:"20px",
border:"1px solid black",
padding:"2rem",
borderRadius:"5px"
}))

export default ArticleForm