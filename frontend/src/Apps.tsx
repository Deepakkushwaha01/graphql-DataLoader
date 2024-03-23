import { Button, Container, styled } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { ArticleMediaObject } from "./components/ArticleMediaObject.tsx";
import { gql, useQuery } from "@apollo/client";
import { Article,  } from "./types.ts";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";





const Wrapper = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

/* const query = gql`
    query ArticleList($limit: Int) {
        articleList(limit: $limit) {
            nodes {
                id
                title
                content
                createdAt
            }
        }
    }
`; */

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

export type ArticleListVariables = {
  limit: number;
  offset: number;
};

export interface ArticleMeta {
  limit: number;
  offset: number;
  total: number;
}

interface PageButton {
  active: Boolean;
}

export function useArticleList(variables: ArticleListVariables) {
  return useQuery<{ articleList: { nodes: Article[]; meta: ArticleMeta } }>(
    query,
    {
      variables,
      fetchPolicy:"network-only",
    }
  );
}

export function Apps() {
  const [offsetval, newoffsetval] = useState(1);

  const navigate = useNavigate();


/* et itemperpage = useSelector((state:RootState)=>state.articles.itemperpage); */

/*   useEffect(() => {
    dispatch<any>(FetchArticle())
    
  }, []);  */

/* useEffect(()=>{
    dispatch<any>(FetchArticle())
},[offset]) */


let itemperpage=2;

  let offsetdata = (offsetval - 1) * itemperpage;

/*   useEffect(()=>{
    dispatch(setOffsetValue(offsetdata))
      },[offsetdata]) */

  const { data, loading , refetch } = useArticleList({
    limit: itemperpage,
    offset: offsetdata,
  });

  const handleRefetch = () => {
    refetch()
  
  };

  /*
  useEffect(()=>{
    if(shouldRefetch==true){
        refetch().then(()=>{
            
        });
        dispatch(refetchComplete())
    }
   },[shouldRefetch]) */
 

  let content = null;
  let pagination = null;
  if (loading) {
    /*         content = <CircularProgress/>; */
    content = (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
        <Skeleton width={310} height={218} variant="rectangular"></Skeleton>
        <Skeleton width={310} height={218} variant="rectangular"></Skeleton>
        <Skeleton width={310} height={218} variant="rectangular"></Skeleton>
      </div>
    );
  } else if (data) {
    content = (
      <ArticleMediaList>
        {data.articleList.nodes.map((article:Article) => {
          return (
              <ArticleMediaObject
                key={article._id}
                {...article}
                refetchData={handleRefetch}
              />
          );
        })}
      </ArticleMediaList>
    );

    const totalPages = Math.ceil(data.articleList.meta.total / itemperpage);

    const ThreeDots = () => {
      return <span>...</span>;
    };

    const pageNumbers = [];
    let toshow = 3;
    for (let i = offsetval; i <= totalPages; i++) {
      if (i <= offsetval + toshow || i > totalPages - 2) {
        if (i == offsetval && i != 1) {
          for (let j = i - 2; j < i; j++) {
            j != 0 &&
              pageNumbers.push(
                <PageButton key={j} onClick={() => newoffsetval(j)}>
                  {j}
                </PageButton>
              );
          }
          /* pageNumbers.push(<ThreeDots  />); */
        }
        pageNumbers.push(
          <PageButton
            key={i}
            onClick={() => newoffsetval(i)}
            active={i == offsetval}
          >
            {i}
          </PageButton>
        );
      } else if (i == offsetval + toshow + 1) {
        pageNumbers.push(<ThreeDots />);
      }
    }

    pagination = <PaginationList>{pageNumbers}</PaginationList>;
  }
  return (
    <Wrapper>
       <Button style={{border:"1px solid blue",marginBottom:"1rem"}} onClick={()=>navigate('/article')}>Add Article</Button>
      {content}
      {pagination}
    </Wrapper>
  );
}

const ArticleMediaList = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
}));



const PaginationList = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  justifyContent: "center",
  marginTop: "20px",
  position: "fixed",
  bottom: "0%",
  width: "100vw",
  right: "0%",

  padding: "5px",

  backgroundColor: "white",
}));
interface PageButtonProps {
  onClick?: () => void;
  active?: boolean;
}

const PageButton = styled("button")<PageButtonProps>(({ active }) => ({
  padding: "8px 12px",
  border: "1px solid #ccc",
  cursor: "pointer",
  backgroundColor: active ? "#B4D4FF" : "",
  color: active ? "white" : "black",
  "&:hover": {
    backgroundColor: active ? "#B4D4FF" : "#86B6F6",
    color: "white",
  },
}));
