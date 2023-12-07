import React, { useEffect, useState } from 'react';
import './Detail-SASS/detail_main.css';
import useRequest from '../../hooks/useRequest';
import getFakeComment from "./fakeComment";
import getFakeAttraction from "./fakeAttraction";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Rate } from 'antd';
import 'antd/dist/antd.js'
import { Empty } from 'antd';
import { Breadcrumb } from 'antd';
import { message } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
const fake_attraction = getFakeAttraction();
const fake_comment = getFakeComment();
const style = {
    '--bs-breadcrumb-divider': '>', // 直接设置 CSS 变量
};


const Detail = () => {
    const [token, Settoken] = useState(null);
    const regex = /(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/;
    const navigate = useNavigate();
    //获取attraction id
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const { request: requestComments, isLoading: isLoadingComments, error: errorComments } = useRequest(`/comment?attraction_id=${id}`, { method: 'GET' });
    const { request: requestAttraction, isLoading: isLoadingAttraction, error: errorAttraction } = useRequest(`/attraction?id=${id}`, { method: 'GET' });
    const { request: postComments, isLoadingLisLoadingPost, error: errorPost } = useRequest('/comment/add', { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } });
    const [CommentTitle, SetCommentTitle] = useState('');
    const [CommentBody, SetCommentBody] = useState('');
    const [Loading, setLoading] = useState(true);
    const [AttractionData, setAttractionData] = useState(null);
    const [CommentData, SetCommentData] = useState(null);
    const [commentNum, SetcommentNum] = useState(0);
    const [startIndex, SetstartIndex] = useState(0);
    const [Predisable, setPrevdisable] = useState(true);
    const [Nextdisable, setNextdisable] = useState(true);
    const [CommentStar, SetCommentStar] = useState(5);

    const fetchData = async () => {
        const attrData = await requestAttraction();
        const commentData = await requestComments();
        if (!errorComments && !errorAttraction) {
            setAttractionData(attrData.data.attraction);
            SetCommentData(commentData.data.comments.filter(comment => comment.status === 1));
            SetcommentNum(commentData.data.comments.filter(comment => comment.status === 1).length);
            SetstartIndex(0);
            setPrevdisable(true);
            if (commentData.data.comments.length <= 4) {
                setNextdisable(true);
            }
            else {
                setNextdisable(false);
            }
        }
    };
    useEffect(() => {
        console.log(startIndex);
    }, [startIndex]);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        const token = localStorage.getItem('token');
        if (token) {
            Settoken(token);
        }
        fetchData();
    }, []);
    useEffect(() => {
        if (startIndex === 0) {
            setPrevdisable(true);
        }
        else {
            setPrevdisable(false);
        }
        if (startIndex + 4 >= commentNum) {
            setNextdisable(true);
        }
        else {
            setNextdisable(false);
        }
    }, [startIndex, commentNum])
    if (!AttractionData || !CommentData) {
        return <div>Loading...</div>; // 在数据加载时显示加载指示
    }
    const generateIndicatorButton = () => {
        const num = AttractionData.image.length;
        const divs = [];
        for (let i = 0; i < num; i++) {
            divs.push(
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={i.toString()} className={i === 0 ? 'active' : ''}
                    aria-current="true" aria-label={`Slide ${i + 1}`}></button>
            );
        }

        return divs;
    }
    const generateCarousItem = () => {
        const num = AttractionData.image.length;
        const divs = [];
        for (let i = 0; i < num; i++) {
            divs.push(
                <div className={`carousel-item ${i === 0 ? 'active' : ''}`} >
                    <img src={AttractionData.image[i]} className="d-block w-100" alt="..." />
                </div>
            );
        }
        return divs
    }
    const generateRateInfoList = () => {
        const attraction = AttractionData
        const divs = []
        divs.push(
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <h1 style={{ fontWeight: 'bold' }} className="title">{attraction.name}</h1>
            </li>
        )
        divs.push(
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <div className="detail_rating" style={{ fontSize: '35px' }}>
                    <Rate className="info-show" disabled allowHalf value={attraction.rating} />
                </div>
                <div className="detail_score">
                    <h2><span className='detail_yellow_bold'>{attraction.rating}</span><span style={{ fontSize: '20px' }}>/5.0</span>
                    </h2>
                </div>
            </li>
        )
        divs.push(
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <div className="detail_list_title">
                    <h6>Location</h6>
                </div>
                <div className="detail_list_content loc">
                    <h6>{attraction.location}</h6>
                </div>
            </li>
        )
        divs.push(
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <div className="detail_list_title">
                    <h6>Open Time</h6>
                </div>
                <div className="detail_list_content time">
                    <h6>{attraction.opening_hours}</h6>
                </div>
            </li>
        )
        divs.push(
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <div className="detail_list_title">
                    <h6>Official Tel.</h6>
                </div>
                <div className="detail_list_content tel">
                    <h6>{attraction.official_tel}</h6>
                </div>
            </li>
        )
        return divs;
    }

    const generateDate = (s) => {
        const match = s.match(regex);
        const formattedTime = match ? `${match[1]} ${match[2]}` : '';
        return (
            <span className="detail_comment_rate_time" style={{ marginLeft: '10px' }}>
                {formattedTime}
            </span>
        );
    }
    const generateSingleComment = () => {
        if (commentNum === 0) {
            return <Empty />
        }
        return CommentData && CommentData.length > 0 && CommentData.map((comment, index) => {
            if (index <= startIndex + 3 && index>=startIndex) {
                return (
                    <div className="detail_comments_item_container" >
                        <div className="detail_comment_c1">
                            <div className="detail_comment_icon">
                                <img
                                    src={comment.avatar}
                                    style={{ height: '80%', width: '80%', margin: '10%' }}
                                />
                            </div>
                            <div className="detail_comment_name" style={{ marginLeft: '8%' }}>
                                {comment.reviewer_name}
                            </div>
                        </div>
                        <div className="detail_comment_c2">
                            <h4 className="detail_comment_title">{comment.review_title}</h4>
                            <div className="detail_comment_rate">
                                <Rate className="Comment-Star" disabled allowHalf value={comment.star_rating} />
                                {generateDate(comment.review_time)}
                            </div>
                            <div className="detail_comment_text">
                                <p>
                                    {comment.detailed_review}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            }
        })
    }
    const generateComment = Loading ?
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div> :
        (<div className="detail_comment_contents" >
            {generateSingleComment()}
        </div>)
    const generateSwitchPage = () => {
        const divs = [];
        const totalpage = Math.ceil(commentNum / 4);
        for (let i = 0; i < totalpage; i++) {
            divs.push(
                <li className={`page-item ${startIndex >= i * 4 && startIndex <= i * 4 + 3 ? 'current' : ''}`}>
                    <a
                        className="page-link"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();

                            function handlePagnitionClick(i) {
                                SetstartIndex(i * 4);
                            }

                            handlePagnitionClick(i);
                        }}
                    >
                        {i + 1}
                    </a>
                </li>
            )
        }
        return divs;
    }
    const handleRateChange = (newvalue) => {
        SetCommentStar(newvalue);
    }
    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please Login");
            Settoken(null);
            SetCommentTitle('');
            SetCommentBody('');
            return;
        }
        const data = {
            attraction_id: id.toString(),
            review_title: CommentTitle,
            star_rating: CommentStar,
            detailed_review: CommentBody
        }
        try {
            const response = await postComments(data);
            message.success('Post Success!');
            SetCommentTitle('');
            SetCommentBody('');
            await fetchData();
            // 处理响应数据
        } catch (err) {
            alert(err);
            navigate('/login');
        }
    }
    const generateSwitchButton = () => {
        if (commentNum === 0) {
            return (<div></div>)
        }
        else {
            return (
                <div className="detail_pagination_container">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">

                            <li className={`page-item ${Predisable ? 'disabled' : ''}`}>
                                <a
                                    className="page-link"
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();

                                        function handlePagnitionClick(startIndex) {
                                            SetstartIndex(startIndex - 4);
                                        }

                                        handlePagnitionClick(startIndex);
                                    }}
                                >
                                    Previous
                                </a>
                            </li>
                            {generateSwitchPage()}
                            <li className={`page-item ${Nextdisable ? 'disabled' : ''}`}>
                                <a
                                    className="page-link"
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();

                                        function handlePagnitionClick(startIndex) {
                                            SetstartIndex(startIndex + 4);
                                        }

                                        handlePagnitionClick(startIndex);
                                    }}
                                >
                                    Next
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            )
        }
    }
    return (
        <div className="detail_body">
            <div className="detail_main_container">
                <div className="detail_breadcrumb_container">
                    <Breadcrumb
                        separator=">"
                        items={[
                            {
                                href: '/home',
                                title: <HomeOutlined />,
                            },
                            {
                                title: 'Attraction',
                            },
                        ]}
                    />
                </div>
                <div className="detail_pic_rate_container">
                    <div className="detail_carousel_container" id="attraction_vue">
                        <div id="carouselExampleIndicators" className="carousel slide">
                            <div className="carousel-indicators">
                                {generateIndicatorButton()}
                            </div>
                            <div className="carousel-inner">
                                {generateCarousItem()}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                                data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                                data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <div className="detail_rate_info_container">
                        <ul className="list-group">
                            {generateRateInfoList()}
                        </ul>

                    </div>
                </div>
                <div className="detail_intro_container">
                    <div className="detail_intro_content2">
                        <div className="accordion" id="accordionPanelsStayOpenExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                                        aria-controls="panelsStayOpen-collapseOne">
                                        Introduction
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                                    <div className="accordion-body intro">
                                        {AttractionData.detailed_description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="detail_intro_content">
                        <div className="accordion" id="accordionPanelsStayOpenExample2">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true"
                                        aria-controls="panelsStayOpen-collapseTwo">
                                        Open Time
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse show">
                                    <div className="accordion-body time">
                                        {AttractionData.opening_hours}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="detail_intro_content">
                        <div className="accordion" id="accordionPanelsStayOpenExample3">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="true"
                                        aria-controls="panelsStayOpen-collapseThree">
                                        Tips
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse show">
                                    <div className="accordion-body tips">
                                        {AttractionData.tips}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="detail_comment_container" id="comments">
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Submit Comment</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Are you sure you want to submit this comment? Once submitted, you may not be able to edit or delete it.
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="detail_comment_head">Comments</div>
                    {generateComment}
                    {generateSwitchButton()}
                    <div className="detail_comment_input">
                        <div className="detail_comment_input_text_container">
                            <textarea style={{ resize: "none" }} className="detail_comment_textarea_title" name="comment_input" value={CommentTitle} onChange={(e) => {
                                SetCommentTitle(e.target.value)
                            }}
                                placeholder="Comment Title">
                            </textarea>
                            <textarea style={{ resize: "none" }} className="detail_comment_textarea" name="comment_input" value={CommentBody} onChange={(e) => {
                                SetCommentBody(e.target.value)
                            }}
                                placeholder="Leave your comments here">
                            </textarea>
                        </div>
                        <div className="detail_comment_input_rate_button_container">
                            <div className="detail_input_start_container">
                                <Rate onChange={handleRateChange} allowHalf allowClear={false} defaultValue={CommentStar} className="custom-comment-star" />
                            </div>
                            <button
                                type="button"
                                className="detail_comment_submit btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                style={{ textAlign: 'center', padding: 0 }}
                            >
                                Submit
                            </button>
                        </div>
                        {!token && (
                            <div className="cover">
                                <a href="/login" className="login-link">Go to Login</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;