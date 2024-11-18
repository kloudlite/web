import { useEffect, useState } from 'react';
import { TextArea, TextInput } from '~/components/atoms/input';
import Popup from '~/components/molecule/popup';
import { IDialog, IModifiedItem } from '~/console/components/types.d';
import { ConsoleApiType } from '~/console/server/gql/saved-queries';
import { parseName } from '~/console/server/r-utils/common';
import { constants } from '~/console/server/utils/constants';
import useForm from '~/lib/client/hooks/use-form';
import Yup from '~/lib/server/helpers/yup';
import { handleError } from '~/lib/utils/common';
import { ConfigIn } from '~/root/src/generated/gql/server';

import { useParams } from '@remix-run/react';
import { Button } from '~/components/atoms/button';
import { ensureAccountClientSide } from '~/console/server/utils/auth-utils';

export interface IConfigValue {
  key: string;
  value: string;
}

interface IUpdateConfig {
  api: ConsoleApiType;

  environment: string;
  config: ConfigIn;
  data: any;
  reload: () => void;
}

export const updateConfig = async ({
  api,

  environment,
  config,
  data,
  reload,
}: IUpdateConfig) => {
  try {
    const { errors: e } = await api.updateConfig({
      envName: environment,

      config: {
        metadata: {
          name: parseName(config),
        },
        displayName: config.displayName,
        data,
      },
    });
    if (e) {
      throw e[0];
    }
    reload();
  } catch (err) {
    handleError(err);
  }
};

const Handle = ({
  show,
  setShow,
  onSubmit,
  isUpdate,
}: IDialog<IModifiedItem, IConfigValue> & { isUpdate?: boolean }) => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    resetValues,
    isLoading,
    setValues,
  } = useForm({
    initialValues: {
      key: '',
      value: '',
    },
    validationSchema: Yup.object({
      key: Yup.string()
        .required()
        .matches(constants.keyFormatRegex, 'Invalid key format')
        .test('is-valid', 'Key already exists.', (value) => {
          if (isUpdate) {
            return true;
          }
          return !show?.data?.[value];
        }),
      value: Yup.string().required(),
    }),
    onSubmit: async (val) => {
      try {
        if (onSubmit) {
          const value = Object.values(show?.data || {})?.[0];
          onSubmit(val, value);
          resetValues();
        }
      } catch (err) {
        handleError(err);
      }
    },
  });

  useEffect(() => {
    if (isUpdate && show) {
      const { data } = show;
      const key = Object.keys(data)?.[0];
      const value = Object.values(data)?.[0];
      const newVal = value.newvalue || value.value;
      // @ts-ignore
      setValues((v) => ({
        // @ts-ignore
        ...v,
        key,
        value: newVal,
      }));
    }
  }, [isUpdate, show]);

  return (
    <Popup.Root
      show={show as any}
      onOpenChange={(e) => {
        if (!e) {
          resetValues();
        }

        setShow(e);
      }}
    >
      <Popup.Header>{isUpdate ? 'Update entry' : 'Add new entry'}</Popup.Header>
      <form onSubmit={handleSubmit}>
        <Popup.Content>
          <div className="flex flex-col gap-2xl">
            <TextInput
              label="Key"
              value={values.key}
              onChange={handleChange('key')}
              error={!!errors.key}
              message={errors.key}
              disabled={isUpdate}
            />
            <TextArea
              label="Value"
              value={values.value}
              onChange={handleChange('value')}
              error={!!errors.value}
              message={errors.value}
            />
          </div>
        </Popup.Content>
        <Popup.Footer>
          <Popup.Button closable content="Cancel" variant="basic" />
          <Popup.Button
            loading={isLoading}
            type="submit"
            content={isUpdate ? 'Update' : 'Create'}
            variant="primary"
          />
        </Popup.Footer>
      </form>
    </Popup.Root>
  );
};

export default Handle;

export const UploadEnvironmentFile = ({
  show,
  onClose,
  onUpload,
}: {
  show: boolean;
  onClose: () => void;
  onUpload: (fileContent: string) => void;
}) => {
  const params = useParams();
  ensureAccountClientSide(params);

  const [fileContent, setFileContent] = useState(''); // Store .env file content
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!show) {
      setFileContent('');
      setFile(null);
    }
  }, [show]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile && selectedFile.name.endsWith('env')) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContent(event.target?.result as string);
      };
      reader.readAsText(selectedFile);
    } else {
      setFile(null);
    }
  };

  const handleButtonClick = () => {
    if (file || fileContent.trim()) {
      onUpload(fileContent);
      onClose();
      console.log('Uploading content:', fileContent);
    } else {
      document.getElementById('hiddenFileInput')?.click();
    }
  };

  return (
    <Popup.Root onOpenChange={onClose} show={show} className="!w-[800px]">
      <Popup.Header>Upload your .env file</Popup.Header>
      <Popup.Content>
        <div className="flex flex-col gap-lg">
          {/* <input
            type="file"
            accept="env"
            onChange={handleFileChange}
            className="mb-4"
          /> */}
          {/* {!fileContent.trim() && (
            <div className="flex flex-col gap-sm text-start">
              <span className="flex flex-wrap items-center gap-md py-lg">
                1. Select your .env
              </span>
              <span className="flex flex-wrap items-center gap-md py-lg">
                1. Download and install kloudlite cli
              </span>
            </div>
          )} */}
          <input
            type="file"
            // accept="env"
            id="hiddenFileInput"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          {fileContent ? (
            <TextArea
              placeholder="Enter docker config json"
              label="Your Environment variables listed here:"
              value={fileContent}
              // onChange={(e) => setFileContent(e.target.value)}
              resize={false}
              rows="6"
            />
          ) : (
            <span className="text-text-default text-center">
              Please select file to upload
            </span>
          )}
        </div>
      </Popup.Content>
      <Popup.Footer>
        <Button variant="primary-outline" content="close" onClick={onClose} />
        <Popup.Button
          onClick={handleButtonClick}
          type="submit"
          content={fileContent ? 'Upload' : 'Select file'}
          variant="primary"
        />
      </Popup.Footer>
    </Popup.Root>
  );
};
