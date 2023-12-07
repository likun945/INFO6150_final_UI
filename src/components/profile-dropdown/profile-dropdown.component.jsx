
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import './profile-dropdown.style.css';
import { Badge, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UsergroupAddOutlined, UserOutlined, LogoutOutlined, UserDeleteOutlined } from '@ant-design/icons';
import useAuth from '../../hooks/useAuth';


const ProfileDropdown = () => {
    const navigate = useNavigate();
    const { avatar, username, email, userType } = useAuth();
    const handleLogout = () => {
        localStorage.clear()
        navigate('/login');
    };
    return (
        <div className='profile-container'>
            <Dropdown className='dropdown-box'>
                <Dropdown.Toggle variant="light" id="profile-dropdown">
                    <Badge count={0}>
                        <Avatar shape="square" size={56} src={avatar} />
                        {/* <img src={process.env.PUBLIC_URL + '/profile.jpg'} alt="avatar" width="40" height="40" size="large" className='profile-avatar'/> */}
                    </Badge>
                    <span className="profile-name">
                        {username}
                    </span>
                </Dropdown.Toggle>

                <Dropdown.Menu className='dropdwon-menu' placement="bottom">
                    <Dropdown.Item href="#action/3.2">
                        <p className='profile-info'>{username}</p>
                        <p className='profile-email'><b><i>{email}</i></b></p>

                    </Dropdown.Item>
                    <Dropdown.Divider />
                    {(userType == 1) ? (
                        <div>
                            <Dropdown.Item onClick={() => { navigate('/comments') }}>
                                <UserDeleteOutlined width="14" height="14" className='icon' />Manage Comment
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => { navigate('/users') }}>
                                <UsergroupAddOutlined width="14" height="14" className='icon' />Manage User
                            </Dropdown.Item>
                        </div>
                    ) : (
                        <Dropdown.Item onClick={() => { navigate('/editUser') }}>
                            <UserOutlined width="14" height="14" className='icon'/>Edit Profile
                        </Dropdown.Item>
                    )}

                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => { handleLogout() }}>
                        <LogoutOutlined width="14" height="14" className='icon' />LogOut
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div >

    );

}

export default ProfileDropdown;