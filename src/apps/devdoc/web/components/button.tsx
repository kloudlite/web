import { Button as ButtonOrg, IButton } from 'kl-design-system/atoms/button';

const Button = (props: IButton) => {
  const { content } = props;
  return <ButtonOrg {...props} content={content} />;
};

export default Button;
