import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const NewsBox =(props)=> {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  
  const updateNews=async()=>{
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?page=${page}&country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    props.setProgress(40);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setPage(1);
    setLoading(false);
    props.setProgress(100);
  }
  
  useEffect(()=>{
    let newTitle=props.category;
    document.title = "DailyMania - " + newTitle.charAt(0).toUpperCase() + newTitle.slice(1) + " Top Headlines";
    updateNews();
    // eslint-disable-next-line
  },[])
  

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?page=${page+1}&country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  }


    return (
      <>
        <h2 className='text-center' style={{marginTop:'80px',marginBottom:'40px'}}>Top {(props.category.charAt(0).toUpperCase() + props.category.slice(1))} Headlines</h2>
        <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={articles.length < totalResults} loader={<Spinner />}>
          {loading && <Spinner/>}
          <div className="container">
            <div className='row'>
              {articles.map((element) => {
                return (<div key={element.url} className="col-md-3">
                  <NewsItem title={(element.title && element.title.length > 45) ? element.title.slice(0, 45) + '...' : element.title} imageURL={element.urlToImage ? element.urlToImage : 'https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg'} alt='Card image cap' description={(element.description && element.description.length > 80) ? element.description.slice(0, 80) + '...' : element.description} newsURL={element.url} author={(element.author) ? element.author : "Unknown"} date={element.publishedAt} source={element.source.name} />
                </div>)
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    )
}

NewsBox.propTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
}

NewsBox.defaultProps={
  country:'in',
  pageSize:8,
  category:'general'
}

export default NewsBox;