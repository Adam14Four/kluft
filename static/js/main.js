require(['./config'], function(config) {
    require(['app/app', 'app/routers/AppRouter'], function(app, AppRouter) {
        app.appRouter = new AppRouter();
        app.start();
    });
});