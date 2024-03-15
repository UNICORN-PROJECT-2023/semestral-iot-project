import ArticleDetailPage from "../pages/ArticleDetailPage";
import { useParams } from "react-router-dom";
import ArticleService from "../services/ArticleService";
import { useEffect, useState } from "react";

export default function ArticleDetailScreen() {
    const { id } = useParams();
    const articleService = new ArticleService();
    const [Article, setArticle] = useState({
        
    });

    useEffect(() => {
        async function fetchArticle() {
            try {
                const Article = await articleService.getArticle(id);
                setArticle(Article.body);
            } catch (error) {
                console.error(error);
            }
        }
        fetchArticle();
    }, []);

    function getArticleIdFromUrl(url) {
        const regex = /[?&]v=([^&]+)/;
        if (url && typeof url === 'string') {
          const match = url.match(regex);
          return match ? match[1] : null;
        }
        return null;
      }
    
    return(
        <ArticleDetailPage
        ArticlesData={Article}
        getArticleIdFromUrl={getArticleIdFromUrl}
        />
    );
}