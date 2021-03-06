import { Router } from 'express';
import urlsControllers from '../controllers/urlsControllers';
import tokenMiddleware from '../middlewares/tokenMiddleware';
import urlVerifyMiddleware from '../middlewares/urlVerifyMiddleware';

const urlRouter = Router();

urlRouter.post(
  '/urls/shorten',
  tokenMiddleware.tokenVerify,
  urlVerifyMiddleware.urlVerify,
  urlsControllers.postShorten,
);
urlRouter.get('/urls/:id', urlsControllers.getShorten);
urlRouter.get('/urls/open/:shortUrl', urlsControllers.getRedirect);
urlRouter.delete(
  '/urls/:id',
  tokenMiddleware.tokenVerify,
  urlsControllers.deleteShorten,
);

export default urlRouter;
