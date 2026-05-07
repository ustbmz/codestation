import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Avatar, Descriptions, Typography, Row, Col, Button, Modal, Form, Input, Divider } from 'antd';
import { UserOutlined, MailOutlined, QqOutlined, WechatOutlined, CalendarOutlined, ClockCircleOutlined, TrophyOutlined, EditOutlined } from '@ant-design/icons';
import styles from '../css/Personal.module.css';
import PageHeader from '../components/PageHeader';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

function Personal() {
  const { t } = useTranslation();
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
      <PageHeader title={t('personal.title')} />
      <Card className={styles.personalCard}>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <div className={styles.avatarContainer}>
              <Avatar size={120} src={userInfo.avatar} icon={<UserOutlined />} />
              <Title level={2}>{userInfo.nickname}</Title>
              <Button type="primary" icon={<EditOutlined />} onClick={showModal}>
                {t('personal.editProfile')}
              </Button>
            </div>
          </Col>
          <Col xs={24} md={16}>
            <div className={styles.userInfoContainer}>
              <Descriptions title={t('personal.userInfo')} column={{ xs: 1, sm: 2 }}>
                <Descriptions.Item label={<span className={styles.infoLabel}><UserOutlined /> {t('personal.account')}</span>}>{userInfo.loginId}</Descriptions.Item>
                <Descriptions.Item label={<span className={styles.infoLabel}><MailOutlined /> {t('personal.mail')}</span>}>{userInfo.mail}</Descriptions.Item>
                <Descriptions.Item label={<span className={styles.infoLabel}><QqOutlined /> {t('personal.qq')}</span>}>{userInfo.qq}</Descriptions.Item>
                <Descriptions.Item label={<span className={styles.infoLabel}><WechatOutlined /> {t('personal.wechat')}</span>}>{userInfo.wechat}</Descriptions.Item>
                <Descriptions.Item label={<span className={styles.infoLabel}><CalendarOutlined /> {t('personal.registerTime')}</span>}>{userInfo.registerDate}</Descriptions.Item>
                {/* <Descriptions.Item label={<span className={styles.infoLabel}><ClockCircleOutlined /> 上次登录时间</span>}>{userInfo.lastLoginDate}</Descriptions.Item> */}
                <Descriptions.Item label={<span className={styles.infoLabel}><TrophyOutlined /> {t('personal.points')}</span>}>{userInfo.points}</Descriptions.Item>
              </Descriptions>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className={styles.introContainer}>
              <Title level={3}>{t('personal.introTitle')}</Title>
              <Divider style={{ margin: '16px 0' }} />
              <div className={styles.introContent}>
                <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: t('personal.expand') }}>
                  {userInfo.intro}
                </Paragraph>
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      <Modal 
        title={t('personal.modalTitle')} 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
        width={600}
      >
        <Form form={form} layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          <Form.Item name="nickname" label={t('login.nickname')} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="mail" label={t('personal.mail')} rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="qq" label={t('personal.qq')}>
            <Input />
          </Form.Item>
          <Form.Item name="wechat" label={t('personal.wechat')}>
            <Input />
          </Form.Item>
          <Form.Item name="intro" label={t('personal.introField')}>
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Personal;
