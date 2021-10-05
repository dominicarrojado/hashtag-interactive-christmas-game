import { render, screen } from '@testing-library/react';
import * as Head from 'next/head';
import { getFakeSentence } from '../../lib/test-helpers';
import * as PreLoadTags from '../preLoadTags';
import Layout from '../layout';

describe('<Layout />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render children', () => {
    const text = getFakeSentence();

    render(<Layout>{text}</Layout>);

    expect(screen.queryByText(text)).toBeInTheDocument();
  });

  it('should render expected components', () => {
    const preLoadTagsSpy = jest.spyOn(PreLoadTags, 'default');
    const headSpy = jest
      .spyOn(Head, 'default')
      .mockImplementation(({ children }) => <>{children}</>);

    render(<Layout>{getFakeSentence()}</Layout>);

    expect(preLoadTagsSpy).toBeCalledTimes(1);
    expect(headSpy).toBeCalledTimes(1);
  });
});
