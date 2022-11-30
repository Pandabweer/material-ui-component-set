(() => ({
  name: 'Text',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      content,
      linkType,
      linkTo,
      linkToExternal,
      linkTarget,
      useInnerHtml,
      dataComponentAttribute,
    } = options;
    const { Link } = window.MaterialUI.Core;
    const { env, useText, Link: BLink } = B;
    const isEmpty = content.length === 0;
    const isDev = env === 'dev';
    const isPristine = isEmpty && isDev;

    const Tag = useInnerHtml
      ? 'div'
      : {
          Title1: 'h1',
          Title2: 'h2',
          Title3: 'h3',
          Title4: 'h4',
          Title5: 'h5',
          Title6: 'h6',
          Body1: 'p',
          Body2: 'p',
        }[options.type || 'Body1'];

    const parsedContent = useText(content);
    const hasLink = linkType === 'internal' && linkTo && linkTo.id !== '';
    const hasExternalLink =
      linkType === 'external' && linkToExternal && linkToExternal.id !== '';
    const linkToExternalText =
      (linkToExternal && useText(linkToExternal)) || '';
    let linkedContent = parsedContent;

    if (isDev && !isPristine) {
      let alteredContent = '';
      content.forEach((value) => {
        if (typeof value === 'string' || value instanceof String) {
          let split = value.split('\n');
          if (split[0] === '') {
            split.shift();
          }
          split = split.join('\n');
          alteredContent += split;
        } else {
          alteredContent += `<div class='${classes.flex}'>{{<div class='${
            classes.ellipsis
          }'>${value.name.split('{{')[1].split('}}')[0]}</div>}}</div>`;
        }
      });
      linkedContent = (
        <Tag
          dangerouslySetInnerHTML={{
            __html: alteredContent.replace(/^\s+|\s+$/g, ''),
          }}
        />
      );
    } else if (isDev) {
      linkedContent = (
        <span className={classes.placeholder}>Empty content</span>
      );
    }

    if (hasLink || hasExternalLink) {
      linkedContent = (
        <Link
          className={classes.link}
          href={hasExternalLink ? linkToExternalText : undefined}
          target={linkTarget}
          rel={linkTarget === '_blank' ? 'noopener' : ''}
          component={hasLink ? BLink : undefined}
          endpoint={hasLink ? linkTo : undefined}
        >
          {linkedContent}
        </Link>
      );
    }

    return useInnerHtml && !isDev ? (
      <Tag
        className={classes.content}
        dangerouslySetInnerHTML={{ __html: linkedContent }}
        data-component={useText(dataComponentAttribute) || 'Text'}
      />
    ) : (
      <Tag
        className={classes.content}
        data-component={useText(dataComponentAttribute) || 'Text'}
      >
        {linkedContent}
      </Tag>
    );
  })(),
  styles: (B) => (t) => {
    const { mediaMinWidth, Styling } = B;
    const style = new Styling(t);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);

    return {
      content: {
        display: 'block',
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
        textAlign: ({ options: { textAlignment } }) => textAlignment,
        padding: 0,
        whiteSpace: 'pre-wrap',
        color: ({ options: { textColor } }) => style.getColor(textColor),
        fontFamily: ({ options: { type } }) => style.getFontFamily(type),
        fontSize: ({ options: { type } }) => style.getFontSize(type),
        fontWeight: ({ options: { fontWeight } }) => fontWeight,
        textTransform: ({ options: { type } }) => style.getTextTransform(type),
        letterSpacing: ({ options: { type } }) => style.getLetterSpacing(type),
        [`@media ${mediaMinWidth(600)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Portrait'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Portrait'),
          fontSize: ({ options: { type } }) =>
            style.getFontSize(type, 'Portrait'),
        },
        [`@media ${mediaMinWidth(960)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Landscape'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Landscape'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Landscape'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Landscape'),
          fontSize: ({ options: { type } }) =>
            style.getFontSize(type, 'Landscape'),
        },
        [`@media ${mediaMinWidth(1280)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Desktop'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Desktop'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Desktop'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Desktop'),
          fontSize: ({ options: { type } }) =>
            style.getFontSize(type, 'Desktop'),
        },
      },
      ellipsis: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      },
      flex: {
        display: 'flex',
      },
      link: {
        textDecoration: ['none', '!important'],
        color: ['inherit', '!important'],
      },
      placeholder: {
        color: '#dadde4',
      },
    };
  },
}))();
