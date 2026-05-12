import { useIntl } from '@umijs/max';

function TypePage(props) {
  const intl = useIntl();
  return <div>{intl.formatMessage({ id: 'type.placeholder' })}</div>;
}

export default TypePage;
