import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './signin.css';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        console.log({ email, password });
    };

    return (
        <div className="signin_container">
            <h2 id="title">Sign In</h2>
            <Form onFinish={handleSignIn}>
                <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                    <Input prefix={<UserOutlined />} placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input.Password prefix={<LockOutlined />} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>Sign In</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SignIn;
