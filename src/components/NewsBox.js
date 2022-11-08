import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class NewsBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
    let newTitle = this.props.category;
    document.title = "DailyMania - " + newTitle.charAt(0).toUpperCase() + newTitle.slice(1) + " Top Headlines";
  }

  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?page=${this.state.page}&country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(40);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      page: 1,
      loading: false  
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    await this.updateNews();
  }

  fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?page=${this.state.page+1}&country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      page:this.state.page+1
    });
  }


  render() {
    return (
      <>
        <h2 className='text-center my-5'>Top {(this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1))} Headlines</h2>
        <InfiniteScroll dataLength={this.state.articles.length} next={this.fetchMoreData} hasMore={this.state.articles.length < this.state.totalResults} loader={<Spinner />}>
          {this.state.loading && <Spinner/>}
          <div className="container">
            <div className='row'>
              {this.state.articles.map((element) => {
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
}

export default NewsBox;