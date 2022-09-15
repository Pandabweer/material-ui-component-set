(() => ({
  name: 'FileUploadInput',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, useText, Icon, usePresignedUpload, useProperty } = B;
    const { FormControl, FormHelperText, Typography, IconButton } =
      window.MaterialUI.Core;
    const {
      accept,
      actionProperty,
      actionVariableId: name,
      dataComponentAttribute = ['FileUpload'],
      disabled,
      fullWidth,
      helperText,
      hideLabel,
      hideDefaultError,
      label,
      value: valueRaw,
      margin,
      maxFileSize,
      maxFileSizeMessage: maxFileSizeMessageRaw,
      showImagePreview,
    } = options;

    const isDev = env === 'dev';
    const helper = useText(helperText);
    const labelText = useText(label);
    const [validationMessage, setValidationMessage] = React.useState('');
    const maxFileSizeMessage = useText(maxFileSizeMessageRaw);
    const acceptedValue = useText(accept) || 'image/*';
    const initialValue = useProperty(!isDev && valueRaw);
    const [value, setValue] = useState(initialValue);
    const dataComponentAttributeValue = useText(dataComponentAttribute);

    const { modelProperty } = actionProperty;

    const getPropertyId = (property) => {
      if (Array.isArray(property)) {
        return property[0];
      }

      if (typeof property === 'object') {
        return getPropertyId(property.id);
      }

      return property;
    };

    const propertyId = getPropertyId(modelProperty);

    const [upload, { error, loading, data: fileReference }] =
      usePresignedUpload({ propertyId });

    const firstRender = React.useRef(true);

    const inputRef = React.useRef();

    React.useEffect(() => {
      firstRender.current = false;
    }, []);

    React.useEffect(() => {
      if (firstRender.current) return;
      if (error) {
        if (Array.isArray(error) && error.length === 0) {
          return;
        }

        B.triggerEvent('onError', error);
      }
    }, [error]);

    React.useEffect(() => {
      if (firstRender.current) return;
      B.triggerEvent('onLoad', loading);
    }, [loading]);

    React.useEffect(() => {
      if (firstRender.current) return;
      if (!loading) {
        if (fileReference) {
          B.triggerEvent('onSuccess', fileReference);
        }
      }
    }, [loading, fileReference]);

    const errorHelpers = !hideDefaultError ? error && error.message : '';
    const helperValue = errorHelpers || validationMessage || helper;

    const formatBytes = (bytes) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${parseFloat(bytes / k ** i).toFixed()} ${sizes[i]}`;
    };

    const validateFiles = (files) => {
      const filesArray = files ? Array.from(files) : [];

      const isFileSizeExceeded = filesArray.some((file) => {
        return file.size / 1000000 > (maxFileSize || 20);
      });
      if (isFileSizeExceeded) {
        setValidationMessage(maxFileSizeMessage);
        return false;
      }

      const acceptList = acceptedValue
        .split(',')
        .map((item) => item.trim().replace('*', ''));

      const isInvalidMimeType = filesArray.some((file) => {
        return (
          acceptList.find((prefix) => file.type.startsWith(prefix)) === null
        );
      });

      if (isInvalidMimeType) {
        setValidationMessage(
          `invalid file type. Only ${acceptedValue} are allowed`,
        );
        return false;
      }

      return true;
    };

    const handleChange = (e) => {
      const file = e.target.files[0];
      setValue(file);

      const isValidFile = validateFiles([file]);
      if (isValidFile) setValidationMessage('');

      if (isValidFile) {
        upload(file.type, file);
      }
    };

    const clearFiles = (e) => {
      if (e && e.preventDefault) e.preventDefault();
      setValue(null);
      setValidationMessage('');
    };

    function UploadComponent() {
      const isDirty = !!fileReference;
      // Renders the button and the files you select
      return (
        <div data-component={dataComponentAttributeValue}>
          <input
            accept={acceptedValue}
            className={classes.input}
            type="file"
            onChange={handleChange}
            ref={inputRef}
          />
          {children}
          {isDirty && ( // TODO: change to showing only what is from the html element
            <input type="hidden" name={name} value={fileReference} />
          )}
        </div>
      );
    }

    function DeleteButton() {
      return (
        <div className={classes.deleteButtonWrapper}>
          <IconButton
            size="small"
            className={classes.remove}
            onClick={() => {
              setValue(null);
              B.triggerEvent('onFileRemove');
            }}
          >
            <Icon
              name="Delete"
              className={classes.deleteIcon}
              fontSize="small"
            />
          </IconButton>
        </div>
      );
    }

    function FileDetails({ file }) {
      const fileName = file && file.name;
      const fileSize = file && file.size && formatBytes(file.size);
      const fileType = file && file.type && file.type.replace('image/', '.');
      const fileUrl =
        file &&
        (file instanceof File ? window.URL.createObjectURL(file) : file.url);
      return (
        <div className={classes.listView}>
          <div className={classes.fileDetailList}>
            {showImagePreview && fileUrl && (
              <div
                style={{
                  backgroundImage: `url("${fileUrl}")`,
                }}
                className={classes.image}
              />
            )}
            <Typography variant="body1" noWrap className={classes.span}>
              {isDev ? 'File name' : fileName}
            </Typography>
            <div className={classes.fileDetailList}>
              <p className={classes.fileDetail}>{isDev ? 'Size' : fileSize}</p>

              <div className={classes.divider} />

              <p className={classes.fileDetail}>{isDev ? 'Type' : fileType}</p>

              {!isDev && <DeleteButton />}
            </div>
          </div>
        </div>
      );
    }

    function DevUploadedFile() {
      return (
        <>
          <div className={classes.listView}>
            <div className={classes.fileDetailList}>
              {showImagePreview && <div className={classes.devImage} />}

              <FileDetails />
            </div>
          </div>
        </>
      );
    }

    function UploadingFile() {
      return (
        <>
          <div className={classes.listView}>
            {showImagePreview && (
              <div className={classes.uploadingImage}>
                <Icon name="CloudUpload" />
              </div>
            )}
            <div className={classes.fileDetails}>
              <span>Uploading</span>
            </div>
          </div>
        </>
      );
    }

    const Label = isDev ? 'div' : 'label';

    function Control() {
      return (
        <FormControl
          fullWidth={fullWidth}
          error={!!validationMessage}
          disabled={disabled}
          margin={margin}
        >
          <Label className={classes.label}>
            {hideLabel ? '' : `${labelText}`}
            <UploadComponent />
          </Label>
          <FormHelperText classes={{ root: classes.helper }}>
            {validationMessage || helperValue}
          </FormHelperText>
          <div className={classes.messageContainer}>
            {!isDev && !loading && value && <FileDetails file={value} />}
            {loading && <UploadingFile />}
          </div>
        </FormControl>
      );
    }

    useEffect(() => {
      B.defineFunction('clearFileUpload', (e) => clearFiles(e));
    }, []);

    return isDev ? (
      <div>
        <div className={classes.root}>
          <Control />
        </div>
        <DevUploadedFile />
      </div>
    ) : (
      <Control />
    );
  })(),
  styles: (B) => (t) => {
    const { color: colorFunc, Styling } = B;
    const style = new Styling(t);
    const getOpacColor = (col, val) => colorFunc.alpha(col, val);
    return {
      root: {
        display: ({ options: { fullWidth } }) =>
          fullWidth ? 'block' : 'inline-block',
      },
      label: {
        marginLeft: '0!important',
        alignItems: 'start!important',
        color: ({ options: { labelColor } }) => [
          style.getColor(labelColor),
          '!important',
        ],
        '&.Mui-error': {
          color: ({ options: { errorColor } }) => [
            style.getColor(errorColor),
            '!important',
          ],
        },
        '&.Mui-disabled': {
          pointerEvents: 'none',
          opacity: '0.7',
        },
      },
      helper: {
        color: ({ options: { helperColor } }) => [
          style.getColor(helperColor),
          '!important',
        ],
        '&.Mui-error': {
          color: ({ options: { errorColor } }) => [
            style.getColor(errorColor),
            '!important',
          ],
        },
      },
      input: {
        display: 'none',
      },
      fullwidth: {
        display: 'flex',
        width: '100%',
      },
      span: {
        flex: 1,
        textAlign: 'start',
        marginBottom: '0.1875rem!important',
        marginRight: '1rem!important',
      },
      messageContainer: {
        flexWrap: 'wrap',
        display: ({ options: { type } }) =>
          type === 'grid' ? 'flex' : 'block',
        color: ({ options: { textColor } }) => [
          style.getColor(textColor),
          '!important',
        ],
        '& .MuiIconButton-root': {
          color: ({ options: { textColor } }) => [
            getOpacColor(style.getColor(textColor), 0.54),
            '!important',
          ],
        },
      },
      listView: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      gridView: {
        display: 'flex',
      },
      gridItem: {
        display: 'flex',
        borderRadius: '0.3125rem',
        flexDirection: 'column',
        border: ' 0.0625rem solid #eee',
        marginRight: '1rem',
        marginBottom: '1rem',
      },
      gridItemDetails: {
        maxWidth: ({ options: { imagePreviewWidth, showImagePreview } }) =>
          showImagePreview ? imagePreviewWidth : 'auto',
        display: 'flex',
        margin: '1rem',
        justifyContent: 'space-between',
      },
      devImage: {
        display: 'flex',
        overflow: 'hidden',
        margin: '1rem',
        borderStyle: 'dashed',
        borderColor: '#AFB5C8',
        borderRadius: '0.3125rem',
        borderWidth: '0.0625rem',
        border: '0.125rem dashed black',
        backgroundColor: '#F0F1F5',
        width: ({ options: { imagePreviewWidth } }) => imagePreviewWidth,
        height: ({ options: { imagePreviewHeight } }) => imagePreviewHeight,
      },
      gridDevImage: {
        extend: 'devImage',

        margin: 0,
        borderRadius: '0.3125rem 0.3125rem 0 0',
        width: ({ options: { imagePreviewWidth } }) => imagePreviewWidth,
        height: ({ options: { imagePreviewHeight } }) => imagePreviewHeight,
      },
      deleteIcon: {
        color: `${t.colors.light}!important`,
      },
      uploadingImage: {
        border: 'none',
        color: 'white',
        display: 'flex',
        overflow: 'hidden',
        margin: '1rem',
        alignItems: 'center',
        borderRadius: '0.3125rem',
        justifyContent: 'center',
        backgroundColor: t.colors.warning,
        width: ({ options: { imagePreviewWidth } }) => imagePreviewWidth,
        height: ({ options: { imagePreviewHeight } }) => imagePreviewHeight,
      },
      gridUploadingImage: {
        extend: 'uploadingImage',

        margin: 0,
        borderRadius: '0.3125rem 0.3125rem 0 0',
        width: ({ options: { imagePreviewWidth } }) => imagePreviewWidth,
        height: ({ options: { imagePreviewHeight } }) => imagePreviewHeight,
      },
      image: {
        overflow: 'hidden',
        margin: '1rem',
        borderRadius: '0.3125rem',
        backgroundSize: 'cover',
        width: ({ options: { imagePreviewWidth } }) => imagePreviewWidth,
        height: ({ options: { imagePreviewHeight } }) => imagePreviewHeight,
      },
      gridImage: {
        margin: 0,
        overflow: 'hidden',
        backgroundSize: 'cover',
        borderRadius: '0.3125rem 0.3125rem 0 0',
        width: ({ options: { imagePreviewWidth } }) => imagePreviewWidth,
        height: ({ options: { imagePreviewHeight } }) => imagePreviewHeight,
      },
      fileDetails: {
        flexGrow: 1,
        maxWidth: ({
          options: { type, imagePreviewWidth, showImagePreview },
        }) =>
          showImagePreview && type === 'grid'
            ? `calc(${imagePreviewWidth} - 60px)`
            : 'auto',
        display: 'flex',
        flexDirection: 'column',
      },
      fileDetail: {
        margin: 0,
        color: t.colors.medium,
      },
      fileDetailList: {
        display: 'flex',
        alignItems: 'center',
      },
      divider: {
        width: '0.1875rem',
        height: '0.1875rem',
        borderRadius: '50%',
        marginLeft: '1rem',
        backgroundColor: t.colors.light,
        marginRight: '1rem',
      },
      hr: {
        height: 1,
        margin: 0,
        border: 'none',
        backgroundColor: t.colors.light,
      },
      deleteButtonWrapper: {
        margin: ({ options: { type } }) => (type === 'grid' ? 0 : '1rem'),
      },
      remove: {
        height: '1.875rem',
        padding: '0.25rem!important',
      },
    };
  },
}))();
