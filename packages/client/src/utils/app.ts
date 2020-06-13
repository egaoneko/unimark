import { AppType } from '@unimark/core/lib/enums/account/app';
import App from '@unimark/core/lib/domain/entities/account/App';
import User from '@unimark/core/lib/domain/entities/account/User';

export function appFactory(appType: AppType, user?: User): App {
  const app = new App();

  if (user) {
    app.user = user;
  }

  app.type = appType;
  return app;
}
