import { Suspense, memo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loading from '@/components/Loading';
import PageNotFound from '@/pages/PageNotFound';
import useLazyRoutes from '@/hooks/useLazyRoutes';
import { routesConfig } from './routesConfig';
import type { FC, ReactElement } from 'react';
import UploadPage from '@/pages/UploadPage';
import { useAppSelector } from '@/redux/hooks';
import { selectIsLogin } from '@/redux/features/isLogin/isLoginSlice';
import VideoPage from '@/pages/VideoPage';

const SiderRouters: FC = (): ReactElement => {
  const isLogin = useAppSelector(selectIsLogin);
  const lazyRoutes = useLazyRoutes(routesConfig);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {lazyRoutes.map(({ pathname, Component }) => {
          return <Route path={pathname} element={<Component />} key={pathname} />;
        })}
        <Route
          path="/"
          element={
            <Navigate to='/recommend' />
          }
        />
        <Route
          path="/upload"
          element={
            isLogin ? <UploadPage /> : <PageNotFound msg="请登录后访问该页面" status="403" />
          }
        />
        <Route
          path="/video/*"
          element={
            <VideoPage />
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default memo(SiderRouters);