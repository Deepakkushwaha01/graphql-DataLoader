import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import { Article } from "../types.ts";
import { gql, useMutation } from "@apollo/client";
import DeleteIcon from '@mui/icons-material/Delete';

const mutation=gql`
mutation Mutation($deleteArticleId: ID!) {
  DeleteArticle(id: $deleteArticleId)
}
`


export function ArticleMediaObject({
  title,
  content,
  createdAt,
  author,
  _id,
  refetchData
}: Article) {
    
    const event = new Date(createdAt);

    const time=`${event.toDateString()} ${event.toTimeString().split(" ")[0]}`

const [deleteArticle]=useMutation(mutation)

const handleDelete =(id:String)=>{
 id && deleteArticle({variables:{deleteArticleId:id}}).then(()=>{
  console.log("Deletion successful");
  refetchData();
 }).catch((error) => {
  console.error("Error deleting article:", error);
})

}
  return (
    <Card>
      <div style={{display:"flex",justifyContent:"space-between"}}>
    
      <CardHeader
        avatar={<Avatar alt="Remy Sharp" src={author.avatar} />}
        title={author.name}
        subheader={time}
      />
        <Button onClick={()=>handleDelete(_id)}><DeleteIcon/></Button>
      </div>
      
      <CardHeader title={title} />
      <CardContent>{content}</CardContent>
    </Card>
  );
}
