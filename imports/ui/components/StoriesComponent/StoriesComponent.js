import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import './StoriesComponent.scss';
import  * as bgJs from './bgImage';
import SVGFilterComponent from '../SVGFilterComponent/SVGFilterComponent';

// sort stories in order of creation, shortlist first 3
const sortStories = (stories, shortlist) => {
    return shortlist ? (
        stories.sort((a,b) => {
            return a.createdAt - b.createdAt;
        }).slice(0,3))
        : (
            stories.sort((a,b) => {
                return a.createdAt - b.createdAt;
            })
        )
}

const colors = [
    'beige', 'nice', 'turquise', 'blueorange', 
    'beige', 'nice', 'turquise', 'blueorange', 
    'beige', 'nice', 'turquise', 'blueorange', 
];

const StoriesComponent = ({stories, shortlist, viewportIsMobile}) => (
    sortStories(stories, shortlist).length 
    ? (
        stories.map(({
            _id, title, imageUrl }, index) => {
        const bgImage = bgJs.SVGFilterImageBackground(imageUrl, viewportIsMobile, colors[index]);
        
        // to reset css filter add <divs> before and after image
        const duotoneBefore = bgJs.duotoneB(viewportIsMobile);
        const duotoneAfter = bgJs.duotoneA(viewportIsMobile);
        
        return (
            <Col xs="12" sm="6" lg="4" className="StoriesComponent" key={_id}>  
                <Row> 
                    <Col xs={12}>
                    <div><SVGFilterComponent /></div>
                    <div style={bgImage}></div>
                        <Row>
                            <Col className="image-box" xs={12}>
                                <Col className="BorderCornerWrap">
                                    <Col className="BorderCorner">
                                        <Link to={`/starter/${_id}`}><h2><span> {`${title}`} </span></h2></Link>
                                    </Col>
                                </Col>
                            </Col>
                        </Row>
                        {/* <div style={duotoneAfter}></div> */}
                    </Col>
                    
                </Row>
                <Row>
                <Col className="StartButtonWrap" xs={12}>
                    <Link to={`/starter/${_id}`}>Play Now</Link>
                </Col>
                </Row>
            </Col>
        )
        })
    ) : <div>No stories yet!</div>
)

StoriesComponent.propTypes = {
    stories: PropTypes.arrayOf(PropTypes.object),
    viewportIsMobile: PropTypes.bool.isRequired,
    authenticated: PropTypes.bool.isRequired,
    shortlist: PropTypes.bool,
};

export default StoriesComponent;
