import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import {
  Container,
  Row,
  Col,
  Spacer,
  useTheme,
  NextUIThemes,
} from '@nextui/react';
import { Route } from '@lib/docs/page';
import { Sidebar, TableOfContent } from '@components';
import { Heading, getHeadings } from '@utils/get-headings';
import { MetaProps } from '@lib/docs/meta';
import Header from '@layouts/header';
import { Sticky, PageNav } from '@components';
import { REPO_NAME, GITHUB_URL } from '@lib/github/constants';
import { TAG, CONTENT_PATH } from '@lib/docs/config';

export interface Props {
  routes: Route[];
  currentRoute?: Route;
  prevRoute?: Route;
  nextRoute?: Route;
  meta?: MetaProps;
  tag?: string;
  slug?: string;
}

const DocsLayout: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  routes,
  prevRoute,
  nextRoute,
  currentRoute,
  tag,
  slug,
  meta,
}) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const theme = useTheme() as NextUIThemes;
  useEffect(() => {
    setHeadings(getHeadings());
  }, [routes]);
  const editUrl = `${GITHUB_URL}/${REPO_NAME}/edit/${TAG}/${CONTENT_PATH}${currentRoute?.path}`;
  console.log({ editUrl });
  return (
    <Container className="docs__container" display="flex" gap={0}>
      <Header {...meta} />
      <Navbar />
      <Row className="docs__content">
        <Sticky offset={10} className="docs__left-sidebar">
          <Sidebar routes={routes} tag={tag} slug={slug} />
        </Sticky>
        <Col span={8}>
          {children}
          <PageNav tag={tag} prevRoute={prevRoute} nextRoute={nextRoute} />
        </Col>
        <Spacer x={1} />
        <Sticky offset={10} className="docs__right-sidebar">
          <TableOfContent headings={headings} />
        </Sticky>
      </Row>
      <Footer />
      <style jsx>
        {`
          :global(.docs__left-sidebar) {
            width: 25%;
            max-height: calc(100vh - 4rem);
            overflow: auto;
          }
          :global(.docs__left-sidebar::-webkit-scrollbar) {
            width: 0px;
          }
          :global(.docs__content) {
            padding-top: 1rem;
          }
          :global(.docs__right-sidebar) {
            display: none;
          }
          @media only screen and (min-width: ${theme.breakpoints.lg.min}) {
            :global(.docs__right-sidebar) {
              display: block;
            }
          }
        `}
      </style>
    </Container>
  );
};

export default DocsLayout;
