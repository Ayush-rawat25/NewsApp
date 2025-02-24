import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {
  const [articles,setArticles]=useState([]);
  const [loading,setLoading]=useState(true);
  const [page,setPage]=useState(1);
  const [totalResult,setTotalResult]=useState([]);

  const capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  // document.title=`${this.capitalizeFirstLetter(props.catagory)} - NewsMonkey`
  const updatePage = async()=>{
    props.setProgress(10);
    const url=`https://gnews.io/api/v4/top-headlines?country=in&category=${props.catagory}&apikey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    setLoading(true);
    props.setProgress(30);
    let data=await fetch(url);
    props.setProgress(70);
    let passedData = await data.json();
    setArticles(passedData.articles);
    setLoading(false);
    setTotalResult(passedData.totalResults)
    props.setProgress(100);
  }
  useEffect(()=>{
    updatePage();
  },[])
  
  const fetchMoreData= async()=>{
    const url=`https://gnews.io/api/v4/top-headlines?country=in&category=${props.catagory}&apikey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    setPage(page + 1);
    setLoading(true);
    let data=await fetch(url);
    let passedData = await data.json();
    setArticles(articles.concat(passedData.articles));
    setTotalResult(passedData.totalResults);
  }

    return (
      <>
        <h2 className='text-center' style={{marginTop:'80px'}} >NewsMonkey Top {capitalizeFirstLetter(props.catagory)} Headlines</h2>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResult}
          loader={<Spinner />}
        >
        <div className="container">
        <div className="row mt-3">
        {articles.map((element)=>{
            return<div className="col-md-4 mt-4" key={element.url}><NewsItem title={element.title?.slice(0, 40)} description={element.description?.slice(0, 88)} imageUrl={element.image} newsUrl={element.url} publishedAt={element.publishedAt} author={element.source.name} source={element.source.name}/></div>
        })}
        </div>
        </div>
        </InfiniteScroll>
      </>
    )
  }
News.defaultProp={
  pageSize: 8,
  catagory: "general",
}
News.propType={
  pageSize: PropTypes.number,
  catagory: PropTypes.string,
}
export default News
