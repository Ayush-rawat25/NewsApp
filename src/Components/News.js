import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProp={
    pageSize: 8,
    catagory: "general",
  }
  static propType={
    pageSize: PropTypes.number,
    catagory: PropTypes.string,
  }
  capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props){
    super(props);
    this.state={
      articles: [],
      loading: false,
      page: 1,
      totalResult: 0
    }
    document.title=`${this.capitalizeFirstLetter(this.props.catagory)} - NewsMonkey`
  }
  async updatePage(){
    this.props.setProgress(10);
    const url=`https://newsapi.org/v2/top-headlines?category=${this.props.catagory}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading: true})
    this.props.setProgress(30);
    let data=await fetch(url);
    this.props.setProgress(70);
    let passedData = await data.json();
    this.setState({articles: passedData.articles, totalResult: passedData.totalResults, loading: false})
    this.props.setProgress(100);
  }

  async componentDidMount(){
    this.updatePage();
  }
  
  fetchMoreData= async()=>{
    this.setState({page: this.state.page + 1});
    const url=`https://newsapi.org/v2/top-headlines?category=${this.props.catagory}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading: true})
    let data=await fetch(url);
    let passedData = await data.json();
    this.setState({articles: this.state.articles.concat(passedData.articles), totalResult: passedData.totalResults}) 
  }

  render() {
    return (
      <>
        <h2 className='text-center mt-4'>NewsMonkey Top {this.capitalizeFirstLetter(this.props.catagory)} Headlines</h2>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResult}
          loader={<Spinner />}
        >
        <div className="container">
        <div className="row mt-3">
        {this.state.articles.map((element)=>{
            return<div className="col-md-4 mt-4" key={element.url}><NewsItem title={element.title?.slice(0, 40)} description={element.description?.slice(0, 88)} imageUrl={element.urlToImage} newsUrl={element.url} publishedAt={element.publishedAt} author={element.author} source={element.source.name}/></div>
        })}
        </div>
        </div>
        </InfiniteScroll>
      </>
    )
  }
}

export default News
