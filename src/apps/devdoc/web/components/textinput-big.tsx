import { TextInput } from 'kl-design-system/atoms/input';
import { ChangeEventHandler } from 'react';
import { IconButton } from 'kl-design-system/atoms/button';
import Button from './button';
import { ArrowRight } from '../icons/icons';

const TextInputBig = ({
  value,
  onChange,
  onEnter,
  onSuffixClicked,
}: {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onEnter?: () => void;
  onSuffixClicked?: () => void;
}) => {
  return (
    <div
      style={{ background: 'linear-gradient(#93C5FD, #3B82F6)' }}
      className="wb-p-[2px] wb-rounded-md"
      id="join-waitlist"
    >
      <TextInput
        value={value}
        onChange={onChange}
        placeholder="Enter email to join waitlist"
        size="xl"
        className="!wb-border-none"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onEnter?.();
            e.stopPropagation();
            e.preventDefault();
          }
        }}
        suffix={
          <div>
            {value ? (
              <div>
                <div className="wb-hidden md:wb-block">
                  <Button
                    size="sm"
                    content="Join waitlist"
                    suffix={<ArrowRight />}
                    variant="primary"
                    onClick={onSuffixClicked}
                  />
                </div>
                <div className="wb-block md:wb-hidden">
                  <Button
                    size="sm"
                    content="Join"
                    suffix={<ArrowRight />}
                    variant="primary-plain"
                    onClick={onSuffixClicked}
                  />
                </div>
              </div>
            ) : (
              <IconButton variant="outline" icon={<ArrowRight />} />
            )}
          </div>
        }
        focusRing={false}
        textFieldClassName="!wb-bodyLg"
      />
    </div>
  );
};

export default TextInputBig;
