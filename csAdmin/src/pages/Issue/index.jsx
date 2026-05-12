import { useIntl } from '@umijs/max';

function Issue(props) {
  const intl = useIntl();
  return <div>{intl.formatMessage({ id: 'issue.placeholder' })}</div>;
}

export default Issue;
