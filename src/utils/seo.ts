export function SEOConfig(
  title: string,
  description?: string,
  image?: OGImage
): SeoConfig {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const {
    images,
    ...config
  }: // eslint-disable-next-line @typescript-eslint/no-var-requires
  Config = require('../../content/seo/config.json');
  const newImages =
    image?.url && images?.[0]?.url !== image.url ? [image, ...images] : images;
  const ogImages = newImages.map(({ url, width, height, alt, type }) => ({
    url,
    width,
    height,
    alt,
    type,
  }));

  return {
    title: `${title ?? config.title}`,
    description: description ?? config.description,
    keywords: config.keywords,
    twitter: {
      cardType: 'summary_large_image',
      handle: config.twitterHandle,
    },
    openGraph: {
      url: config.url,
      title: `${title ?? config.title}`,
      description: description ?? config.description,
      locale: config.locale,
      images: ogImages,
    },
    additionalLinkTags: config.additionalLinkTags,
  };
}

interface SeoConfig {
  title: string;
  description: string | undefined;
  keywords: string[] | undefined;
  twitter: {
    cardType: string;
    handle: string | undefined;
  };
  openGraph: {
    url: string | undefined;
    title: string;
    description: string | undefined;
    locale: string | undefined;
    images: OGImage[];
  };
  additionalLinkTags: { rel: string; href: string }[] | undefined;
}

interface Config {
  title: string;
  description: string | undefined;
  keywords: string[] | undefined;
  twitterHandle: string | undefined;
  url: string | undefined;
  locale: string | undefined;
  images: OGImage[];
  additionalLinkTags: { rel: string; href: string }[] | undefined;
}

export type OGImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
  type: string;
};
