import { Button as ButtonOrg, IButton } from 'kl-design-system/atoms/button';

const Button = (props: IButton) => {
  const { content } = props;
  return (
    <ButtonOrg
      {...props}
      content={<div className="wb-bodyLg-medium">{content}</div>}
    />
  );
};

export default Button;
