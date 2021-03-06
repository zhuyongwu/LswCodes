﻿//启动点   路由、表格、集合模块、细节模块
var app = angular.module("bookStore", ['ui.router', 'ngGrid', 'BookListModule', "bookServices"]);
//var app = angular.module("bookStore", ['ui.router']);
/**
 * 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 * 这里的run方法只会在angular启动的时候运行一次。
 * @param  {[type]} $rootScope
 * @param  {[type]} $state
 * @param  {[type]} $stateParams
 * @return {[type]}
 */


app.run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

/**
 * 配置路由。
 * 注意这里采用的是ui-router这个路由，而不是ng原生的路由。
 * ng原生的路由不能支持嵌套视图，所以这里必须使用ui-router。
 * @param  {[type]} $stateProvider
 * @param  {[type]} $urlRouterProvider
 * @return {[type]}
 */

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/Login");

    $stateProvider
        .state("Login", {
            url: "/Login",
            templateUrl: "/app/tpls/Login.html"
        }).state('index', {
            url: '/Index',
            views: {
                '': {
                    templateUrl: '/app/tpls/Home.html'
                },
                'topBar@index': {
                    templateUrl: '/app/tpls/topBar.html'
                },
                'main@index': {
                    templateUrl: '/app/tpls/Main.html'
                }
            }
        }).state('index.library', {
            url: '/{bookType:[0-9]{1,4}}',
            views: {
                'main@index': {
                    templateUrl: '/app/tpls/library.html',
                    controller: function ($scope, $state) {
                        $scope.addBook = function () {
                            $state.go("index.library.addBook");
                        }
                    }
                },
                "bookType@index.library": {
                    templateUrl: '/app/tpls/BookType.html'
                },
                "bookGrid@index.library": {
                    templateUrl: '/app/tpls/BookGrid.html'
                }
            }
        }).state("index.library.addBook", {
            url: "/addBook",
            templateUrl: '/app/tpls/addBookForm.html'

        });
});
