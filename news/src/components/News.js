import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';

const categories = [
    "general",
    "business",
    "entertainment",
    // "general",
    "health",
    "science",
    "sports",
    "technology"
]

const News = () => {
    const [articles, setArticles] = useState([]);
    const [totalArticles, setTotalArticles] = useState(0);
    const [currentPage, setCurrentPage] = useState(undefined);
    const [selectedCategory, setSelectedCategory] = useState()

    const loadNews = (pageNo = 1) => {
        axios({
            url: "https://newsapi.org/v2/top-headlines",
            method: "GET",
            params: {
                country: "in",
                apiKey: "a25431e84ac949e9b7d04a426615e540",
                page: pageNo,
                category : selectedCategory
            }
        }).then((res) => {
            // console.log(res)
            setArticles([...articles,...res.data.articles])
            setTotalArticles(res.data.totalResults)
            setCurrentPage(pageNo)

        }).catch((error) => {
            console.log(error)

        })

    }

    useEffect(() => { loadNews() }, []);
    useEffect(()=>{
        loadNews()

    },[selectedCategory])

    return (
        <>
             <div>
                {
                    categories.map((category)=>{
                        return(
                            <button className="btn btn-primary" style={{margin : 20}}onClick={()=>{
                                setArticles([])
                                setSelectedCategory(category)
                            }}>{category}</button>
                        )
                    })
                }
             </div>

            <InfiniteScroll
                style={{ display: 'flex', flexWrap: 'wrap' }}
                dataLength={articles.length}
                next={() => {
                    loadNews(currentPage + 1);
                }}
                hasMore ={totalArticles != articles.length}
            >
                {
                    articles.map((article, index) => {
                        return (
                            <>
                                <div className="card" style={{ width: 200 }}>
                                    <img className="card-img-top" src={article.urlToImage} alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">{article.title}</h5>
                                        <p className="card-text">
                                            {article.description}
                                        </p>
                                    </div>
                                </div>


                            </>


                        )
                    })
                }
            </InfiniteScroll>

        </>
    )
}

export default News;