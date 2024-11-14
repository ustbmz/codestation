import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Avatar, Descriptions, Typography, Row, Col, Button, Modal, Form, Input, Divider } from 'antd';
import { UserOutlined, MailOutlined, QqOutlined, WechatOutlined, CalendarOutlined, ClockCircleOutlined, TrophyOutlined, EditOutlined } from '@ant-design/icons';
import styles from '../css/Personal.module.css';
import PageHeader from '../components/PageHeader';
// import { updateUserInfo } from '../redux/userSlice'; // 假设你有这个action

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

function Personal() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    form.setFieldsValue(userInfo);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      // dispatch(updateUserInfo(values));
      // setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={styles.personalContainer}>
      <PageHeader title="个人中心" />
      <Card className={styles.personalCard}>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <div className={styles.avatarContainer}>
              <Avatar size={120} src={userInfo.avatar} icon={<UserOutlined />} />
              <Title level={2}>{userInfo.nickname}</Title>
              <Button type="primary" icon={<EditOutlined />} onClick={showModal}>
                编辑资料
              </Button>
            </div>
          </Col>
          <Col xs={24} md={16}>
            <div className={styles.userInfoContainer}>
              <Descriptions title="用户信息" column={{ xs: 1, sm: 2 }}>
                <Descriptions.Item label={<span className={styles.infoLabel}><UserOutlined /> 账号</span>}>{userInfo.loginId}</Descriptions.Item>
                <Descriptions.Item label={<span className={styles.infoLabel}><MailOutlined /> 邮箱</span>}>{userInfo.mail}</Descriptions.Item>
                <Descriptions.Item label={<span className={styles.infoLabel}><QqOutlined /> QQ</span>}>{userInfo.qq}</Descriptions.Item>
                <Descriptions.Item label={<span className={styles.infoLabel}><WechatOutlined /> 微信号</span>}>{userInfo.wechat}</Descriptions.Item>
                <Descriptions.Item label={<span className={styles.infoLabel}><CalendarOutlined /> 注册时间</span>}>{userInfo.registerDate}</Descriptions.Item>
                {/* <Descriptions.Item label={<span className={styles.infoLabel}><ClockCircleOutlined /> 上次登录时间</span>}>{userInfo.lastLoginDate}</Descriptions.Item> */}
                <Descriptions.Item label={<span className={styles.infoLabel}><TrophyOutlined /> 积分</span>}>{userInfo.points}</Descriptions.Item>
              </Descriptions>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className={styles.introContainer}>
              <Title level={3}>个人介绍</Title>
              <Divider style={{ margin: '16px 0' }} />
              <div className={styles.introContent}>
                <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: '展开' }}>
                  {userInfo.intro}
                </Paragraph>
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      <Modal 
        title="编辑个人信息" 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
        width={600}
      >
        <Form form={form} layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          <Form.Item name="nickname" label="昵称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="mail" label="邮箱" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="qq" label="QQ">
            <Input />
          </Form.Item>
          <Form.Item name="wechat" label="微信号">
            <Input />
          </Form.Item>
          <Form.Item name="intro" label="个人介绍">
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Personal;
