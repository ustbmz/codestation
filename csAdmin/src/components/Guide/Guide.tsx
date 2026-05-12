import { Layout, Row, Typography } from 'antd';
import React from 'react';
import { useIntl } from '@umijs/max';
import styles from './Guide.less';

interface Props {
  name: string;
}

const Guide: React.FC<Props> = (props) => {
  const { name } = props;
  const intl = useIntl();
  return (
    <Layout>
      <Row>
        <Typography.Title level={3} className={styles.title}>
          {intl.formatMessage({ id: 'home.welcome' }, { name })}
        </Typography.Title>
      </Row>
    </Layout>
  );
};

export default Guide;
