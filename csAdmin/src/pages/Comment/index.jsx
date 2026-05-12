import { useIntl } from '@umijs/max';

function Comment(props) {
  const intl = useIntl();
  return <div>{intl.formatMessage({ id: 'comment.placeholder' })}</div>;
}

export default Comment;
