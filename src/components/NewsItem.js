import React from 'react';

const NewsItem=(props)=>{
        let {title, description, imageURL, newsURL, author, date, source} = props;
        return( 
            <div className='my-3'>
                <div className="card">
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1'}}>{source}</span>
                    <img className="card-img-top" src={imageURL} alt='Sorry! No Data Available'/>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsURL} target='_blank' rel='noreferrer' className="btn btn-sm btn-primary">Read More</a>
                    </div>
                    </div>
            </div>
        )
}

export default NewsItem;