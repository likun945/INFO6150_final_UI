import React, { Component } from 'react';
import './search-bar.style.css'
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space } from 'antd';
import { Navbar, Nav, NavDropdown, Container, Form, Row, Col } from 'react-bootstrap';


class SearchBar extends Component {
    render() {
        return (
            <div className='search-container'>
                <Space.Compact size="large" className='search-bar' >
                    <Input addonBefore={<SearchOutlined />} placeholder="search attraction" onChange={this.props.onChangeHandler}/>
                </Space.Compact>
            </div>


        );

    }
}

export default SearchBar;
